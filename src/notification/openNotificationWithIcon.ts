import { notification } from "antd";
import { ArgsProps, IconType } from "antd/es/notification/interface";

export const openNotificationWithIcon = (
  type: IconType,
  props: Omit<ArgsProps, "message">
) => {
  notification[type]({
    message: "",
    ...props,
  });
};
