import React, { useState, useEffect } from 'react';

const Phase2 = ({ onPhaseComplete }) => {
  const [showAsteroid, setShowAsteroid] = useState(false);
  const [asteroidPosition, setAsteroidPosition] = useState({ x: 80, y: 20 });
  const [asteroidVelocity, setAsteroidVelocity] = useState({ x: 2, y: 1.5 });
  const [asteroidClicked, setAsteroidClicked] = useState(false);
  const [showEducationOverlay, setShowEducationOverlay] = useState(false);
  const [flightPaused, setFlightPaused] = useState(false);

  // Start asteroid sequence after 4 seconds
  useEffect(() => {
    const asteroidTimer = setTimeout(() => {
      setShowAsteroid(true);
    }, 4000);

    return () => clearTimeout(asteroidTimer);
  }, []);

  // Move asteroid around screen with bouncing
  useEffect(() => {
    if (showAsteroid && !asteroidClicked) {
      const moveInterval = setInterval(() => {
        setAsteroidPosition(prev => {
          let newX = prev.x + asteroidVelocity.x;
          let newY = prev.y + asteroidVelocity.y;
          let newVelX = asteroidVelocity.x;
          let newVelY = asteroidVelocity.y;

          // Bounce off screen edges (accounting for asteroid size)
          if (newX <= 5 || newX >= 85) {
            newVelX = -newVelX;
            newX = newX <= 5 ? 5 : 85;
          }
          if (newY <= 5 || newY >= 75) {
            newVelY = -newVelY;
            newY = newY <= 5 ? 5 : 75;
          }

          // Update velocity for next frame
          setAsteroidVelocity({ x: newVelX, y: newVelY });

          return { x: newX, y: newY };
        });
      }, 50);

      return () => clearInterval(moveInterval);
    }
  }, [showAsteroid, asteroidClicked, asteroidVelocity]);

  const handleAsteroidClick = () => {
    setAsteroidClicked(true);
    setFlightPaused(true);
    
    // Show explosion effect briefly, then education overlay
    setTimeout(() => {
      setShowEducationOverlay(true);
    }, 800);
  };

  const closeEducationOverlay = () => {
    setShowEducationOverlay(false);
    setFlightPaused(false);
    // Continue to next phase
    onPhaseComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Moving Stars - Pause when flight is paused */}
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
      
      {/* CSS for moving stars */}
      <style>{`
        @keyframes moveDown {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        
        @keyframes explode {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(2) rotate(360deg); opacity: 0; }
        }
      `}</style>
      
      {/* Large Rocket SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          width="300" 
          height="700" 
          viewBox="0 0 300 700" 
        >
          {/* Rocket Body */}
          <ellipse cx="150" cy="400" rx="80" ry="120" fill="#E5E5E5" stroke="#000" strokeWidth="4"/>
          
          {/* Rocket Nose Cone */}
          <path d="M 70 280 Q 150 200 230 280 L 230 320 L 70 320 Z" fill="#FF0000" stroke="#000" strokeWidth="4"/>
          
          {/* Rocket Window */}
          <circle cx="150" cy="300" r="30" fill="#87CEEB" stroke="#000" strokeWidth="4"/>
          <circle cx="150" cy="300" r="20" fill="#87CEEB" stroke="#000" strokeWidth="2"/>
          
          {/* Rocket Fins */}
          <path d="M 70 470 Q 30 500 50 530 L 70 520 Z" fill="#FF0000" stroke="#000" strokeWidth="4"/>
          <path d="M 230 470 Q 270 500 250 530 L 230 520 Z" fill="#FF0000" stroke="#000" strokeWidth="4"/>
          
          {/* Rocket Base */}
          <rect x="70" y="470" width="160" height="50" fill="#D3D3D3" stroke="#000" strokeWidth="4"/>
          
          {/* Engine Nozzle */}
          <rect x="140" y="520" width="20" height="30" fill="#000" stroke="#000" strokeWidth="2"/>
          
          {/* Large Static Flame */}
          <path d="M 110 550 Q 150 620 190 550 Q 150 680 110 550" fill="#FF4500"/>
          <path d="M 120 550 Q 150 600 180 550 Q 150 660 120 550" fill="#FFD700"/>
          <path d="M 125 550 Q 150 580 175 550 Q 150 640 125 550" fill="#FF6347"/>
          <path d="M 130 550 Q 150 570 170 550 Q 150 620 130 550" fill="#FFA500"/>
        </svg>
      </div>
      
      {/* Asteroid - Made bigger and light gray */}
      {showAsteroid && !asteroidClicked && (
        <div
          className="absolute cursor-pointer hover:scale-110 transition-transform"
          style={{
            left: `${asteroidPosition.x}%`,
            top: `${asteroidPosition.y}%`,
            zIndex: 10
          }}
          onClick={handleAsteroidClick}
        >
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="#D3D3D3" stroke="#BBBBB" strokeWidth="3"/>
            <circle cx="45" cy="40" r="8" fill="#BBBBBB"/>
            <circle cx="80" cy="45" r="6" fill="#BBBBBB"/>
            <circle cx="50" cy="75" r="9" fill="#BBBBBB"/>
            <circle cx="75" cy="80" r="5" fill="#BBBBBB"/>
            <circle cx="35" cy="65" r="4" fill="#BBBBBB"/>
            <circle cx="85" cy="70" r="7" fill="#BBBBBB"/>
          </svg>
        </div>
      )}
      
      {/* Explosion Effect */}
      {asteroidClicked && !showEducationOverlay && (
        <div
          className="absolute text-6xl"
          style={{
            left: `${asteroidPosition.x}%`,
            top: `${asteroidPosition.y}%`,
            zIndex: 10,
            animation: 'explode 0.8s ease-out forwards'
          }}
        >
          💥
        </div>
      )}
      
      {/* Warning Message */}
      {showAsteroid && !asteroidClicked && (
        <div className="absolute top-10 right-10 bg-red-900 bg-opacity-80 text-white p-4 rounded-lg border-2 border-red-500 animate-pulse">
          <div className="text-xl font-bold text-red-300">⚠️ ASTEROID ALERT!</div>
          <div className="mt-2">Oh no, an asteroid is coming!</div>
          <div className="text-yellow-300 font-semibold">Click on it to deflect it!</div>
        </div>
      )}
      
      {/* Mission Status */}
      <div className="absolute top-10 left-10 text-white text-xl font-mono">
        <div>Mission Status: {flightPaused ? 'PAUSED' : 'IN FLIGHT'}</div>
        <div className="mt-2 text-yellow-400">
          {showEducationOverlay ? 'Accessing Educational Records...' : 'Scanning for obstacles...'}
        </div>
      </div>
      
      {/* Education Overlay */}
      {showEducationOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-8 max-w-5xl w-full mx-8 max-h-[85vh] overflow-y-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">🎓 Educational Background & Skills</h1>
              <p className="text-gray-600">Mission Log: Academic Achievements & Technical Arsenal Unlocked</p>
            </div>
            
            {/* Education Section */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b-2 border-blue-200 pb-2 inline-block">Education</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm max-w-3xl mx-auto">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-800">Smith School of Business, Queen's University</h3>
                  <p className="text-blue-600 font-semibold text-lg">Bachelor of Commerce and Computer Science Dual Degree</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                  <div className="mt-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">2021 – 2026 (Expected)</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Academic Achievements:</h4>
                  <div className="flex justify-center flex-wrap gap-2">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">🏆 D.I McLeod Dean's List</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🎓 Excellence Entrance Scholarship</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2 inline-block">Technical Skills</h2>
              
              {/* Programming Languages */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">💻 Programming Languages</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-w-3xl mx-auto">
                  <div className="flex justify-center flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium">Python</span>
                    <span className="bg-red-100 text-red-800 px-3 py-2 rounded-lg font-medium">Java</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg font-medium">TypeScript/JavaScript</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg font-medium">R</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg font-medium">C/C++</span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg font-medium">SQL</span>
                  </div>
                </div>
              </div>

              {/* Frameworks & Tools */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">🛠️ Frameworks & Tools</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-w-3xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">PowerBI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Tableau</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Azure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Jira</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Microsoft SQL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">MS Office</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">AWS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">RStudio</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Salesforce</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <div className="text-center">
              <button
                onClick={closeEducationOverlay}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Continue Mission →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase2;