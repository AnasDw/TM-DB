export interface ComplianceSettingsDTO {
  audioRetention: number;
  screenRecordingRetention: number;
  videoRetention: number;
  identifierRetention: number;
  termsConfiguration: string[];
}

export interface InterviewTermsInterface {
  termsConfiguration: string;
}
