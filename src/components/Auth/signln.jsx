import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const SignIn = ({ onClose, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle sign in logic here
      console.log('Sign in data:', formData)
      // Add your authentication logic here
    }
  }

  const handleSocialLogin = (provider) => {
    // Handle social login logic
    console.log(`Login with ${provider}`)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative'
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl'
        >
          ×
        </button>

        {/* Header */}
        <h2 className='text-3xl font-bold text-gray-800 mb-2 text-center'>Welcome Back</h2>
        <p className='text-gray-500 text-center mb-6'>Sign in to your account</p>

        {/* Social Login Buttons */}
        <div className='space-y-3 mb-6'>
          <button
            onClick={() => handleSocialLogin('google')}
            className='w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition'
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className='w-5 h-5' />
            <span className='text-gray-700 font-medium'>Continue with Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className='w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition'
          >
            <svg className='w-5 h-5 text-blue-600' fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className='text-gray-700 font-medium'>Continue with Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className='flex items-center gap-4 mb-6'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <span className='text-gray-500 text-sm'>OR</span>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className='flex justify-end'>
            <a href='#' className='text-blue-500 text-sm hover:underline'>
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-gray-500 text-gray-800 py-3 rounded-lg font-medium hover:bg-blue-200 transition'
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className='text-center text-gray-600 mt-6'>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignUp}
            className='text-blue-500 font-medium hover:underline'
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default SignIn