import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const FigmaAssetSVG = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    {...props}
    fill="none"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M7.999 1.334H5.665a2.333 2.333 0 0 0 0 4.667M8 1.334v4.667m0-4.667h2.333a2.334 2.334 0 0 1 0 4.667M7.999 6H5.665M8 6h2.333M7.999 6v4.666M5.665 6.001a2.333 2.333 0 1 0 0 4.666m4.667-4.666a2.333 2.333 0 1 0 0 4.666 2.333 2.333 0 0 0 0-4.666Zm-4.667 4.666A2.334 2.334 0 1 0 8 13.001v-2.334m-2.334 0H8"
    />
  </svg>
);

export const FigmaAssetIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props
) => <Icon component={FigmaAssetSVG} {...props} />;
