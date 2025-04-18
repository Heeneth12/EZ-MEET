import { io, Socket } from 'socket.io-client';
import { JoinRoomData, SignalData, User } from './types';

export const SERVER_URL = 'http://localhost:8000';

export const createSocketConnection = (): Socket => {
  return io(SERVER_URL);
};

export const joinRoom = (socket: Socket, data: JoinRoomData): void => {
  socket.emit('join-room', data);
};

export const leaveRoom = (socket: Socket): void => {
  socket.emit('leave-room');
};

export const sendSignal = (socket: Socket, data: SignalData): void => {
  socket.emit('signal', data);
};