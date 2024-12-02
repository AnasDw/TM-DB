import { useEffect, useState } from "react";

const useScreenHeight = (isVisualViewportSupported?: boolean) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const updateViewportHeight = () => {
    // Log current viewport height for debugging
    setViewportHeight(window.visualViewport?.height || window.innerHeight);
  };

  useEffect(() => {
    // Event handler to update viewport height
    window.addEventListener("orientationchange", updateViewportHeight);

    // If the browser supports the VisualViewport API, add an event listener
    if (!isVisualViewportSupported) {
      window.visualViewport?.addEventListener("resize", updateViewportHeight);
      window.addEventListener("resize", updateViewportHeight);
    }

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("orientationchange", updateViewportHeight);

      // Remove VisualViewport event listener if it was added
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          updateViewportHeight
        );
      }
    };
  }, []);

  return { height: viewportHeight };
};

export default useScreenHeight;
