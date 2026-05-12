import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders).reverse())
    }
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8">📦 My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Your orders will appear here</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold"
            >
              Start Shopping →
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-start mb-6 pb-6 border-b-2">
                  <div>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                    <p className="text-2xl font-black text-gray-900">${order.total}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{order.date}</p>
                    <p className={`text-lg font-bold ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Processing' ? 'text-blue-600' : 'text-orange-600'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="grid md:grid-cols-2 gap-8 mb-6 pb-6 border-b-2">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Shipping To</h3>
                    <p className="text-gray-700">{order.fullName}</p>
                    <p className="text-gray-700">{order.address}</p>
                    <p className="text-gray-700">{order.city}, {order.zipCode}</p>
                    <p className="text-gray-700">{order.country}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Contact</h3>
                    <p className="text-gray-700">{order.email}</p>
                    <p className="text-gray-700">{order.phone}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Items</h3>
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Track Order Button */}
                <button className="mt-6 w-full border-2 border-purple-600 text-purple-600 py-2 rounded-lg font-bold hover:bg-purple-50 transition">
                  📍 Track Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
