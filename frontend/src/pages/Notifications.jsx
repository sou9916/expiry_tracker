import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api.js'
import { expiryBadge } from '../utils/helpers.js'

export default function Notifications() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get('/api/items').then(({ data }) => setItems(data || []))
  }, [])

  const alerts = items
    .filter((i) => i.expiry)
    .sort((a, b) => new Date(a.expiry) - new Date(b.expiry))

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      <div className="space-y-3">
        {alerts.map((i) => {
          const badge = expiryBadge(i.expiry)
          return (
            <motion.div key={i._id || i.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-gray-500">Expires: {new Date(i.expiry).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${badge.color}`}>{badge.label}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
