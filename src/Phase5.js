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
        @keyframes slideInScale {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.3); }
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-black overflow-y-auto py-8 px-8">
          
          {/* Subtle Background Stars */}
          <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Main Content Container */}
          <div className="max-w-4xl w-full mx-auto min-h-full flex flex-col justify-center" style={{animation: 'fadeInUp 1s ease-out'}}>
            
            {/* Success Header */}
            <div className="text-center mb-8 pt-4" style={{animation: 'slideInScale 1s ease-out 0.2s both'}}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mb-6 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Mission Complete
              </h1>
              <p className="text-xl text-slate-300">
                You have successfully navigated through all phases
              </p>
            </div>

            {/* Mission Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" style={{animation: 'slideInScale 1s ease-out 0.4s both'}}>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center hover:bg-slate-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
                <p className="text-sm text-blue-400 font-medium">UNLOCKED</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center hover:bg-slate-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Experience</h3>
                <p className="text-sm text-green-400 font-medium">DECODED</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center hover:bg-slate-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                <p className="text-sm text-purple-400 font-medium">RESTORED</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center hover:bg-slate-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Mission</h3>
                <p className="text-sm text-orange-400 font-medium">COMPLETE</p>
              </div>
            </div>

            {/* Resume Access Card */}
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-600/50 shadow-2xl" style={{animation: 'slideInScale 1s ease-out 0.6s both'}}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Complete Resume Access
                </h2>
                
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  All mission data has been compiled and is ready for review. Access the complete professional profile with detailed information from all phases.
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={onShowResume}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-blue-500/30"
                    style={{animation: 'glow 2s ease-in-out infinite'}}
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Open Complete Resume
                  </button>
                  
                  <div className="text-sm text-slate-400">
                    <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">SPACE</kbd> 
                    <span className="ml-2">Quick keyboard access</span>
                  </div>
                </div>
              </div>
            </div>

      

          </div>
        </div>
      )}
    </div>
  );
};

export default Phase5;