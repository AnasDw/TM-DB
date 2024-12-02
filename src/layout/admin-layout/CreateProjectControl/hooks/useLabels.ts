import { useMemo } from "react";
import dictionary from "../../../../dictionary";

export const useCreateProjectDropdownLabels = () =>
  useMemo(() => {
    const {
      app: {
        pages: {
          admin: {
            create_project_dropdown: { cta_label: ctaLabel },
          },
        },
      },
    } = dictionary;

    return { ctaLabel };
  }, []);

export const useProjectNameModalLabels = () =>
  useMemo(() => {
    const {
      app: {
        pages: {
          admin: {
            project_name_modal: {
              title,
              input_label: inputLabel,
              input_placeholder: inputPlaceholder,
              cta_label: ctaLabel,
            },
          },
        },
      },
    } = dictionary;

    return { title, inputLabel, inputPlaceholder, ctaLabel };
  }, []);
