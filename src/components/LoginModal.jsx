import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginModal({ isOpen, onClose, action }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleLogin = () => {
    // pass redirect based on action so login can return user to the intended page
    const redirect = action === 'sell' ? '/seller' : '/cart'
    navigate(`/login?redirect=${encodeURIComponent(redirect)}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
        <button
          onClick={onClose}
          className="float-right text-gray-400 text-2xl hover:text-gray-600"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600">
            {action === 'buy' 
              ? 'Sign in to purchase books' 
              : 'Sign in to sell your books'}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition shadow-lg"
          >
            Go to Login
          </button>
          <button
            onClick={onClose}
            className="w-full border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  )
}
