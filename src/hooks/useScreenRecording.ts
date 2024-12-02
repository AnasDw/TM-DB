import { useCallback } from "react";
import bytes from "bytes";
import { atom, useAtom } from "jotai";
import { last } from "lodash";
import { logger } from "../logger/logger";

interface ChunkWithTimestamp {
  blob: Blob;
  timestamp: number;
}

const isScreenRecordingAtom = atom(false);
const chunksAtom = atom<ChunkWithTimestamp[]>([]);
const streamAtom = atom<MediaStream | null>(null);
const mediaRecorderAtom = atom<MediaRecorder | null>(null);

const BLOB_STORE_INERVAL_MS = 2_500;

export const useScreenRecording = () => {
  const [isScreenRecording, setIsScreenRecording] = useAtom(
    isScreenRecordingAtom
  );
  const [mediaRecorder, setMediaRecorder] = useAtom(mediaRecorderAtom);
  const [chunks, setChunks] = useAtom(chunksAtom);
  const [stream, setStream] = useAtom(streamAtom);

  const stopRecordingOf = useCallback(
    (recorder: MediaRecorder | null, mediaStream: MediaStream | null) => {
      if (recorder) {
        recorder.stop();
        setIsScreenRecording(false);
        logger.info("Screen recording stopped");

        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
      }
    },
    [setIsScreenRecording, setStream]
  );

  const stopRecording = useCallback(() => {
    stopRecordingOf(mediaRecorder, stream);
  }, [mediaRecorder, stopRecordingOf, stream]);

  const startRecording = useCallback(async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        // @ts-expect-error
        preferCurrentTab: true,
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const combinedStream = new MediaStream([
        ...displayStream.getTracks(),
        ...audioStream.getTracks(),
      ]);

      setStream(combinedStream);

      const newMediaRecorder = new MediaRecorder(combinedStream);

      newMediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const timestamp = Date.now();

          setChunks((prevChunks) => {
            if (event.data.size > bytes("5MB")) {
              const timeSinceLastChunk =
                prevChunks.length > 0
                  ? timestamp - last(prevChunks)!.timestamp
                  : -1;

              logger.warn(
                `Screen recording chunk larger than expected. Chunk size: ${event.data.size}, Time since last chunk: ${timeSinceLastChunk}`
              );
            }

            return [...prevChunks, { blob: event.data, timestamp }];
          });
        }
      };

      newMediaRecorder.onstop = () => {
        setChunks([]);
        combinedStream.getTracks().forEach((track) => track.stop());
      };

      newMediaRecorder.start(BLOB_STORE_INERVAL_MS);
      setMediaRecorder(newMediaRecorder);
      setIsScreenRecording(true);
      logger.info("Screen recording started");

      const videoTrack = displayStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          stopRecordingOf(newMediaRecorder, combinedStream);
        };
      }
    } catch (error) {
      logger.error("Error starting screen recording:", {}, error as any);
    }
  }, [
    setChunks,
    setIsScreenRecording,
    setMediaRecorder,
    setStream,
    stopRecordingOf,
  ]);

  const resetChunks = useCallback(() => {
    setChunks([]);
  }, [setChunks]);

  return {
    isScreenRecording,
    startRecording,
    stopRecording,
    resetChunks,
    chunks,
  };
};
