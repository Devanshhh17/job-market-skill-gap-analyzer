import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
const SalaryRoleChart = ({ data }) => {
  return (
    <div className="h-full w-full">
            <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#9CA3AF" tickFormatter={(value) => `$${value/1000}k`} />
            <YAxis dataKey="role" type="category" stroke="#9CA3AF" width={120} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']}
            />
            <Bar dataKey="salary" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalaryRoleChart