"use client";
import React, { useState, useEffect } from "react";
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
  Star,
  Github,
} from "lucide-react";

export default function EzMeetPlatform() {
  const [meetingCode, setMeetingCode] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNewMeetingOptions, setShowNewMeetingOptions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [recentMeetings] = useState([
    { id: "meet-abc-123", name: "Team Weekly Sync", time: "2 days ago" },
    { id: "meet-def-456", name: "Client Presentation", time: "1 week ago" },
  ]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const features = [
    {
      id: "sharing",
      title: "Screen Sharing",
      description: "Share your screen instantly with one click for seamless collaboration.",
      icon: <Video size={24} />,
      color: "from-blue-500/20 to-blue-600/10",
      image: "/api/placeholder/400/300",
    },
    {
      id: "chat",
      title: "In-Meeting Chat",
      description: "Communicate via text without interrupting the speaker.",
      icon: <MessageSquare size={24} />,
      color: "from-blue-500/20 to-purple-600/10",
      image: "/api/placeholder/400/300",
    },
    {
      id: "security",
      title: "Enhanced Security",
      description: "Keep your meetings secure with encryption and access controls.",
      icon: <Shield size={24} />,
      color: "from-purple-500/20 to-blue-600/10",
      image: "/api/placeholder/400/300",
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
    <div className="flex flex-col min-h-screen font-sans bg-gray-950 text-gray-100 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e540_1px,transparent_1px),linear-gradient(to_bottom,#4f46e540_1px,transparent_1px)] bg-[size:64px_64px] opacity-5"></div>
        
        {/* Gradient blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className={`py-4 px-6 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-lg shadow-lg shadow-blue-900/5 border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Video size={22} className="text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Ez Meet</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white">
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-sm text-gray-400">10:29 • Tue 22 Apr</span>
            <div className="flex items-center text-gray-300">
              <Star size={16} className="mr-1 text-yellow-400" />
              <span className="font-medium">15K+</span>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Settings size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <Info size={20} />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-blue-600/30 text-blue-300 rounded-full flex items-center justify-center font-medium border border-blue-500/20 shadow-lg shadow-blue-900/10">
              EZ
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-end p-6">
            <button 
              onClick={() => setShowMobileMenu(false)}
              className="text-gray-300 hover:text-white"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-blue-600/30 text-blue-300 rounded-full flex items-center justify-center font-medium border border-blue-500/20">
                EZ
              </div>
              <span className="text-white">Ez User</span>
            </div>
            <div className="space-y-4">
              <button className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg transition duration-150 w-full">
                <Video size={20} className="mr-2" />
                <span>New meeting</span>
              </button>
              <div className="flex-1 flex items-center border rounded-lg overflow-hidden bg-gray-800 border-gray-700 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition duration-150">
                <input
                  type="text"
                  placeholder="Enter a code or link"
                  className="flex-1 px-4 py-3 outline-none text-white bg-transparent"
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                />
                <button
                  className={`px-6 py-3 font-medium ${
                    meetingCode
                      ? "text-blue-400 hover:bg-gray-700"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!meetingCode}>
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row md:items-center px-6 py-12 md:py-20 max-w-7xl mx-auto w-full relative z-10">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center pr-0 md:pr-8">
          <div className="flex justify-start mb-6">
            <button className="bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 text-sm flex items-center px-4 py-2 rounded-full border border-gray-700/50 shadow-lg shadow-blue-900/5 transition duration-300 backdrop-blur-sm hover:border-blue-500/30 hover:text-blue-300 group">
              <Video size={16} className="mr-2 text-blue-400 group-hover:text-blue-300" />
              GET STARTED QUICKLY
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300">
              Video calls and meetings for everyone
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8">
            Connect, collaborate and celebrate from anywhere with Ez Meet's secure and intuitive platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative">
              <button
                className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-0.5 w-full sm:w-auto"
                onClick={toggleNewMeetingOptions}>
                <Video size={20} className="mr-2" />
                <span>New meeting</span>
              </button>

              {showNewMeetingOptions && (
                <div className="absolute z-10 mt-2 bg-gray-800 shadow-lg shadow-blue-900/10 rounded-lg overflow-hidden w-64 border border-gray-700">
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-300 transition duration-150">
                      <Play size={18} className="mr-3 text-blue-400" />
                      <span>Start an instant meeting</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-300 transition duration-150">
                      <Clock size={18} className="mr-3 text-blue-400" />
                      <span>Schedule in calendar</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-300 transition duration-150">
                      <Users size={18} className="mr-3 text-blue-400" />
                      <span>Create a recurring meeting</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center border rounded-lg overflow-hidden bg-gray-800/60 border-gray-700 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition duration-150 backdrop-blur-sm">
              <input
                type="text"
                placeholder="Enter a code or link"
                className="flex-1 px-4 py-3 outline-none text-white bg-transparent"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />
              <button
                className={`px-6 py-3 font-medium ${
                  meetingCode
                    ? "text-blue-400 hover:bg-gray-700"
                    : "text-gray-500 cursor-not-allowed"
                }`}
                disabled={!meetingCode}>
                Join
              </button>
            </div>
          </div>

          {/* Recent meetings section */}
          {recentMeetings.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-blue-400 mb-4">
                RECENT MEETINGS
              </h3>
              <div className="space-y-3">
                {recentMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600/70 cursor-pointer transition duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-900/10 transform hover:-translate-y-0.5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20 text-blue-400 flex items-center justify-center mr-3 shadow-lg shadow-blue-900/5">
                        <Video size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {meeting.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {meeting.time}
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 bg-gray-800/70 hover:bg-gray-700 p-2 rounded-full transition duration-200">
                      <Play size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <a
            href="#learn-more"
            className="text-blue-400 hover:text-blue-300 text-sm group flex items-center">
            <span className="group-hover:underline">
              Learn more about Ez Meet
            </span>
            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

        {/* Right Side - Carousel with Network Background */}
        <div className="md:w-1/2 flex items-center justify-center mt-12 md:mt-0">
          {/* Network Background */}
          <div className="relative w-full max-w-md h-96 rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-blue-900/10">
            {/* Gradient Background for Carousel */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"></div>
            
            {/* Network Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            {/* Animated Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500"></div>

            {/* Carousel Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <div className="mb-6">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30 transform transition-transform duration-300 hover:scale-105">
                  {slides[currentSlide].icon}
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-3 text-white">
                {slides[currentSlide].title}
              </h2>

              <p className="text-white text-opacity-80 mb-6">
                {slides[currentSlide].description}
              </p>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-blue-400 w-6"
                        : "bg-white bg-opacity-30 hover:bg-opacity-50"
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-opacity-20 transition duration-150 border border-white/10"
              aria-label="Previous slide">
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-opacity-20 transition duration-150 border border-white/10"
              aria-label="Next slide">
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>
      </main>

      {/* Quick access floating button (mobile) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700 transition duration-300">
          <PlusCircle size={24} />
        </button>
      </div>
    </div>
  );
}