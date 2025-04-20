import {
  Wifi,
  Users,
  Share2,
  MoreVertical,
  Video,
  Shield,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import React, { useState } from "react";

export default function Header({
  participantsCount,
}: {
  participantsCount: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700 text-white w-full px-8 mb-px-4 sm:px-2 lg:px-8">
      <div className="py-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center">
          <h2 className="text-lg md:text-xl font-semibold mr-4">
            Team Weekly Sync
          </h2>
        </div>

        {/* Hamburger on Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <MoreVertical size={24} />
          </button>
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Participants */}
          {/* Participants */}
          <div className="relative flex items-center bg-slate-800 px-3 py-1 rounded-lg">
            <div className="relative">
              <Users size={22} className="text-blue-400" />
              {/* Badge */}
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {participantsCount + 1}
              </span>
            </div>
          </div>

          {/* Network Quality */}
          <div className="flex items-center bg-slate-800 px-3 py-1 rounded-lg">
            <Wifi size={16} className="text-green-400" />
            <span className="ml-2 text-sm text-slate-300">Good</span>
          </div>

          {/* Share Button */}
          <button className="bg-blue-600 hover:bg-blue-500 transition px-4 py-1.5 rounded-lg flex items-center text-sm font-medium">
            <Share2 size={16} className="mr-2" />
            Share
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              className="p-2 rounded-full border border-white hover:bg-slate-800 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="More options">
              <User size={18} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-xl shadow-xl py-2 z-50">
                <button className="flex items-center px-4 py-2 text-sm text-slate-200 w-full text-left hover:bg-slate-700">
                  <Video size={16} className="mr-3" />
                  Recording settings
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-slate-200 w-full text-left hover:bg-slate-700">
                  <Shield size={16} className="mr-3" />
                  Security options
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-slate-200 w-full text-left hover:bg-slate-700">
                  <Settings size={16} className="mr-3" />
                  Meeting settings
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-left text-red-400 hover:bg-slate-700 w-full">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <div className="flex items-center bg-slate-800 px-3 py-2 rounded">
            <Users size={16} className="mr-2 text-blue-400" />
            <span className="text-sm">12</span>
          </div>

          <div className="flex items-center bg-slate-800 px-3 py-2 rounded">
            <Wifi size={16} className="text-green-400" />
            <span className="ml-2 text-sm text-slate-300">Good</span>
          </div>

          <button className="bg-blue-600 hover:bg-blue-500 w-full py-2 rounded text-sm font-medium flex items-center justify-center">
            <Share2 size={16} className="mr-2" />
            Share
          </button>
        </div>
      )}
    </header>
  );
}
