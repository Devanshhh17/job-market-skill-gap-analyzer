import React from 'react'
import GlassCard from '../common/GlassCard'

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    'Data Analyst',
    'Data Scientist',
    'Machine Learning Engineer',
    'BI Analyst',
    'BI Developer',
    'Data Engineer',
    'Business Analyst'
  ]

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">Select Target Role</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => onRoleChange(role)}
            className={`p-3 rounded-lg text-left font-medium smooth-transition border glow-border ${
              selectedRole === role
                ? 'bg-cyan-600/30 border-cyan-400/60 text-cyan-200 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/40 border-gray-600/30 text-gray-300 hover:bg-slate-700/50 hover:border-gray-500/50 hover:text-white'
            }`}
          >
            {role}
          </button>
        ))}
      </div>
    </GlassCard>
  )
}

export default RoleSelector