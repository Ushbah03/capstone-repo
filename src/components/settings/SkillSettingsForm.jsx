import React, { useState } from 'react';

export default function SkillSettingsForm() {
  const [skills, setSkills] = useState([
    { id: '1', name: 'Frontend AI Engineering', weight: 40 },
    { id: '2', name: 'Generative AI Integration', weight: 35 },
    { id: '3', name: 'UI Workflow Architecture', weight: 25 },
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (id, value) => {
    setIsSuccess(false);
    setErrorMessage('');
    
    const numericalVal = value === '' ? 0 : parseFloat(value);
    
    // Defensive check to avoid out of bound numbers immediately
    if (numericalVal < 0 || numericalVal > 100) return;

    setSkills(prevSkills =>
      prevSkills.map(item => (item.id === id ? { ...item, weight: numericalVal } : item))
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSuccess(false);

    // Calculate sum while avoiding JavaScript floating point accuracy bugs
    const currentSum = skills.reduce((acc, current) => acc + current.weight, 0);
    const EPSILON = 0.00001;

    if (Math.abs(currentSum - 100) > EPSILON) {
      setErrorMessage(`Validation Error: Total weight must equal 100%. Current sum is ${currentSum.toFixed(2)}%.`);
      return;
    }

    setIsSuccess(true);
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-6 bg-slate-900 text-white rounded-lg max-w-md mx-auto" aria-labelledby="form-heading">
      <h2 id="form-heading" className="text-xl font-bold mb-4">Skill Assessment Matrix Configuration</h2>
      
      <div className="space-y-4">
        {skills.map(skill => (
          <div key={skill.id} className="flex flex-col gap-1">
            <label htmlFor={`input-${skill.id}`} className="text-sm font-medium text-slate-300">
              {skill.name} Allocation (%)
            </label>
            <input
              id={`input-${skill.id}`}
              type="number"
              min="0"
              max="100"
              step="any"
              value={skill.weight === 0 ? '' : skill.weight}
              onChange={(e) => handleInputChange(skill.id, e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500"
              aria-describedby={errorMessage ? 'form-error-alert' : undefined}
              required
            />
          </div>
        ))}
      </div>

      {errorMessage && (
        <div id="form-error-alert" className="mt-4 p-3 bg-red-900/40 border border-red-500 text-red-200 text-sm rounded" role="alert">
          {errorMessage}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-900/40 border border-green-500 text-green-200 text-sm rounded" role="status">
          Success: Distribution weights saved cleanly.
        </div>
      )}

      <button type="submit" className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors">
        Save Weights
      </button>
    </form>
  );
}