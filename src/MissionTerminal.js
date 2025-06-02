import React, { useState, useEffect } from 'react';

// Import phase components with error handling
let Phase2, Phase3, Phase4, Phase5;

try {
  Phase2 = require('./Phase2').default;
} catch (error) {
  console.error('Phase2 not found, using placeholder');
  Phase2 = ({ onPhaseComplete }) => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Phase 2 - Education (Placeholder)</h2>
        <button 
          onClick={onPhaseComplete}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Continue to Phase 3
        </button>
      </div>
    </div>
  );
}

try {
  Phase3 = require('./Phase3').default;
} catch (error) {
  console.error('Phase3 not found, using placeholder');
  Phase3 = ({ onPhaseComplete }) => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Phase 3 - Work Experience (Placeholder)</h2>
        <button 
          onClick={onPhaseComplete}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Continue to Phase 4
        </button>
      </div>
    </div>
  );
}

try {
  Phase4 = require('./Phase4').default;
} catch (error) {
  console.error('Phase4 not found, using placeholder');
  Phase4 = ({ onPhaseComplete }) => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Phase 4 - Community Experience (Placeholder)</h2>
        <button 
          onClick={onPhaseComplete}
          className="bg-purple-500 px-4 py-2 rounded text-white"
        >
          Continue to Phase 5
        </button>
      </div>
    </div>
  );
}

try {
  Phase5 = require('./Phase5').default;
} catch (error) {
  console.error('Phase5 not found, using placeholder');
  Phase5 = ({ onShowResume }) => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Phase 5 - Mission Complete (Placeholder)</h2>
        <button 
          onClick={onShowResume}
          className="bg-yellow-500 px-4 py-2 rounded text-black"
        >
          Show Resume
        </button>
      </div>
    </div>
  );
}

