import { useState, useRef, useEffect, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import Peer from 'simple-peer';
import { 
  createSocketConnection, 
  joinRoom as emitJoinRoom, 
  leaveRoom as emitLeaveRoom,
  sendSignal 
} from '../utils/socketUtils';
import { 
  createPeer, 
  createReceivingPeer, 
  stopMediaStream, 
  destroyPeers 
} from '../utils/webrtcUtils';
import { PeerConnection, User } from '../utils/types';

export const useVideoChat = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [joined, setJoined] = useState<boolean>(false);
  const [peers, setPeers] = useState<PeerConnection[]>([]);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [debug, setDebug] = useState<string[]>([]);
  
  const socketRef = useRef<Socket | null>(null);
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const peersRef = useRef<Record<string, PeerConnection>>({});
  
  const addDebug = useCallback((message: string): void => {
    console.log(message);
    setDebug(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  }, []);
  
  // Effect to set user video when stream is available
  useEffect(() => {
    if (myStream && userVideoRef.current) {
      userVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);
  
  const setupSocketHandlers = useCallback((stream: MediaStream): void => {
    if (!socketRef.current) return;
    
    // Get your own socket ID
    socketRef.current.on('connect', () => {
      if (!socketRef.current) return;
      addDebug(`Connected to server with socket ID: ${socketRef.current.id}`);
    });
    
    // Listen for room users list after joining
    socketRef.current.on('all-users', (users: User[]) => {
      if (!socketRef.current) return;
      addDebug(`Received all users in room: ${JSON.stringify(users)}`);
      // Create peers for all existing users in the room
      setAllUsers(users);
      users.forEach(user => {
        if (user.id !== socketRef.current?.id) {
          addDebug(`Creating peer for user ${user.name} (${user.id})`);
          
          const peer = createPeer(
            user.id, 
            stream,
            (signal) => {
              if (!socketRef.current) return;
              addDebug(`Sending signal to ${user.id} (offer)`);
              sendSignal(socketRef.current, {
                to: user.id,
                signal
              });
            },
            (remoteStream) => {
              addDebug(`Received stream from ${user.id}`);
            },
            () => {
              addDebug(`Connected to peer: ${user.id}`);
            },
            (err) => {
              addDebug(`Peer error with ${user.id}: ${err.message}`);
            }
          );
          
          peersRef.current[user.id] = {
            peerID: user.id,
            peer,
            userName: user.name
          };
          
          setPeers(prev => [...prev, {
            peerID: user.id,
            peer,
            userName: user.name
          }]);
        }
      });
    });
    
    // Handle user info
    socketRef.current.on('user-info', ({ id, name }: User) => {
      if (!socketRef.current) return;
      addDebug(`Received user info: ${id} ${name}`);
      
      // If we don't have this peer yet, create it as a receiver
      if (!peersRef.current[id]) {
        addDebug(`Creating new peer for ${name} (${id}) as a receiver`);
        
        const peer = createReceivingPeer(
          stream,
          (signal) => {
            if (!socketRef.current) return;
            addDebug(`Sending signal to ${id} (answer)`);
            sendSignal(socketRef.current, {
              to: id,
              signal
            });
          },
          (remoteStream) => {
            addDebug(`Received stream from ${id}`);
          },
          () => {
            addDebug(`Connected to peer: ${id}`);
          },
          (err) => {
            addDebug(`Peer error with ${id}: ${err.message}`);
          }
        );
        
        // Add to peer refs
        peersRef.current[id] = {
          peerID: id,
          peer,
          userName: name
        };
        
        // Add to peers state
        setPeers(prev => [...prev, {
          peerID: id,
          peer,
          userName: name
        }]);
      } else {
        // Just update the username if we already have the peer
        addDebug(`Updating username for peer ${id} to ${name}`);
        setPeers(prev => 
          prev.map(p => p.peerID === id ? { ...p, userName: name } : p)
        );
      }
    });
    
    // Handle signal from another user
    socketRef.current.on('user-signal', ({ from, signal }: { from: string, signal: Peer.SignalData }) => {
      addDebug(`Received signal from: ${from}`);
      
      const peerObj = peersRef.current[from];
      
      if (peerObj) {
        addDebug(`Processing signal for existing peer: ${from}`);
        try {
          peerObj.peer.signal(signal);
        } catch (err) {
          if (err instanceof Error) {
            addDebug(`Error processing signal: ${err.message}`);
          } else {
            addDebug('Unknown error processing signal');
          }
        }
      } else {
        addDebug(`Received signal from unknown peer: ${from}`);
      }
    });
    
    // Handle user leaving
    socketRef.current.on('user-left', (userId: string) => {
      addDebug(`User left: ${userId}`);
      
      // Cleanup peer connection
      if (peersRef.current[userId]) {
        peersRef.current[userId].peer.destroy();
        delete peersRef.current[userId];
      }
      
      // Update peers state
      setPeers(prev => prev.filter(p => p.peerID !== userId));
    });
  }, [addDebug]);
  
  const joinRoom = useCallback(async (): Promise<void> => {
    if (!roomId || !userName) {
      alert('Please enter room ID and your name');
      return;
    }
    
    try {
      addDebug('Getting user media...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      addDebug('Got user media stream');
      setMyStream(stream);
      
      // Connect to socket server
      addDebug('Connecting to socket server...');
      socketRef.current = createSocketConnection();
      
      // Set up socket event handlers
      setupSocketHandlers(stream);
      
      // Join the room
      addDebug(`Joining room: ${roomId} as ${userName}`);
      emitJoinRoom(socketRef.current, {
        roomId,
        userName
      });
      
      setJoined(true);
    } catch (err) {
      console.error("Error joining room:", err);
      if (err instanceof Error) {
        alert(`Failed to join: ${err.message}`);
      } else {
        alert('Failed to join room');
      }
    }
  }, [roomId, userName, addDebug, setupSocketHandlers]);
  
  const leaveRoom = useCallback((): void => {
    addDebug('Leaving room...');
    
    if (socketRef.current) {
      emitLeaveRoom(socketRef.current);
      socketRef.current.disconnect();
    }
    
    // Stop all tracks in the stream
    stopMediaStream(myStream);
    
    // Destroy all peer connections
    destroyPeers(peersRef.current);
    
    // Reset state
    peersRef.current = {};
    setPeers([]);
    setMyStream(null);
    setJoined(false);
    setDebug([]);
    
    addDebug('Room left successfully');
  }, [addDebug, myStream]);
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (joined) {
        leaveRoom();
      }
    };
  }, [joined, leaveRoom]);
  
  return {
    roomId,
    setRoomId,
    userName,
    allUsers,
    setUserName,
    joined,
    setJoined,
    peers,
    myStream,
    debug,
    userVideoRef,
    joinRoom,
    leaveRoom
  };
};