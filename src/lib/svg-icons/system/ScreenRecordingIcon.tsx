import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const ScreenRecordingSVG: React.FC = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    {...props}
  >
    <defs>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAAGklEQVQokWP8/7vzJgMZgIkcTaMaRzUOJY0AoCwDeIVSH2QAAAAASUVORK5CYII="
        id="image7"
        width="14"
        height="14"
      ></image>

      <g id="surface6" clipPath="url(#clip1)">
        <path
          fill="#1C1B1F"
          d="M6.496 6.305H7.66v.648q0 .09.082.125c.051.024.102.012.145-.035l.988-.988a.26.26 0 0 0 .082-.188.26.26 0 0 0-.082-.187l-.988-.989q-.066-.07-.145-.035a.124.124 0 0 0-.082.125v.649H6.496q-.667 0-1.137.468a1.55 1.55 0 0 0-.468 1.137v.727a.427.427 0 0 0 .437.437.427.427 0 0 0 .438-.437v-.727q-.001-.304.214-.52.211-.21.516-.21M1.246 11.8a.427.427 0 0 1-.437-.438.427.427 0 0 1 .438-.437h11.507a.427.427 0 0 1 .437.437.427.427 0 0 1-.437.438Zm1.266-1.457q-.44 0-.746-.309a1 1 0 0 1-.309-.746V3.23q0-.439.309-.746.305-.31.746-.308h8.976q.44-.001.746.308.31.307.309.746v6.06q0 .44-.309.745a1 1 0 0 1-.746.309Zm0-.875h8.976c.043 0 .086-.02.121-.059a.16.16 0 0 0 .059-.12V3.23a.16.16 0 0 0-.059-.12.16.16 0 0 0-.12-.06H2.511a.16.16 0 0 0-.121.06.16.16 0 0 0-.059.12v6.06c0 .042.02.085.059.12.035.04.078.059.12.059m0 0"
        ></path>
      </g>
    </defs>
    <use xlinkHref="#surface6" id="surface1" mask="url(#mask0)"></use>
  </svg>
);

export const ScreenRecordingIcon: React.FC<
  Partial<CustomIconComponentProps>
> = (props) => <Icon component={ScreenRecordingSVG} {...props} />;
