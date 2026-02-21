import { useEffect, useRef, useState } from "react";

export type ScreenState =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "cancelled"
  | "stopped"
  | "error";

export type ScreenErrorType =
  | "permission-denied"
  | "user-cancelled"
  | "not-found"
  | "not-readable"
  | "security"
  | "overconstrained"
  | "unknown"
  | null;

export function useScreenShare() {
  const [state, setState] = useState<ScreenState>("idle");
  const [errorType, setErrorType] = useState<ScreenErrorType>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [resolution, setResolution] = useState<string>("");
  const [displaySurface, setDisplaySurface] = useState<string>("Unknown");
  const [showStopConfirm, setShowStopConfirm] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  streamRef.current = stream;

  const classifyError = (err: unknown): ScreenErrorType => {
    if (!(err instanceof Error)) return "unknown";

    switch (err.name) {
      case "NotAllowedError":
        return "permission-denied";
      case "AbortError":
        return "user-cancelled";
      case "NotFoundError":
        return "not-found";
      case "NotReadableError":
        return "not-readable";
      case "SecurityError":
        return "security";
      case "OverconstrainedError":
        return "overconstrained";
      default:
        return "unknown";
    }
  };

  const getErrorMessage = (type: ScreenErrorType): string => {
    switch (type) {
      case "permission-denied":
        return "Screen sharing permission was denied.";
      case "user-cancelled":
        return "Screen selection was cancelled by the user.";
      case "not-found":
        return "No screen or window source was found.";
      case "not-readable":
        return "Screen capture failed due to system or hardware restrictions.";
      case "security":
        return "Screen sharing requires a secure context (HTTPS or localhost).";
      case "overconstrained":
        return "Invalid media constraints configuration.";
      case "unknown":
      default:
        return "An unexpected error occurred while starting screen sharing.";
    }
  };

  const startScreenShare = async () => {
    try {
      cleanupTracks();
      setErrorType(null);
      setErrorMessage("");
      setState("requesting");

      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      const track = mediaStream.getVideoTracks()[0];
      const settings = track.getSettings();

      setResolution(`${settings.width ?? 0} x ${settings.height ?? 0}`);
      setDisplaySurface(
        (settings as MediaTrackSettings & { displaySurface?: string })
          .displaySurface || "Unknown",
      );

      setStream(mediaStream);
      setState("granted");

      // Detect browser UI stop (critical lifecycle requirement)
      track.onended = () => {
        forceStopScreenShare();
      };
    } catch (err) {
      const classified = classifyError(err);
      setErrorType(classified);
      setErrorMessage(getErrorMessage(classified));

      if (classified === "permission-denied") {
        setState("denied");
      } else if (classified === "user-cancelled") {
        setState("cancelled");
      } else {
        setState("error");
      }

      console.error("Screen share error:", err);
    }
  };

  const requestStop = () => {
    if (state === "granted") {
      setShowStopConfirm(true);
    }
  };

  const confirmStop = () => {
    forceStopScreenShare();
    setShowStopConfirm(false);
  };

  const cancelStop = () => {
    setShowStopConfirm(false);
  };

  const forceStopScreenShare = () => {
    cleanupTracks();

    setStream(null);
    setResolution(""); // clear resolution
    setDisplaySurface("Unknown"); // reset display type
    setState("stopped");

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const cleanupTracks = () => {
    const currentStream = streamRef.current ?? stream;
    if (currentStream) {
      currentStream.getTracks().forEach((track) => {
        if (track.readyState !== "ended") {
          track.stop();
        }
      });
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Cleanup on unmount (explicit requirement in task) — use streamRef so latest stream is always released
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return {
    state,
    errorType,
    errorMessage,
    resolution,
    displaySurface,
    videoRef,
    startScreenShare,
    requestStop,
    confirmStop,
    cancelStop,
    showStopConfirm,
  };
}
