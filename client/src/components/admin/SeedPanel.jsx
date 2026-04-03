import React, { useState } from 'react'
import GlassCard from '../common/GlassCard'
import GlowButton from '../common/GlowButton'

const SeedPanel = ({ onSeed }) => {
  const [seeding, setSeeding] = useState(false)

  const handleSeed = async () => {
    setSeeding(true)
    // Mock seeding - in real app, call API
    setTimeout(() => {
      onSeed({ success: true, message: 'Sample data seeded successfully!' })
      setSeeding(false)
    }, 3000)
  }

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">Seed Sample Data</h3>
      
      <div className="space-y-4">
        <p className="text-gray-300">
          Add sample job postings to the database for testing and demonstration purposes.
          This will create 50+ realistic job entries across various roles and locations.
        </p>
        
        <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2">What gets seeded:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Data Analyst, Data Scientist, ML Engineer roles</li>
            <li>• Various experience levels and work modes</li>
            <li>• Realistic salary ranges</li>
            <li>• Common skills and tools</li>
            <li>• Multiple locations and companies</li>
          </ul>
        </div>
        
        <GlowButton 
          onClick={handleSeed}
          disabled={seeding}
        >
          {seeding ? 'Seeding Data...' : 'Seed Sample Data'}
        </GlowButton>
      </div>
    </GlassCard>
  )
}

export default SeedPanel