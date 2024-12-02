import { useMemo } from "react";
import dictionary from "../../dictionary";

export const useIntervieweeLimitLabels = () =>
  useMemo(() => {
    const {
      app: {
        pages: {
          admin: {
            interview_limit_indication: {
              title: intervieweeLimitTitle,
              description: intervieweeLimitDescription,
              button_content: intervieweeLimitButtonContent,
            },
          },
        },
      },
    } = dictionary;

    return {
      intervieweeLimitTitle,
      intervieweeLimitDescription,
      intervieweeLimitButtonContent,
    };
  }, []);
