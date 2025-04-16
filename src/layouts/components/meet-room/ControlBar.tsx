// ControlBar.tsx
"use client";
import React from "react";
import { Mic, MicOff, Video, VideoOff, Phone, Share2, Hand, MessageSquare, Users } from "lucide-react";

interface ControlBarProps {
  isJoined: boolean;
  isHost: boolean;
  roomId: string;
  endMeeting: () => void;
  leaveRoom: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  toggleMute: () => void;
  toggleRaiseHand: () => void;
  isVideoOff: boolean;
  isMuted: boolean;
  raiseHand: boolean;
  isScreenSharing: boolean;
  showChat: boolean;
  showParticipants: boolean;
  setShowChat: (show: boolean) => void;
  setShowParticipants: (show: boolean) => void;
  participantCount: number;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isJoined,
  isHost,
  roomId,
  endMeeting,
  leaveRoom,
  toggleVideo,
  toggleScreenShare,
  toggleMute,
  toggleRaiseHand,
  isVideoOff,
  isMuted,
  raiseHand,
  isScreenSharing,
  showChat,
  showParticipants,
  setShowChat,
  setShowParticipants,
  participantCount
}) => {
  if (!isJoined) return null;

  return (
    <div className="bg-gray-800 border-t border-gray-700 py-3 px-4">
      <div className="flex flex-wrap justify-center items-center space-x-1 sm:space-x-2">
        {/* Mic control */}
        <button
          onClick={toggleMute}
          className={`${
            isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
          } text-white p-2 sm:p-3 rounded-full`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        {/* Video control */}
        <button
          onClick={toggleVideo}
          className={`${
            isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
          } text-white p-2 sm:p-3 rounded-full`}
          title={isVideoOff ? "Turn on camera" : "Turn off camera"}
        >
          {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
        </button>

        {/* Screen share */}
        <button
          onClick={toggleScreenShare}
          className={`${
            isScreenSharing ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
          } text-white p-2 sm:p-3 rounded-full`}
          title={isScreenSharing ? "Stop sharing" : "Share screen"}
        >
          <Share2 size={18} />
        </button>

        {/* Raise hand */}
        <button
          onClick={toggleRaiseHand}
          className={`${
            raiseHand ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-gray-700 hover:bg-gray-600 text-white"
          } p-2 sm:p-3 rounded-full`}
          title={raiseHand ? "Lower hand" : "Raise hand"}
        >
          <Hand size={18} />
        </button>

        {/* Show chat */}
        <button
          onClick={() => {
            setShowChat(!showChat);
            if (!showChat) setShowParticipants(false);
          }}
          className={`${
            showChat ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"
          } text-white p-2 sm:p-3 rounded-full`}
          title="Chat"
        >
          <MessageSquare size={18} />
        </button>

        {/* Show participants */}
        <button
          onClick={() => {
            setShowParticipants(!showParticipants);
            if (!showParticipants) setShowChat(false);
          }}
          className={`${
            showParticipants ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"
          } text-white p-2 sm:p-3 rounded-full relative`}
          title="Participants"
        >
          <Users size={18} />
          {participantCount > 1 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {participantCount}
            </span>
          )}
        </button>

        {/* End meeting or leave */}
        <button
          onClick={isHost ? endMeeting : leaveRoom}
          className="bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full ml-2 sm:ml-4"
          title={isHost ? "End meeting for all" : "Leave meeting"}
        >
          <Phone size={18} className="transform rotate-225" />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;