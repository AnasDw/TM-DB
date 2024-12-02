import React, { ReactElement } from "react";
import { Flex, Typography } from "antd";
import { noop } from "lodash";

type ProjectTypeItemProps = {
  onClick?: VoidFunction;
  title: string;
  description: string;
  icon?: ReactElement;
};

export const ProjectTypeItem: React.FC<ProjectTypeItemProps> = ({
  onClick = noop,
  title,
  description,
  icon,
}) => (
  <Flex
    gap={12}
    onClick={onClick}
    style={{ maxWidth: "365px" }}
    justify="center"
    align="center"
  >
    {icon ? <>{icon}</> : null}
    <Flex vertical gap={4} style={{ flexBasis: "80%" }}>
      <Typography.Text style={{ fontWeight: 500 }}>{title}</Typography.Text>
      <Typography.Text style={{ fontSize: 12 }}>{description}</Typography.Text>
    </Flex>
  </Flex>
);
