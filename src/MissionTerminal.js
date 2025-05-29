import React, { useState, useEffect } from 'react';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import Phase4 from './Phase4';
import Phase5 from './Phase5';

const MissionTerminal = () => {
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
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto">
        {terminalLines.map((line, index) => (
          <div key={index} className="mb-2 text-lg">
            {line}
          </div>
        ))}
        
        {showLaunchPrompt && !isLaunching && (
          <div className="mt-4">
            <div className="text-lg animate-pulse">
              > Are you ready to commence the journey? [Press ENTER to launch]
            </div>
            <div className="mt-2 text-sm text-yellow-400">
              > Or press SPACE to skip mission and view resume directly
            </div>
          </div>
        )}
        
        {isLaunching && (
          <div className="mt-4 text-lg">
            > Launching...
            {countdownNumber && (
              <div className="mt-4 text-center">
                <div className="text-6xl font-bold text-yellow-400 animate-ping">
                  {countdownNumber}
                </div>
              </div>
            )}
            {countdownNumber === 'LIFTOFF' && (
              <div className="mt-2 text-2xl text-red-400 animate-bounce">
                🚀 {countdownNumber}!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const FlightScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Moving Stars */}
      <div className="absolute inset-0 animate-pulse">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `moveDown ${Math.random() * 3 + 2}s linear infinite`,
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
          
          {/* Large Static Flame - Made bigger and positioned lower */}
          <path d="M 110 550 Q 150 620 190 550 Q 150 680 110 550" fill="#FF4500"/>
          <path d="M 120 550 Q 150 600 180 550 Q 150 660 120 550" fill="#FFD700"/>
          <path d="M 125 550 Q 150 580 175 550 Q 150 640 125 550" fill="#FF6347"/>
          <path d="M 130 550 Q 150 570 170 550 Q 150 620 130 550" fill="#FFA500"/>
        </svg>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-10 left-10 text-white text-xl font-mono">
        <div>Mission Status: COMPLETED</div>
        <div className="mt-2 text-yellow-400">All challenges complete!</div>
        <div className="mt-4 text-sm text-gray-300">
          Mission accomplished. Press SPACE to view full resume.
        </div>
      </div>
    </div>
  );

  const ResumeViewer = () => (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">Mission Complete: Resume Accessed</h1>
          <p className="text-lg text-gray-300">Manush Patel - Resume</p>
        </div>
        
        {/* PDF Viewer - New Tab Approach */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Complete Resume Document</h3>
              <p className="text-gray-600 text-lg mb-6">
                View the full PDF resume with all details, formatting, and contact information.
              </p>
            </div>
            
            <div className="space-y-4">
              <a 
                href="https://manushp12.github.io/manush-patel/Manush_2025_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📖 Open Full Resume (PDF)
              </a>
              
              <div className="text-sm text-gray-500 mt-4">
                Opens in a new tab • Professional formatting preserved
              </div>
              
              <div className="mt-6">
                <a 
                  href="https://manushp12.github.io/manush-patel/Manush_2025_Resume.pdf" 
                  download="Manush_Patel_Resume.pdf"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  💾 Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => setShowResume(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg mr-4 font-semibold"
          >
            ← Back to Mission
          </button>
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
          {currentPhase === 'flight' && <FlightScreen />}
        </>
      )}
    </div>
  );
};

export default MissionTerminal;