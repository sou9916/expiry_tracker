import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js'
import api from '../utils/api.js'
import { defaultOptions, categoryColors } from '../utils/charts.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend)

export default function Analytics() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get('/api/items').then(({ data }) => setItems(data || []))
  }, [])

  const categories = ['groceries', 'medicines', 'cosmetics', 'beverages', 'others']
  const counts = categories.map((c) => items.filter((i) => i.category === c).length)

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Items by Category',
        data: counts,
        backgroundColor: categories.map((c) => categoryColors[c])
      }
    ]
  }

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        label: 'Share',
        data: counts,
        backgroundColor: categories.map((c) => categoryColors[c])
      }
    ]
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4 h-80">
          <Bar data={barData} options={defaultOptions} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4 h-80">
          <Doughnut data={doughnutData} options={defaultOptions} />
        </motion.div>
      </div>
    </div>
  )
}
