import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
} from "react";

import { CloseOutlined } from "@ant-design/icons";
import { Tooltip, TooltipProps } from "antd";
import styled from "styled-components";

const CloseButton = styled(CloseOutlined)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
`;

export const DismissTooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  children,
  ...props
}) => {
  const containerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(true);

  const childWithProps = isValidElement(children)
    ? cloneElement(children as ReactElement, {
        onClick: () => setIsOpen(true),
        onMouseOver: () => setIsOpen(true),
        style: { cursor: "pointer" },
      })
    : children;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef}>
      <Tooltip
        open={isOpen}
        defaultOpen={true}
        {...props}
        overlayInnerStyle={{ fontSize: "0.75rem" }}
        title={
          <>
            <CloseButton onClick={handleClose} />
            {props.title}
          </>
        }
        getPopupContainer={() => containerRef.current!}
      >
        {childWithProps}
      </Tooltip>
    </div>
  );
};
