export const getChartColors = () => [
  '#06B6D4', // cyan
  '#8B5CF6', // purple
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#6366F1', // indigo
  '#14B8A6'  // teal
]

export const prepareBarChartData = (data, xKey = 'name', yKey = 'count') => {
  return data.map(item => ({
    [xKey]: item[xKey] || item.name,
    [yKey]: item[yKey] || item.count,
    ...item
  }))
}

export const preparePieChartData = (data) => {
  return data.map((item, index) => ({
    name: item.name,
    value: item.count,
    fill: getChartColors()[index % getChartColors().length]
  }))
}

export const prepareScatterData = (data) => {
  return data.map(item => ({
    x: item.demand || 0,
    y: item.salary || 0,
    name: item.name
  }))
}

export const chartConfig = {
  grid: {
    strokeDasharray: '3 3',
    stroke: '#374151'
  },
  axis: {
    stroke: '#9CA3AF'
  },
  tooltip: {
    contentStyle: {
      backgroundColor: '#1F2937',
      border: '1px solid #374151',
      borderRadius: '8px',
      color: '#FFFFFF'
    }
  }
}