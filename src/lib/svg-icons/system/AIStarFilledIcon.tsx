import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const AIStarFilledSVG = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="m15.78 7.668-3.765-1.644a3.946 3.946 0 0 1-2.034-2.036L8.338.22a.365.365 0 0 0-.67 0L6.026 3.988a3.946 3.946 0 0 1-2.034 2.036L.22 7.67a.366.366 0 0 0 0 .67l3.837 1.696a3.946 3.946 0 0 1 2.024 2.045l1.59 3.697a.364.364 0 0 0 .67 0l1.641-3.763a3.946 3.946 0 0 1 2.034-2.036l3.765-1.644a.365.365 0 0 0 0-.67v.002Z"
    />
  </svg>
);

export const AIStarFilledIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props
) => <Icon component={AIStarFilledSVG} {...props} />;
