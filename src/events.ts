import { iframeContainerSelector } from "./selectors";

type ScheduleTypeEnum = "none" | "custom" | "minute" | "hour" | "day" | "week";

type DefaultConfigVarDataTypeEnum =
  | "string"
  | "date"
  | "timestamp"
  | "picklist"
  | "schedule"
  | "code"
  | "credential"
  | "boolean"
  | "connection";

type CollectionTypeEnum = "valuelist" | "keyvaluelist";
type CodeLanguageEnum = "json" | "xml" | "html";

interface BaseConfigVar {
  codeLanguage: CodeLanguageEnum | null;
  collectionType: CollectionTypeEnum | null;
  dataType: DefaultConfigVarDataTypeEnum | null;
  pickList: string[] | null;
  scheduleType: ScheduleTypeEnum | null;
  timeZone: string | null;
}

interface StringConfigVar extends BaseConfigVar {
  collectionType: null;
  value: string;
}

export interface ValueListConfigVar extends BaseConfigVar {
  value: string[];
  collectionType: "valuelist";
}

export interface KeyValueListConfigVar extends BaseConfigVar {
  value: Array<{ key: string; value: string }>;
  collectionType: "keyvaluelist";
}

export type DefaultConfigVar =
  | StringConfigVar
  | ValueListConfigVar
  | KeyValueListConfigVar;

export enum InstanceConfigVariableStatus {
  ACTIVE = "ACTIVE",
  ERROR = "ERROR",
  PENDING = "PENDING",
}

export interface ConnectionConfigVar {
  inputs: Record<string, { value: string }>;
  status: InstanceConfigVariableStatus | null;
}

export type ConfigVar = DefaultConfigVar | ConnectionConfigVar;

export enum PrismaticMessageEvent {
  INSTANCE_CONFIGURATION_CLOSED = "INSTANCE_CONFIGURATION_CLOSED",
  INSTANCE_CONFIGURATION_LOADED = "INSTANCE_CONFIGURATION_LOADED",
  INSTANCE_CONFIGURATION_OPENED = "INSTANCE_CONFIGURATION_OPENED",
  INSTANCE_CREATED = "INSTANCE_CREATED",
  INSTANCE_DELETED = "INSTANCE_DELETED",
  INSTANCE_DEPLOYED = "INSTANCE_DEPLOYED",
  SET_CONFIG_VAR = "SET_CONFIG_VAR",
  SET_SCREEN_CONFIGURATION = "SET_SCREEN_CONFIGURATION",
  SET_TRANSLATION = "SET_TRANSLATION",
}

interface InstanceData {
  instanceId: string;
  instanceName: string;
  integrationName: string;
  integrationVersionNumber: number;
  customerId: string;
  customerName: string;
}

export type MessageData =
  | {
      event: PrismaticMessageEvent.INSTANCE_CONFIGURATION_OPENED;
      data: InstanceData;
    }
  | {
      event: PrismaticMessageEvent.INSTANCE_CONFIGURATION_LOADED;
      data: InstanceData & {
        configVars: Record<string, ConfigVar>;
      };
    }
  | {
      event: PrismaticMessageEvent.INSTANCE_CONFIGURATION_CLOSED;
      data: InstanceData;
    }
  | {
      event: PrismaticMessageEvent.INSTANCE_CREATED;
      data: InstanceData;
    }
  | {
      event: PrismaticMessageEvent.INSTANCE_DELETED;
      data: InstanceData;
    }
  | {
      event: PrismaticMessageEvent.INSTANCE_DEPLOYED;
      data: InstanceData;
    };

interface BaseConfigVarInput {
  value: string;
}

interface ValueListConfigVarInput {
  value: string[];
}

interface KeyValueListConfigVarInput {
  value: Array<{ key: string; value: string }>;
}

interface ScheduleConfigVarInput {
  value: string;
  scheduleType: ScheduleTypeEnum;
  timeZone: string | undefined;
}

export interface ConnectionConfigVarInput {
  inputs: Record<string, { value: string }>;
}

export type DefaultConfigVarInput =
  | BaseConfigVarInput
  | ValueListConfigVarInput
  | KeyValueListConfigVarInput
  | ScheduleConfigVarInput;

interface SetConfigVarsPropsBase {
  configVars: Record<string, DefaultConfigVarInput | ConnectionConfigVarInput>;
}

interface SelectorSetConfigVarProps extends SetConfigVarsPropsBase {
  selector?: string;
}

interface IFrameSetConfigVarProps extends SetConfigVarsPropsBase {
  iframe: Element;
}

export type SetConfigVarsProps =
  | SelectorSetConfigVarProps
  | IFrameSetConfigVarProps;

export const setConfigVars = ({ configVars, ...props }: SetConfigVarsProps) => {
  postMessage({
    ...props,
    event: { event: "SET_CONFIG_VAR", data: configVars },
  });
};

interface BasePostMessageProps {
  event: unknown;
}

interface SelectorPostMessageProps extends BasePostMessageProps {
  selector?: string;
}

interface ElementPostMessageProps extends BasePostMessageProps {
  iframe: Element;
}

type PostMessageProps = SelectorPostMessageProps | ElementPostMessageProps;

export const postMessage = (props: PostMessageProps) => {
  const iframeElement = isIframePostMessage(props)
    ? props.iframe
    : getIframeElement(props.selector);

  if (!isIframe(iframeElement)) {
    return;
  }

  iframeElement.contentWindow?.postMessage(props.event, "*");
};

export const getMessageIframe = (event: MessageEvent) =>
  Array.from(document.getElementsByTagName("iframe")).find(
    (iframe) => iframe.contentWindow === event.source
  );

const getIframeElement = (selector: string | undefined) =>
  document.querySelector(`${selector || iframeContainerSelector} > iframe`);

const isIframePostMessage = (
  props: PostMessageProps
): props is ElementPostMessageProps => "iframe" in props;

export const isIframe = (
  element?: Element | null
): element is HTMLIFrameElement =>
  Boolean(element && element.tagName === "IFRAME");
