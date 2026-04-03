import React, { useState } from 'react'
import GlassCard from '../common/GlassCard'

const SkillsSelector = ({ selectedSkills, onSkillsChange }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const allSkills = [
    'Python', 'SQL', 'Excel', 'Power BI', 'Tableau', 'Statistics',
    'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'ETL',
    'Spark', 'AWS', 'Azure', 'Git', 'Deep Learning', 'NLP',
    'Data Visualization', 'R', 'JavaScript', 'Java', 'C++',
    'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'Airflow'
  ]

  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill))
    } else {
      onSkillsChange([...selectedSkills, skill])
    }
  }

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">Select Your Current Skills</h3>
      
      <input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-3 input-glass bg-slate-800/40 text-white placeholder-gray-500 rounded-lg focus:outline-none"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
        {filteredSkills.map(skill => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`p-2.5 rounded-lg text-sm font-medium smooth-transition border ${
              selectedSkills.includes(skill)
                ? 'bg-cyan-600/30 border-cyan-400/60 text-cyan-200 shadow-lg shadow-cyan-500/20 glow-border'
                : 'bg-slate-800/40 border-gray-600/30 text-gray-300 hover:bg-slate-700/50 hover:border-gray-500/50'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {selectedSkills.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Selected Skills:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map(skill => (
              <span
                key={skill}
                className="bg-cyan-600/20 text-cyan-400 px-2 py-1 rounded text-sm"
              >
                {skill} ×
              </span>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  )
}

export default SkillsSelector