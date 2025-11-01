export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { usePointStyle: true }
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true }
  }
}

export const categoryColors = {
  groceries: '#22c55e',
  medicines: '#3b82f6',
  cosmetics: '#ec4899',
  beverages: '#f59e0b',
  others: '#6b7280'
}
