import React, { useState, useEffect } from 'react';

const Phase5 = ({ onShowResume }) => {
  const [showRocketExit, setShowRocketExit] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [rocketPosition, setRocketPosition] = useState({ x: 50, y: 50 });

  // Rocket exit animation
  useEffect(() => {
    const exitAnimation = setInterval(() => {
      setRocketPosition(prev => ({
        x: prev.x + 1,
        y: prev.y - 0.5
      }));
    }, 50);

    // After 4 seconds, show congratulations
    const congratsTimer = setTimeout(() => {
      setShowRocketExit(false);
      setShowCongratulations(true);
      clearInterval(exitAnimation);
    }, 4000);

    return () => {
      clearInterval(exitAnimation);
      clearTimeout(congratsTimer);
    };
  }, []);

  // Handle SPACE key to unlock resume
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === ' ' && showCongratulations) {
        onShowResume();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showCongratulations, onShowResume]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-blue-900 relative overflow-hidden">
      
      {/* CSS */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        @keyframes celebration {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-5deg) scale(1.1); }
          75% { transform: rotate(5deg) scale(1.1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Rocket Exit Animation */}
      {showRocketExit && (
        <>
          {/* Enhanced Starfield */}
          <div className="absolute inset-0">
            {[...Array(150)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Exiting Rocket */}
          <div 
            className="absolute transition-all duration-75 ease-linear"
            style={{
              left: `${rocketPosition.x}%`,
              top: `${rocketPosition.y}%`,
              transform: `rotate(-15deg) scale(${1 + (rocketPosition.x - 50) * 0.01})`,
              zIndex: 10
            }}
          >
            <img 
              src="/manush-patel/rocket.png" 
              alt="Spacecraft" 
              className="w-48 h-auto drop-shadow-2xl"
            />
          </div>

          {/* Exit Status */}
          <div className="absolute top-10 left-10 text-white text-xl font-mono">
            <div>Mission Status: ACCELERATING</div>
            <div className="mt-2 text-green-400">Exiting mission zone...</div>
          </div>
        </>
      )}

      {/* Mission Complete Screen */}
      {showCongratulations && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex items-center justify-center">
          
          {/* Celebration Stars */}
          <div className="absolute inset-0">
            {[...Array(200)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-yellow-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  animation: `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Main Congratulations Content */}
          <div className="text-center max-w-4xl mx-8 z-10" style={{animation: 'fadeInUp 1s ease-out'}}>
            
            {/* Mission Complete Badge */}
            <div className="mb-8" style={{animation: 'celebration 2s ease-in-out infinite'}}>
              <div className="text-8xl mb-4">🏆</div>
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4">
                MISSION COMPLETE
              </h1>
            </div>

            {/* Captain Message */}
            <div className="bg-black bg-opacity-50 rounded-lg p-8 mb-8 border-2 border-gold-400" style={{borderColor: '#FFD700'}}>
              <h2 className="text-4xl font-bold text-yellow-300 mb-6">
                🎉 CONGRATULATIONS CAPTAIN! 🎉
              </h2>
              <div className="text-xl text-white space-y-4 leading-relaxed">
                <p>You have successfully navigated through the cosmos of qualifications!</p>
                <p>Your mission performance was <span className="text-green-400 font-bold">EXEMPLARY</span></p>
              </div>
            </div>

            {/* Mission Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-900 bg-opacity-60 rounded-lg p-4 border border-blue-400">
                <div className="text-2xl mb-2">🎓</div>
                <div className="text-sm text-blue-300">Education</div>
                <div className="text-lg text-white font-bold">UNLOCKED</div>
              </div>
              <div className="bg-green-900 bg-opacity-60 rounded-lg p-4 border border-green-400">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-sm text-green-300">Experience</div>
                <div className="text-lg text-white font-bold">DECODED</div>
              </div>
              <div className="bg-purple-900 bg-opacity-60 rounded-lg p-4 border border-purple-400">
                <div className="text-2xl mb-2">🌟</div>
                <div className="text-sm text-purple-300">Community</div>
                <div className="text-lg text-white font-bold">RESTORED</div>
              </div>
              <div className="bg-yellow-900 bg-opacity-60 rounded-lg p-4 border border-yellow-400">
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-sm text-yellow-300">Mission</div>
                <div className="text-lg text-white font-bold">COMPLETE</div>
              </div>
            </div>

            {/* Final Resume Unlock */}
            <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-lg p-8 border-2 border-yellow-400">
              <h3 className="text-3xl font-bold text-yellow-300 mb-4">
                🔓 UNLOCK COMPLETE PERSONNEL FILE
              </h3>
              <p className="text-xl text-white mb-6">
                Access the full resume with all mission data compiled
              </p>
              <div className="text-2xl text-yellow-400 animate-pulse font-bold">
                Press SPACE to unlock the full resume
              </div>
            </div>

            {/* Captain Signature */}
            <div className="mt-8 text-lg text-gray-300">
              <div>- Mission Control</div>
              <div className="text-sm">Galactic Recruitment Division</div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Phase5;