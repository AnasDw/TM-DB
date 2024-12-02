import { CloseOutlined } from "@ant-design/icons";
import { App, Button, Row, Typography } from "antd";

import { NotificationPlacement } from "antd/es/notification/interface";
import { colors } from "../lib/theme/colors";

interface UseHorizontalNotification {
  notificationKey: React.Key;
  title: string;
  okButtonText: string;
  closeButtonText: string;
  onOkClick: () => void;
  placement?: NotificationPlacement;
  duration?: number;
}

export const useHorizontalNotification = ({
  notificationKey,
  title,
  okButtonText,
  onOkClick,
  closeButtonText,
  placement = "bottom",
  duration = 0,
}: UseHorizontalNotification) => {
  const { notification } = App.useApp();

  const closeNotification = () => {
    notification.destroy(notificationKey);
  };

  const openNotification = () =>
    notification.open({
      placement,
      duration,
      closeIcon: <CloseOutlined style={{ color: "#fff" }} />,
      key: notificationKey,
      message: (
        <Row
          justify="space-between"
          align="middle"
          style={{
            color: "#fff",
            width: "100%",
            paddingRight: "1rem",
            alignItems: "center",
          }}
        >
          <Typography style={{ color: "#fff" }}>{title}</Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Button onClick={() => closeNotification()}>
              {closeButtonText}
            </Button>
            <Button type="primary" onClick={onOkClick}>
              {okButtonText}
            </Button>
          </div>
        </Row>
      ),
      style: {
        backgroundColor: colors.grey[6],
        width: "100vw",
        color: "#fff",
        padding: "1rem 1rem 0.5rem 1rem",
        borderRadius: "0.5rem",
      },
    });

  return { openNotification, closeNotification };
};
