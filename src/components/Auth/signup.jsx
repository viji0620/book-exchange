import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SignUp = ({ onClose, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
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
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      // Handle sign up logic here
      console.log('Sign up data:', formData)
      // Add your registration logic here
    }
  }

  const handleSocialSignUp = (provider) => {
    // Handle social sign up logic
    console.log(`Sign up with ${provider}`)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto'
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl'
        >
          ×
        </button>

        {/* Header */}
        <h2 className='text-3xl font-bold text-gray-800 mb-2 text-center'>Create Account</h2>
        <p className='text-gray-500 text-center mb-6'>Let's get you started with your account</p>

        {/* Social Sign Up Buttons */}
        <div className='space-y-3 mb-6'>
          <button
            onClick={() => handleSocialSignUp('google')}
            className='w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition'
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className='w-5 h-5' />
            <span className='text-gray-700 font-medium'>Continue with Google</span>
          </button>
          <button
            onClick={() => handleSocialSignUp('facebook')}
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

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-gray-700 font-medium mb-2'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='Enter your full name'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
            )}
          </div>

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
              placeholder='Create a password'
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder='Confirm your password'
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-gray-500 text-gray-800 py-3 rounded-lg font-medium hover:bg-blue-200 transition'
          >
            Create Account
          </button>
        </form>

        {/* Terms */}
        <p className='text-center text-gray-500 text-sm mt-4'>
          By signing up, you agree to our{' '}
          <a href='#' className='text-blue-500 hover:underline'>Terms</a> and{' '}
          <a href='#' className='text-blue-500 hover:underline'>Privacy Policy</a>
        </p>

        {/* Sign In Link */}
        <p className='text-center text-gray-600 mt-6'>
          Already have an account?{' '}
          <button
            onClick={onSwitchToSignIn}
            className='text-gray-500 font-medium hover:underline'
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUp