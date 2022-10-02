import { closeDialog, state, StateProps } from "./index";
import headStyles from "./headStyles";
import { rootElementId, modalSelector } from "./selectors";

export interface InitOptions
  extends Pick<StateProps, "screenConfiguration" | "prismaticUrl" | "theme">,
    Partial<Pick<StateProps, "filters">> {}

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
    <div class="modal">
      <div class="modal-dialog">
        <button class="close-modal" aria-label="close modal" data-close>✕</button>
        <div class="iframe-container"></div>
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
    if (e.key === "Escape" && document.querySelector(".modal.is-visible")) {
      closeDialog();
    }
  });
};

export default init;
