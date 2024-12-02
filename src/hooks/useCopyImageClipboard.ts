import { useRef, useState } from "react";
import { IconTypeEnum } from "../notification/enum";
import { openNotificationWithIcon } from "../notification/openNotificationWithIcon";

const useCopyImageClipboard = () => {
  const [isCopyingImage, setIsCopyingImage] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const copyImageToClipboard = async () => {
    try {
      if (!containerRef.current) return;

      setIsCopyingImage(true);

      // eslint-disable-next-line import/no-extraneous-dependencies
      const html2canvas = (await import("html2canvas")).default;

      const style = document.createElement("style");
      style.textContent =
        "body > div:last-child img { display: inline-block; }";

      document.head.appendChild(style);

      const canvas = await html2canvas(containerRef.current, {
        useCORS: true,
        scale: 2,
        ignoreElements: (node) => {
          if (node instanceof HTMLElement) {
            return node.hasAttribute("data-ignore-capture");
          }
          return false;
        },
      });

      document.head.removeChild(style);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Failed to convert the canvas to an image");
        }

        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        openNotificationWithIcon(IconTypeEnum.Success, {
          description: "Image successfully copied to clipboard",
        });
      });
    } catch (e: unknown) {
      openNotificationWithIcon(IconTypeEnum.Error, {
        description: "Failed to copy the image to the clipboard",
      });
    } finally {
      setIsCopyingImage(false);
    }
  };

  return { containerRef, copyImageToClipboard, isCopyingImage };
};

export default useCopyImageClipboard;
