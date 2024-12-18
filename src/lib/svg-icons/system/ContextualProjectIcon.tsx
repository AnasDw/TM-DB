import React from "react";

import Icon from "@ant-design/icons";
import { colors } from "../../theme/colors";
import {
  CustomIconComponentProps,
  sizeMap,
} from "../utilities/SharedIconProps";

const ContextualProjectSVG = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 56 56"
  >
    <path
      fill="#6759DF"
      d="M10 37.526c0-.903.234-1.679.701-2.328.467-.65 1.095-1.168 1.884-1.557a32.66 32.66 0 015.024-1.92c1.663-.478 3.664-.716 6.002-.716 2.338 0 4.339.238 6.002.716a32.633 32.633 0 015.024 1.92c.788.389 1.416.908 1.884 1.557.467.65.701 1.425.701 2.328v1.182c0 .495-.194.956-.582 1.381a1.868 1.868 0 01-1.437.638H12.019c-.57 0-1.05-.194-1.438-.582-.387-.388-.581-.867-.581-1.437v-1.182zm34.551 3.2h-3.874c.132-.308.238-.634.316-.977a4.64 4.64 0 00.118-1.041v-1.272a7.6 7.6 0 00-.684-3.19 7.371 7.371 0 00-1.94-2.576c.954.195 1.874.464 2.759.81.884.345 1.76.733 2.625 1.164.842.424 1.503.967 1.982 1.627.478.661.717 1.383.717 2.165v1.272c0 .57-.194 1.05-.581 1.437-.388.388-.867.582-1.438.582zm-20.94-14.06c-1.604 0-2.977-.57-4.12-1.713-1.142-1.142-1.713-2.515-1.713-4.12 0-1.604.571-2.977 1.713-4.12C20.634 15.572 22.007 15 23.611 15s2.977.571 4.12 1.713c1.142 1.143 1.713 2.516 1.713 4.12 0 1.605-.57 2.978-1.713 4.12-1.143 1.143-2.516 1.714-4.12 1.714zm14.135-5.833c0 1.605-.571 2.978-1.714 4.12-1.142 1.143-2.515 1.714-4.12 1.714-.082 0-.187-.01-.314-.028a2.78 2.78 0 01-.314-.062 9.066 9.066 0 002.05-5.748c0-1.059-.186-2.07-.556-3.035a11.205 11.205 0 00-1.494-2.704c.105-.037.21-.062.314-.073.105-.011.21-.017.314-.017 1.605 0 2.978.571 4.12 1.713 1.143 1.143 1.714 2.516 1.714 4.12zm-25.802 17.95h23.334v-1.257c0-.456-.114-.855-.342-1.197-.229-.341-.638-.668-1.229-.98a20.52 20.52 0 00-4.588-1.781c-1.608-.413-3.444-.619-5.508-.619s-3.9.206-5.508.619a20.519 20.519 0 00-4.588 1.782c-.591.311-1 .638-1.229.98-.228.34-.342.74-.342 1.196v1.256zm11.667-14.06c1.07 0 1.985-.382 2.747-1.143.761-.762 1.142-1.677 1.142-2.747 0-1.07-.38-1.985-1.142-2.746-.762-.762-1.677-1.143-2.747-1.143-1.07 0-1.985.381-2.746 1.143-.762.761-1.143 1.677-1.143 2.746 0 1.07.381 1.985 1.143 2.747.761.761 1.677 1.142 2.746 1.142z"
    ></path>
  </svg>
);

export const ContextualProjectIcon: React.FC<
  Partial<CustomIconComponentProps>
> = ({ iconSize = "large", ...props }) => {
  return (
    <Icon
      style={{
        backgroundColor: colors.purple[0],
        borderRadius: ".25rem",
      }}
      component={() => (
        <ContextualProjectSVG
          size={sizeMap[iconSize as keyof typeof sizeMap]}
        />
      )}
      {...props}
    />
  );
};
