import React, { useRef } from "react";
import {
  BoldOutlined,
  ItalicOutlined,
  LinkOutlined,
  StarOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Typography } from "antd";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { colors } from "../lib/theme/colors";

interface RichTextEditorProps {
  value: string;
  onChange: (htmlValue: string) => void;
  readOnly?: boolean;
}

export const STAR_SEPARATOR = "☆";

const insertSeparator = (quillRef: React.MutableRefObject<any>) => {
  const quill = quillRef.current?.getEditor?.() || quillRef.current?.editor;

  if (!quill) return;

  const cursorPosition = quill.getSelection()?.index || 0;

  quill.insertText(cursorPosition + 1, `\n${STAR_SEPARATOR}\n`);
};

const CustomToolbar = ({
  onInsertSeparator,
}: {
  onInsertSeparator: () => void;
}) => (
  <Flex id="toolbar" style={{ padding: "8px 16px" }} gap={8} align="flex-end">
    <Button
      style={{ color: colors.grey[3] }}
      type="text"
      className="ql-bold"
      icon={<BoldOutlined />}
    />
    <Button
      style={{ color: colors.grey[3] }}
      type="text"
      className="ql-italic"
      icon={<ItalicOutlined />}
    />
    <Button
      style={{ color: colors.grey[3] }}
      type="text"
      className="ql-underline"
      icon={<UnderlineOutlined />}
    />
    <Divider type={"vertical"} style={{ fontSize: "2rem" }} />
    <Button
      style={{ color: colors.grey[3] }}
      type="text"
      className="ql-link"
      icon={<LinkOutlined />}
    />
    <Button
      style={{ color: colors.grey[3] }}
      type="text"
      onClick={onInsertSeparator}
      icon={<StarOutlined />}
    />
  </Flex>
);

const StyledTypography = styled(Typography)`
  p {
    margin-bottom: 0;
  }
`;

class CustomReactQuill extends ReactQuill {
  renderEditingArea(): JSX.Element {
    const { children, preserveWhitespace } = this.props;
    const { generation } = this.state;

    const properties = {
      key: generation,
      ref: (instance: React.ReactInstance | null) => {
        this.editingArea = instance;
      },
    };

    if (React.Children.count(children)) {
      return React.cloneElement(React.Children.only(children)!, properties);
    }

    return (
      <StyledTypography style={{ height: "100%", overflow: "auto" }}>
        {preserveWhitespace ? <pre {...properties} /> : <div {...properties} />}
      </StyledTypography>
    );
  }
}

const StyledCustomReactQuill = styled(CustomReactQuill)`
  height: 100%;
  flex-grow: 1;
  overflow: scroll;

  .ql-clipboard {
    left: -100000px;
    height: 0;
    visibility: hidden;
  }

  .ql-container {
    height: 100%;
  }

  .ql-editor {
    height: 100%;
    outline: none;
    overflow-y: auto;
    padding: 12px 15px;
  }
`;

export const RichTextEditor = ({
  value,
  onChange,
  readOnly = false,
}: RichTextEditorProps) => {
  const quillRef = useRef<any>(null);

  const handleInsertSeparator = () => {
    insertSeparator(quillRef);
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    clipboard: {
      container: "",
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "blockquote",
    "link",
    "color",
  ];

  return (
    <Flex
      vertical
      style={{
        border: `1px solid ${colors.grey[0]}`,
        borderRadius: 4,
        flexGrow: 1,
        height: "100%",
        maxHeight: "100%",
        overflow: "hidden",
      }}
    >
      <CustomToolbar onInsertSeparator={handleInsertSeparator} />
      <Divider style={{ margin: 0 }} />

      <StyledCustomReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder="Start typing instructions here..."
        modules={modules}
        formats={formats}
        theme=""
      />
    </Flex>
  );
};
