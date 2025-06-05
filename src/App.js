import React, { useState } from 'react';
import MissionTerminal from './MissionTerminal';
import ProfessionalWebsite from './ProfessionalWebsite';
import './App.css';

function App() {
  const [showProfessional, setShowProfessional] = useState(false);

  if (showProfessional) {
    return <ProfessionalWebsite onBack={() => setShowProfessional(false)} />;
  }

  return (
    <div className="App">
      <MissionTerminal onShowProfessional={() => setShowProfessional(true)} />
    </div>
  );
}

export default App;