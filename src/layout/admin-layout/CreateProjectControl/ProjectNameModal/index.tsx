import { useState } from "react";
import { Button, Flex, Input, Modal, Typography } from "antd";
import { isEmpty, noop } from "lodash";
import { colors } from "../../../../lib/theme/colors";
import { useProjectNameModalLabels } from "../hooks";

type ProjectNameModalProps = {
  isOpen?: boolean;
  onClose?: VoidFunction;
  onSubmit?: (name: string) => void;
};

export const ProjectNameModal: React.FC<ProjectNameModalProps> = ({
  isOpen = false,
  onClose = noop,
  onSubmit = noop,
}) => {
  const [pendingName, setPendingName] = useState("");
  const { title, inputLabel, inputPlaceholder, ctaLabel } =
    useProjectNameModalLabels();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPendingName(event.target.value);
  };

  const handleClick = () => {
    onSubmit(pendingName);
    onClose();
  };

  const isNameValid = !isEmpty(pendingName);

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={400}>
      <Flex vertical>
        <Typography.Title level={5} style={{ marginBottom: 16 }}>
          {title}
        </Typography.Title>
        <Typography.Text style={{ marginBottom: 8 }}>
          {inputLabel}
        </Typography.Text>
        <Input
          onChange={onChange}
          placeholder={inputPlaceholder}
          style={{ marginBottom: 24 }}
        />
        <Button
          type="primary"
          onClick={handleClick}
          disabled={!isNameValid}
          style={{
            backgroundColor: !isNameValid ? colors.grey[1] : undefined,
            color: !isNameValid ? "white" : undefined,
          }}
        >
          {ctaLabel}
        </Button>
      </Flex>
    </Modal>
  );
};
