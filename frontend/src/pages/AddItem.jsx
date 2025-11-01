import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api.js'
import CategoryFilter from '../components/CategoryFilter.jsx'
import BarcodeScanner from '../components/BarcodeScanner.jsx'

export default function AddItem() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('groceries')
  const [expiry, setExpiry] = useState('')
  const [estimatedCost, setEstimatedCost] = useState('')
  const [barcodeOpen, setBarcodeOpen] = useState(false)
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/items', { name, category, expiry, estimatedCost })
      setMessage('Item added!')
      setName('')
      setEstimatedCost('')
    } catch {
      setMessage('Failed to add item')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add Item</h1>

      <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="card p-6 space-y-4">
        {message && <p className="text-sm text-gray-600">{message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Item name</label>
            <input className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <CategoryFilter value={category} onChange={setCategory} />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Expiry date</label>
            <input type="date" className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Estimated cost (₹)</label>
            <input type="number" className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500" value={estimatedCost} onChange={(e) => setEstimatedCost(e.target.value)} placeholder="0.00" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">Save</button>
          <button type="button" onClick={() => setBarcodeOpen(true)} className="rounded-lg bg-gray-100 text-gray-800 px-4 py-2 hover:bg-gray-200 transition">Scan barcode</button>
        </div>
      </motion.form>

      {barcodeOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="card p-4 w-full max-w-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Scan</h3>
              <button className="text-gray-500" onClick={() => setBarcodeOpen(false)}>Close</button>
            </div>
            <BarcodeScanner onDetected={(code) => {
              setName((prev) => prev || `Item ${code}`)
              setBarcodeOpen(false)
            }} />
          </div>
        </div>
      )}
    </div>
  )
}
