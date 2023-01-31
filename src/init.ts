import { closeDialog, state, StateProps } from "./index";
import headStyles from "./headStyles";
import { rootElementId, modalSelector } from "./selectors";

export interface InitOptions
  extends Pick<StateProps, "screenConfiguration" | "theme" | "translation">,
    Partial<Pick<StateProps, "filters" | "prismaticUrl">> {}

const init = (options?: InitOptions) => {
  const existingElement = document.getElementById(rootElementId);

  if (existingElement) {
    return;
  }

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (key in state) {
        state[key] = value;
      }
    });
  }

  state.initComplete = true;

  document.head.insertAdjacentHTML("beforeend", headStyles);

  const rootElement = document.createElement("div");
  rootElement.id = rootElementId;
  rootElement.innerHTML = /* html */ `
    <div class="pio__modal">
      <div class="pio__dialog">
        <button class="pio__closeBtn" aria-label="close modal" data-close>✕</button>
        <div class="pio__iframe"></div>
      </div>
    </div>
  `;

  document.body.appendChild(rootElement);

  const closeButtonElement = document.querySelector(
    `#${rootElementId} [data-close]`
  );

  const modalElement = document.querySelector(modalSelector);

  modalElement?.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    closeDialog();
  });

  closeButtonElement?.addEventListener("click", () => closeDialog());

  document.addEventListener("keyup", (e) => {
    if (
      e.key === "Escape" &&
      document.querySelector(".pio__modal--is_visible")
    ) {
      closeDialog();
    }
  });
};

export default init;
