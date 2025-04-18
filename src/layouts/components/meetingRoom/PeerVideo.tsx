// components/PeerVideo.tsx
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

interface PeerVideoProps {
  peer: Peer.Instance;
  userName: string;
}

const PeerVideo: React.FC<PeerVideoProps> = ({ peer, userName }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  
  useEffect(() => {
    if (!peer) return;
    
    // Stream handler
    const handleStream = (stream: MediaStream) => {
      console.log(`PeerVideo: Received stream from ${userName}`);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    
    // Connect handler
    const handleConnect = () => {
      console.log(`PeerVideo: Connected to ${userName}`);
      setConnected(true);
    };
    
    // Close handler
    const handleClose = () => {
      console.log(`PeerVideo: Connection closed with ${userName}`);
      setConnected(false);
    };
    
    // Error handler
    const handleError = (err: Error) => {
      console.error(`PeerVideo: Error with ${userName}:`, err);
    };
    
    // Set up event listeners
    peer.on('stream', handleStream);
    peer.on('connect', handleConnect);
    peer.on('close', handleClose);
    peer.on('error', handleError);
    
    // Cleanup function
    return () => {
      // Check if peer is not destroyed and has the off method
      if (peer && typeof peer.off === 'function') {
        peer.off('stream', handleStream);
        peer.off('connect', handleConnect);
        peer.off('close', handleClose);
        peer.off('error', handleError);
      }
    };
  }, [peer, userName]);
  
  return (
    <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="w-full h-full object-cover" 
      />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        {userName}
        {!connected && <span className="ml-2 text-yellow-400">(Connecting...)</span>}
      </div>
    </div>
  );
};

export default PeerVideo;