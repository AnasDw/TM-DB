import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const LinkOutlinedSVG = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#1C1842"
      d="M15 5.515a3.402 3.402 0 01-1 2.313L11.83 10a3.392 3.392 0 01-2.415 1h-.003a3.413 3.413 0 01-3.41-3.51.5.5 0 111 .028 2.414 2.414 0 004.117 1.775l2.172-2.172a2.414 2.414 0 00-3.414-3.414l-.688.687a.5.5 0 01-.706-.707l.687-.687A3.415 3.415 0 0115 5.515zm-8.187 6.09l-.688.687a2.4 2.4 0 01-1.712.709A2.415 2.415 0 012.707 8.88l2.168-2.172A2.414 2.414 0 019 8.483a.5.5 0 101 .028A3.429 3.429 0 009 6a3.416 3.416 0 00-4.829 0l-2.17 2.172A3.414 3.414 0 006.824 13l.688-.688a.5.5 0 00-.7-.708z"
    ></path>
  </svg>
);

export const LinkOutlinedIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props
) => <Icon component={LinkOutlinedSVG} {...props} />;
