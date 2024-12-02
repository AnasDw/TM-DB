import { IconTypeEnum } from "../notification/enum";
import { openNotificationWithIcon } from "../notification/openNotificationWithIcon";

export const useClipboard = () => {
  const copyToClipboard = ({
    text,
    description,
  }: {
    text: string;
    description: string;
  }) => {
    navigator.clipboard.writeText(text).then(() => {
      openNotificationWithIcon(IconTypeEnum.Success, { description });
    });
  };

  return { copyToClipboard };
};
