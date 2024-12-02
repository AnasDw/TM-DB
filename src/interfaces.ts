import { BackgroundDependentResponseBody } from "./background-task/interfaces";
import {
  Recording,
  TranscriptMessage,
} from "./features/admin-panel/interviews-tab/interface/RecordingInterfaces";
import { InterviewerVoice } from "./interviewer-voice/enum";
import { TagDTO } from "./tag";
import { ProjectCreationStepEnum, StepStatus } from "./utils/enums";
import { MeetMode } from "./utils/mode";

export interface InsightInterface {
  top_insight: string;
  top_insight_header: string;
  meet_ids: any[];
  id: number;
}

export interface MeetMessageDTO {
  sentences: string[];
  content: string;
  created_at: string;
  meet_id: string;
  message_id: string;
  role: string;
  tags: TagDTO[];
}

export interface Translation {
  content: string;
  sentences: string[];
}

export interface TranslatedMeetMessage {
  id: string;
  translation: Translation | null;
}

export type TranslationResponse = BackgroundDependentResponseBody<
  TranslatedMeetMessage[]
>;

export interface MeetDTO {
  meet_id: string;
  created_at: string;
  ended_at: string;
  meet_duration: number;
  meet_context: MeetMessageDTO[];
  external_user_id: string;
  user_email: string;
  user_id: string;
  interviewee_identifier_value: string;
  meet_mode: string;
  meet_summary: string;
  country_code: string;
  meet_status: MeetStatus;
  device_type: MeetDeviceType;
}

export type MeetLeanDTO = Omit<MeetDTO, "meet_context">;

export interface CustomDrawerData {
  key_id: string;
  content: string;
  meet_id: string;
  created_at: string;
  meet_mode: MeetMode;
  reason?: string;
}

export enum MeetStatus {
  COMPLETED = "COMPLETED",
  PARTIAL = "PARTIAL",
  INITIATED = "INITIATED",
}

export enum MeetDeviceType {
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
  MOBILE = "MOBILE",
}

export interface ProjectStepInterface {
  step_id: string;
  name: ProjectCreationStepEnum;
  status: StepStatus;
  text?: string;
  suggestions?: string[];
  question: string;
  optional?: boolean;
  sub_question: string;
  placeholder?: string;
}

export type ProjectStepLeanInterface = Omit<
  ProjectStepInterface,
  "status" | "suggestions"
>;

export interface CreateProjectDTO {
  stepKey: ProjectCreationStepEnum;
}

export type ConversationDataType = {
  count_tagged_messages: number;
  new_messages: MeetMessageDTO[];
};

export type TranscriptMetadata = {
  agentName: InterviewerVoice;
  recording: Recording;
  screenRecordingVideo: Recording;
  messages: TranscriptMessage[];
};

export enum UploadType {
  LOGO_IMAGE_FILE = "logos",
  BACKGROUND_IMAGE_FILE = "background",
}
