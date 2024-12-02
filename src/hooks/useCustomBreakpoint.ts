import { useEffect, useState } from "react";

import { Grid } from "antd";
import { isMobile } from "react-device-detect";

const { useBreakpoint } = Grid;

export const useCustomBreakpoint = () => {
  const screens = useBreakpoint();
  const [isBreakpointSupported, setIsBreakpointSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const element = document.querySelector("body");
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        setIsBreakpointSupported(
          parseFloat((computedStyle as any).zoom) === 0 || isMobile
        );
      }
    }
  }, []);

  return {
    extraSmallScreen: Boolean(
      (screens.xs || screens.sm) && !screens.md && window.innerHeight < 664
    ),
    smallScreen:
      isBreakpointSupported &&
      Boolean((screens.xs || screens.sm) && !screens.md),
    mediumScreen: Boolean(screens.md),
    largeScreen: Boolean(screens.lg),
    extraLargeScreen: Boolean(screens.xl),
    extraExtraLargeScreen: Boolean(screens.xxl),
  };
};
