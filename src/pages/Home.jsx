import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const handleBrowseBooks = () => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/books')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-500 h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="text-center text-white px-6 relative z-10">
          <h1 className="text-7xl font-black mb-4 drop-shadow-lg">📚 BookSwap</h1>
          <p className="text-2xl mb-8 font-light drop-shadow">Buy & Sell Textbooks at Half Price</p>
          <div className="space-x-4">
            <button 
              onClick={handleBrowseBooks}
              className="bg-white text-purple-700 px-10 py-4 rounded-xl font-bold text-lg mr-4 hover:bg-amber-50 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Books
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-amber-500 hover:to-orange-500 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-purple-100">
          <h2 className="text-4xl font-bold mb-4 text-purple-900">About BookSwap</h2>
          <p className="text-gray-700 text-lg mb-4">
            We are a student-focused platform designed to make university education more affordable. 
            Our platform allows students to buy, sell, or exchange textbooks at significantly reduced prices.
          </p>
          <p className="text-gray-700 text-lg">
            Connect with other students, find the right books at the right prices, and help reduce academic expenses while promoting sustainability.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-900">How Book Exchange Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-indigo-100">
              <h3 className="text-2xl font-bold mb-2 text-indigo-900">📖 Easy to List</h3>
              <p className="text-gray-700">List your books for sale or exchange in minutes with our simple process.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-amber-100">
              <h3 className="text-2xl font-bold mb-2 text-amber-900">💰 Best Prices</h3>
              <p className="text-gray-700">Get up to 50% off on textbooks compared to original retail prices.</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-cyan-100">
              <h3 className="text-2xl font-bold mb-2 text-cyan-900">🔄 Direct Swap</h3>
              <p className="text-gray-700">Exchange your textbooks directly with other students easily.</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-rose-100">
              <h3 className="text-2xl font-bold mb-2 text-rose-900">🚚 Safe Delivery</h3>
              <p className="text-gray-700">Secure and reliable delivery options for all your orders.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-900">Payment Methods</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 hover:border-purple-200">
              <h3 className="text-2xl font-bold mb-2 text-purple-900">💳 Credit/Debit Card</h3>
              <p className="text-gray-600">Visa, Mastercard, American Express - Fast & Secure</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 hover:border-amber-200">
              <h3 className="text-2xl font-bold mb-2 text-amber-900">💵 Digital Wallet</h3>
              <p className="text-gray-600">PayPal, Google Pay, Apple Pay - One-click payments</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 hover:border-cyan-200">
              <h3 className="text-2xl font-bold mb-2 text-cyan-900">🏦 Bank Transfer</h3>
              <p className="text-gray-600">Direct bank-to-bank transfer - Zero fees</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 hover:border-rose-200">
              <h3 className="text-2xl font-bold mb-2 text-rose-900">💸 Cash Payment</h3>
              <p className="text-gray-600">In-person exchange - Immediate settlement</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 hover:border-green-200">
              <h3 className="text-2xl font-bold mb-2 text-green-900">📱 Mobile Money</h3>
              <p className="text-gray-600">M-Pesa, GCash and similar services</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 hover:border-blue-200">
              <h3 className="text-2xl font-bold mb-2 text-blue-900">🛡️ Secure Checkout</h3>
              <p className="text-gray-600">256-bit encryption for all transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-xl mb-8 font-light">Join thousands of students saving money on textbooks</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-white text-purple-700 px-12 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Get Started Now
        </button>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-6 text-center">
        <p>&copy; 2026 BookSwap. All rights reserved.</p>
      </div>
    </div>
  )
}
