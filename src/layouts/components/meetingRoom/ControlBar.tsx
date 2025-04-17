"use client";
import React from "react";
import { Clock, MicOff, Mic, VideoOff, Video, Monitor, Smile, Hand, MoreVertical, Phone, Grid, Layout, MessageSquare, Users, Minimize, Maximize } from "lucide-react";

export default function ControlBar() {
  // State variables for various controls
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const [showReactions, setShowReactions] = React.useState(false);
  const [raiseHand, setRaiseHand] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [noiseSuppressionLevel, setNoiseSuppressionLevel] =React.useState("medium");
  const [backgroundBlur, setBackgroundBlur] = React.useState(0);
  const [liveCaptions, setLiveCaptions] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [layout, setLayout] = React.useState("grid");
  const [showChat, setShowChat] = React.useState(false);
  const [showParticipants, setShowParticipants] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  // Toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };
  return (
    <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-4">
      {/* Left controls */}
      <div className="flex items-center space-x-2">
        {/* Meeting time */}
        <div className="flex items-center text-sm px-3 py-1 bg-gray-700 rounded-lg">
          <Clock size={14} className="mr-1 text-gray-400" />
          23:45
        </div>
      </div>

      {/* Center controls */}
      <div className="flex items-center space-x-3">
        {/* Mute toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full ${
            isMuted
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}>
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* Video toggle */}
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-3 rounded-full ${
            isVideoOff
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}>
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        {/* Screen share */}
        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
          <Monitor size={20} />
        </button>

        {/* Reactions menu */}
        <div className="relative">
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
            <Smile size={20} />
          </button>

          {showReactions && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-700 flex space-x-2">
              {["👍", "👏", "❤️", "😂", "😮", "🎉"].map((emoji) => (
                <button
                  key={emoji}
                  className="text-2xl p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Raise hand */}
        <button
          onClick={() => setRaiseHand(!raiseHand)}
          className={`p-3 rounded-full ${
            raiseHand
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}>
          <Hand size={20} />
        </button>

        {/* More controls */}
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
            <MoreVertical size={20} />
          </button>

          {showSettings && (
            <div className="absolute bottom-16 right-0 bg-gray-800 rounded-lg shadow-lg border border-gray-700 w-64">
              <div className="p-2 border-b border-gray-700">
                <h3 className="text-sm font-medium">Meeting Settings</h3>
              </div>

              <div className="p-3 space-y-4">
                {/* Noise suppression control */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-400">
                    Noise Suppression
                  </label>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setNoiseSuppressionLevel("low")}
                      className={`px-2 py-1 text-xs rounded-l-lg ${
                        noiseSuppressionLevel === "low"
                          ? "bg-blue-600"
                          : "bg-gray-700"
                      }`}>
                      Low
                    </button>
                    <button
                      onClick={() => setNoiseSuppressionLevel("medium")}
                      className={`px-2 py-1 text-xs ${
                        noiseSuppressionLevel === "medium"
                          ? "bg-blue-600"
                          : "bg-gray-700"
                      }`}>
                      Medium
                    </button>
                    <button
                      onClick={() => setNoiseSuppressionLevel("high")}
                      className={`px-2 py-1 text-xs rounded-r-lg ${
                        noiseSuppressionLevel === "high"
                          ? "bg-blue-600"
                          : "bg-gray-700"
                      }`}>
                      High
                    </button>
                  </div>
                </div>

                {/* Background blur */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-400">
                      Background Blur
                    </label>
                    <span className="text-xs">{backgroundBlur}/5</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={backgroundBlur}
                    onChange={(e) =>
                      setBackgroundBlur(parseInt(e.target.value))
                    }
                    className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Live captions toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Live Captions</span>
                  <button
                    onClick={() => setLiveCaptions(!liveCaptions)}
                    className={`w-10 h-5 relative rounded-full transition-colors duration-300 ease-in-out ${
                      liveCaptions ? "bg-blue-600" : "bg-gray-600"
                    }`}>
                    <span
                      className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                        liveCaptions ? "transform translate-x-5" : ""
                      }`}></span>
                  </button>
                </div>

                {/* Recording toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recording</span>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-10 h-5 relative rounded-full transition-colors duration-300 ease-in-out ${
                      isRecording ? "bg-red-600" : "bg-gray-600"
                    }`}>
                    <span
                      className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                        isRecording ? "transform translate-x-5" : ""
                      }`}></span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* End call */}
        <button className="p-3 rounded-full bg-red-600 hover:bg-red-700">
          <Phone size={20} />
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-3">
        {/* Layout toggle */}
        <div className="relative group">
          <button
            onClick={() =>
              setLayout(
                layout === "grid"
                  ? "spotlight"
                  : layout === "spotlight"
                  ? "sidebar"
                  : "grid"
              )
            }
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            {layout === "grid" ? (
              <Grid size={20} />
            ) : layout === "spotlight" ? (
              <Layout size={20} />
            ) : (
              <Layout size={20} />
            )}
          </button>
          <div className="absolute bottom-full mb-2 right-0 bg-gray-900 p-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {layout === "grid"
              ? "Grid View"
              : layout === "spotlight"
              ? "Spotlight View"
              : "Sidebar View"}
          </div>
        </div>

        {/* Chat toggle */}
        <button
          onClick={() => {
            setShowChat(!showChat);
            if (showParticipants && !showChat) setShowParticipants(false);
          }}
          className={`p-2 rounded-lg ${
            showChat
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}>
          <MessageSquare size={20} />
        </button>

        {/* Participants toggle */}
        <button
          onClick={() => {
            setShowParticipants(!showParticipants);
            if (showChat && !showParticipants) setShowChat(false);
          }}
          className={`p-2 rounded-lg ${
            showParticipants
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}>
          <Users size={20} />
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullScreen}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
          {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
}
