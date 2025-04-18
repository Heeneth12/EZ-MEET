// types/video-chat.types.ts
import Peer from "simple-peer";

export interface PeerObject {
  id: string;
  name: string;
  peer: Peer.Instance;
}

export interface User {
  id: string;
  name: string;
}

export interface UserJoinedPayload {
  signal: Peer.SignalData;
  callerId: string;
  callerName: string;
}

export interface ReturnedSignalPayload {
  id: string;
  signal: Peer.SignalData;
}

export interface RTCPeerConnectionSender {
  track: MediaStreamTrack | null;
  kind: string;
  replaceTrack: (track: MediaStreamTrack) => Promise<void>;
}

export interface MediaHandlers {
  toggleMute: () => void;
  toggleVideo: () => void;
  shareScreen: () => Promise<void>;
  stopScreenSharing: () => void;
}