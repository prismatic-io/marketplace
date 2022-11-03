import init from "./init";
import authenticate from "./authenticate";
import { setConfigVars } from "./events";
import { modalSelector, iframeContainerSelector } from "./selectors";

type Theme = "DARK" | "LIGHT";

type Filters = {
  category?: string;
  label?: string;
};

interface InstanceScreenConfiguration {
  hideBackToMarketplace?: boolean;
  hideTabs?: Array<"Test" | "Executions" | "Monitors" | "Logs">;
}

type TriggerDetails = "default" | "default-open" | "hidden";

interface MarketplaceConfiguration {
  configuration: "allow-details" | "always-show-details" | "disallow-details";
}

interface ConfigurationWizardConfiguration {
  hideSidebar?: boolean;
  isInModal?: boolean;
  triggerDetailsConfiguration?: TriggerDetails;
}

export interface ScreenConfiguration {
  instance?: InstanceScreenConfiguration;
  configurationWizard?: ConfigurationWizardConfiguration;
  marketplace: MarketplaceConfiguration;
}

interface OptionsBase {
  autoFocusIframe?: boolean;
  filters?: {
    category?: string;
    label?: string;
  };
  theme?: Theme;
  screenConfiguration?: ScreenConfiguration;
}

interface PopoverOptions extends OptionsBase {
  usePopover: true;
}

interface SelectorOptions extends OptionsBase {
  usePopover?: false;
  selector: string;
}

export type Options = PopoverOptions | SelectorOptions;

const isPopover = (options: Options): options is PopoverOptions =>
  options.usePopover === true;

export interface StateProps {
  filters: Filters;
  screenConfiguration?: ScreenConfiguration;
  initComplete: boolean;
  jwt: string;
  prismaticUrl?: string;
  theme?: Theme;
}

export const state: StateProps = {
  filters: {
    category: undefined,
    label: undefined,
  },
  initComplete: false,
  jwt: "",
  prismaticUrl: "https://app.prismatic.io",
  screenConfiguration: undefined,
  theme: undefined,
};

export const assertInit = (functionName: string) => {
  if (!state.initComplete) {
    throw new Error(
      `Expected init to be called before calling ${functionName}`
    );
  }
};

const getModal = () => document.querySelector(modalSelector);

const isVisible = "pio__modal--is_visible";

const openDialog = () => getModal()?.classList.add(isVisible);

export const closeDialog = () => {
  const iframeElement = getIframeContainerElement(
    `${iframeContainerSelector} > iframe`
  );
  if (!isIframe(iframeElement)) {
    return;
  }

  iframeElement.contentWindow?.postMessage(
    { event: "MARKETPLACE_CLOSED" },
    "*"
  );

  getModal()?.classList.remove(isVisible);
};

const getIframeContainerElement = (selector: string) =>
  document.querySelector(selector);

const isIframe = (element?: Element | null): element is HTMLIFrameElement =>
  Boolean(element && element.tagName === "IFRAME");

const setIframe = (
  route: string,
  options: Options,
  params?: Record<string, string>
) => {
  if (!isPopover(options) && !options.selector) {
    console.error("Could not find display selector.");
  }

  const iframeContainerElement = getIframeContainerElement(
    isPopover(options) ? iframeContainerSelector : options.selector
  );

  if (!iframeContainerElement) {
    return;
  }

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (key in state) {
        state[key] = value;
      }
    });
  }

  const queryParams = new URLSearchParams({
    ...params,
    embed: "true",
    jwt: state.jwt,
  });

  if (state.screenConfiguration) {
    queryParams.set(
      "screenConfiguration",
      JSON.stringify(state.screenConfiguration)
    );
  }

  if (state.theme) {
    queryParams.set("theme", state.theme);
  }

  if (state.filters?.category) {
    queryParams.set("categorySearch", state.filters.category);
  }

  if (state.filters?.label) {
    queryParams.set("labelSearch", state.filters.label);
  }

  if (state.filters) {
    queryParams.set(
      "hiddenFilters",
      Object.entries(state.filters)
        .reduce<string[]>(
          (acc, [key, value]) => (value ? acc.concat(`${key}Search`) : acc),
          []
        )
        .join(",")
    );
  }

  iframeContainerElement.innerHTML = /* html */ `
    <iframe src="${
      state.prismaticUrl
    }/${route}/?${queryParams.toString()}" height="100%" width="100%" frameBorder="0"></iframe>
  `;

  const iframeElement = iframeContainerElement.querySelector("iframe");

  if (iframeElement && options?.autoFocusIframe !== false) {
    iframeElement.addEventListener("mouseenter", () => {
      iframeElement.focus();
    });
  }

  if (isPopover(options)) {
    openDialog();
  }
};

export const showMarketplace = (options: Options = { usePopover: true }) => {
  assertInit("showMarketplace");
  setIframe("integration-marketplace", options, {});
};

export const configureIntegration = ({
  integrationName,
  skipRedirectOnRemove,
  ...options
}: Options & {
  integrationName: string;
  skipRedirectOnRemove?: boolean;
}) => {
  assertInit("configureIntegration");

  setIframe("find-integration-marketplace", options, {
    integrationName,
    ...(skipRedirectOnRemove ? { skipRedirectOnRemove: "true" } : {}),
  });
};

export const close = () => {
  assertInit("close");

  closeDialog();
};

export { authenticate, init };

export { rootElementId, modalSelector } from "./selectors";

export {
  PrismaticMessageEvent,
  MessageData,
  ConfigVar,
  DefaultConfigVar,
  ConnectionConfigVar,
  DefaultConfigVarInput,
  ConnectionConfigVarInput,
  setConfigVars,
  getMessageIframe,
} from "./events";

export default {
  init,
  authenticate,
  showMarketplace,
  configureIntegration,
  close,
  setConfigVars,
};
