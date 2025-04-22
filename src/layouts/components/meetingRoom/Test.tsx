"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { User, Zap, Activity, Globe, Shield, Settings } from 'lucide-react';

const EnhancedNetworkVisualization = () => {
  const [hovering, setHovering] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [highlightedPath, setHighlightedPath] = useState(null);
  const [dataPackets, setDataPackets] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const containerRef = useRef(null);
  
  // Define node types with specific icons and colors
  const nodeTypes = {
    user: { icon: User, primaryColor: 'bg-blue-500', secondaryColor: 'bg-blue-400' },
    admin: { icon: Shield, primaryColor: 'bg-purple-500', secondaryColor: 'bg-purple-400' },
    server: { icon: Globe, primaryColor: 'bg-green-500', secondaryColor: 'bg-green-400' },
    device: { icon: Settings, primaryColor: 'bg-orange-500', secondaryColor: 'bg-orange-400' },
    gateway: { icon: Activity, primaryColor: 'bg-yellow-500', secondaryColor: 'bg-yellow-400' }
  };

  // Enhanced nodes with more metadata and positioning
  const nodes = [
    { id: 'center', type: 'admin', x: 50, y: 50, size: 56, label: 'Main Hub', status: 'active', connections: 8 },
    { id: 'node1', type: 'user', x: 25, y: 20, size: 44, label: 'User A', status: 'active', connections: 3 },
    { id: 'node2', type: 'gateway', x: 75, y: 20, size: 44, label: 'Gateway 1', status: 'active', connections: 5 },
    { id: 'node3', type: 'server', x: 25, y: 80, size: 44, label: 'Server 1', status: 'active', connections: 4 },
    { id: 'node4', type: 'device', x: 75, y: 80, size: 44, label: 'Device 3', status: 'warning', connections: 2 },
    { id: 'node5', type: 'user', x: 40, y: 30, size: 40, label: 'User B', status: 'active', connections: 1 },
    { id: 'node6', type: 'server', x: 60, y: 30, size: 40, label: 'Server 2', status: 'inactive', connections: 0 },
    { id: 'node7', type: 'device', x: 30, y: 60, size: 40, label: 'Device 1', status: 'active', connections: 2 },
    { id: 'node8', type: 'user', x: 70, y: 70, size: 40, label: 'User C', status: 'active', connections: 3 },
    { id: 'node9', type: 'user', x: 15, y: 40, size: 36, label: 'User D', status: 'active', connections: 1 },
    { id: 'node10', type: 'device', x: 85, y: 45, size: 36, label: 'Device 2', status: 'active', connections: 2 },
  ];

  // Define connection paths between nodes with types and strengths
  const connections = [
    { id: 'conn-1', from: 'center', to: 'node1', strength: 0.9, type: 'primary' },
    { id: 'conn-2', from: 'center', to: 'node2', strength: 0.8, type: 'primary' },
    { id: 'conn-3', from: 'center', to: 'node3', strength: 1.0, type: 'primary' },
    { id: 'conn-4', from: 'center', to: 'node4', strength: 0.7, type: 'primary' },
    { id: 'conn-5', from: 'center', to: 'node5', strength: 0.6, type: 'secondary' },
    { id: 'conn-6', from: 'center', to: 'node7', strength: 0.5, type: 'secondary' },
    { id: 'conn-7', from: 'center', to: 'node8', strength: 0.8, type: 'secondary' },
    { id: 'conn-8', from: 'node1', to: 'node5', strength: 0.4, type: 'tertiary' },
    { id: 'conn-9', from: 'node1', to: 'node9', strength: 0.3, type: 'tertiary' },
    { id: 'conn-10', from: 'node2', to: 'node10', strength: 0.7, type: 'tertiary' },
    { id: 'conn-11', from: 'node3', to: 'node7', strength: 0.6, type: 'tertiary' },
    { id: 'conn-12', from: 'node4', to: 'node8', strength: 0.5, type: 'tertiary' },
    { id: 'conn-13', from: 'node4', to: 'node10', strength: 0.4, type: 'tertiary' },
  ];

  // Background decorative elements
  const decorations = Array.from({ length: 30 }, (_, i) => ({
    id: `decoration-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 4,
    opacity: Math.random() * 0.4 + 0.1,
    color: ['border-blue-200', 'border-yellow-200', 'border-green-200', 'border-purple-200'][Math.floor(Math.random() * 4)]
  }));

  // Generate data packets for active connections
  useEffect(() => {
    if (!hovering) {
      setDataPackets([]);
      return;
    }
    
    const interval = setInterval(() => {
      // Filter connections based on active node if any
      const eligibleConnections = activeNode 
        ? connections.filter(conn => conn.from === activeNode || conn.to === activeNode)
        : connections;
      
      if (eligibleConnections.length === 0) return;
      
      // Select a random connection
      const connection = eligibleConnections[Math.floor(Math.random() * eligibleConnections.length)];
      const sourceNode = nodes.find(n => n.id === connection.from);
      const targetNode = nodes.find(n => n.id === connection.to);
      
      // Create data packet
      const newPacket = {
        id: `packet-${Date.now()}`,
        fromX: sourceNode.x,
        fromY: sourceNode.y,
        toX: targetNode.x,
        toY: targetNode.y,
        fromId: sourceNode.id,
        toId: targetNode.id,
        progress: 0,
        size: connection.strength * 5 + 3,
        color: nodeTypes[sourceNode.type].primaryColor,
        duration: 1.5 // seconds
      };
      
      setDataPackets(prev => [...prev, newPacket]);
    }, 800);
    
    // Show stats after a short delay
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 1200);
    
    return () => {
      clearInterval(interval);
      clearTimeout(statsTimer);
      setShowStats(false);
    };
  }, [hovering, activeNode]);
  
  // Animate data packets
  useEffect(() => {
    if (dataPackets.length === 0) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setDataPackets(prev => 
        prev.map(packet => ({
          ...packet,
          progress: packet.progress + (0.016 / packet.duration) // 60fps approximation
        })).filter(packet => packet.progress < 1)
      );
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [dataPackets]);

  // Handle node click for path highlighting
  const handleNodeClick = (nodeId) => {
    if (highlightedPath === nodeId) {
      setHighlightedPath(null);
    } else {
      setHighlightedPath(nodeId);
      // Could add other effects here
    }
  };

  // Get status color based on node status
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-400';
      case 'warning': return 'bg-yellow-400';
      case 'inactive': return 'bg-gray-400';
      default: return 'bg-blue-400';
    }
  };

  // Calculate network stats
  const networkStats = {
    totalNodes: nodes.length,
    activeNodes: nodes.filter(n => n.status === 'active').length,
    totalConnections: connections.length,
    averageStrength: (connections.reduce((sum, conn) => sum + conn.strength, 0) / connections.length * 100).toFixed(0) + '%'
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96  rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setActiveNode(null);
      }}
    >
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-70"></div>
      
      {/* Background decorative circles */}
      {decorations.map(decoration => (
        <div
          key={decoration.id}
          className={`absolute border ${decoration.color} rounded-full transition-all duration-1000`}
          style={{
            left: `${decoration.x}%`,
            top: `${decoration.y}%`,
            width: `${decoration.size}px`,
            height: `${decoration.size}px`,
            opacity: hovering ? decoration.opacity * 1.5 : decoration.opacity,
            transform: hovering ? `scale(${1 + Math.random() * 0.3})` : 'scale(1)',
          }}
        />
      ))}
      
      {/* SVG for connections and paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.6" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Connection lines with varying styles based on type and strength */}
        {connections.map(connection => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          // Determine if this connection should be highlighted
          const isHighlighted = highlightedPath === connection.from || 
                               highlightedPath === connection.to ||
                               activeNode === connection.from || 
                               activeNode === connection.to;
          
          // Style based on connection type
          let strokeWidth, strokeDash, strokeOpacity, strokeColor;
          
          switch(connection.type) {
            case 'primary':
              strokeWidth = isHighlighted ? 2.5 : 1.8;
              strokeDash = "none";
              strokeOpacity = isHighlighted ? 0.9 : (hovering ? 0.7 : 0.5);
              strokeColor = "url(#connectionGradient)";
              break;
            case 'secondary':
              strokeWidth = isHighlighted ? 2 : 1.4;
              strokeDash = "none";
              strokeOpacity = isHighlighted ? 0.8 : (hovering ? 0.6 : 0.4);
              strokeColor = "url(#connectionGradient)";
              break;
            case 'tertiary':
              strokeWidth = isHighlighted ? 1.5 : 1;
              strokeDash = "4,4";
              strokeOpacity = isHighlighted ? 0.7 : (hovering ? 0.5 : 0.3);
              strokeColor = "#a5b4fc";
              break;
            default:
              strokeWidth = 1;
              strokeDash = "4,4";
              strokeOpacity = 0.3;
              strokeColor = "#d1d5db";
          }
          
          return (
            <g key={connection.id}>
              <line
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={strokeColor}
                strokeWidth={strokeWidth * connection.strength}
                strokeDasharray={strokeDash}
                strokeOpacity={strokeOpacity}
                strokeLinecap="round"
                filter={isHighlighted ? "url(#glow)" : "none"}
              />
              
              {/* Animated pulse for highlighted connections */}
              {isHighlighted && (
                <line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="#fff"
                  strokeWidth={strokeWidth * 1.2 * connection.strength}
                  strokeOpacity="0.5"
                  strokeDasharray="4,16"
                  strokeLinecap="round">
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="0" 
                    to="20" 
                    dur="1s" 
                    repeatCount="indefinite" 
                  />
                </line>
              )}
            </g>
          );
        })}
        
        {/* Data packets traveling along connections */}
        {dataPackets.map(packet => {
          const currentX = packet.fromX + (packet.toX - packet.fromX) * packet.progress;
          const currentY = packet.fromY + (packet.toY - packet.fromY) * packet.progress;
          
          // Get if this packet is on a highlighted path
          const isHighlighted = highlightedPath === packet.fromId || 
                               highlightedPath === packet.toId ||
                               activeNode === packet.fromId || 
                               activeNode === packet.toId;
          
          return (
            <g key={packet.id}>
              <circle
                cx={`${currentX}%`}
                cy={`${currentY}%`}
                r={packet.size}
                className={packet.color}
                opacity={1 - Math.abs(packet.progress - 0.5) * 0.5}
                filter={isHighlighted ? "url(#glow)" : "none"}
              >
                <animate 
                  attributeName="r" 
                  values={`${packet.size};${packet.size * 1.3};${packet.size}`} 
                  dur="0.8s" 
                  repeatCount="indefinite" 
                />
              </circle>
              
              {/* Trailing effect */}
              {packet.progress > 0.1 && (
                <circle
                  cx={`${packet.fromX + (packet.toX - packet.fromX) * (packet.progress - 0.1)}%`}
                  cy={`${packet.fromY + (packet.toY - packet.fromY) * (packet.progress - 0.1)}%`}
                  r={packet.size * 0.7}
                  className={packet.color.replace('500', '300')}
                  opacity={0.3}
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {/* User nodes with icons and interactive features */}
      {nodes.map(node => {
        const nodeType = nodeTypes[node.type];
        const IconComponent = nodeType.icon;
        const isActive = activeNode === node.id || highlightedPath === node.id;
        
        return (
          <div
            key={node.id}
            className={`absolute ${nodeType.primaryColor} rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              transform: `translate(-50%, -50%) ${isActive ? 'scale(1.15)' : (hovering ? 'scale(1.05)' : 'scale(1)')}`,
              boxShadow: isActive 
                ? `0 0 0 4px rgba(255,255,255,0.7), 0 0 20px rgba(37, 99, 235, 0.5)` 
                : `0 0 0 2px rgba(255,255,255,0.4), 0 4px 6px rgba(0,0,0,0.1)`,
              zIndex: isActive ? 30 : (node.id === 'center' ? 20 : 10)
            }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => handleNodeClick(node.id)}
          >
            <IconComponent 
              size={node.id === 'center' ? 28 : 20} 
              color="white" 
              strokeWidth={1.5} 
            />
            
            {/* Status indicator */}
            <div 
              className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(node.status)} rounded-full border-2 border-white`}
              style={{
                boxShadow: '0 0 0 2px rgba(255,255,255,0.2)'
              }}
            />
            
            {/* Animation rings on hover/active */}
            {isActive && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-white opacity-40 animate-ping" />
                <div className="absolute w-full h-full rounded-full border border-white opacity-30" style={{
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                  animationDelay: '0.5s',
                  transform: 'scale(1.3)'
                }} />
              </>
            )}
            
            {/* Node label */}
            {isActive && (
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-md whitespace-nowrap"
              >
                {node.label}
                <div className="text-xs text-gray-500 font-normal">
                  {node.connections} connection{node.connections !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Network statistics panel */}
      {showStats && (
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg text-sm flex space-x-6 items-center border border-blue-100/50 animate-fade-in"
          style={{
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)'
          }}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span className="font-medium text-gray-700">{networkStats.totalNodes} Nodes</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="font-medium text-gray-700">{networkStats.activeNodes} Active</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            <span className="font-medium text-gray-700">{networkStats.totalConnections} Links</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
            <span className="font-medium text-gray-700">{networkStats.averageStrength} Strength</span>
          </div>
        </div>
      )}
      
      {/* Interactive tooltip for active node */}
      {activeNode && (
        <div 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg text-sm border border-blue-100/50 animate-fade-in max-w-xs"
          style={{
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)'
          }}
        >
          <div className="flex items-center mb-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(nodes.find(n => n.id === activeNode)?.status || 'active')} mr-2`}></div>
            <h3 className="font-medium text-gray-800">{nodes.find(n => n.id === activeNode)?.label}</h3>
          </div>
          <div className="text-xs text-gray-600">
            {connections.filter(c => c.from === activeNode || c.to === activeNode).length} active connections
          </div>
          <div className="mt-2 text-xs text-blue-600 font-medium cursor-pointer" onClick={() => handleNodeClick(activeNode)}>
            {highlightedPath === activeNode ? 'Hide Path' : 'Show Path'}
          </div>
        </div>
      )}
      
      {/* Control buttons */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <button 
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
          onClick={() => setHighlightedPath(highlightedPath ? null : 'center')}
        >
          {highlightedPath 
            ? <Zap size={16} className="text-blue-500" /> 
            : <Activity size={16} className="text-gray-600" />
          }
        </button>
      </div>
    </div>
  );
};

export default EnhancedNetworkVisualization;