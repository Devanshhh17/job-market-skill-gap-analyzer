import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
const SalarySkillChart = ({ data }) => {
  return (
    <div className="h-full w-full">
            <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="demand" name="Demand Score" stroke="#9CA3AF" />
            <YAxis dataKey="salary" name="Average Salary" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              formatter={(value, name) => [
                name === 'salary' ? `$${value.toLocaleString()}` : value,
                name === 'salary' ? 'Average Salary' : 'Demand Score'
              ]}
              labelFormatter={(label) => `Skill: ${label}`}
            />
            <Scatter dataKey="salary" fill="#10B981" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalarySkillChart