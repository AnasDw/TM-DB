import React, { PropsWithChildren, useEffect, useState } from "react";

import { Progress } from "antd";
import { BoldTypography, LoadingContainer } from "./styled";

interface LoadingProps {
  text?: string;
  size?: number;
  loadingTime?: number;
}

const Loading = ({
  text,
  children,
  size = 224,
  loadingTime = 3000,
}: PropsWithChildren<LoadingProps>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const totalTime = loadingTime;

    const animate = (timestamp: number) => {
      const currentTime = timestamp - startTime;
      const newProgress = Math.min((currentTime / totalTime) * 100, 100);

      setProgress(newProgress);

      if (currentTime < totalTime) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [loadingTime]);

  if (children) {
    return (
      <LoadingContainer>
        <Progress
          type="circle"
          percent={progress}
          strokeWidth={3}
          format={() => children}
          size={size}
        />
      </LoadingContainer>
    );
  }

  return (
    <LoadingContainer>
      <Progress
        type="circle"
        percent={progress}
        showInfo={false}
        size={size}
        strokeWidth={3}
      />
      <BoldTypography style={{ marginTop: 24 }}>{text}</BoldTypography>
    </LoadingContainer>
  );
};

export default Loading;
