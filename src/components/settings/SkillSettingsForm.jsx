import React, { useState } from 'react';

function SkillSettingsForm() {
  const [frontendWeight, setFrontendWeight] = useState(40);
  const [aiWeight, setAiWeight] = useState(60);

  const handleSave = () => {
    // Basic validation
    if (frontendWeight + aiWeight !== 100) {
      alert("Total must be 100");
    } else {
      alert("Saved successfully!");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Skill Settings</h2>
      <div>
        <label>Frontend Weight: </label>
        <input 
          type="number" 
          value={frontendWeight} 
          onChange={(e) => setFrontendWeight(Number(e.target.value))} 
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>AI Tools Weight: </label>
        <input 
          type="number" 
          value={aiWeight} 
          onChange={(e) => setAiWeight(Number(e.target.value))} 
        />
      </div>
      <button onClick={handleSave} style={{ marginTop: '15px' }}>Save</button>
    </div>
  );
}

export default SkillSettingsForm;