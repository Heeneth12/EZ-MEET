// pages/video-chat.tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io, Socket } from "socket.io-client";

// Define interfaces for type safety
interface PeerObject {
  id: string;
  name: string;
  peer: Peer.Instance;
}

interface User {
  id: string;
  name: string;
}

interface UserJoinedPayload {
  signal: Peer.SignalData;
  callerId: string;
  callerName: string;
}

interface ReturnedSignalPayload {
  id: string;
  signal: Peer.SignalData;
}

interface RTCPeerConnectionSender {
  track: MediaStreamTrack | null;
  kind: string;
  replaceTrack: (track: MediaStreamTrack) => Promise<void>;
}

export default function VideoChat() {
  const [myName, setMyName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [room, setRoom] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<PeerObject[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<PeerObject[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Stabilize the leaveRoom function with useCallback
  const leaveRoom = useCallback(() => {
    // Clean up
    if (socketRef.current) {
      socketRef.current.emit("leave-room", { roomId: room });
      socketRef.current.off("room-users");
      socketRef.current.off("user-joined");
      socketRef.current.off("receiving-returned-signal");
      socketRef.current.off("user-left");
    }

    // Close all peer connections
    peersRef.current.forEach((peerObj) => {
      peerObj.peer.destroy();
    });

    // Stop all tracks from the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }

    setPeers([]);
    peersRef.current = [];
    setStream(null);
    streamRef.current = null;
    setScreenStream(null);
    setIsScreenSharing(false);
    setInRoom(false);
    setIsMuted(false);
    setIsVideoOff(false);
  }, [room, screenStream]);

  // Update streamRef when stream changes
  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  // Make sure video element is updated when stream is available
  useEffect(() => {
    if (stream && myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [screenStream]);

  // Set up socket listeners
  const setupSocketListeners = useCallback((mediaStream: MediaStream) => {
    if (!socketRef.current) return;

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setErrorMsg(
        "Unable to connect to meeting server. Please try again later."
      );
    });

    socketRef.current.on("room-users", (users: User[]) => {
      // Create peers for all users already in the room
      const peersArray: PeerObject[] = [];

      users.forEach((user: User) => {
        if (user.id !== socketRef.current?.id) {
          const peer = createPeer(
            user.id,
            socketRef.current?.id || "",
            mediaStream
          );

          peersRef.current.push({
            id: user.id,
            name: user.name,
            peer,
          });

          peersArray.push({
            id: user.id,
            name: user.name,
            peer,
          });
        }
      });

      setPeers(peersArray);
    });

    socketRef.current.on("user-joined", (payload: UserJoinedPayload) => {
      // Create peer for the new user
      const peer = addPeer(payload.signal, payload.callerId, mediaStream);

      peersRef.current.push({
        id: payload.callerId,
        name: payload.callerName,
        peer,
      });

      setPeers((prev) => [
        ...prev,
        {
          id: payload.callerId,
          name: payload.callerName,
          peer,
        },
      ]);
    });

    socketRef.current.on(
      "receiving-returned-signal",
      (payload: ReturnedSignalPayload) => {
        // Find the peer and signal them back
        const item = peersRef.current.find((p) => p.id === payload.id);
        if (item) {
          item.peer.signal(payload.signal);
        }
      }
    );

    socketRef.current.on("user-left", (userId: string) => {
      // Remove the peer that left
      const peerObj = peersRef.current.find((p) => p.id === userId);
      if (peerObj) {
        peerObj.peer.destroy();
      }

      const newPeers = peersRef.current.filter((p) => p.id !== userId);
      peersRef.current = newPeers;
      setPeers(newPeers);
    });
  }, []);

  const joinRoom = async () => {
    if (!nameInput.trim()) {
      setErrorMsg("Please enter your name");
      return;
    }

    if (!roomInput.trim()) {
      setErrorMsg("Please enter a room code");
      return;
    }

    setErrorMsg("");
    setMyName(nameInput);
    setRoom(roomInput);

    try {
      // Initialize socket only when joining
      if (!socketRef.current) {
        socketRef.current = io("https://socketio-group-server.onrender.com", {
          reconnectionAttempts: 5,
          reconnectionDelay: 5000,
          reconnectionDelayMax: 5000,
          timeout: 10000,
        });
      }

      // Get camera/mic permissions with constraints for better quality
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });

      // Store stream in state and ref
      setStream(mediaStream);
      streamRef.current = mediaStream;

      // Set the stream to video element directly
      if (myVideo.current) {
        myVideo.current.srcObject = mediaStream;
      }

      // Set up socket listeners with the media stream
      setupSocketListeners(mediaStream);

      // Join the room
      socketRef.current.emit("join-room", {
        roomId: roomInput,
        userId: socketRef.current.id,
        userName: nameInput,
      });

      setInRoom(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setErrorMsg(
        "Cannot access camera and microphone. Please check permissions."
      );
    }
  };

  const createPeer = useCallback(
    (userToSignal: string, callerId: string, stream: MediaStream) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478" },
          ],
        },
      });

      peer.on("signal", (signal) => {
        socketRef.current?.emit("sending-signal", {
          userToSignal,
          callerId,
          callerName: myName,
          signal,
        });
      });

      peer.on("error", (err) => {
        console.error("Peer connection error:", err);
      });

      return peer;
    },
    [myName]
  );

  const addPeer = useCallback(
    (
      incomingSignal: Peer.SignalData,
      callerId: string,
      stream: MediaStream
    ) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478" },
          ],
        },
      });

      peer.on("signal", (signal) => {
        socketRef.current?.emit("returning-signal", {
          signal,
          callerId,
        });
      });

      peer.on("error", (err) => {
        console.error("Peer connection error:", err);
      });

      peer.signal(incomingSignal);

      return peer;
    },
    []
  );

  const shareScreen = async () => {
    if (!isScreenSharing) {
      try {
        const screenCaptureStream =
          (await navigator.mediaDevices.getDisplayMedia({
            audio: false,
          })) as MediaStream;

        setScreenStream(screenCaptureStream);

        // Replace the video track for all peers
        const videoTrack = screenCaptureStream.getVideoTracks()[0];

        peersRef.current.forEach(({ peer }) => {
          // Find the sender for the video track and replace it
          const sender = (peer as any)._pc
            .getSenders()
            .find(
              (s: RTCPeerConnectionSender) =>
                s.track && s.track.kind === "video"
            );

          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        });

        // Replace local video display
        if (myVideo.current) {
          myVideo.current.srcObject = screenCaptureStream;
        }

        // Handle when screen sharing stops
        videoTrack.onended = () => {
          stopScreenSharing();
        };

        setIsScreenSharing(true);
      } catch (err) {
        console.error("Error sharing screen:", err);
        setErrorMsg("Failed to share screen. Please try again.");
      }
    } else {
      stopScreenSharing();
    }
  };

  const stopScreenSharing = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());

      // Switch back to camera for all peers
      if (streamRef.current) {
        const videoTrack = streamRef.current.getVideoTracks()[0];

        peersRef.current.forEach(({ peer }) => {
          const sender = (peer as any)._pc
            .getSenders()
            .find(
              (s: RTCPeerConnectionSender) =>
                s.track && s.track.kind === "video"
            );

          if (sender && videoTrack) {
            sender.replaceTrack(videoTrack);
          }
        });

        // Switch back camera for local video
        if (myVideo.current) {
          myVideo.current.srcObject = streamRef.current;
        }
      }

      setScreenStream(null);
      setIsScreenSharing(false);
    }
  }, [screenStream]);

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const enabled = !audioTracks[0].enabled;
        audioTracks[0].enabled = enabled;
        setIsMuted(!enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const enabled = !videoTracks[0].enabled;
        videoTracks[0].enabled = enabled;
        setIsVideoOff(!enabled);
      }
    }
  };

  // Helper to safely get video dimensions
  const getVideoDisplayStyle = () => {
    return {
      height: "180px",
      background: "black",
      borderRadius: "4px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Simple Video Chat</h1>

      {errorMsg && (
        <div className="w-full max-w-4xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}

      {!inRoom ? (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Join a Meeting</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Code
              </label>
              <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="Enter room code or create new"
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              onClick={joinRoom}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Join
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Room: {room}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(room);
                }}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                title="Copy room code">
                📋
              </button>
              <button
                onClick={leaveRoom}
                className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700">
                Leave
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* My Video */}
            <div className="bg-white p-2 rounded-lg shadow">
              <div className="relative" style={getVideoDisplayStyle()}>
                {stream ? (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white">Loading camera...</div>
                )}
                <div className="absolute bottom-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm rounded">
                  {myName} (You) {isMuted && "🔇"} {isVideoOff && "📵"}
                </div>
              </div>
            </div>

            {/* Other participants */}
            {peers.map((peer) => (
              <div key={peer.id} className="bg-white p-2 rounded-lg shadow">
                <div className="relative" style={getVideoDisplayStyle()}>
                  <RemoteVideo peer={peer.peer} />
                  <div className="absolute bottom-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm rounded">
                    {peer.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="fixed bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-4">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full ${
                  isMuted
                    ? "bg-red-200 hover:bg-red-300"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                title={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? "🔇" : "🎤"}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOff
                    ? "bg-red-200 hover:bg-red-300"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                title={isVideoOff ? "Turn on camera" : "Turn off camera"}>
                {isVideoOff ? "📵" : "📹"}
              </button>

              <button
                onClick={shareScreen}
                className={`p-3 rounded-full ${
                  isScreenSharing
                    ? "bg-blue-200 hover:bg-blue-300"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                title={isScreenSharing ? "Stop sharing" : "Share screen"}>
                {isScreenSharing ? "📤" : "📺"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Video component for remote peers - separated for better performance
const RemoteVideo = ({ peer }: { peer: Peer.Instance }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!peer) return;

    const handleStream = (stream: MediaStream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    };

    // Handle existing stream if peer already has one
    if (peer.streams && peer.streams[0]) {
      handleStream(peer.streams[0]);
    }

    // Also listen for future stream events
    peer.on("stream", handleStream);

    return () => {
      peer.off("stream", handleStream);
    };
  }, [peer]);

  // Video element JSX would go here...
  return (
    <video
      playsInline
      autoPlay
      ref={ref}
      className="w-full h-full object-cover"
    />
  );
};