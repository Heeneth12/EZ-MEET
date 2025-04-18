// components/VideoChat.tsx
"use client";
import React from 'react';
import PeerVideo from './PeerVideo';
import { useVideoChat } from '@/app/meet/page';

const VideoChat: React.FC = () => {
  const {
    roomId,
    setRoomId,
    userName,
    setUserName,
    joined,
    peers,
    userVideoRef,
    debug,
    joinRoom,
    leaveRoom
  } = useVideoChat();
  
  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">WebRTC Video Chat</h1>
      
      {!joined ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Room ID</label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter room ID"
            />
          </div>
          
          <button
            onClick={joinRoom}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl">Room: {roomId}</h2>
            <button
              onClick={leaveRoom}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Leave Room
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* My video */}
            <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
              <video
                ref={userVideoRef}
                muted
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                You ({userName})
              </div>
            </div>
            
            {/* Other participants' videos */}
            {peers.map((peerObj) => (
              <PeerVideo 
                key={peerObj.peerID} 
                peer={peerObj.peer} 
                userName={peerObj.userName} 
              />
            ))}
          </div>
          
          {/* Debug info */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
            <div className="max-h-40 overflow-auto text-sm">
              {debug.map((msg, i) => (
                <div key={i} className="mb-1">
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChat;