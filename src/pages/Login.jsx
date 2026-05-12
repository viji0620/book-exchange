import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login({ onLogin = () => {} }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (isSignUp) {
      if (!formData.name) newErrors.name = 'Name is required'
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onLogin(formData)
      // navigate to redirect param if provided, otherwise fallback to /cart
      const params = new URLSearchParams(location.search)
      const redirect = params.get('redirect') || '/cart'
      navigate(redirect)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-500 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 border-2 border-purple-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">📚 BookSwap</h1>
          <p className="text-gray-700 font-semibold">{isSignUp ? 'Create your account' : 'Welcome back'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-gray-50"
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500 text-sm font-semibold">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-gray-50"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm font-semibold">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-gray-50"
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm font-semibold">{errors.password}</p>}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-gray-50"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm font-semibold">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 transition mt-6 shadow-lg hover:shadow-xl"
          >
            {isSignUp ? '✓ Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 font-bold hover:text-indigo-600 transition"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
