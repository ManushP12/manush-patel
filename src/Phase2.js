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

  // Move asteroid with natural curved path
  useEffect(() => {
    if (showAsteroid && !asteroidClicked) {
      let angle = Math.random() * Math.PI * 2; // Random starting direction
      let speed = 1.5 + Math.random() * 1; // Random speed between 1.5-2.5
      
      const moveInterval = setInterval(() => {
        setAsteroidPosition(prev => {
          // Add slight curve to the movement
          angle += (Math.random() - 0.5) * 0.1; // Slight direction changes
          
          const newX = prev.x + Math.cos(angle) * speed;
          const newY = prev.y + Math.sin(angle) * speed;
          
          // Keep asteroid on screen with gentle course corrections
          let correctedX = newX;
          let correctedY = newY;
          
          // Gentle boundaries - redirect instead of bounce
          if (newX < 5) {
            correctedX = 5;
            angle = Math.random() * Math.PI; // Point right-ish
          } else if (newX > 85) {
            correctedX = 85;
            angle = Math.PI + Math.random() * Math.PI; // Point left-ish
          }
          
          if (newY < 5) {
            correctedY = 5;
            angle = Math.random() * Math.PI - Math.PI/2; // Point down-ish
          } else if (newY > 75) {
            correctedY = 75;
            angle = Math.random() * Math.PI + Math.PI/2; // Point up-ish
          }
          
          return { x: correctedX, y: correctedY };
        });
      }, 50);

      return () => clearInterval(moveInterval);
    }
  }, [showAsteroid, asteroidClicked]);

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
      
      {/* CSS */}
      <style>{`
        @keyframes moveDown {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }
        @keyframes explode {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(2) rotate(360deg); opacity: 0; }
        }
      `}</style>
      
      {/* Custom Rocket Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img 
            src="/manush-patel/rocket.png" 
            alt="Spacecraft" 
            className="w-64 h-auto drop-shadow-2xl"
          />
          {/* Optional glow effect behind the rocket */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl scale-150 -z-10"></div>
        </div>
      </div>
      
      {/* Modern UI Elements */}
      <div className="absolute top-6 left-6 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="text-white font-mono text-sm">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Mission Status: IN FLIGHT</span>
          </div>
          <div className="text-yellow-400 text-xs">Scanning for obstacles...</div>
        </div>
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
            <circle cx="60" cy="60" r="50" fill="#D3D3D3" stroke="#BBBBBB" strokeWidth="3"/>
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
        <div className="absolute top-6 right-6 bg-red-900/80 backdrop-blur-sm text-white p-4 rounded-xl border border-red-500/50 animate-pulse">
          <div className="text-lg font-bold text-red-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            ASTEROID ALERT!
          </div>
          <div className="mt-1 text-sm">Oh no, an asteroid is coming!</div>
          <div className="text-yellow-300 font-semibold text-sm mt-1">Click on it to deflect it!</div>
        </div>
      )}
      
      {/* Education Overlay - Enhanced Dark Design */}
      {showEducationOverlay && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-indigo-900/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50">
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-indigo-900/90 via-blue-900/90 to-slate-900/90 p-8 border-b border-slate-700/50">
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeEducationOverlay}
                  className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center hover:bg-slate-700/80 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Education</h1>
                <p className="text-slate-300 text-lg">Academic credentials and technical expertise unlocked</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative p-8 overflow-y-auto max-h-[60vh]">
              
              {/* Education Card */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-slate-800/50 to-indigo-900/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Smith School of Business</h3>
                    <p className="text-slate-300 mb-2">Queen's University</p>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4 border border-blue-500/30">
                      2021 – 2026
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-semibold text-blue-300 mb-2">Bachelor of Commerce and Computer Science</h4>
                    <p className="text-slate-200 font-medium mb-1">Dual Degree Program</p>
                    <p className="text-slate-400">Toronto, Canada</p>
                  </div>
                  
                  <div className="text-center">
                    <h5 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">Academic Honors</h5>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-yellow-300 font-medium text-sm">D.I McLeod Dean's List</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-300 font-medium text-sm">Excellence Entrance Scholarship</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Skills Section */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Technical Expertise</h2>
                  <p className="text-slate-400">Comprehensive programming and technology stack</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Programming Languages */}
                  <div className="bg-gradient-to-br from-slate-800/40 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">Programming Languages</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['Python', 'Java', 'TypeScript', 'JavaScript', 'R', 'C/C++', 'SQL'].map((lang) => (
                        <div key={lang} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-slate-200 font-medium text-sm">{lang}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Frameworks */}
                  <div className="bg-gradient-to-br from-slate-800/40 to-orange-900/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">Tools & Platforms</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['PowerBI', 'Tableau', 'Azure', 'AWS', 'Jira', 'MS Office', 'RStudio', 'Salesforce'].map((tool) => (
                        <div key={tool} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-slate-200 font-medium text-sm">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Continue Mission Button */}
            <div className="relative bg-slate-900/50 backdrop-blur-sm px-8 py-6 border-t border-slate-700/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-400 text-center sm:text-left">
                  Phase 1 Complete • Education & Skills Unlocked
                </div>
                <button
                  onClick={closeEducationOverlay}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/20"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-lg font-bold">Continue Mission</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase2;