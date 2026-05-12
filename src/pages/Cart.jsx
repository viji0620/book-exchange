import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveItem }) {
  const navigate = useNavigate()

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = (subtotal * 0.08).toFixed(2)
  const shipping = subtotal > 50 ? 0 : 10
  const total = (parseFloat(subtotal) + parseFloat(tax) + shipping).toFixed(2)

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
            >
              Continue Shopping →
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg divide-y">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 flex gap-6">
                    {/* Product Image */}
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />

                    {/* Product Details */}
                    <div className="flex-1">
                      <button
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="font-bold text-lg text-gray-900 hover:text-purple-600 transition"
                      >
                        {item.name}
                      </button>
                      <p className="text-gray-600 text-sm mb-2">Category: {item.category}</p>
                      <p className="text-gray-600 text-sm">Seller: {item.seller}</p>
                    </div>

                    {/* Price & Quantity */}
                    <div className="text-right flex flex-col justify-between">
                      <div>
                        <p className="text-2xl font-black text-green-600">${item.price}</p>
                        <p className="text-sm text-gray-600 line-through">${item.originalPrice}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="bg-gray-200 px-2 py-1 rounded font-bold hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded font-bold hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-600 font-bold hover:text-red-700 ml-3"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Button */}
              <button
                onClick={() => navigate('/products')}
                className="mt-6 text-purple-600 font-bold hover:underline"
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gradient-to-b from-purple-50 to-indigo-50 rounded-lg shadow-lg p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%)</span>
                    <span className="font-bold">${tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Shipping</span>
                    <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 pb-6 border-b-2">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-black text-green-600">${total}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-bold text-lg transition"
                >
                  Proceed to Checkout →
                </button>

                {shipping === 0 && (
                  <p className="text-center text-green-600 font-bold mt-3">✓ FREE Delivery!</p>
                )}

                {/* Guarantees */}
                <div className="mt-6 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><span>✓</span> Secure Checkout</p>
                  <p className="flex items-center gap-2"><span>✓</span> Money-back guarantee</p>
                  <p className="flex items-center gap-2"><span>✓</span> 30-day returns</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
