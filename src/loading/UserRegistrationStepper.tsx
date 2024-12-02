import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Flex, StepProps, Steps } from "antd";
import { useUserRegistrationLoaderLabels } from "./hooks";
import { BoldTypography, LoadingContainer } from "./styled";

type UserRegistrationStepperProps = {
  loadingDurationInMilliseconds?: number;
};

export const UserRegistrationStepper: React.FC<
  UserRegistrationStepperProps
> = ({ loadingDurationInMilliseconds = 5000 }) => {
  const [stepProgress, setStepProgress] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const { workspaceData, workspaceSetup, finishSetup } =
    useUserRegistrationLoaderLabels();

  const stepItems = useMemo<StepProps[]>(
    () => [
      { title: <BoldTypography>{workspaceSetup}</BoldTypography> },
      { title: <BoldTypography>{workspaceData}</BoldTypography> },
      { title: <BoldTypography>{finishSetup}</BoldTypography> },
    ],
    [finishSetup, workspaceData, workspaceSetup]
  );

  const findCurrentStep = useCallback((percent: number, stepsCount: number) => {
    const sectionSize = 100 / stepsCount;
    const section = Math.ceil(percent / sectionSize) - 1;
    return Math.min(section, stepsCount - 1);
  }, []);

  const findCurrentStepProgress = useCallback(
    (percent: number, stepsCount: number) => {
      const sectionSize = 100 / stepsCount;
      const sectionPartialPart = percent % sectionSize;
      return Math.ceil((sectionPartialPart / sectionSize) * 100);
    },
    []
  );

  useEffect(() => {
    const startTime = performance.now();
    const totalTime = loadingDurationInMilliseconds;

    const animate = (timestamp: number) => {
      const currentTime = timestamp - startTime;
      const newTotalProgress = Math.min((currentTime / totalTime) * 100, 100);

      setCurrentStepIndex(findCurrentStep(newTotalProgress, stepItems.length));
      setStepProgress(
        findCurrentStepProgress(newTotalProgress, stepItems.length)
      );

      if (currentTime < totalTime) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [
    loadingDurationInMilliseconds,
    stepItems.length,
    findCurrentStep,
    findCurrentStepProgress,
  ]);

  return (
    <LoadingContainer>
      <Flex justify="center" align="center">
        <Steps
          direction="vertical"
          current={currentStepIndex}
          percent={stepProgress}
          items={stepItems}
        />
      </Flex>
    </LoadingContainer>
  );
};
