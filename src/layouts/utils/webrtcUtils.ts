// utils/webrtcUtils.ts
import Peer from 'simple-peer';
import { PeerConnection } from './types';

export const createPeer = (
  peerID: string, 
  stream: MediaStream, 
  onSignal: (signal: Peer.SignalData) => void,
  onStream: (stream: MediaStream) => void,
  onConnect: () => void,
  onError: (err: Error) => void
): Peer.Instance => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    }
  });
  
  peer.on('signal', signal => {
    onSignal(signal);
  });
  
  peer.on('stream', remoteStream => {
    onStream(remoteStream);
  });
  
  peer.on('error', err => {
    onError(err);
  });
  
  peer.on('connect', () => {
    onConnect();
  });
  
  return peer;
};

export const createReceivingPeer = (
  stream: MediaStream,
  onSignal: (signal: Peer.SignalData) => void,
  onStream: (stream: MediaStream) => void,
  onConnect: () => void,
  onError: (err: Error) => void
): Peer.Instance => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream
  });
  
  peer.on('signal', signal => {
    onSignal(signal);
  });
  
  peer.on('stream', remoteStream => {
    onStream(remoteStream);
  });
  
  peer.on('error', err => {
    onError(err);
  });
  
  peer.on('connect', () => {
    onConnect();
  });
  
  return peer;
};

export const stopMediaStream = (stream: MediaStream | null): void => {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
};

export const destroyPeers = (peers: Record<string, PeerConnection>): void => {
  Object.values(peers).forEach(peerObj => {
    if (peerObj && peerObj.peer) {
      peerObj.peer.destroy();
    }
  });
};