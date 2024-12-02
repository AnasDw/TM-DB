import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const TranslationSvg: React.FC = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#706D88"
      d="m8.148 13.564 3.12-7.144h1.093l3.119 7.144h-1.114l-.793-1.895h-3.518l-.793 1.895zm-5.525-1.828-.738-.654 3.482-3.096a8.3 8.3 0 0 1-1.152-1.29 8.7 8.7 0 0 1-.899-1.518H4.43q.303.564.737 1.128.435.563.938 1.026A9.3 9.3 0 0 0 7.517 5.71q.665-.954.94-1.775H1v-.932h4.592V2h1.05v1.003h4.593v.932H9.52q-.34 1.047-1.085 2.188-.746 1.142-1.592 1.883l1.728 1.57-.397.956-2.069-1.881zm7.769-.89h2.844l-1.422-3.39z"
    ></path>
  </svg>
);

export const TranslationIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props
) => <Icon component={TranslationSvg} {...props} />;
