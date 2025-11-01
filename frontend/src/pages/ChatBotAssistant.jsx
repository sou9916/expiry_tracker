import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api.js'

export default function ChatbotAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me about items, expiry tips, or savings.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const { data } = await api.post('/api/ai/chat', { messages: [...messages, userMsg] })
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || '...' }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I had trouble answering that.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Assistant</h1>
      <div className="card p-4">
        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          {messages.map((m, idx) => (
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'}`}>
              <p className="text-sm"><span className="font-medium capitalize">{m.role}:</span> {m.content}</p>
            </motion.div>
          ))}
          {loading && <p className="text-gray-500 text-sm">Thinking...</p>}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input className="flex-1 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." />
          <button onClick={send} className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">Send</button>
        </div>
      </div>
    </div>
  )
}
