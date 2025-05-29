import React, { useState, useEffect } from 'react';

const Phase3 = ({ onPhaseComplete }) => {
  const [showAlienPrompt, setShowAlienPrompt] = useState(false);
  const [showHangman, setShowHangman] = useState(false);
  const [showWorkExperience, setShowWorkExperience] = useState(false);
  const [flightPaused, setFlightPaused] = useState(false);
  
  // Hangman game state
  const [targetWord] = useState('HIRE MANUSH');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFailureOptions, setShowFailureOptions] = useState(false);

  // Start alien sequence after 3 seconds
  useEffect(() => {
    const alienTimer = setTimeout(() => {
      setShowAlienPrompt(true);
      setFlightPaused(true);
    }, 3000);

    return () => clearTimeout(alienTimer);
  }, []);

  // Handle key presses
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && showAlienPrompt && !showHangman) {
        setShowHangman(true);
        setShowAlienPrompt(false);
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
      
      {/* UFO */}
      {showAlienPrompt && (
        <div className="absolute top-20 right-20 z-10">
          <svg width="120" height="80" viewBox="0 0 120 80" className="animate-bounce">
            <ellipse cx="60" cy="45" rx="50" ry="15" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="2"/>
            <ellipse cx="60" cy="35" rx="30" ry="20" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="2"/>
            <circle cx="35" cy="45" r="4" fill="#00FF00" className="animate-pulse"/>
            <circle cx="60" cy="50" r="4" fill="#00FF00" className="animate-pulse"/>
            <circle cx="85" cy="45" r="4" fill="#00FF00" className="animate-pulse"/>
            <path d="M 40 60 L 80 60 L 70 75 L 50 75 Z" fill="rgba(0,255,0,0.3)" className="animate-pulse"/>
          </svg>
        </div>
      )}
      
      {/* Alien Prompt */}
      {showAlienPrompt && !showHangman && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl mx-8 border-2 border-green-500" style={{animation: 'glow 2s infinite'}}>
            <div className="text-center text-green-400 font-mono">
              <div className="text-2xl mb-4">👽 ENCRYPTED ALIEN MESSAGE</div>
              <div className="text-lg mb-4">We have intercepted an alien transmission.</div>
              <div className="text-lg mb-4">The message is encrypted. You have 10 attempts to decrypt it.</div>
              <div className="text-yellow-400 text-xl animate-pulse">Press ENTER to start decryption</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hangman Game */}
      {showHangman && !showWorkExperience && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
          <div className="bg-gray-900 rounded-lg p-8 max-w-4xl mx-8 border-2 border-green-500 font-mono text-green-400">
            <div className="text-center mb-6">
              <h2 className="text-2xl mb-4">👽 DECRYPTION IN PROGRESS 👽</h2>
              <div className="text-4xl mb-6 font-bold text-white tracking-widest">
                {getDisplayWord()}
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="mb-4">
                  <div className="text-lg">Attempts Remaining: <span className="text-red-400 font-bold text-2xl">{10 - wrongGuesses}</span></div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm">Guessed Letters:</div>
                  <div className="text-lg">{guessedLetters.join(', ')}</div>
                </div>
                
                {showHint && (
                  <div className="bg-yellow-900 border border-yellow-500 p-3 rounded mb-4">
                    <div className="text-yellow-300 font-bold">💡 HINT:</div>
                    <div className="text-yellow-200">Think of what you want to do with a great candidate...</div>
                  </div>
                )}
                
                {!gameWon && !gameLost && !showFailureOptions && (
                  <div className="text-yellow-400">Type a letter to guess...</div>
                )}
              </div>
              
              <div className="ml-8 text-right">
                <div className="text-6xl">
                  {wrongGuesses >= 1 && '😵'}
                  {wrongGuesses >= 2 && '👤'}
                  {wrongGuesses >= 3 && '🫱'}
                  {wrongGuesses >= 4 && '🫲'}
                  {wrongGuesses >= 5 && '🦵'}
                  {wrongGuesses >= 6 && '🦵'}
                </div>
                <div className="text-lg mt-2">Wrong: {wrongGuesses}/10</div>
              </div>
            </div>
            
            {gameWon && (
              <div className="text-center mt-6">
                <div className="text-2xl text-green-300 mb-2">🎉 DECRYPTION SUCCESSFUL! 🎉</div>
                <div className="text-xl text-yellow-300">Message decoded: "{targetWord}"</div>
                <div className="text-lg mt-2">Accessing work experience database...</div>
              </div>
            )}
            
            {gameLost && !showFailureOptions && (
              <div className="text-center mt-6">
                <div className="text-2xl text-red-400 mb-2">❌ DECRYPTION FAILED</div>
                <div className="text-lg">The message was: "{targetWord}"</div>
              </div>
            )}
            
            {showFailureOptions && (
              <div className="text-center mt-6">
                <div className="text-xl mb-4">What would you like to do?</div>
                <div className="text-lg">
                  <div className="mb-2">Press <span className="text-yellow-400 font-bold">1</span> to Try Again</div>
                  <div>Press <span className="text-yellow-400 font-bold">2</span> to View Work Experience</div>
                </div>
              </div>
            )}
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
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-8 max-w-6xl w-full mx-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">💼 Professional Mission Logs</h1>
              <p className="text-gray-600">
                {gameWon ? 'Decryption Successful: Work Experience Unlocked' : 'Access Granted: Work Experience Database'}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">IT Product Manager Intern</h3>
                  <p className="text-blue-600 font-semibold text-lg">First National Financial</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">May 2024 – Aug. 2024</span>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• Collaborated closely with engineering, and design teams to deliver product updates on time for 350k users.</p>
                  <p>• Developed and implemented comprehensive test plans for four new software features, ensuring adherence to initial requirements and detection of critical defects.</p>
                  <p>• Worked with UX/UI teams to redesign the user interface, reducing user friction and decreasing support requests by 60%.</p>
                  <p>• Validated the feature hypothesis using usability testing by delivering requirements to design, and the core functionalities to engineering, which 80% of the users felt it was valuable in their scenario, taking the project on the road to production.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Chief Growth Officer/Co-Founder</h3>
                  <p className="text-green-600 font-semibold text-lg">Homiis Inc.</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Mar. 2023 – Feb. 2024</span>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• Founded Homiis to connect young adults with each other to help find a roommate while providing properties for rent.</p>
                  <p>• Shaped company's long-term strategic plan to enter new markets, boosting revenue by 50%; increase in sign-ups from 50 to 700; analyzed competitive landscape along with drafting marketing and budget plans for short and long-term.</p>
                  <p>• Automated sales processes using Salesforce, reducing manual data entry and increasing efficiency by 50%, leading to faster deal closures and improved sales pipeline management.</p>
                  <p>• Raised over $20,000 in funding and was backed and supported by Front Row Ventures.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border-l-4 border-purple-500 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Product Coordinator</h3>
                  <p className="text-purple-600 font-semibold text-lg">Propel Campus</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">Jan. 2022 – Feb. 2023</span>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>• Constructed and aided in market expansion, partnered with 18 universities across Canada; Propel is an educational platform to help students get directly in touch with recruiters.</p>
                  <p>• Increased student userbase by 75% in 60 days by reaching out to club executives and promoting product.</p>
                  <p>• Built a CRM dashboard on Excel using VBA, Indexing, along with V and XLOOKUP to increase efficiency for acquiring clients by 75% and assisted in development of customer acquisition flow.</p>
                  <p>• Incorporated 10+ UI features to improve accessibility, functionality and security, design GUIs using Photoshop and Figma.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={closeWorkExperience}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
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

export default Phase3;