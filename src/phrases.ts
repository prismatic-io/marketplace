export type SimplePhrase = string;

export type ComplexPhrase<
  T extends Record<string, string | boolean | number> = Record<
    string,
    string | boolean | number
  >
> = T & {
  _?: string;
};

export enum PhraseNamespace {
  MARKETPLACE = "integration-marketplace",
  MARKETPLACE_INTEGRATION_ALERT_MONITORS = "integrations.id.alert-monitors",
  MARKETPLACE_INTEGRATION_CONFIGURATION = "integrations.id.configurations",
  MARKETPLACE_INTEGRATION_EXECUTIONS = "integrations.id.executions",
  MARKETPLACE_INTEGRATION_LOGS = "integrations.id.logs",
  MARKETPLACE_INTEGRATION_TEST = "integrations.id.test",
  MARKETPLACE_INTEGRATION_SUMMARY = "integrations.id",
  MARKETPLACE_NOT_FOUND = "app.marketplace-not-found",
}

export interface SharedPhrases {
  // common
  "common.loading": SimplePhrase;
  "common.saving": SimplePhrase;
  "common.unauthorized": SimplePhrase;

  // dialogs
  "deleteDialog.confirmButton": ComplexPhrase<{ removeType: string }>;
  "deleteDialog.confirmRequiredTextValidation": ComplexPhrase<{
    requiredText: string;
  }>;
  "deleteDialog.confirmText": ComplexPhrase<{ requiredText: string }>;
  "deleteDialog.openButton": ComplexPhrase<{ removeType: string }>;
  "deleteDialog.requiredText": SimplePhrase;
  "deleteDialog.title": SimplePhrase;
  "deleteDialog.warningText": ComplexPhrase<{
    requiredText: string;
    removalItems?: string;
  }>;

  "webhookUrlDialog.openButton": SimplePhrase;
  "webhookUrlDialog.title": SimplePhrase;

  "deleteUserConfigurationDialog.confirmButton": SimplePhrase;
  "deleteUserConfigurationDialog.confirmButton--isAdmin": SimplePhrase;
  "deleteUserConfigurationDialog.openButton": SimplePhrase;
  "deleteUserConfigurationDialog.title": SimplePhrase;
  "deleteUserConfigurationDialog.warningText": SimplePhrase;
  "deleteUserConfigurationDialog.warningText--isAdmin": ComplexPhrase<{
    email: string;
  }>;

  "deactivateIntegrationDialog.confirmButton": SimplePhrase;
  "deactivateIntegrationDialog.openButton": SimplePhrase;
  "deactivateIntegrationDialog.title": SimplePhrase;
  "deactivateIntegrationDialog.warningText": SimplePhrase;

  "configurationWizardDialog.cancelButton": SimplePhrase;
  "configurationWizardDialog.finishButton": SimplePhrase;
  "configurationWizardDialog.nextButton": SimplePhrase;

  "apiKeyDialog.cancelButton": SimplePhrase;
  "apiKeyDialog.generateApiKeyButton": SimplePhrase;
  "apiKeyDialog.text": SimplePhrase;
  "apiKeyDialog.title": SimplePhrase;
  "apiKeyDialog.updateButton": SimplePhrase;

  // filter bar
  "filterBar.breadcrumb.integrationMarketplace": SimplePhrase;
  "filterBar.openFiltersButton": SimplePhrase;
  "filterBar.clearFiltersButton": SimplePhrase;
  "filterBar.title": SimplePhrase;

  // filter results
  "filterResults.placeholderCta": SimplePhrase;
  "filterResults.placeholderText": SimplePhrase;
  "filterResults.placeholderTitle": SimplePhrase;