const MissionTerminal = ({ onShowProfessional }) => {
  const [currentPhase, setCurrentPhase] = useState('terminal');
  const [terminalLines, setTerminalLines] = useState([]);
  const [showLaunchPrompt, setShowLaunchPrompt] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(null);
  const [showResume, setShowResume] = useState(false);

  const bootMessages = [
    "Initializing systems...",
    "Connecting to remote resume server...",
    "Authenticating user...",
    "Access granted.",
    "Launch sequence in standby mode."
  ];

  useEffect(() => {
    if (currentPhase === 'terminal') {
      let messageIndex = 0;
      const typewriterInterval = setInterval(() => {
        if (messageIndex < bootMessages.length) {
          setTerminalLines(prev => [...prev, `> ${bootMessages[messageIndex]}`]);
          messageIndex++;
        } else {
          clearInterval(typewriterInterval);
          setTimeout(() => {
            setShowLaunchPrompt(true);
          }, 1000);
        }
      }, 800);

      return () => clearInterval(typewriterInterval);
    }
  }, [currentPhase]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && showLaunchPrompt && !isLaunching) {
        setIsLaunching(true);
        
        // Countdown sequence: 3, 2, 1, LIFTOFF
        setTimeout(() => setCountdownNumber(3), 500);
        setTimeout(() => setCountdownNumber(null), 1500);
        
        setTimeout(() => setCountdownNumber(2), 2000);
        setTimeout(() => setCountdownNumber(null), 3000);
        
        setTimeout(() => setCountdownNumber(1), 3500);
        setTimeout(() => setCountdownNumber(null), 4500);
        
        setTimeout(() => setCountdownNumber('LIFTOFF'), 5000);
        setTimeout(() => {
          setCurrentPhase('phase2');
        }, 6500);
      }
      
      // Add SPACE key to skip to resume
      if (event.key === ' ' && (currentPhase === 'terminal' || showLaunchPrompt)) {
        setShowResume(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showLaunchPrompt, isLaunching, currentPhase]);

  // Handle phase completion
  const handlePhase2Complete = () => {
    setCurrentPhase('phase3');
  };

  const handlePhase3Complete = () => {
    setCurrentPhase('phase4');
  };

  const handlePhase4Complete = () => {
    setCurrentPhase('phase5');
  };

  const handlePhase5Complete = () => {
    setShowResume(true);
  };

  const TerminalScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        
        {/* Modern Terminal Window */}
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          
          {/* Terminal Header */}
          <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600/50 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-slate-400 text-sm font-medium ml-4">Mission Terminal v2.1</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-8 font-mono">
            <div className="space-y-3">
              {terminalLines.map((line, index) => (
                <div key={index} className="text-slate-300 text-lg flex items-center">
                  <span className="text-emerald-400 mr-2">→</span>
                  <span>{line.replace('> ', '')}</span>
                  {index === terminalLines.length - 1 && (
                    <span className="ml-2 w-2 h-5 bg-emerald-400 animate-pulse"></span>
                  )}
                </div>
              ))}
              
              {showLaunchPrompt && !isLaunching && (
                <div className="mt-8 space-y-4">
                  <div className="text-slate-200 text-xl flex items-center">
                    <span className="text-emerald-400 mr-2">→</span>
                    <span>Are you ready to commence the journey?</span>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                    <div className="flex items-center justify-center space-x-8 mb-4">
                      <div className="flex items-center space-x-3 bg-emerald-600/20 px-4 py-3 rounded-lg border border-emerald-500/30">
                        <kbd className="bg-slate-600 text-white px-3 py-1 rounded text-sm font-bold">ENTER</kbd>
                        <span className="text-emerald-300 font-medium">Launch Mission</span>
                      </div>
                      <div className="flex items-center space-x-3 bg-blue-600/20 px-4 py-3 rounded-lg border border-blue-500/30">
                        <kbd className="bg-slate-600 text-white px-3 py-1 rounded text-sm font-bold">SPACE</kbd>
                        <span className="text-blue-300 font-medium">Skip to Resume</span>
                      </div>
                    </div>
                    
                    {/* Professional Website Button */}
                    <div className="flex justify-center pt-4 border-t border-slate-600/30">
                      <button
                        onClick={onShowProfessional}
                        className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
                      >
                        <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        View Professional Website
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {isLaunching && (
                <div className="mt-8 text-center">
                  <div className="text-slate-200 text-xl flex items-center justify-center mb-8">
                    <span className="text-emerald-400 mr-2">→</span>
                    <span>Launching...</span>
                  </div>
                  
                  {countdownNumber && (
                    <div className="mb-4">
                      <div className="text-8xl font-bold text-emerald-400 animate-pulse mb-2">
                        {countdownNumber}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ResumeViewer = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-2xl shadow-green-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
              Mission Accomplished
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Resume Database Successfully Accessed
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
            
            {/* Profile Section */}
            <div className="text-center mb-10">
              <div className="inline-block relative mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/25 ring-4 ring-white/20">
                  <img 
                    src="/manush-patel/headshot.jpeg" 
                    alt="Manush Patel" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image doesn't load
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '<span class="text-3xl font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full flex items-center justify-center">MP</span>';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Manush Patel</h2>
              <p className="text-lg text-blue-300 font-medium">Product Manager & Software Developer</p>
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Toronto, Canada</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">3+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">350K+</div>
                  <div className="text-sm text-gray-400">Users Impacted</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">$20K+</div>
                  <div className="text-sm text-gray-400">Funding Raised</div>
                </div>
              </div>
            </div>

            {/* Resume Access Section */}
            <div className="text-center">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a 
                  href="/manush-patel/Manush_2025_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Resume (PDF)
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </a>
                
                <a 
                  href="/manush-patel/Manush_2025_Resume.pdf" 
                  download="Manush_Patel_Resume.pdf"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
              
              {/* Professional Website Button - Additional Option */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={onShowProfessional}
                  className="group inline-flex items-center justify-center px-6 py-3 bg-white/5 backdrop-blur-sm text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  View Professional Website
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-8">
            <button 
              onClick={() => setShowResume(false)}
              className="group inline-flex items-center justify-center px-6 py-3 bg-white/5 backdrop-blur-sm text-gray-300 font-medium rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Space Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {showResume ? (
        <ResumeViewer />
      ) : (
        <>
          {currentPhase === 'terminal' && <TerminalScreen />}
          {currentPhase === 'phase2' && <Phase2 onPhaseComplete={handlePhase2Complete} />}
          {currentPhase === 'phase3' && <Phase3 onPhaseComplete={handlePhase3Complete} />}
          {currentPhase === 'phase4' && <Phase4 onPhaseComplete={handlePhase4Complete} />}
          {currentPhase === 'phase5' && <Phase5 onShowResume={handlePhase5Complete} />}
        </>
      )}
    </div>
  );
};

export default MissionTerminal;