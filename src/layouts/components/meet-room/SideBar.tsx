// SideBar.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { Participant } from "@/layouts/models/ParticipantModel";

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
  isMine: boolean;
}

interface SideBarProps {
  showChat: boolean;
  showParticipants: boolean;
  setShowChat: (show: boolean) => void;
  setShowParticipants: (show: boolean) => void;
  participants: Participant[];
  roomId: string;
  userId: string;
  socketRef: React.MutableRefObject<any>;
}

const SideBar: React.FC<SideBarProps> = ({
  showChat,
  showParticipants,
  setShowChat,
  setShowParticipants,
  participants,
  roomId,
  userId,
  socketRef
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set up chat message listener
  useEffect(() => {
    if (!socketRef.current) return;

    const handleChatMessage = (data: { sender: string; text: string; }) => {
      const newMessage: Message = {
        sender: data.sender,
        text: data.text,
        timestamp: new Date(),
        isMine: data.sender === userId
      };
      
      setMessages(prev => [...prev, newMessage]);
    };

    socketRef.current.on("chatMessage", handleChatMessage);

    return () => {
      socketRef.current?.off("chatMessage", handleChatMessage);
    };
  }, [socketRef, userId]);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a chat message
  const sendMessage = () => {
    if (!messageInput.trim() || !roomId || !userId || !socketRef.current) return;

    // Emit message to server
    socketRef.current.emit("chatMessage", {
      roomId,
      sender: userId,
      text: messageInput.trim()
    });

    // Add to local messages (optimistic update)
    const newMessage: Message = {
      sender: userId,
      text: messageInput.trim(),
      timestamp: new Date(),
      isMine: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageInput("");
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!showChat && !showParticipants) return null;

  return (
    <div className={`bg-gray-800 h-full flex flex-col rounded-lg overflow-hidden w-72`}>
      {/* Header */}
      <div className="bg-gray-700 px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">
          {showChat ? "Chat" : "Participants"}
        </h3>
        <button
          onClick={() => {
            if (showChat) setShowChat(false);
            if (showParticipants) setShowParticipants(false);
          }}
          className="text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      {showChat && (
        <>
          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3"
          >
            {messages.length === 0 ? (
              <div className="text-gray-500 text-center mt-8 text-sm">
                No messages yet
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.isMine ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium text-gray-400">
                      {msg.isMine ? "You" : msg.sender}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[85%] ${
                      msg.isMine
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message input */}
          <div className="p-3 border-t border-gray-700">
            <div className="flex">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded-l px-3 py-2 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Participants list */}
      {showParticipants && (
        <div className="flex-1 overflow-y-auto p-3">
          {participants.length === 0 ? (
            <div className="text-gray-500 text-center mt-8 text-sm">
              No participants
            </div>
          ) : (
            <div className="space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between bg-gray-700 p-2 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-sm">
                          {participant.name}
                        </span>
                        {participant.isHost && (
                          <span className="ml-2 text-xs bg-blue-600 px-1.5 py-0.5 rounded-full">
                            Host
                          </span>
                        )}
                        {participant.userId === userId && (
                          <span className="ml-2 text-xs bg-gray-600 px-1.5 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        {participant.isMuted && <span>Muted</span>}
                        {participant.isVideoOff && (
                          <span>• Camera off</span>
                        )}
                        {participant.isScreenSharing && (
                          <span className="text-green-400">• Sharing</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;