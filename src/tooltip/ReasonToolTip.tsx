import { PropsWithChildren } from "react";

import { Tooltip, TooltipProps } from "antd";

import { colors } from "../lib/theme/colors";

export const PurpleToolTip: React.FC<PropsWithChildren<TooltipProps>> = ({
  children,
  ...props
}) => {
  return (
    <Tooltip
      {...props}
      color={colors.purple[1]}
      overlayInnerStyle={{ color: colors.grey[6] }}
    >
      {children}
    </Tooltip>
  );
};
