import React, { useState, useEffect, useRef } from 'react';

const Phase3 = ({ onPhaseComplete }) => {
  const [showAlienPrompt, setShowAlienPrompt] = useState(false);
  const [showHangman, setShowHangman] = useState(false);
  const [showWorkExperience, setShowWorkExperience] = useState(false);
  const [flightPaused, setFlightPaused] = useState(false);
  
  // Hangman game state
  const [targetWord] = useState('INNOVATIVE');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFailureOptions, setShowFailureOptions] = useState(false);

  // Mobile keyboard support
  const hiddenInputRef = useRef(null);
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Start alien sequence after 3 seconds
  useEffect(() => {
    const alienTimer = setTimeout(() => {
      setShowAlienPrompt(true);
      setFlightPaused(true);
    }, 3000);

    return () => clearTimeout(alienTimer);
  }, []);

  // Function to start hangman game
  const startHangmanGame = () => {
    setShowHangman(true);
    setShowAlienPrompt(false);
  };

  // Handle key presses
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && showAlienPrompt && !showHangman) {
        startHangmanGame();
      }
      
      // Handle failure options
      if (showFailureOptions) {
        if (event.key === '1') {
          // Try again
          resetGame();
        } else if (event.key === '2') {
          // Show work experience
          setShowWorkExperience(true);
          setShowFailureOptions(false);
        }
      }
      
      // Handle letter guesses
      if (showHangman && !gameWon && !gameLost && !showFailureOptions) {
        const letter = event.key.toUpperCase();
        if (letter >= 'A' && letter <= 'Z' && !guessedLetters.includes(letter)) {
          makeGuess(letter);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAlienPrompt, showHangman, guessedLetters, gameWon, gameLost, showFailureOptions]);

  const resetGame = () => {
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameWon(false);
    setGameLost(false);
    setShowHint(false);
    setShowFailureOptions(false);
  };

  const makeGuess = (letter) => {
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!targetWord.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      // Show hint after 5 wrong guesses
      if (newWrongGuesses === 5) {
        setShowHint(true);
      }
      
      // Game over after 10 wrong guesses
      if (newWrongGuesses >= 10) {
        setGameLost(true);
        setTimeout(() => {
          setShowFailureOptions(true);
        }, 1000);
      }
    }

    // Check if word is complete
    const wordComplete = targetWord.split('').every(char => 
      char === ' ' || newGuessedLetters.includes(char)
    );
    
    if (wordComplete) {
      setGameWon(true);
      setTimeout(() => {
        setShowWorkExperience(true);
      }, 2000);
    }
  };

  const getDisplayWord = () => {
    return targetWord.split('').map(char => {
      if (char === ' ') return '   ';
      return guessedLetters.includes(char) ? char : '_';
    }).join(' ');
  };

  const closeWorkExperience = () => {
    setShowWorkExperience(false);
    setFlightPaused(false);
    onPhaseComplete();
  };

  // Handle mobile keyboard input
  const handleMobileInput = (event) => {
    const letter = event.target.value.slice(-1).toUpperCase();
    if (letter >= 'A' && letter <= 'Z' && !guessedLetters.includes(letter)) {
      makeGuess(letter);
    }
    // Clear the input to allow repeated letters
    event.target.value = '';
  };

  const focusHiddenInput = () => {
    if (isMobile && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
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
        @keyframes glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px #00ff00; }
          50% { opacity: 0.7; box-shadow: 0 0 40px #00ff00, 0 0 60px #00ff00; }
        }
        @keyframes signalPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
      
      {/* Custom Rocket Image with Flame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Animated Flame - Positioned under rocket and flipped */}
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
                // Try alternative paths if flame doesn't load
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
          {/* Optional glow effect behind the rocket */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl scale-150 -z-10"></div>
        </div>
      </div>
      
      {/* Modern UFO */}
      {showAlienPrompt && (
        <div className="absolute top-16 right-16 z-10">
          <div className="relative" style={{animation: 'signalPulse 2s ease-in-out infinite'}}>
            <div className="w-24 h-24 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700 rounded-full shadow-2xl border border-slate-400/50 relative overflow-hidden">
              {/* UFO Details */}
              <div className="absolute inset-2 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-80 animate-pulse"></div>
              
              {/* Signal waves */}
              <div className="absolute -inset-4 border border-cyan-400/30 rounded-full animate-ping"></div>
              <div className="absolute -inset-8 border border-cyan-400/20 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Terminal Style Alien Prompt */}
      {showAlienPrompt && !showHangman && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl mx-auto px-8">
            
            {/* Modern Terminal Window */}
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden" style={{boxShadow: '0 0 50px rgba(34, 197, 94, 0.3)'}}>
              
              {/* Terminal Header */}
              <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600/50 flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-400 text-sm font-medium ml-4">Alien Communication Terminal v3.7</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-8 font-mono">
                <div className="space-y-4">
                  
                  {/* Terminal Lines */}
                  <div className="text-cyan-300 text-xl flex items-center">
                    <span className="text-emerald-400 mr-3">→</span>
                    <span>👽 ENCRYPTED ALIEN MESSAGE</span>
                  </div>
                  
                  <div className="text-slate-300 text-lg flex items-center">
                    <span className="text-emerald-400 mr-3">→</span>
                    <span>We have intercepted an alien transmission.</span>
                  </div>
                  
                  <div className="text-slate-300 text-lg flex items-center">
                    <span className="text-emerald-400 mr-3">→</span>
                    <span>The message is encrypted. You have 10 attempts to decrypt it.</span>
                  </div>
                  
                  {/* Action Prompt Box - Same style as terminal */}
                  <div className="mt-8">
                    <div className="text-slate-200 text-xl flex items-center mb-4">
                      <span className="text-emerald-400 mr-3">→</span>
                      <span>Ready to begin decryption sequence?</span>
                    </div>
                    
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={startHangmanGame}
                          className="flex items-center space-x-3 bg-emerald-600/20 px-4 py-3 rounded-lg border border-emerald-500/30 hover:bg-emerald-600/30 hover:border-emerald-400/40 cursor-pointer transition-all duration-200"
                        >
                          <kbd className="bg-slate-600 text-white px-3 py-1 rounded text-sm font-bold">ENTER</kbd>
                          <span className="text-emerald-300 font-medium">Initialize Decryption</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modern Hangman Game */}
      {showHangman && !showWorkExperience && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="max-w-5xl mx-auto px-8">
            
            {/* Modern Terminal Window */}
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden" style={{boxShadow: '0 0 50px rgba(34, 197, 94, 0.3)'}}>
              
              {/* Terminal Header */}
              <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-400 text-sm font-medium ml-4">Quantum Decryption Engine v4.2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-300 text-xs font-medium">DECRYPTING</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-8 font-mono">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-cyan-300 mb-2">👽 DECRYPTION IN PROGRESS 👽</h2>
                  <div className="text-slate-400 text-sm">Quantum cipher analysis active</div>
                </div>
                
                {/* Word Display with Mobile Support */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div 
                      className="text-5xl font-bold text-white tracking-wider mb-4 font-mono cursor-pointer"
                      onClick={focusHiddenInput}
                    >
                      {getDisplayWord()}
                    </div>
                    {/* Hidden input for mobile keyboard */}
                    <input
                      ref={hiddenInputRef}
                      type="text"
                      className="absolute opacity-0 pointer-events-none w-full h-full top-0 left-0"
                      onInput={handleMobileInput}
                      autoCapitalize="characters"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                  </div>
                  <div className="text-slate-400 text-sm">
                    Encrypted Message Fragment
                    {isMobile && (
                      <div className="text-xs text-slate-500 mt-1">
                        Tap the letters above to open keyboard
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Game Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  
                  {/* Attempts Counter */}
                  <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2" style={{color: wrongGuesses > 7 ? '#ef4444' : wrongGuesses > 5 ? '#f59e0b' : '#10b981'}}>
                        {10 - wrongGuesses}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">Attempts Left</div>
                      {/* Visual progress bar */}
                      <div className="mt-3 bg-slate-600 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${((10 - wrongGuesses) / 10) * 100}%`,
                            backgroundColor: wrongGuesses > 7 ? '#ef4444' : wrongGuesses > 5 ? '#f59e0b' : '#10b981'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Signal Strength Visualization */}
                  <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                    <div className="text-center">
                      <div className="text-slate-300 text-sm font-medium mb-3">Signal Integrity</div>
                      <div className="flex justify-center space-x-1">
                        {Array.from({length: 10}, (_, i) => (
                          <div
                            key={i}
                            className="w-2 rounded-full transition-all duration-300"
                            style={{
                              height: `${12 + i * 2}px`,
                              backgroundColor: i < (10 - wrongGuesses) ? '#10b981' : '#374151'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decryption Progress */}
                  <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {Math.round((guessedLetters.filter(letter => targetWord.includes(letter)).length / targetWord.replace(/\s/g, '').length) * 100)}%
                      </div>
                      <div className="text-slate-400 text-sm font-medium">Decrypted</div>
                      {/* Circular progress */}
                      <div className="mt-3 flex justify-center">
                        <div className="relative w-8 h-8">
                          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="14" fill="none" stroke="#374151" strokeWidth="4"/>
                            <circle 
                              cx="16" cy="16" r="14" fill="none" stroke="#3b82f6" strokeWidth="4"
                              strokeDasharray={`${((guessedLetters.filter(letter => targetWord.includes(letter)).length / targetWord.replace(/\s/g, '').length) * 88)} 88`}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Guessed Letters - Hide when showing failure options */}
                {!showFailureOptions && (
                  <div className="bg-slate-700/20 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 mb-6">
                    <div className="text-slate-300 text-sm font-medium mb-3">Attempted Characters:</div>
                    <div className="flex flex-wrap gap-2">
                      {guessedLetters.map((letter, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-lg text-sm font-mono font-bold border ${
                            targetWord.includes(letter)
                              ? 'bg-green-500/20 border-green-500/50 text-green-300'
                              : 'bg-red-500/20 border-red-500/50 text-red-300'
                          }`}
                        >
                          {letter}
                        </span>
                      ))}
                      {guessedLetters.length === 0 && (
                        <span className="text-slate-500 text-sm italic">None yet...</span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Hint System - Hide when showing failure options */}
                {showHint && !showFailureOptions && (
                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-amber-300 font-semibold">QUANTUM HINT ACTIVATED</span>
                    </div>
                    <div className="text-amber-200">Think of a great candidate you want to hire</div>
                  </div>
                )}
                
                {showFailureOptions && (
                  <div className="text-center">
                    <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
                      <div className="text-xl text-slate-200 mb-6">Emergency Protocol Options:</div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3 bg-blue-600/20 px-4 py-3 rounded-lg border border-blue-500/30">
                          <kbd className="bg-slate-600 text-white px-3 py-1 rounded text-sm font-bold">1</kbd>
                          <span className="text-blue-300 font-medium">Attempt Emergency Re-decrypt</span>
                        </div>
                        <div className="flex items-center justify-center space-x-3 bg-emerald-600/20 px-4 py-3 rounded-lg border border-emerald-500/30">
                          <kbd className="bg-slate-600 text-white px-3 py-1 rounded text-sm font-bold">2</kbd>
                          <span className="text-emerald-300 font-medium">Access Backup Database</span>
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
        <div>Mission Status: {flightPaused ? 'ALIEN CONTACT' : 'IN FLIGHT'}</div>
        <div className="mt-2 text-yellow-400">
          {showWorkExperience ? 'Accessing Work Experience...' : 'Decrypting alien transmission...'}
        </div>
      </div>
      
      {/* Work Experience Overlay */}
      {showWorkExperience && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-indigo-900/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50">
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-20 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-green-900/90 via-blue-900/90 to-slate-900/90 p-8 border-b border-slate-700/50">
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeWorkExperience}
                  className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center hover:bg-slate-700/80 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/25">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Professional Mission Logs</h1>
                <p className="text-slate-300 text-lg">
                  {gameWon ? 'Decryption Successful: Work Experience Unlocked' : 'Access Granted: Work Experience Database'}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-8">

                {/* Product Intern */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="mb-4 lg:mb-0 flex flex-col items-center lg:items-start">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Product Intern</h3>
                    <p className="text-lg font-semibold text-indigo-400 mb-1">Pine Financial</p>
                    <p className="text-slate-400">Toronto, Canada</p>
                  </div>
                  <div className="bg-indigo-500/20 text-indigo-300 px-6 py-3 rounded-full text-sm font-medium self-start border border-indigo-500/30">
                    May 2025 – Aug. 2025
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-lg">Key Achievements</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Analyzed deals totalling $25M in mortgages</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Constructed Python scripts saving 2 man hours daily</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Performed feature QA and regression testing</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-lg">Technologies Used</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {["Python", "Redis", "Metabase", "SQL"].map((tech, i) => (
                        <div key={i} className="bg-slate-700/40 text-slate-200 px-6 py-4 rounded-xl text-center font-medium border border-slate-600/30">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
                
                {/* IT Product Manager Intern */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="mb-4 lg:mb-0 flex flex-col items-center lg:items-start">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">IT Product Manager Intern</h3>
                    <p className="text-lg font-semibold text-blue-400 mb-1">First National Financial</p>
                    <p className="text-slate-400">Toronto, Canada</p>
                  </div>
                  <div className="bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium self-start border border-blue-500/30">
                    May 2024 – Aug. 2024
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-lg">Key Achievements</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Delivered product updates for 350K+ users</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Reduced support requests by 60% through UX improvements</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Validated features with 80% user satisfaction rate</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-lg">Technologies Used</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {["Jira", "Figma", "PowerBI", "SQL"].map((tech, i) => (
                        <div key={i} className="bg-slate-700/40 text-slate-200 px-6 py-4 rounded-xl text-center font-medium border border-slate-600/30">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>

                {/* Chief Growth Officer */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="mb-4 lg:mb-0 flex flex-col items-center lg:items-start">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Chief Growth Officer/Co-Founder</h3>
                    <p className="text-lg font-semibold text-green-400 mb-1">Homiis Inc.</p>
                    <p className="text-slate-400">Toronto, Canada</p>
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-6 py-3 rounded-full text-sm font-medium self-start border border-green-500/30">
                    Mar. 2023 – Feb. 2024
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-lg">Key Achievements</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Raised $20K+ in funding from Front Row Ventures</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Grew user base from 50 to 700+ users</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-slate-300 leading-relaxed">Increased sales efficiency by 50% with Salesforce automation</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-lg">Technologies Used</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {["Salesforce", "React", "Node.js", "PostgreSQL"].map((tech, i) => (
                        <div key={i} className="bg-slate-700/40 text-slate-200 px-6 py-4 rounded-xl text-center font-medium border border-slate-600/30">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>

                {/* Product Coordinator */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="mb-4 lg:mb-0 flex flex-col items-center lg:items-start">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Product Coordinator</h3>
                      <p className="text-lg font-semibold text-purple-400 mb-1">Propel Campus</p>
                      <p className="text-slate-400">Toronto, Canada</p>
                    </div>
                    <div className="bg-purple-500/20 text-purple-300 px-6 py-3 rounded-full text-sm font-medium self-start border border-purple-500/30">
                      Jan. 2022 – Feb. 2023
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                      <h4 className="font-semibold text-white mb-6 text-lg">Key Achievements</h4>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 flex-shrink-0"></div>
                          <span className="text-slate-300 leading-relaxed">Partnered with 18 universities across Canada</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 flex-shrink-0"></div>
                          <span className="text-slate-300 leading-relaxed">Increased student userbase by 75% in 60 days</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 flex-shrink-0"></div>
                          <span className="text-slate-300 leading-relaxed">Built CRM dashboard increasing acquisition efficiency by 75%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-6 text-lg">Technologies Used</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {["Excel", "VBA", "Photoshop", "Figma"].map((tech, i) => (
                          <div key={i} className="bg-slate-700/40 text-slate-200 px-6 py-4 rounded-xl text-center font-medium border border-slate-600/30">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Footer */}
            <div className="relative bg-slate-900/50 backdrop-blur-sm px-8 py-6 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Phase 3 Complete • Work Experience Unlocked
                </div>
                <button
                  onClick={closeWorkExperience}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/20"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-lg">Continue Mission</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase3;
