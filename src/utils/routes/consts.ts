import { TabRoutesV4, WorkspaceTabRoutesV4 } from "../../tab/enum";
import { LanguageIso639Set1 } from "../enums/language";

const API_PREFIX = "api";

export const HELP_CENTER_URL =
  "https://help.genway.ai/folders/Collection_root/";

export const CUSTOM_HEADERS = {
  TENANT_ID: "X-Tenant-ID",
  IS_DRAFT_MEET: "X-Draft-Meet",
};

// --------- Comment -------
// Use Pages for frontend routing.
// Use Routes for external routing (API CALLS).

const versionedPrefix = (versionNumber = 1) =>
  `${API_PREFIX}/v${versionNumber}`;

export const Pages = {
  PROJECT_INTERVIEWS: (caseId: string, interviewId?: string) =>
    `/admin/case/${caseId}/${TabRoutesV4.Interviews}/${interviewId}`,
  ADMIN_PAGE: "/admin/case/",
  CREATE_PROJECT_PAGE: "/admin/case/project-creation",
  PROJECT_CREATION: (caseId: string) =>
    `/admin/case/${caseId}/${TabRoutesV4.ProjectCreation}`,
  THEME_ANALYSIS: (caseId: string, themeId: string = "") =>
    `/admin/case/${caseId}/${TabRoutesV4.ThemeAnalysis}/${themeId}`,
  NOT_SUPPORTED: "/not-supported",
  WORKSPACE: (
    tab: WorkspaceTabRoutesV4 = WorkspaceTabRoutesV4.ComplianceSettings
  ) => `/admin/workspace/${tab}`,
};

const mainRoutes = {
  PROJECT_CREATION_V1: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/project-creation`,
  PROJECT_CREATION_STEPS_V1: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/project-creation/get-steps`,
  GET_PROJECT_CREATION_STEPS: "/case/project-creation-steps",
  VALIDATE_PROJECT_STEP: "case/validate_project_step",
  CREATE_PROJECT_V1: `${versionedPrefix()}/case/create_project`,
  PREVIEW_PROTOTYPE_LINK: "/prototype-testing/integrations/figma/preview-link",
  CREATE_PROTOTYPE_TESTING_PROJECT: "/prototype-testing/projects",
  GET_PROTOTYPE_TESTING_TASK: (caseId: string) =>
    `/case/${caseId}/prototype-testing/task`,
  EXPORT_INTERVIEWEES_INFORMATION: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/interviewees-information/export`,
  EXPORT_INTERVIEWS_TRANSCRIPTS: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/interviews-transcripts/export`,
  POST_WARM_UP_INTERVIEW: (caseId: string) =>
    `/cases/${caseId}/warm-up-interview`,
  GET_USABILITY_TESTING_STATISTICS: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/prototype-testing/statistics`,
  GET_USABILITY_TESTING_SCREEN_HEATMAP: (screenId: string) =>
    `${versionedPrefix()}/prototype-testing/screens/${screenId}/heatmap`,
  GET_ENTIRE_INTERVIEW_AUDIO: (interviewId: string) =>
    `/meetings/${interviewId}/media/audio/prepare-full-recording`,
  GET_PROTOTYPE_TESTING: (caseId: string) =>
    `/case/${caseId}/prototype-testing`,
  GET_TRANSLATED_MESSAGES: (meetId: string, languageCode: LanguageIso639Set1) =>
    `${versionedPrefix()}/meets/${meetId}/translations/${languageCode}`,
  GET_THEME: (themeId: string) => `${versionedPrefix()}/themes/${themeId}`,
  GENERATE_CUSTOM_TOPIC: (themeId: string) =>
    `${versionedPrefix()}/themes/${themeId}/generate-custom-topic`,
  GENERATE_CUSTOM_THEME: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/generate-custom-theme`,
  DUPLICATE_PROJECT: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/duplicate-project`,
  GET_THEMES: (caseId: string) => `case/${caseId}/themes`,
  GET_CASES: (filterBy: string = "") => `case/${filterBy}`,
  GET_RECRUITMENT_FILTERS: `${versionedPrefix()}/case/recruitment/criteria/get-criteria`,
  GET_RECRUITMENT_METADATA: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/recruitment/criteria/metadata`,
  GET_PROJECT_CREATION_RECRUITMENT_STUDIES_V1: (caseId: string) =>
    `${versionedPrefix()}/case/${caseId}/project-creation/get-studies`,
  THEME_TOPIC: (topicId: string) =>
    `${versionedPrefix()}/theme-topics/${topicId}`,
  RECREATE_THEME: (themeId: string) =>
    `${versionedPrefix()}/themes/${themeId}/recreate`,
  RECREATE_TOPIC: (topicId: string) =>
    `${versionedPrefix()}/theme-topics/${topicId}/recreate`,
  GET_PROJECT_STATISTICS: (caseId: string) => `case/${caseId}/statistics`,
};

const meetingServiceRoutes = {
  FETCH_AUDIO_TRANSCRIPT_METADATA: (meetId: string) =>
    `/meetings/${meetId}/recording/metadata`,
  CAPTURE_CLICK: (meetId: string) =>
    `/meetings/${meetId}/prototype-testing/clicks`,
  CAPTURE_SCREEN_CHANGE: (meetId: string) =>
    `/meetings/${meetId}/prototype-testing/screen-change`,
};

const workspaceRoutes = {
  REGISTER_NEW_USER: `${versionedPrefix()}/workspace/onboard`,
  COMPLIANCE_SETTINGS: `${versionedPrefix()}/workspace/compliance-settings/`,
};

export const Routes = {
  MAIN: mainRoutes,
  MEETING: meetingServiceRoutes,
  WORKSPACE: workspaceRoutes,
};
