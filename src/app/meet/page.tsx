// components/VideoChat.tsx
"use client";
import React, { useState } from "react";
import { useVideoChat } from "../../layouts/hooks/useVideoChat";
import PeerVideo from "@/layouts/components/meetingRoom/PeerVideo";
import Header from "@/layouts/components/meetingRoom/Header";
import ControlBar from "@/layouts/components/meetingRoom/ControlBar";
import SideBar from "@/layouts/components/meetingRoom/SideBar";

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
    leaveRoom,
  } = useVideoChat();
  
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <Header />
      
      {!joined ? (
        <div className="flex items-center justify-center flex-grow">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Join Meeting</h2>
            
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Room ID</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room ID"
              />
            </div>
            
            <button
              onClick={joinRoom}
              disabled={!userName.trim() || !roomId.trim()}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-grow overflow-hidden">
          {/* Main content area */}
          <div className="flex-grow relative">
            {/* Meeting info bar */}
            <div className="absolute top-0 left-0 right-0 bg-white bg-opacity-90 z-10 px-4 py-2 flex justify-between items-center shadow-sm">
              <h2 className="text-lg font-medium text-gray-800">Room: {roomId}</h2>
              <button
                onClick={leaveRoom}
                className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 text-sm font-medium transition duration-200"
              >
                Leave
              </button>
            </div>
            
            {/* Video grid */}
            <div className="p-4 pt-14 h-full overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                {/* My video */}
                <div className="bg-black rounded-lg overflow-hidden shadow-md aspect-video relative">
                  <video
                    ref={userVideoRef}
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-sm font-medium">
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
            </div>
            
            {/* Debug toggle button */}
            <button 
              onClick={() => setShowDebug(!showDebug)}
              className="absolute bottom-20 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm"
            >
              {showDebug ? "Hide Debug" : "Show Debug"}
            </button>
            
            {/* Debug panel */}
            {showDebug && (
              <div className="absolute bottom-20 left-4 right-4 mb-10 bg-white rounded-lg shadow-lg p-4 max-h-40 overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
                <div className="text-sm font-mono">
                  {debug.map((msg, i) => (
                    <div key={i} className="mb-1 text-gray-700">
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar (chat, participants, etc.) */}
          <SideBar />
        </div>
      )}
      
      {/* Control bar (always at bottom) */}
      {joined && <ControlBar />}
    </div>
  );
};

export default VideoChat;