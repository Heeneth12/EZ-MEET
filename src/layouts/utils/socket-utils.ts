// utils/socket-utils.ts
import { Socket, io } from "socket.io-client";
import { User, UserJoinedPayload, ReturnedSignalPayload } from "../models/video-chat.types";
import Peer from "simple-peer";

const SOCKET_SERVER_URL = "http://localhost:9000"; // Replace with your server URL

export const createSocketConnection = (): Socket => {
  return io(SOCKET_SERVER_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
  });
};

export const setupSocketEvents = (
  socket: Socket,
  mediaStream: MediaStream,
  userId: string,
  userName: string,
  createPeerCallback: (userToSignal: string, callerId: string, stream: MediaStream) => Peer.Instance,
  addPeerCallback: (incomingSignal: Peer.SignalData, callerId: string, stream: MediaStream) => Peer.Instance,
  onRoomUsers: (users: User[]) => void,
  onUserJoined: (payload: UserJoinedPayload) => void,
  onReturnedSignal: (payload: ReturnedSignalPayload) => void,
  onUserLeft: (userId: string) => void,
  onError: (message: string) => void
) => {
  socket.on("connect_error", (err: any) => {
    console.error("Connection error:", err);
    onError("Unable to connect to meeting server. Please try again later.");
  });

  socket.on("room-users", (users: User[]) => {
    onRoomUsers(users);
  });

  socket.on("user-joined", (payload: UserJoinedPayload) => {
    onUserJoined(payload);
  });

  socket.on("receiving-returned-signal", (payload: ReturnedSignalPayload) => {
    onReturnedSignal(payload);
  });

  socket.on("user-left", (userId: string) => {
    onUserLeft(userId);
  });
};

export const joinRoom = (socket: Socket, roomId: string, userId: string, userName: string) => {
  console.log(`Joining room ${roomId} as ${userName} (${userId})`);
  socket.emit("join-room", {
    roomId,
    userId,
    userName,
  });
};

export const leaveRoom = (socket: Socket, roomId: string) => {
  socket.emit("leave-room", { roomId });
};

export const sendSignal = (socket: Socket, userToSignal: string, callerId: string, callerName: string, signal: Peer.SignalData) => {
  socket.emit("sending-signal", {
    userToSignal,
    callerId,
    callerName,
    signal,
  });
};

export const returnSignal = (socket: Socket, signal: Peer.SignalData, callerId: string) => {
  socket.emit("returning-signal", {
    signal,
    callerId,
  });
};