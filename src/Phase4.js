import React, { useState, useEffect } from 'react';

const Phase4 = ({ onPhaseComplete }) => {
  const [showPowerFailure, setShowPowerFailure] = useState(false);
  const [showWirePuzzle, setShowWirePuzzle] = useState(false);
  const [showCommunityExperience, setShowCommunityExperience] = useState(false);
  const [flightPaused, setFlightPaused] = useState(false);
  
  // Wire puzzle state
  const wireColors = ['red', 'green', 'blue', 'yellow', 'orange'];
  const [leftWires] = useState(wireColors);
  const [rightWires, setRightWires] = useState([]);
  const [connections, setConnections] = useState({});
  const [draggedWire, setDraggedWire] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [showFailureOptions, setShowFailureOptions] = useState(false);

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
      }, 2000);
    }, 3000);

    return () => clearTimeout(failureTimer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (showWirePuzzle && !gameWon && !gameLost && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && showWirePuzzle && !gameWon) {
      setGameLost(true);
      setTimeout(() => {
        setShowFailureOptions(true);
      }, 1000);
    }
  }, [timeLeft, showWirePuzzle, gameWon, gameLost]);

  // Handle failure options
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showFailureOptions) {
        if (event.key === '1') {
          // Try again
          resetGame();
        } else if (event.key === '2') {
          // Show community experience
          setShowCommunityExperience(true);
          setShowFailureOptions(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFailureOptions]);

  const resetGame = () => {
    setConnections({});
    setTimeLeft(15);
    setGameWon(false);
    setGameLost(false);
    setShowFailureOptions(false);
    const shuffled = [...wireColors].sort(() => Math.random() - 0.5);
    setRightWires(shuffled);
  };

  const handleDragStart = (wire, side) => {
    setDraggedWire({ wire, side });
  };

  const handleDrop = (targetWire, targetSide) => {
    if (!draggedWire) return;
    
    const { wire: draggedColor, side: draggedSide } = draggedWire;
    
    // Only allow connecting left to right
    if (draggedSide === 'left' && targetSide === 'right') {
      if (draggedColor === targetWire) {
        // Correct connection
        setConnections(prev => ({
          ...prev,
          [draggedColor]: targetWire
        }));
        
        // Check if all wires are connected correctly
        const newConnections = { ...connections, [draggedColor]: targetWire };
        if (Object.keys(newConnections).length === 5) {
          setGameWon(true);
          setTimeout(() => {
            setShowCommunityExperience(true);
          }, 2000);
        }
      } else {
        // Wrong connection - visual feedback handled by CSS animation
      }
    }
    
    setDraggedWire(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getWireColor = (color) => {
    const colors = {
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF',
      yellow: '#FFFF00',
      orange: '#FFA500'
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .wire-endpoint {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid #333;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wire-endpoint:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px currentColor;
        }
        .wire-line {
          height: 4px;
          background: linear-gradient(90deg, currentColor, currentColor);
          position: relative;
          border-radius: 2px;
        }
      `}</style>
      
      {/* Rocket */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="300" height="700" viewBox="0 0 300 700">
          <ellipse cx="150" cy="400" rx="80" ry="120" fill="#E5E5E5" stroke="#000" strokeWidth="4"/>
          <path d="M 70 280 Q 150 200 230 280 L 230 320 L 70 320 Z" fill="#FF0000" stroke="#000" strokeWidth="4"/>
          <circle cx="150" cy="300" r="30" fill="#87CEEB" stroke="#000" strokeWidth="4"/>
          <circle cx="150" cy="300" r="20" fill="#87CEEB" stroke="#000" strokeWidth="2"/>
          <path d="M 70 470 Q 30 500 50 530 L 70 520 Z" fill="#FF0000" stroke="#000" strokeWidth="4"/>
          <path d="M 230 470 Q 270 500 250 530 L 230 520 Z" fill="#FF0000" stroke="#000" strokeWidth="4"/>
          <rect x="70" y="470" width="160" height="50" fill="#D3D3D3" stroke="#000" strokeWidth="4"/>
          <rect x="140" y="520" width="20" height="30" fill="#000" stroke="#000" strokeWidth="2"/>
          <path d="M 110 550 Q 150 620 190 550 Q 150 680 110 550" fill="#FF4500"/>
          <path d="M 120 550 Q 150 600 180 550 Q 150 660 120 550" fill="#FFD700"/>
          <path d="M 125 550 Q 150 580 175 550 Q 150 640 125 550" fill="#FF6347"/>
          <path d="M 130 550 Q 150 570 170 550 Q 150 620 130 550" fill="#FFA500"/>
        </svg>
      </div>
      
      {/* Power Failure Alert */}
      {showPowerFailure && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
          <div className="bg-red-900 border-2 border-red-500 rounded-lg p-8 max-w-2xl mx-8" style={{animation: 'flicker 1s infinite'}}>
            <div className="text-center text-red-300 font-mono">
              <div className="text-3xl mb-4">⚠️ CRITICAL SYSTEM FAILURE</div>
              <div className="text-xl mb-4">POWER SYSTEMS OFFLINE</div>
              <div className="text-lg">Emergency repair protocol initiated...</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Wire Puzzle */}
      {showWirePuzzle && !showCommunityExperience && (
        <div className="absolute inset-0 bg-black bg-opacity-95 flex items-center justify-center z-20">
          <div className="bg-gray-900 rounded-lg p-8 max-w-5xl mx-8 border-2 border-red-500">
            
            {/* Header with countdown */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">⚡ EMERGENCY POWER REPAIR ⚡</h2>
              <div className="text-6xl font-bold text-red-500 mb-4" style={{animation: timeLeft <= 3 ? 'flicker 0.5s infinite' : 'none'}}>
                {timeLeft}
              </div>
              <div className="text-yellow-400 text-lg">Match all 5 wires to restore power in 15 seconds!</div>
            </div>
            
            {/* Wire Puzzle Area */}
            <div className="flex justify-between items-center mb-8">
              
              {/* Left Side - Wire Sources */}
              <div className="flex flex-col space-y-6">
                <div className="text-green-400 font-bold text-lg mb-2">POWER SOURCE</div>
                {leftWires.map((color, index) => (
                  <div key={color} className="flex items-center space-x-4">
                    <div
                      draggable
                      onDragStart={() => handleDragStart(color, 'left')}
                      className="wire-endpoint cursor-grab active:cursor-grabbing"
                      style={{ backgroundColor: getWireColor(color) }}
                    />
                    <div 
                      className="wire-line w-24"
                      style={{ color: getWireColor(color) }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Center - Connection Status */}
              <div className="text-center px-8">
                <div className="text-2xl mb-4">⚡</div>
                <div className="text-sm text-gray-400">
                  Connected: {Object.keys(connections).length}/5
                </div>
              </div>
              
              {/* Right Side - Wire Destinations */}
              <div className="flex flex-col space-y-6">
                <div className="text-blue-400 font-bold text-lg mb-2">SYSTEM INPUT</div>
                {rightWires.map((color, index) => (
                  <div key={`${color}-${index}`} className="flex items-center space-x-4 flex-row-reverse">
                    <div
                      onDrop={() => handleDrop(color, 'right')}
                      onDragOver={handleDragOver}
                      className={`wire-endpoint ${connections[color] ? 'ring-4 ring-green-400' : ''}`}
                      style={{ backgroundColor: getWireColor(color) }}
                    />
                    <div 
                      className="wire-line w-24"
                      style={{ color: getWireColor(color) }}
                    />
                  </div>
                ))}
              </div>
              
            </div>
            
            {gameWon && (
              <div className="text-center mt-6">
                <div className="text-3xl text-green-400 mb-2">🎉 POWER RESTORED! 🎉</div>
                <div className="text-xl text-yellow-300">All systems online</div>
                <div className="text-lg mt-2">Accessing community database...</div>
              </div>
            )}
            
            {gameLost && !showFailureOptions && (
              <div className="text-center mt-6">
                <div className="text-3xl text-red-400 mb-2">⚡ POWER FAILURE ⚡</div>
                <div className="text-lg">Emergency protocols activated...</div>
              </div>
            )}
            
            {showFailureOptions && (
              <div className="text-center mt-6">
                <div className="text-xl mb-4 text-yellow-400">EMERGENCY OPTIONS:</div>
                <div className="text-lg space-y-2 text-white">
                  <div>Press <span className="text-red-400 font-bold">1</span> to Attempt Emergency Repair</div>
                  <div>Press <span className="text-blue-400 font-bold">2</span> to Access Backup Systems</div>
                </div>
              </div>
            )}
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
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-8 max-w-6xl w-full mx-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">🌟 Community Impact Portfolio</h1>
              <p className="text-gray-600">
                {gameWon ? 'Power Restored: Community Experience Unlocked' : 'Backup Systems: Community Database Access'}
              </p>
            </div>
            
            <div className="space-y-8">
              
              {/* Educational Growth Coordinator */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Educational Growth Coordinator</h3>
                  <p className="text-green-600 font-semibold text-lg">OpenAI</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Jan. 2025 – Present</span>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• Consulted OpenAI's EDU strategy team on launching a ChatGPT Plus discount for university students, analyzing student engagement trends and recommending high-impact promotional strategies to reach 100,000+ students.</p>
                  <p>• Developed and executed a promotional strategy, conducting user research through surveys and focus groups with 20 student organizations to assess engagement preferences, and leveraging Power BI to analyze findings and present insights.</p>
                  <p>• Supported corporate strategy initiatives by tracking OKRs and conducting ad hoc performance analysis, leveraging data-driven insights to optimize key business processes and improve decision-making for senior leadership.</p>
                </div>
              </div>

              {/* Product Manager */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Product Manager</h3>
                  <p className="text-blue-600 font-semibold text-lg">Queen's Tech & Media Association</p>
                  <p className="text-gray-600">Kingston, Canada</p>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Sep. 2021 – Apr. 2024</span>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• Spearheaded a team of 4 developers and 4 business analysts to develop Pantree, a product that sends automated notifications to remind the users of their groceries in their pantry and the meals that can be cooked with those groceries.</p>
                  <p>• Utilized Node.js and React.js to work on front-end development of product; had 100 users on the platform within a month.</p>
                  <p>• Won First Place in the demo day competition presenting to McKinsey and Company.</p>
                </div>
              </div>

            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={closeCommunityExperience}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Complete Mission →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase4;