import { useMemo } from "react";
import dictionary from "../../../../dictionary";

export const useComplianceSettingsLabels = () =>
  useMemo(() => {
    const {
      app: {
        pages: {
          admin: {
            workspace_settings: {
              compliance_settings: {
                title: complianceSettingsTitle,
                interview_terms_configuration: {
                  title: termsConfigurationTitle,
                  alertMessage: termsConfigurationAlertMessage,
                  paragraph: termsConfigurationParagraph,
                },
              },
              retention_settings: {
                audio_retention: audioRetention,
                video_retention: videoRetention,
                identifier_retention: identifierRetention,
                identifier_retention_tooltip: identifierRetentionTooltip,
                screen_recording_retention: screenRecordingRetention,
              },
            },
          },
        },
      },
    } = dictionary;

    return {
      termsConfigurationTitle,
      termsConfigurationAlertMessage,
      termsConfigurationParagraph,
      audioRetention,
      videoRetention,
      screenRecordingRetention,
      identifierRetention,
      identifierRetentionTooltip,
      complianceSettingsTitle,
    };
  }, []);
