// utils/media-utils.ts
import { RefObject } from "react";
import { PeerObject, RTCPeerConnectionSender } from "../models/video-chat.types";

export const getMediaStream = async () => {
  try {
    const constraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "user",
      },
      audio: true,
    };
    
    console.log("Requesting media with constraints:", constraints);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log("Got media stream with tracks:", 
      stream.getTracks().map(t => `${t.kind}: ${t.label} (enabled: ${t.enabled})`));
    
    return stream;
  } catch (err) {
    console.error("Failed to get media stream:", err);
    throw err;
  }
};

export const getScreenShareStream = async (): Promise<MediaStream> => {
  return navigator.mediaDevices.getDisplayMedia({
    audio: false,
  }) as Promise<MediaStream>;
};

export const setupMediaHandlers = (
  streamRef: RefObject<MediaStream | null>,
  screenStreamRef: RefObject<MediaStream | null>,
  myVideoRef: RefObject<HTMLVideoElement>,
  peersRef: RefObject<PeerObject[]>,
  setIsMuted: (isMuted: boolean) => void,
  setIsVideoOff: (isVideoOff: boolean) => void,
  setIsScreenSharing: (isScreenSharing: boolean) => void,
  setScreenStream: (stream: MediaStream | null) => void,
  setErrorMsg: (msg: string) => void
) => {
  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const enabled = !audioTracks[0].enabled;
        audioTracks[0].enabled = enabled;
        setIsMuted(!enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const enabled = !videoTracks[0].enabled;
        videoTracks[0].enabled = enabled;
        setIsVideoOff(!enabled);
      }
    }
  };

  const shareScreen = async () => {
    if (screenStreamRef.current) {
      stopScreenSharing();
      return;
    }

    try {
      const screenCaptureStream = await getScreenShareStream();
      setScreenStream(screenCaptureStream);

      // Replace the video track for all peers
      const videoTrack = screenCaptureStream.getVideoTracks()[0];

      if (peersRef.current) {
        peersRef.current.forEach(({ peer }) => {
          const sender = (peer as any)._pc
            .getSenders()
            .find(
              (s: RTCPeerConnectionSender) =>
                s.track && s.track.kind === "video"
            );

          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        });
      }

      // Replace local video display
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = screenCaptureStream;
      }

      // Handle when screen sharing stops
      videoTrack.onended = () => {
        stopScreenSharing();
      };

      setIsScreenSharing(true);
    } catch (err) {
      console.error("Error sharing screen:", err);
      setErrorMsg("Failed to share screen. Please try again.");
    }
  };

  const stopScreenSharing = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());

      // Switch back to camera for all peers
      if (streamRef.current) {
        const videoTrack = streamRef.current.getVideoTracks()[0];

        if (peersRef.current) {
          peersRef.current.forEach(({ peer }) => {
            const sender = (peer as any)._pc
              .getSenders()
              .find(
                (s: RTCPeerConnectionSender) =>
                  s.track && s.track.kind === "video"
              );

            if (sender && videoTrack) {
              sender.replaceTrack(videoTrack);
            }
          });
        }

        // Switch back camera for local video
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = streamRef.current;
        }
      }

      setScreenStream(null);
      setIsScreenSharing(false);
    }
  };

  return {
    toggleMute,
    toggleVideo,
    shareScreen,
    stopScreenSharing,
  };
};

export const cleanupMedia = (stream: MediaStream | null) => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};