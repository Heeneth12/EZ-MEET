"use client";
import React, { useState } from "react";
import {
  Calendar,
  Video,
  Users,
  Link,
  ChevronLeft,
  ChevronRight,
  Info,
  MessageSquare,
  Settings,
  Play,
  Shield,
  Clock,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";

export default function EzMeetPlatform() {
  const [meetingCode, setMeetingCode] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNewMeetingOptions, setShowNewMeetingOptions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [recentMeetings] = useState([
    { id: "meet-abc-123", name: "Team Weekly Sync", time: "2 days ago" },
    { id: "meet-def-456", name: "Client Presentation", time: "1 week ago" },
  ]);

  const slides = [
    {
      title: "Get a link that you can share",
      description:
        "Click New meeting to get a link that you can send to people that you want to meet with",
      icon: <Link className="text-white" size={32} />,
    },
    {
      title: "Plan your meetings in advance",
      description:
        "Schedule meetings in your calendar and send invitations to participants",
      icon: <Calendar className="text-white" size={32} />,
    },
    {
      title: "Your meeting is safe",
      description:
        "No one can join a meeting unless invited or admitted by the host",
      icon: <Shield className="text-white" size={32} />,
    },
    {
      title: "Collaborate with ease",
      description:
        "Share screens, use chat, and collaborate on documents in real-time",
      icon: <MessageSquare className="text-white" size={32} />,
    },
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const toggleNewMeetingOptions = () => {
    setShowNewMeetingOptions(!showNewMeetingOptions);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-2 bg-blue-600 rounded-lg flex items-center justify-center">
            <Video size={22} className="text-white" />
          </div>
          <span className="text-xl font-medium text-gray-800">Ez Meet</span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-md hover:bg-gray-100">
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <span className="text-sm text-gray-500">10:29 • Sat 19 Apr</span>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Info size={20} className="text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
            EZ
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b">
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">10:29 • Sat 19 Apr</span>
              <div className="flex space-x-4">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Settings size={18} className="text-gray-600" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Info size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                EZ
              </div>
              <span className="text-gray-800">Ez User</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row md:items-center px-4 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center pr-0 md:pr-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Video calls and meetings for everyone
          </h1>
          <p className="text-md md:text-lg text-gray-600 mb-6">
            Connect, collaborate and celebrate from anywhere with Ez Meet
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative">
              <button
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-150 w-full sm:w-auto"
                onClick={toggleNewMeetingOptions}>
                <Video size={20} className="mr-2" />
                <span>New meeting</span>
              </button>

              {showNewMeetingOptions && (
                <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg overflow-hidden w-64 border">
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      <Play size={18} className="mr-3 text-blue-600" />
                      <span>Start an instant meeting</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      <Clock size={18} className="mr-3 text-blue-600" />
                      <span>Schedule in calendar</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      <Users size={18} className="mr-3 text-blue-600" />
                      <span>Create a recurring meeting</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center border rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition duration-150">
              <input
                type="text"
                placeholder="Enter a code or link"
                className="flex-1 px-4 py-3 outline-none text-gray-700"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />
              <button
                className={`px-6 py-3 font-medium ${
                  meetingCode
                    ? "text-blue-600 hover:bg-blue-50"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                disabled={!meetingCode}>
                Join
              </button>
            </div>
          </div>

          {/* Recent meetings section */}
          {recentMeetings.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                RECENT MEETINGS
              </h3>
              <div className="space-y-2">
                {recentMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-150">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        <Video size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {meeting.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {meeting.time}
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-full">
                      <Play size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <a
            href="#learn-more"
            className="text-blue-600 hover:text-blue-800 text-sm group flex items-center">
            <span className="underline-offset-2 group-hover:underline">
              Learn more about Ez Meet
            </span>
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>

        {/* Right Side - Carousel with Network Background */}
        <div className="md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
          {/* Network Background */}
          <div className="relative w-full max-w-md h-96 rounded-xl overflow-hidden">
            {/* Carousel Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <div className="mb-6">
                <div className="mx-auto w-24 h-24 bg-blue-600 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  {slides[currentSlide].icon}
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-3 text-white">
                {slides[currentSlide].title}
              </h2>

              <p className="text-white text-opacity-90 mb-6">
                {slides[currentSlide].description}
              </p>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white w-6"
                        : "bg-white bg-opacity-50 hover:bg-opacity-70"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-opacity-50 transition duration-150"
              aria-label="Previous slide">
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-opacity-50 transition duration-150"
              aria-label="Next slide">
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>
      </main>

      {/* Quick access floating button (mobile) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-150">
          <PlusCircle size={24} />
        </button>
      </div>
    </div>
  );
}
