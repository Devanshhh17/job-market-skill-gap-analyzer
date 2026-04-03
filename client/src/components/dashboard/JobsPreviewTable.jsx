import React from 'react'
const JobsPreviewTable = ({ jobs }) => {
  return (
    <div className="h-full w-full">
            <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-2 px-4">Title</th>
              <th className="text-left py-2 px-4">Company</th>
              <th className="text-left py-2 px-4">Location</th>
              <th className="text-left py-2 px-4">Salary</th>
              <th className="text-left py-2 px-4">Posted</th>
            </tr>
          </thead>
          <tbody>
            {jobs.slice(0, 10).map((job, index) => (
              <tr key={index} className="border-b border-gray-700/50 hover:bg-white/8 smooth-transition hover:border-gray-600 cursor-pointer group">
                <td className="py-3 px-4 text-gray-300 group-hover:text-white smooth-transition">{job.title}</td>
                <td className="py-3 px-4 text-gray-400 group-hover:text-gray-200 smooth-transition">{job.company}</td>
                <td className="py-3 px-4 text-gray-400 group-hover:text-gray-200 smooth-transition">{job.location}</td>
                <td className="py-3 px-4 text-green-400 group-hover:text-green-300 smooth-transition font-medium">
                  {job.salaryMin && job.salaryMax 
                    ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`
                    : 'Not specified'
                  }
                </td>
                <td className="py-3 px-4 text-gray-500 group-hover:text-gray-400 smooth-transition">
                  {new Date(job.postedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobsPreviewTable