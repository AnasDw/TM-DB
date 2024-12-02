import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useAtom } from "jotai";
import { noop } from "lodash";
import { projectDraftAtom } from "../../../../state/atoms";
import { ProjectType } from "../../../../utils/enums";
import { useCreateProjectDropdownLabels, useProjectTypeItems } from "../hooks";

type CreateProjectDropdownProps = {
  onItemClick?: (key: ProjectType) => void;
};

export const CreateProjectDropdown: React.FC<CreateProjectDropdownProps> = ({
  onItemClick = noop,
}) => {
  const [projectDraft, setProjectDraft] = useAtom(projectDraftAtom);
  const { projectTypesItems } = useProjectTypeItems();
  const { ctaLabel } = useCreateProjectDropdownLabels();

  const onItemClickWrapper: MenuProps["onClick"] = ({ key }) => {
    setProjectDraft({
      ...projectDraft,
      projectType: key as ProjectType,
    });

    onItemClick(key as ProjectType);
  };

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: projectTypesItems,
        onClick: onItemClickWrapper,
        style: { padding: 0, marginTop: 8 },
      }}
    >
      <Button type="primary" icon={<PlusOutlined />}>
        {ctaLabel}
      </Button>
    </Dropdown>
  );
};