  // inputs
  "input.alertMonitor": SimplePhrase;
  "input.alertTriggerLabel": SimplePhrase;
  "input.apiKeyAddButton": SimplePhrase;
  "input.apiKeyLabel": SimplePhrase;
  "input.apiKeyPlaceholder": SimplePhrase;
  "input.categoryLabel": SimplePhrase;
  "input.confirmRequiredTextLabel": SimplePhrase;
  "input.contentTypeLabel": SimplePhrase;
  "input.customerLabel": SimplePhrase;
  "input.emailLabel": SimplePhrase;
  "input.endDateLabel": SimplePhrase;
  "input.externalIdLabel": SimplePhrase;
  "input.filterSearchPlaceholder": ComplexPhrase<{ type?: string }>;
  "input.headersAddButton": SimplePhrase;
  "input.headersKeyLabel": SimplePhrase;
  "input.headersLabel": SimplePhrase;
  "input.headersValueLabel": SimplePhrase;
  "input.instanceLabel": SimplePhrase;
  "input.integrationLabel": SimplePhrase;
  "input.integrationVersionLabel": SimplePhrase;
  "input.integrationVersionLatestLabel": SimplePhrase;
  "input.latestVersionLabel": SimplePhrase;
  "input.logSeverityLabel": SimplePhrase;
  "input.logType.integrationConnectionValue": SimplePhrase;
  "input.logType.integrationExecutionAndConnectionValue": SimplePhrase;
  "input.logType.integrationExecutionValue": SimplePhrase;
  "input.logTypeLabel": SimplePhrase;
  "input.noOptionsValue": SimplePhrase;
  "input.noneValue": SimplePhrase;
  "input.originalOnlyLabel": SimplePhrase;
  "input.payloadBodyLabel": SimplePhrase;
  "input.postUrlLabel": SimplePhrase;
  "input.roleLabel": SimplePhrase;
  "input.selectFlowLabel": SimplePhrase;
  "input.severityLabel": SimplePhrase;
  "input.startDateLabel": SimplePhrase;
  "input.status.failedValue": SimplePhrase;
  "input.status.runningValue": SimplePhrase;
  "input.status.successfulValue": SimplePhrase;
  "input.statusLabel": SimplePhrase;
  "input.stepLabel": SimplePhrase;
  "input.urlLabel": SimplePhrase;

  // details
  "detail.categoryLabel": SimplePhrase;
  "detail.configVariableLabel": SimplePhrase;
  "detail.customerLabel": SimplePhrase;
  "detail.executionLabel": SimplePhrase;
  "detail.executionText": SimplePhrase;
  "detail.instanceLabel": SimplePhrase;
  "detail.integrationLabel": SimplePhrase;
  "detail.overviewLabel": SimplePhrase;
  "detail.retryButton": SimplePhrase;
  "detail.retryLabel": SimplePhrase;
  "detail.retryValue": ComplexPhrase<{
    retryCount: number;
    maxRetryCount: number;
  }>;
  "detail.statusLabel": SimplePhrase;
  "detail.statusPausedValue": SimplePhrase;
  "detail.statusRunningValue": SimplePhrase;
  "detail.statusUnconfiguredValue": SimplePhrase;
  "detail.versionLabel": SimplePhrase;

  // data table
  "dataTable.connectionLabel": SimplePhrase;
  "dataTable.customerLabel": SimplePhrase;
  "dataTable.emailLabel": SimplePhrase;
  "dataTable.eventsLabel": SimplePhrase;
  "dataTable.flowLabel": SimplePhrase;
  "dataTable.instanceLabel": SimplePhrase;
  "dataTable.integrationLabel": SimplePhrase;
  "dataTable.lastTriggeredAtLabel": SimplePhrase;
  "dataTable.messageLabel": SimplePhrase;
  "dataTable.nameLabel": SimplePhrase;
  "dataTable.timestampLabel": SimplePhrase;
  "dataTable.triggersLabel": SimplePhrase;

  // tooltips
  "tooltip.close": SimplePhrase;
  "tooltip.copyConfirmed": SimplePhrase;
  "tooltip.copyCurl": SimplePhrase;
  "tooltip.copyLog": SimplePhrase;
  "tooltip.copyPayload": SimplePhrase;
  "tooltip.copyUrl": SimplePhrase;
  "tooltip.passApiKeyToHeader": SimplePhrase;
  "tooltip.restoreDefault": SimplePhrase;

  // log severity levels
  "logSeverity.debug": SimplePhrase;
  "logSeverity.error": SimplePhrase;
  "logSeverity.fatal": SimplePhrase;
  "logSeverity.info": SimplePhrase;
  "logSeverity.metric": SimplePhrase;
  "logSeverity.trace": SimplePhrase;
  "logSeverity.warn": SimplePhrase;

  // tabs
  "alertMonitorsTab.title": SimplePhrase;
  "configurationTab.title": SimplePhrase;
  "executionsTab.title": SimplePhrase;
  "payloadTab.title": SimplePhrase;
  "summaryTab.title": SimplePhrase;

  "testTab.testResults.banner.text--testIsRunning": SimplePhrase;
  "testTab.testResults.button": SimplePhrase;
  "testTab.testResults.title": SimplePhrase;
  "testTab.title": SimplePhrase;

