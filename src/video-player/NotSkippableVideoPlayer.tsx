import React, { useCallback, useEffect, useRef, useState } from "react";

import styled from "styled-components";

interface NonSkippableVideoPlayerInterface {
  onEnded: () => void;
  videoSrc: string;
  setIsWaitingForVideoResponse: (onFinish: boolean) => void;
}

const StyledVideo = styled.video`
  object-fit: inherit; /* Maintain aspect ratio and inherit the container width and height */
  max-height: 100%;
  margin: auto;
  width: 100%;
`;

export const NonSkippableVideoPlayer: React.FC<
  NonSkippableVideoPlayerInterface
> = ({ onEnded, videoSrc, setIsWaitingForVideoResponse }) => {
  const [supposedCurrentTime, setSupposedCurrentTime] = useState(0);
  const videoRef = useRef<any>(null);

  const handleVideoPlay = () => {
    const videoPlayer = videoRef.current;
    if (videoPlayer) {
      videoPlayer.play();
      setIsWaitingForVideoResponse(true);
    }
  };

  const handleVideoPause = () => {
    const videoPlayer = videoRef.current;
    if (videoPlayer) {
      videoPlayer.pause();
    }
  };

  const handleVideoTimeUpdate = () => {
    const videoPlayer = videoRef.current;
    if (videoPlayer) {
      if (!videoPlayer.seeking) {
        setSupposedCurrentTime(videoPlayer.currentTime);
      }
    }
  };

  const handleVideoSeeking = useCallback(() => {
    const videoPlayer = videoRef.current;

    if (videoPlayer) {
      // guard agains infinite recursion:
      // user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
      const delta = videoPlayer.currentTime - supposedCurrentTime;
      if (Math.abs(delta) > 0.01) {
        videoPlayer.currentTime = supposedCurrentTime;
      }
    }
  }, [supposedCurrentTime]);

  const handleOnEnded = () => {
    // reset state in order to allow for rewind
    onEnded();
    setSupposedCurrentTime(0);
  };

  useEffect(() => {
    const videoPlayer = videoRef.current;
    if (videoPlayer) {
      videoPlayer.addEventListener("play", handleVideoPlay);
      videoPlayer.addEventListener("pause", handleVideoPause);
      videoPlayer.addEventListener("timeupdate", handleVideoTimeUpdate);
      videoPlayer.addEventListener("seeking", handleVideoSeeking);
      videoPlayer.addEventListener("ended", handleOnEnded);
    }
    return () => {
      if (videoPlayer) {
        videoPlayer.removeEventListener("play", handleVideoPlay);
        videoPlayer.removeEventListener("pause", handleVideoPause);
        videoPlayer.removeEventListener("timeupdate", handleVideoTimeUpdate);
        videoPlayer.removeEventListener("seeking", handleVideoSeeking);
        videoPlayer.removeEventListener("ended", handleOnEnded);
      }
    };
  }, [handleVideoSeeking]);

  return (
    <>
      <StyledVideo
        ref={videoRef}
        controls
        controlsList="nodownload noremoteplayback foobar noplaybackrate"
      >
        <source src={videoSrc} />
        Your browser does not support the video tag.
      </StyledVideo>
    </>
  );
};
