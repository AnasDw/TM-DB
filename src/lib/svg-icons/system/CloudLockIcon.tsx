import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const CloudLockSVG = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={17}
      height={17}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M.748.707h16v16h-16z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1C1842"
        d="M5.081 13.707c-.921 0-1.707-.32-2.357-.959-.65-.639-.976-1.42-.976-2.343 0-.829.266-1.557.8-2.186.532-.628 1.193-1 1.982-1.117a4.165 4.165 0 0 1 1.503-2.445 4.213 4.213 0 0 1 2.715-.95c.982 0 1.85.284 2.601.853a4.268 4.268 0 0 1 1.543 2.192.4.4 0 0 1-.053.372.56.56 0 0 1-.292.213.506.506 0 0 1-.365-.031c-.126-.057-.22-.17-.28-.341a3.328 3.328 0 0 0-1.197-1.623 3.2 3.2 0 0 0-1.957-.635c-.922 0-1.708.325-2.358.975a3.213 3.213 0 0 0-.975 2.358h-.346c-.632 0-1.177.228-1.634.684a2.243 2.243 0 0 0-.687 1.65c0 .644.228 1.194.683 1.65a2.248 2.248 0 0 0 1.65.683h4.302c.141 0 .26.048.356.144a.484.484 0 0 1 .144.356c0 .142-.048.26-.144.356a.484.484 0 0 1-.356.144H5.08Zm6.866 0a.583.583 0 0 1-.43-.173.583.583 0 0 1-.173-.43v-1.903c0-.172.062-.315.185-.427a.643.643 0 0 1 .45-.17v-.666c0-.34.121-.632.364-.874.242-.242.533-.363.874-.363.34 0 .63.12.87.363.24.242.36.534.36.874v.666c.176 0 .326.057.449.17a.553.553 0 0 1 .185.427v1.903c0 .171-.057.314-.173.43a.582.582 0 0 1-.43.173h-2.531Zm.622-3.103h1.288v-.666a.637.637 0 0 0-.179-.466.62.62 0 0 0-.462-.182.63.63 0 0 0-.465.182.63.63 0 0 0-.182.466v.666Z"
      />
    </g>
  </svg>
);

export const CloudLockIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props
) => <Icon component={CloudLockSVG} {...props} />;
