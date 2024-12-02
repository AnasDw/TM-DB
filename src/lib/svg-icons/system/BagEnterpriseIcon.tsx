import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const BagEnterpriseSVG = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <mask
      id="mask0_20510_5029"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <rect width="16" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_20510_5029)">
      <path
        d="M8.00033 10.1667C8.32421 10.1667 8.59966 10.0532 8.82666 9.82633C9.05355 9.59933 9.16699 9.32389 9.16699 9C9.16699 8.67611 9.05355 8.40067 8.82666 8.17367C8.59966 7.94678 8.32421 7.83333 8.00033 7.83333C7.67644 7.83333 7.40099 7.94678 7.17399 8.17367C6.9471 8.40067 6.83366 8.67611 6.83366 9C6.83366 9.32389 6.9471 9.59933 7.17399 9.82633C7.40099 10.0532 7.67644 10.1667 8.00033 10.1667ZM2.87216 13.6667C2.53538 13.6667 2.25033 13.55 2.01699 13.3167C1.78366 13.0833 1.66699 12.7983 1.66699 12.4615V5.5385C1.66699 5.20172 1.78366 4.91667 2.01699 4.68333C2.25033 4.45 2.53538 4.33333 2.87216 4.33333H5.66699V3.20517C5.66699 2.86839 5.78366 2.58333 6.01699 2.35C6.25033 2.11667 6.53538 2 6.87216 2H9.12849C9.46527 2 9.75033 2.11667 9.98366 2.35C10.217 2.58333 10.3337 2.86839 10.3337 3.20517V4.33333H13.1285C13.4653 4.33333 13.7503 4.45 13.9837 4.68333C14.217 4.91667 14.3337 5.20172 14.3337 5.5385V12.4615C14.3337 12.7983 14.217 13.0833 13.9837 13.3167C13.7503 13.55 13.4653 13.6667 13.1285 13.6667H2.87216ZM2.87216 12.6667H13.1285C13.1798 12.6667 13.2268 12.6453 13.2695 12.6025C13.3123 12.5598 13.3337 12.5128 13.3337 12.4615V5.5385C13.3337 5.48717 13.3123 5.44017 13.2695 5.3975C13.2268 5.35472 13.1798 5.33333 13.1285 5.33333H2.87216C2.82083 5.33333 2.77383 5.35472 2.73116 5.3975C2.68838 5.44017 2.66699 5.48717 2.66699 5.5385V12.4615C2.66699 12.5128 2.68838 12.5598 2.73116 12.6025C2.77383 12.6453 2.82083 12.6667 2.87216 12.6667ZM6.66699 4.33333H9.33366V3.20517C9.33366 3.15383 9.31227 3.10683 9.26949 3.06417C9.22683 3.02139 9.17983 3 9.12849 3H6.87216C6.82083 3 6.77383 3.02139 6.73116 3.06417C6.68838 3.10683 6.66699 3.15383 6.66699 3.20517V4.33333Z"
        fill="#1C1842"
      />
    </g>
  </svg>
);

export const BagEnterpriseIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props
) => <Icon component={BagEnterpriseSVG} {...props} />;