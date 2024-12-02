import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const ThemeNoRelevantDataSVG = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="128"
    height="128"
    fill="none"
    fontSize={"128px"}
    viewBox="0 0 128 128"
    {...props}
  >
    <path fill="#fff" d="M0 0H128V128H0z"></path>
    <path
      fill="#E8E8EC"
      d="M11 18.5a1.5 1.5 0 013 0V70h-3V18.5zM19 42.5a1.5 1.5 0 013 0V71h-3V42.5zM27 61.5a1.5 1.5 0 013 0V70h-3v-8.5zM35 24.5a1.5 1.5 0 013 0V71h-3V24.5zM43 40.5a1.5 1.5 0 013 0V71h-3V40.5zM67 40.5a1.5 1.5 0 013 0V71h-3V40.5zM91 40.5a1.5 1.5 0 013 0V71h-3V40.5zM51 50.5a1.5 1.5 0 013 0V71h-3V50.5zM75 50.5a1.5 1.5 0 013 0V71h-3V50.5zM99 50.5a1.5 1.5 0 013 0V71h-3V50.5zM59 40.5a1.5 1.5 0 013 0V71h-3V40.5zM83 40.5a1.5 1.5 0 013 0V71h-3V40.5zM107 40.5a1.5 1.5 0 013 0V71h-3V40.5zM113 40.5a1.5 1.5 0 013 0V71h-3V40.5zM10 95.369c0-.804.651-1.455 1.454-1.455h104.728a1.454 1.454 0 010 2.91H11.454A1.455 1.455 0 0110 95.368zM10 100.818c0-1.004.814-1.818 1.818-1.818h104a1.818 1.818 0 010 3.636h-104A1.818 1.818 0 0110 100.818z"
    ></path>
    <path
      fill="#C9C8D2"
      d="M10 110.306c0-.877.71-1.587 1.587-1.587h15.867a1.587 1.587 0 110 3.173H11.587c-.877 0-1.587-.71-1.587-1.586zM10.09 87.867a1.5 1.5 0 011.5-1.5h10a1.5 1.5 0 010 3h-10a1.5 1.5 0 01-1.5-1.5zM38.09 87.867a1.5 1.5 0 011.5-1.5h10a1.5 1.5 0 010 3h-10a1.5 1.5 0 01-1.5-1.5zM31.158 110.306c0-.877.71-1.587 1.587-1.587h15.867a1.587 1.587 0 110 3.173H32.745c-.877 0-1.587-.71-1.587-1.586zM24.09 87.867a1.5 1.5 0 011.5-1.5h10a1.5 1.5 0 010 3h-10a1.5 1.5 0 01-1.5-1.5zM52.09 87.867a1.5 1.5 0 011.5-1.5h10a1.5 1.5 0 010 3h-10a1.5 1.5 0 01-1.5-1.5zM98 110.306c0-.877.71-1.587 1.587-1.587h15.868a1.586 1.586 0 010 3.173H99.587c-.877 0-1.587-.71-1.587-1.586z"
    ></path>
  </svg>
);

export const ThemeNoRelevantDataIcon: React.FC<
  Partial<CustomIconComponentProps>
> = (props) => <Icon component={ThemeNoRelevantDataSVG} {...props} />;
