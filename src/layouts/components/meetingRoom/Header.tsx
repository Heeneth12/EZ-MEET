import { Clock, Wifi } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mr-4">Team Weekly Sync</h2>
          <div className="flex items-center text-sm text-gray-400">
            <Clock size={16} className="mr-1" />
            <span>Today, 12:00 PM</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Network quality indicator */}
          <div className="flex items-center">
            <div className="flex h-3 space-x-1">
              <Wifi size={16} className="text-green-500" />
            </div>
          </div>

          {/* Meeting ID */}
          <div className="text-sm bg-gray-700 px-2 py-1 rounded">
            ID: meet-pro-428-9dj3
            <button className="ml-2 text-blue-400 hover:text-blue-300">
              Copy
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
