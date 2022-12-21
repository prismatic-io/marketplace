import merge from "lodash.merge";
import init from "./init";
import authenticate from "./authenticate";
import { modalSelector, iframeContainerSelector } from "./selectors";
import { Phrases } from "./phrases";
import {
  isIframe,
  postMessage,
  PrismaticMessageEvent,
  setConfigVars,
} from "./events";

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

interface InitializingConfiguration {
  /** The background color of the loading screen */
  background: string;
  /** The font color of the loading screen text and loading icon */
  color: string;
}

interface ConfigurationWizardConfiguration {
  hideSidebar?: boolean;
  isInModal?: boolean;
  triggerDetailsConfiguration?: TriggerDetails;
}

export interface ScreenConfiguration {
  configurationWizard?: ConfigurationWizardConfiguration;
  instance?: InstanceScreenConfiguration;
  initializing?: InitializingConfiguration;
  marketplace?: MarketplaceConfiguration;
}

export interface Translation {
  debugMode?: boolean;
  phrases?: Phrases;
}

interface OptionsBase {
  autoFocusIframe?: boolean;
  filters?: {
    category?: string;
    label?: string;
  };
  translation?: Translation;
  screenConfiguration?: ScreenConfiguration;
  theme?: Theme;
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
  initComplete: boolean;
  jwt: string;
  translation?: Translation;
  prismaticUrl?: string;
  screenConfiguration?: ScreenConfiguration;
  theme?: Theme;
}

export const state: StateProps = {
  filters: {
    category: undefined,
    label: undefined,
  },
  initComplete: false,
  jwt: "",
  translation: undefined,
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
        if (state[key] instanceof Object) {
          state[key] = merge(state[key], value);
        } else {
          state[key] = value;
        }
      }
    });
  }

  const queryParams = new URLSearchParams({
    ...params,
    embed: "true",
    jwt: state.jwt,
  });

  if (state.theme) {
    queryParams.set("theme", state.theme);
  }

  if (state.filters?.category) {
    queryParams.set("categorySearch", state.filters.category);
  }

  if (state.filters?.label) {
    queryParams.set("labelSearch", state.filters.label);
  }

  if (state.screenConfiguration?.initializing) {
    queryParams.set(
      "initializing",
      JSON.stringify(state.screenConfiguration.initializing)
    );
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

  if (iframeElement) {
    iframeElement.onload = () => {
      if (state.translation) {
        postMessage({
          iframe: iframeElement,
          event: {
            event: PrismaticMessageEvent.SET_TRANSLATION,
            data: state.translation,
          },
        });
      }

      if (state.screenConfiguration) {
        postMessage({
          iframe: iframeElement,
          event: {
            event: PrismaticMessageEvent.SET_SCREEN_CONFIGURATION,
            data: state.screenConfiguration,
          },
        });
      }
    };
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
