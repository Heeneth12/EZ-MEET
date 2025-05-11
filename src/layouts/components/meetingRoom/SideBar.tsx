"use client";
import { User } from "@/layouts/utils/types";
import { X, MicOff, VideoOff, Volume2, MoreVertical } from "lucide-react";
import React from "react";

export default function SideBar(props: {
  showChat: boolean;
  allUsers: User[];
  setShowChat: (show: boolean) => void;
  showParticipants: boolean;
  setShowParticipants: (show: boolean) => void;
}) {
  const [newMessage, setNewMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      sender: "John Smith",
      content: "Hello everyone, thanks for joining!",
      time: "10:02 AM",
    },
    {
      id: 2,
      sender: "Sarah Chen",
      content: "Hi team, glad to be here. Can we discuss the project timeline?",
      time: "10:03 AM",
    },
    {
      id: 3,
      sender: "AI Assistant",
      content:
        "Meeting summary so far: John welcomed the team. Sarah asked about project timeline.",
      time: "10:04 AM",
      isAI: true,
    },
  ]);

  return (
    <div
      className={`bg-gray-800 rounded-sm flex flex-col ${
        props.showChat || props.showParticipants ? "w-110 m-2" : "w-0"
      } transition-width duration-300 ease-in-out`}>
      {/* Chat */}
      {props.showChat && (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h3 className="font-medium">In-meeting chat</h3>
            <button
              onClick={() => props.setShowChat(false)}
              className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === "You" ? "items-end" : "items-start"
                }`}>
                <div className="flex items-center mb-1">
                  <span
                    className={`font-medium text-sm ${
                      message.isAI
                        ? "text-blue-400"
                        : message.sender === "You"
                        ? "text-green-400"
                        : "text-gray-300"
                    }`}>
                    {message.sender}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {message.time}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg max-w-[85%] ${
                    message.isAI
                      ? "bg-blue-900 text-blue-100"
                      : message.sender === "You"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-700 text-white"
                  }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form className="p-3 border-t border-gray-700">
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a message to everyone..."
                className="flex-1 bg-transparent px-4 py-2.5 outline-none text-white"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Participants */}
      {props.showParticipants && (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <div className="flex items-center">
              <h3 className="font-medium">Participants</h3>
              <span className="ml-2 bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                {props.allUsers.length}
              </span>
            </div>
            <button
              onClick={() => props.setShowParticipants(false)}
              className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search participants..."
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg outline-none text-sm"
              />
            </div>
            <div className="px-2">
              {props.allUsers.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between py-3 px-2 hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{participant.name}</span>
                  
                        {participant.id === "1" && (
                          <span className="ml-2 text-xs bg-gray-600 px-1.5 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      {/* <div className="flex items-center text-xs text-gray-400 mt-0.5">
                        {participant.isMuted && (
                          <MicOff size={12} className="mr-1" />
                        )}
                        {participant.isVideoOff && (
                          <VideoOff size={12} className="mr-1" />
                        )}
                        {participant.isSpeaking && !participant.isMuted && (
                          <span className="flex items-center">
                            <Volume2
                              size={12}
                              className="mr-1 text-green-500"
                            />
                            Speaking
                          </span>
                        )}
                        {!participant.isSpeaking &&
                          !participant.isMuted &&
                          !participant.isVideoOff && <span>Available</span>}
                      </div> */}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white p-1">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
