import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { InterviewerVoice } from "../interviewer-voice/enum";
import apiInstance from "../utils/api";
import { LanguageIso639Set1 } from "../utils/enums/language";
import { CUSTOM_HEADERS } from "../utils/routes";

export interface InterviewDetailsInterface {
  interviewTitle?: string;
  interviewSubtitle?: string;
  interviewConsentHtml?: string;
}

export interface InterviewDisclaimersInterface {
  interviewStopDisclaimerHtml?: string;
  interviewPrivacyDisclaimerHtml?: string;
  interviewThirdPartyDisclaimerHtml?: string;
}

export interface VerifyCaseData {
  exists: boolean;
  use_auth: boolean;
  use_stream_video: boolean;
  support_typing: boolean;
  should_show_opt_in: boolean;
  interviewee_identifier?: string;
  case_name: string;
  case_logo?: string;
  assistant_background_color?: string;
  meet_max_duration: number;
  support_talking: boolean;
  brand_clickable_color?: string;
  brand_header_color?: string;
  brand_name?: string;
  active: boolean;
  terms?: string[];
  termsCheckbox?: string;
  defaultInterviewerVoice: InterviewerVoice;
  interview_contact_us_link?: string;
  useScreenRecording: boolean;
  interviewDisclaimers: InterviewDisclaimersInterface;
  interviewDetails: InterviewDetailsInterface;
  allowedLanguages: LanguageIso639Set1[];
}

export interface CaseStatus {
  case_status: string;
}

export default function useVerifyCase(
  caseId: string | string[] | undefined,
  isDraft: boolean | null | undefined
) {
  const { isLoading: isAuthLoading } = useAuth0();

  return useQuery<VerifyCaseData | CaseStatus>(
    `verifyCase/${caseId}`,
    async () => {
      const response = await apiInstance.get(`case/${caseId}/verify`, {
        headers: {
          [CUSTOM_HEADERS.IS_DRAFT_MEET]: isDraft,
        },
      });
      return response.data;
    },
    {
      retry: 2,
      enabled: typeof caseId === "string" && !isAuthLoading,
      refetchOnWindowFocus: false,
    }
  );
}
