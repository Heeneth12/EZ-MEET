// utils/peer-utils.ts
import Peer from "simple-peer";
import { Socket } from "socket.io-client";
import { sendSignal, returnSignal } from "./socket-utils";

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:global.stun.twilio.com:3478" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
  { urls: "stun:stun3.l.google.com:19302" },
  { urls: "stun:stun4.l.google.com:19302" },
  // Consider adding a TURN server for more reliable connections
];

export const createPeer = (
  socket: Socket,
  userToSignal: string,
  callerId: string,
  stream: MediaStream,
  callerName: string
): Peer.Instance => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
    config: {
      iceServers: ICE_SERVERS,
    },
  });

  peer.on("signal", (signal) => {
    sendSignal(socket, userToSignal, callerId, callerName, signal);
  });

  peer.on("error", (err) => {
    console.error("Peer connection error:", err);
  });

  // This is important - we need to log any ICE connection state changes
  (peer as any)._pc.oniceconnectionstatechange = () => {
    console.log("ICE connection state:", (peer as any)._pc.iceConnectionState);
  };

  return peer;
};

export const addPeer = (
  socket: Socket,
  incomingSignal: Peer.SignalData,
  callerId: string,
  stream: MediaStream
): Peer.Instance => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
    config: {
      iceServers: ICE_SERVERS,
    },
  });

  peer.on("signal", (signal) => {
    returnSignal(socket, signal, callerId);
  });

  peer.on("error", (err) => {
    console.error("Peer connection error:", err);
  });

  // Log ICE connection state changes
  (peer as any)._pc.oniceconnectionstatechange = () => {
    console.log("ICE connection state:", (peer as any)._pc.iceConnectionState);
  };

  peer.signal(incomingSignal);

  return peer;
};

export const replaceTrack = (
  peer: Peer.Instance,
  track: MediaStreamTrack
): void => {
  const sender = (peer as any)._pc
    .getSenders()
    .find(
      (s: { track: MediaStreamTrack | null; kind: string }) =>
        s.track && s.track.kind === track.kind
    );

  if (sender) {
    sender.replaceTrack(track);
  }
};