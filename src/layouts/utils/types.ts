import Peer from 'simple-peer';

export interface User {
  id: string;
  name: string;
}

export interface PeerConnection {
  peerID: string;
  peer: Peer.Instance;
  userName: string;
}

export interface SignalData {
  to: string;
  signal: Peer.SignalData;
}

export interface JoinRoomData {
  roomId: string;
  userName: string;
}
