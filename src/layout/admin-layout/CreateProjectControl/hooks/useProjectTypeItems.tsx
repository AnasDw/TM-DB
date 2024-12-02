import { useMemo } from "react";
import { MenuProps } from "antd";
import dictionary from "../../../../dictionary";
import { ContextualProjectIcon } from "../../../../lib/svg-icons/system/ContextualProjectIcon";
import { UsabilityStudiesProjectIcon } from "../../../../lib/svg-icons/system/UsabilityStudiesProjectIcon";
import { ProjectType } from "../../../../utils/enums";
import { ProjectTypeItem } from "../CreateProjectDropdown/ProjectTypeItem";

export const useProjectTypeItems = () => {
  const {
    app: {
      pages: {
        admin: {
          create_project_dropdown: {
            items: { interview, prototype },
          },
        },
      },
    },
  } = dictionary;

  const projectTypesLabelParams = useMemo(
    () => ({
      [ProjectType.INTERVIEW]: {
        title: interview.title,
        description: interview.description,
        icon: <ContextualProjectIcon />,
      },
      [ProjectType.PROTOTYPE_TESTING]: {
        title: prototype.title,
        description: prototype.description,
        icon: <UsabilityStudiesProjectIcon />,
      },
    }),
    [
      interview.description,
      interview.title,
      prototype.description,
      prototype.title,
    ]
  );

  const projectTypesItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <ProjectTypeItem
            title={projectTypesLabelParams[ProjectType.INTERVIEW].title}
            description={
              projectTypesLabelParams[ProjectType.INTERVIEW].description
            }
            icon={projectTypesLabelParams[ProjectType.INTERVIEW].icon}
          />
        ),
        key: ProjectType.INTERVIEW,
        style: { padding: "16px 16px 8px 16px" },
      },
      {
        key: 1,
        type: "divider",
        style: { margin: "0 0 0 16px", width: "calc(100% - 32px)" },
      },
      {
        label: (
          <ProjectTypeItem
            title={projectTypesLabelParams[ProjectType.PROTOTYPE_TESTING].title}
            description={
              projectTypesLabelParams[ProjectType.PROTOTYPE_TESTING].description
            }
            icon={projectTypesLabelParams[ProjectType.PROTOTYPE_TESTING].icon}
          />
        ),
        key: ProjectType.PROTOTYPE_TESTING,
        style: { padding: "8px 16px 16px 16px" },
      },
    ],
    [projectTypesLabelParams]
  );

  return { projectTypesItems };
};
