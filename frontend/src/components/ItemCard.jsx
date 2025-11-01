import React from 'react'
import classNames from 'classnames'

const badgeClass = (category) => {
  return {
    grocery: 'badge-grocery',
    medicine: 'badge-medicine',
    cosmetic: 'badge-cosmetic',
    beverage: 'badge-beverage',
    other: 'badge-other'
  }[category] || 'badge-other'
}

export default function ItemCard({ item }) {
  return (
    <div className="card transition-soft hover:scale-[1.01]">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.dosage || ''}</p>
        </div>
        <div className={classNames('px-2 py-1 text-xs rounded', badgeClass(item.category))}>
          {item.category}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm">Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>
        <p className="text-sm">Status: <strong>{item.status}</strong></p>
      </div>
    </div>
  )
}
