import React, { useState, useEffect } from 'react';

const Phase4 = ({ onPhaseComplete }) => {
  const [showPowerFailure, setShowPowerFailure] = useState(false);
  const [showWirePuzzle, setShowWirePuzzle] = useState(false);
  const [showCommunityExperience, setShowCommunityExperience] = useState(false);
  const [flightPaused, setFlightPaused] = useState(false);
  const [revealedPositions, setRevealedPositions] = useState({
    openai: false,
    queens: false
  });
  
  // Wire puzzle state
  const wireColors = ['red', 'green', 'blue', 'yellow', 'orange'];
  const [leftWires] = useState(wireColors);
  const [rightWires, setRightWires] = useState([]);
  const [connections, setConnections] = useState({});
  const [draggedWire, setDraggedWire] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  // Initialize shuffled right wires
  useEffect(() => {
    const shuffled = [...wireColors].sort(() => Math.random() - 0.5);
    setRightWires(shuffled);
  }, []);

  // Start power failure after 3 seconds
  useEffect(() => {
    const failureTimer = setTimeout(() => {
      setShowPowerFailure(true);
      setFlightPaused(true);
      
      // Start wire puzzle after showing power failure message
      setTimeout(() => {
        setShowWirePuzzle(true);
        setShowPowerFailure(false);
      }, 3000);
    }, 3000);

    return () => clearTimeout(failureTimer);
  }, []);

  const resetGame = () => {
    setConnections({});
    setGameWon(false);
    const shuffled = [...wireColors].sort(() => Math.random() - 0.5);
    setRightWires(shuffled);
  };

  const handleDragStart = (e, color, side) => {
    setDraggedWire({ color, side });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColor, targetSide) => {
    e.preventDefault();
    if (!draggedWire) return;
    
    const { color: draggedColor, side: draggedSide } = draggedWire;
    
    // Only allow connecting left to right or right to left
    if (draggedSide !== targetSide && draggedColor === targetColor) {
      // Correct connection
      setConnections(prev => ({
        ...prev,
        [draggedColor]: targetColor
      }));
      
      // Check if all wires are connected correctly
      const newConnections = { ...connections, [draggedColor]: targetColor };
      if (Object.keys(newConnections).length === 5) {
        setGameWon(true);
        setTimeout(() => {
          setShowCommunityExperience(true);
        }, 2000);
      }
    }
    
    setDraggedWire(null);
  };

  const getWireColor = (color) => {
    const colors = {
      red: '#ef4444',
      green: '#22c55e',
      blue: '#3b82f6',
      yellow: '#eab308',
      orange: '#f97316'
    };
    return colors[color];
  };

  const closeCommunityExperience = () => {
    setShowCommunityExperience(false);
    setFlightPaused(false);
    onPhaseComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Moving Stars */}
      <div className={`absolute inset-0 ${flightPaused ? '' : 'animate-pulse'}`}>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: flightPaused ? 'none' : `moveDown ${Math.random() * 3 + 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* CSS */}
      <style>{`
        @keyframes moveDown {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes emergencyPulse {
          0%, 100% { background-color: rgba(239, 68, 68, 0.1); }
          50% { background-color: rgba(239, 68, 68, 0.3); }
        }
      `}</style>
      
      {/* Custom Rocket Image with Flame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Animated Flame */}
          <div className="absolute left-1/2 transform -translate-x-1/2" 
               style={{ 
                 top: '240px',
                 zIndex: 5
               }}>
            <img 
              src="/flame.gif" 
              alt="Rocket Flame" 
              className="w-40 h-auto"
              style={{ 
                transform: 'rotate(180deg)',
                filter: 'brightness(1.3) contrast(1.2)',
                maxWidth: 'none'
              }}
              onError={(e) => {
                if (e.target.src.includes('/flame.gif')) {
                  e.target.src = '/manush-patel/flame.gif';
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
          </div>
          
          <img 
            src="/manush-patel/rocket.png" 
            alt="Spacecraft" 
            className="w-64 h-auto drop-shadow-2xl relative z-10"
          />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl scale-150 -z-10"></div>
        </div>
      </div>
      
      {/* Modern Power Failure Alert */}
      {showPowerFailure && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="max-w-3xl mx-auto px-8">
            
            {/* Modern Terminal Window */}
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-500/50 overflow-hidden" 
                 style={{boxShadow: '0 0 50px rgba(239, 68, 68, 0.4)', animation: 'emergencyPulse 2s infinite'}}>
              
              {/* Terminal Header */}
              <div className="bg-red-900/50 px-6 py-4 border-b border-red-600/50 flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <span className="text-red-300 text-sm font-medium ml-4">EMERGENCY ALERT SYSTEM v1.0</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-8 font-mono">
                <div className="space-y-4">
                  
                  <div className="text-red-300 text-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>CRITICAL SYSTEM FAILURE</span>
                  </div>
                  
                  <div className="text-slate-300 text-xl flex items-center justify-center">
                    <span className="text-red-400 mr-3">→</span>
                    <span>POWER SYSTEMS OFFLINE</span>
                  </div>
                  
                  <div className="text-slate-300 text-lg flex items-center justify-center">
                    <span className="text-red-400 mr-3">→</span>
                    <span>Emergency repair protocol initiated...</span>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="flex space-x-1">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.2}s`}}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modern Wire Puzzle */}
      {showWirePuzzle && !showCommunityExperience && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="max-w-6xl mx-auto px-8 w-full">
            
            {/* Modern Terminal Window */}
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden max-h-[90vh] flex flex-col" 
                 style={{boxShadow: '0 0 50px rgba(239, 68, 68, 0.3)'}}>
              
              {/* Terminal Header */}
              <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600/50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-400 text-sm font-medium ml-4">Emergency Repair Interface v2.8</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 text-xs font-medium">CRITICAL</span>
                </div>
              </div>

              {/* Terminal Content - Scrollable */}
              <div className="p-8 font-mono flex-1 overflow-y-auto">
                
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-red-400 mb-2">⚡ EMERGENCY POWER REPAIR ⚡</h2>
                  <div className="text-slate-400 text-sm">System power restoration required</div>
                </div>
                
                {/* Connection Status */}
                <div className="text-center mb-6">
                  <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 inline-block">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-slate-300 font-medium">
                        Connections: {Object.keys(connections).length}/5
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Wire Puzzle Area */}
                <div className="flex justify-between items-center mb-8 px-8">
                  
                  {/* Left Side - Power Source */}
                  <div className="flex flex-col space-y-6">
                    <div className="text-green-400 font-bold text-lg mb-4 text-center">POWER SOURCE</div>
                    {leftWires.map((color) => (
                      <div key={`left-${color}`} className="flex items-center space-x-2">
                        <div
                          draggable={!connections[color]}
                          onDragStart={(e) => handleDragStart(e, color, 'left')}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                            connections[color] 
                              ? 'opacity-50 cursor-not-allowed border-gray-500' 
                              : 'cursor-grab active:cursor-grabbing hover:scale-110 border-white/50 hover:border-white shadow-lg'
                          } ${
                            draggedWire?.color === color && draggedWire?.side === 'left'
                              ? 'ring-4 ring-white/50 scale-110'
                              : ''
                          }`}
                          style={{ backgroundColor: getWireColor(color) }}
                        />
                        <div 
                          className="h-3 w-32 rounded-full relative overflow-hidden"
                          style={{ backgroundColor: '#374151' }}
                        >
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: connections[color] ? '100%' : '0%',
                              backgroundColor: getWireColor(color),
                            }}
                          />
                        </div>
                        <div className="text-xs text-slate-400 font-mono w-16">
                          {color.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Center - Connection Visualization */}
                  <div className="text-center px-12 relative">
                    <div className="text-6xl mb-4 animate-pulse">⚡</div>
                    <div className="text-sm text-gray-400 mb-4">
                      Drag wires to matching colors
                    </div>
                  </div>
                  
                  {/* Right Side - System Input */}
                  <div className="flex flex-col space-y-6">
                    <div className="text-blue-400 font-bold text-lg mb-4 text-center">SYSTEM INPUT</div>
                    {rightWires.map((color, index) => (
                      <div key={`right-${color}-${index}`} className="flex items-center space-x-2 flex-row-reverse">
                        <div
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, color, 'right')}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                            connections[color] 
                              ? 'ring-4 ring-green-400/50 border-green-400 shadow-lg shadow-green-400/25' 
                              : 'border-dashed border-white/30 hover:border-white/60 hover:scale-105'
                          } ${
                            draggedWire?.color === color && draggedWire?.side !== 'right'
                              ? 'ring-4 ring-yellow-400/70 border-yellow-400 scale-110'
                              : ''
                          }`}
                          style={{ 
                            backgroundColor: connections[color] ? getWireColor(color) : 'transparent',
                          }}
                        />
                        <div 
                          className="h-3 w-32 rounded-full relative overflow-hidden"
                          style={{ backgroundColor: '#374151' }}
                        >
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: connections[color] ? '100%' : '0%',
                              backgroundColor: getWireColor(color),
                            }}
                          />
                        </div>
                        <div className="text-xs text-slate-400 font-mono w-16 text-right">
                          {color.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Game States */}
                {gameWon && (
                  <div className="text-center">
                    <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                      <div className="text-3xl text-green-400 mb-3">🎉 POWER RESTORED! 🎉</div>
                      <div className="text-xl text-yellow-300">All systems online</div>
                      <div className="mt-4 flex justify-center">
                        <div className="flex space-x-1">
                          {[0,1,2].map(i => (
                            <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.2}s`}}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mission Status */}
      <div className="absolute top-10 left-10 text-white text-xl font-mono">
        <div>Mission Status: {flightPaused ? 'EMERGENCY' : 'IN FLIGHT'}</div>
        <div className="mt-2 text-yellow-400">
          {showCommunityExperience ? 'Accessing Community Records...' : 'Power systems critical...'}
        </div>
      </div>
      
      {/* Community Experience Overlay */}
      {showCommunityExperience && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-indigo-900/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50">
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-purple-900/90 via-orange-900/90 to-slate-900/90 p-8 border-b border-slate-700/50">
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeCommunityExperience}
                  className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center hover:bg-slate-700/80 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/25">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Community Impact Portfolio</h1>
                <p className="text-slate-300 text-lg">Power Restored: Community Experience Unlocked</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative p-8 overflow-y-auto max-h-[60vh]">
              
              <div className="space-y-8">
                
                {/* Educational Growth Coordinator */}
                <div className="bg-gradient-to-br from-slate-800/50 to-green-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Educational Growth Coordinator</h3>
                    <p className="text-green-300 font-semibold text-lg">OpenAI • Jan. 2025 – Mar. 2025</p>
                  </div>
                  
                  {/* Blurred Content Area */}
                  <div className="relative">
                    <div 
                      className={`transition-all duration-500 ${
                        revealedPositions.openai ? 'filter-none' : 'filter blur-md'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Role Description - Left */}
                        <div>
                          <h4 className="text-lg font-semibold text-green-300 mb-3">Role Overview</h4>
                          <p className="text-slate-200 leading-relaxed">
                            Collaborated with OpenAI's education strategy team to expand ChatGPT Plus access to university students. 
                            Focused on user research, promotional strategy development, and corporate performance analysis to drive 
                            educational technology adoption across academic institutions.
                          </p>
                        </div>
                        
                        {/* Key Achievements - Right */}
                        <div>
                          <h4 className="text-lg font-semibold text-green-300 mb-3">Key Achievements</h4>
                          <div className="space-y-2 text-slate-200">
                            <div className="flex items-start space-x-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>Reached 100,000+ students through promotional campaigns</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>Conducted research with 20 student organizations</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>Optimized corporate strategy through OKR tracking</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Click to Reveal Overlay */}
                    {!revealedPositions.openai && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm rounded-xl cursor-pointer hover:bg-slate-900/30 transition-all duration-200"
                        onClick={() => setRevealedPositions(prev => ({ ...prev, openai: true }))}
                      >
                        <div className="text-center">
                          <div className="inline-flex items-center px-6 py-3 bg-green-500/20 text-green-300 rounded-full font-medium border border-green-500/30 hover:bg-green-500/30 transition-all duration-200">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Click to Reveal
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Manager */}
                <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Product Manager</h3>
                    <p className="text-blue-300 font-semibold text-lg">Queen's Tech & Media Association • Sep. 2021 – Apr. 2024</p>
                  </div>
                  
                  {/* Blurred Content Area */}
                  <div className="relative">
                    <div 
                      className={`transition-all duration-500 ${
                        revealedPositions.queens ? 'filter-none' : 'filter blur-md'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Role Description - Left */}
                        <div>
                          <h4 className="text-lg font-semibold text-blue-300 mb-3">Role Overview</h4>
                          <p className="text-slate-200 leading-relaxed">
                            Led cross-functional product development for Pantree, an innovative grocery management application. 
                            Managed a diverse team of developers and business analysts while contributing to front-end development 
                            and strategic product positioning.
                          </p>
                        </div>
                        
                        {/* Key Achievements - Right */}
                        <div>
                          <h4 className="text-lg font-semibold text-blue-300 mb-3">Key Achievements</h4>
                          <div className="space-y-2 text-slate-200">
                            <div className="flex items-start space-x-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>Led team of 8 members (4 developers + 4 business analysts)</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>Achieved 100 users within first month of launch</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>Won First Place presenting to McKinsey & Company</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Click to Reveal Overlay */}
                    {!revealedPositions.queens && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm rounded-xl cursor-pointer hover:bg-slate-900/30 transition-all duration-200"
                        onClick={() => setRevealedPositions(prev => ({ ...prev, queens: true }))}
                      >
                        <div className="text-center">
                          <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 text-blue-300 rounded-full font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Click to Reveal
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
            
            {/* Footer */}
            <div className="relative bg-slate-900/50 backdrop-blur-sm px-8 py-6 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Phase 3 Complete • Community Experience Unlocked
                </div>
                <button
                  onClick={closeCommunityExperience}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/20"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-lg">Complete Mission</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase4;