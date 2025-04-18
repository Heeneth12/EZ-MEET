"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  createSocketConnection,
  setupSocketEvents,
  joinRoom,
  leaveRoom,
} from "@/layouts/utils/socket-utils";
import { cleanupMedia, getMediaStream } from "@/layouts/utils/media-utils";
import ControlBar from "@/layouts/components/meetingRoom/ControlBar";
import Header from "@/layouts/components/meetingRoom/Header";
import { MicOff, Monitor, Hand } from "lucide-react";
import SideBar from "@/layouts/components/meetingRoom/SideBar";
import { addPeer, createPeer } from "@/layouts/utils/peer-utils";
import { Socket } from "socket.io-client";
import Peer from "simple-peer";

// Define interfaces for type safety
interface PeerObject {
  id: string;
  name: string;
  peer: Peer.Instance;
}

interface Participant {
  id: string | number;
  name: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isHost: boolean;
  isScreenSharing: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export default function MeetingRoom() {
  // UI States
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "local",
      name: "You",
      isSpeaking: false,
      isMuted: false,
      isVideoOff: false,
      isHost: true,
      isScreenSharing: false,
    },
  ]);

  // Video Chat States
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<PeerObject[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [remoteVideoRefs, setRemoteVideoRefs] = useState<{
    [key: string]: React.RefObject<HTMLVideoElement>;
  }>({});

  // Refs
  const myVideo = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<PeerObject[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Update refs when states change
  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  // Set the stream to video element when available
  useEffect(() => {
    if (stream && myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Core function to join a meeting room
  const joinMeeting = async (roomIdentifier: string, name: string) => {
    if (!roomIdentifier.trim()) {
      setErrorMsg("Please enter a valid room ID");
      return;
    }

    if (!name.trim()) {
      setErrorMsg("Please enter your name");
      return;
    }

    setErrorMsg("");
    setRoomId(roomIdentifier);
    setUserName(name);

    try {
      // Initialize media devices
      const mediaStream = await getMediaStream();
      setStream(mediaStream);
      streamRef.current = mediaStream;

      console.log("Media stream initialized:", mediaStream);

      if (myVideo.current) {
        myVideo.current.srcObject = mediaStream;
      }

      // Initialize socket connection
      const socket = createSocketConnection();
      socketRef.current = socket;

      // Create a unique ID for this user
      const userId = `user_${Date.now()}`;

      // Set up socket event handlers
      setupSocketEvents(
        socket,
        mediaStream,
        userId,
        name,
        // Create peer callback
        (userToSignal, callerId, stream) =>
          createPeer(socket, userToSignal, callerId, stream, name),
        // Add peer callback
        (incomingSignal, callerId, stream) =>
          addPeer(socket, incomingSignal, callerId, stream),
        // Room users handler
        (users) => {
          // Create peers for each user in the room
          const peers = users
            .filter((user) => user.id !== userId)
            .map((user) => {
              const peer = createPeer(
                socket,
                user.id,
                userId,
                mediaStream,
                name
              );
              return {
                id: user.id,
                name: user.name,
                peer,
              };
            });

          setPeers(peers);
          peersRef.current = peers;

          // Update participants list
          setParticipants((prev) => [
            ...prev,
            ...users.map((user) => ({
              id: user.id,
              name: user.name,
              isSpeaking: false,
              isMuted: false,
              isVideoOff: false,
              isHost: false,
              isScreenSharing: false,
            })),
          ]);
        },
        // User joined handler
        (payload) => {
          console.log("User joined:", payload);
          const peer = addPeer(
            socket,
            payload.signal,
            payload.callerId,
            mediaStream
          );
          const peerObj = {
            id: payload.callerId,
            name: payload.callerName,
            peer,
          };

          setPeers((users) => [...users, peerObj]);
          peersRef.current = [...peersRef.current, peerObj];

          // Add new participant to the list
          setParticipants((prev) => [
            ...prev,
            {
              id: payload.callerId,
              name: payload.callerName,
              isSpeaking: false,
              isMuted: false,
              isVideoOff: false,
              isHost: false,
              isScreenSharing: false,
            },
          ]);
        },
        // Returned signal handler
        (payload) => {
          const item = peersRef.current.find((p) => p.id === payload.id);
          if (item) {
            item.peer.signal(payload.signal);
          }
        },
        // User left handler
        (userId) => {
          setPeers((peers) => peers.filter((peer) => peer.id !== userId));
          peersRef.current = peersRef.current.filter(
            (peer) => peer.id !== userId
          );

          // Remove participant from the list
          setParticipants((prev) => prev.filter((p) => p.id !== userId));
        },
        // Error handler
        (message) => {
          setErrorMsg(message);
        }
      );

      // Join the room
      joinRoom(socket, roomIdentifier, userId, name);

      // Add the current user to participants
      setParticipants([
        {
          id: "local",
          name: name,
          isSpeaking: false,
          isMuted: false,
          isVideoOff: false,
          isHost: true,
          isScreenSharing: false,
        },
      ]);

      setInRoom(true);
    } catch (err) {
      console.error("Error joining meeting:", err);
      setErrorMsg("Failed to join meeting. Please try again.");
    }
  };

  // Leave the meeting
  const leaveMeeting = useCallback(() => {
    // Disconnect from socket
    if (socketRef.current) {
      leaveRoom(socketRef.current, roomId);
      socketRef.current.disconnect();
    }
    // Clean up media streams
    cleanupMedia(streamRef.current);
    cleanupMedia(screenStreamRef.current);
    // Reset states
    setStream(null);
    streamRef.current = null;
    screenStreamRef.current = null;
    setInRoom(false);
    setPeers([]);
    peersRef.current = [];
    // Reset participants
    setParticipants([]);
  }, [roomId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      {/* Main area (Video + Sidebar) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Grid */}
        <div className="relative flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-black overflow-hidden">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="relative flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden aspect-video">
              {/* Set up ref for local video */}
              {participant.id === "local" && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  ref={myVideo}
                  muted
                  autoPlay
                  playsInline
                />
              )}

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{participant.name}</span>
                  <div className="flex items-center space-x-1">
                    {participant.isHost && (
                      <span className="bg-blue-600 px-1.5 py-0.5 text-xs rounded-full">
                        Host
                      </span>
                    )}
                    {participant.isMuted && (
                      <MicOff size={16} className="text-red-500" />
                    )}
                    {participant.isSpeaking && !participant.isMuted && (
                      <div className="flex space-x-0.5">
                        {[1, 2, 3].map((bar) => (
                          <div
                            key={bar}
                            className="h-3 w-1 bg-green-500 rounded-full animate-pulse"
                            style={{ animationDelay: `${bar * 0.15}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar */}
        <SideBar />
      </div>

      <ControlBar />

      {/* Error message display */}
      {errorMsg && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
          {errorMsg}
        </div>
      )}

      {/* Join Meeting Dialog (you would implement this) */}
      {!inRoom && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Join Meeting</h2>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
            {/* Form inputs would go here */}
            <button
              onClick={() => joinMeeting("test-room", userName)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Test Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
