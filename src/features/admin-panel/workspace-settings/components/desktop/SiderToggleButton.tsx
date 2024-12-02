import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

export const MinimizedButton = styled(Button)<{
  left: string;
  isMenuCollapsed: boolean;
}>`
  display: grid;
  place-content: center;
  position: absolute;
  z-index: 10;
  opacity: ${({ isMenuCollapsed }) => (isMenuCollapsed ? "1" : "0")};
  top: 50%;
  left: ${({ left }) => left};
  transition: opacity 0.2s ease-in-out, left 0.2s ease-in-out;
`;

export const SiderToggleButton: React.FC<{
  collapsed: boolean;
  onToggle: () => void;
}> = ({ collapsed, onToggle }) => {
  return (
    <MinimizedButton
      shape="circle"
      isMenuCollapsed={collapsed}
      onClick={onToggle}
      left={collapsed ? "4rem" : "13.75rem"}
      icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
    />
  );
};