  "stepOutputsTab.noResultsText": SimplePhrase;
  "stepOutputsTab.noStepOutputsText": SimplePhrase;
  "stepOutputsTab.stepNotSelected": SimplePhrase;
  "stepOutputsTab.title": SimplePhrase;

  "logsTab.banner.error": ComplexPhrase<{ count: number }>;
  "logsTab.banner.errorPlural": ComplexPhrase<{ count: number }>;
  "logsTab.noLogsTitle": SimplePhrase;
  "logsTab.noTestSelectedText": SimplePhrase;
  "logsTab.noTestSelectedTitle": SimplePhrase;
  "logsTab.showAllButton": SimplePhrase;
  "logsTab.showErrorsButton": SimplePhrase;
  "logsTab.title": SimplePhrase;

  "retryTab.cancelledLabel": SimplePhrase;
  "retryTab.scheduledRetryLabel": SimplePhrase;
  "retryTab.scheduledRetryText": ComplexPhrase<{
    retryIndex: number;
    maxRetryCount: number;
    nextScheduledRetry: string;
  }>;
  "retryTab.statusFailedPluralText": ComplexPhrase<{ retryCount: number }>;
  "retryTab.statusFailedText": ComplexPhrase<{ retryCount: number }>;
  "retryTab.statusLabel": SimplePhrase;
  "retryTab.statusSuccessText": ComplexPhrase<{ retryCount: number }>;
  "retryTab.title": SimplePhrase;

  // components
  "triggerDetails.title": SimplePhrase;
  "triggerDetails.apiConfiguredText": SimplePhrase;
  "triggerDetails.noApiConfiguredText": SimplePhrase;

  "executionDetails.title": SimplePhrase;

  "executionOptions.title": SimplePhrase;
}

export interface UniquePhrases {
  // marketplace listing
  "integration-marketplace__card.activateLabel": SimplePhrase;
  "integration-marketplace__card.pausedLabel": SimplePhrase;
  "integration-marketplace__card.runningLabel": SimplePhrase;
  "integration-marketplace__card.ulcUnconfiguredLabel": SimplePhrase;
  "integration-marketplace__filterBar.activateButton": SimplePhrase;
  "integration-marketplace__filterBar.allButton": SimplePhrase;

  // marketplace integration summary
  "integrations.id__banner.customerActivateText": ComplexPhrase<{
    organization: string;
  }>;
  "integrations.id__banner.customerUpdateText": ComplexPhrase<{
    organization: string;
  }>;
  "integrations.id__banner.enabledText": SimplePhrase;
  "integrations.id__banner.pauseButton": SimplePhrase;
  "integrations.id__banner.pausedText": SimplePhrase;
  "integrations.id__banner.unpauseButton": SimplePhrase;
  "integrations.id__banner.updateButton": SimplePhrase;
  "integrations.id__banner.updateText": SimplePhrase;
  "integrations.id__filterBar.configureUserButton": SimplePhrase;
  "integrations.id__filterBar.reconfigureButton": SimplePhrase;
  "integrations.id__filterBar.reconfigureUserButton": SimplePhrase;
  "integrations.id__filterBar.viewConfigurationButton": SimplePhrase;
  "integrations.id__filterBar.viewUserConfigurationButton": SimplePhrase;

  // marketplace integration summary
  "integrations.id.test__filterBar.saveRunButton": SimplePhrase;

  // marketplace integration alert monitors
  "integrations.id.alert-monitors__filterResults.placeholderText--hasInstanceOrCustomer": SimplePhrase;

  // marketplace integration logs
  "integrations.id.logs__filterResults.placeholderCta--hasCustomer": SimplePhrase;
  "integrations.id.logs__filterResults.placeholderText--hasCustomer": SimplePhrase;
  "integrations.id.logs__filterResults.placeholderText--hasInstance": SimplePhrase;
  "integrations.id.logs__filterBar.refreshButton": SimplePhrase;
  "integrations.id.logs__filterBar.refreshTooltip": SimplePhrase;

  // marketplace not found
  "app.marketplace-not-found__title": SimplePhrase;
  "app.marketplace-not-found__text": SimplePhrase;

  // 404
  "404__title": SimplePhrase;
  "404__text": SimplePhrase;
  "404__button": ComplexPhrase<{ screen: string }>;
}

export type PhrasesBase = SharedPhrases & UniquePhrases;

export type PrismaticPhrases<T extends SharedPhrases = SharedPhrases> = Partial<
  {
    [K in keyof T as `${PhraseNamespace}__${string & K}`]: T[K];
  }
> &
  PhrasesBase;

export type Phrases = Partial<PrismaticPhrases>;