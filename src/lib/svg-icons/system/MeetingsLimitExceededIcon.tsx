import React from "react";
import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const MeetingsLimitExceededSVG = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      {...props}
      viewBox="0 0 16 16"
    >
      <g fill="#1C1842" fillRule="evenodd" clipRule="evenodd">
        <path d="M4.76 2.428a3.167 3.167 0 114.478 4.478A3.167 3.167 0 014.76 2.428zm2.239.072a2.167 2.167 0 100 4.333 2.167 2.167 0 000-4.333z"></path>
        <path d="M5.667 10.5A2.167 2.167 0 003.5 12.667V14a.5.5 0 01-1 0v-1.333A3.167 3.167 0 015.667 9.5H8a.5.5 0 010 1H5.667z"></path>
        <path d="M9.9 10.9a2.5 2.5 0 113.536 3.535A2.5 2.5 0 019.9 10.899zm1.768.267a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"></path>
        <path d="M13.352 10.98a.5.5 0 010 .707l-2.666 2.666a.5.5 0 11-.708-.707l2.667-2.667a.5.5 0 01.707 0z"></path>
      </g>
    </svg>
  );
};

export const MeetingsLimitExceededIcon: React.FC<
  Partial<CustomIconComponentProps>
> = (props) => <Icon component={MeetingsLimitExceededSVG} {...props} />;
