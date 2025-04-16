// Header.tsx
import React from "react";
import { Clock } from "lucide-react";

interface HeaderProps {
  roomId: string;
  isHost: boolean;
  meetingTime: number;
}

const Header: React.FC<HeaderProps> = ({ roomId, isHost, meetingTime }) => {
  // Format meeting time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [hrs, mins, secs]
      .map(val => val.toString().padStart(2, '0'))
      .join(':');
  };

  return (
    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-sm sm:text-base">Meeting Room</span>
        {roomId && (
          <span className="bg-gray-700 px-2 py-0.5 rounded-full text-xs">
            Room ID: {roomId}
          </span>
        )}
        {isHost && (
          <span className="bg-blue-600 px-2 py-0.5 rounded-full text-xs hidden sm:inline-block">
            Host
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center text-gray-300 text-xs sm:text-sm">
          <Clock size={14} className="mr-1" />
          <span>{formatTime(meetingTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;