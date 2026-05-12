import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile({ user = {} }) {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData))
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8">👤 My Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center sticky top-20">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👤
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.name}</h2>
              <p className="text-gray-600 mb-6">{formData.email}</p>
              
              <button
                onClick={() => navigate('/orders')}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition mb-2"
              >
                📦 My Orders
              </button>
              <button
                onClick={() => navigate('/wishlist')}
                className="w-full border-2 border-purple-600 text-purple-600 py-2 rounded-lg font-bold hover:bg-purple-50 transition"
              >
                ❤️ Wishlist
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-6 pb-6 border-b-2">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-purple-600 font-bold hover:text-purple-700"
                >
                  {isEditing ? '✕ Cancel' : '✏️ Edit'}
                </button>
              </div>

              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <label className="block font-bold text-gray-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-900 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                      rows="3"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                  >
                    ✓ Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-lg font-bold text-gray-900">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-bold text-gray-900">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-lg font-bold text-gray-900">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-lg font-bold text-gray-900">{formData.address || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-6 border-b-2">Account Settings</h2>
              
              <div className="space-y-4">
                <button className="w-full text-left p-4 border-b hover:bg-gray-50 transition">
                  <p className="font-bold text-gray-900">🔒 Change Password</p>
                  <p className="text-sm text-gray-600">Update your security settings</p>
                </button>
                <button className="w-full text-left p-4 border-b hover:bg-gray-50 transition">
                  <p className="font-bold text-gray-900">📧 Email Preferences</p>
                  <p className="text-sm text-gray-600">Manage notifications and promotions</p>
                </button>
                <button className="w-full text-left p-4 border-b hover:bg-gray-50 transition">
                  <p className="font-bold text-gray-900">🔗 Connected Accounts</p>
                  <p className="text-sm text-gray-600">Link other services to your account</p>
                </button>
                <button className="w-full text-left p-4 hover:bg-gray-50 transition">
                  <p className="font-bold text-gray-900">📱 Email & SMS</p>
                  <p className="text-sm text-gray-600">Set up two-factor authentication</p>
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-6 border-b-2">Help & Support</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-purple-600 transition">
                  <p className="font-bold text-gray-900">❓ FAQ</p>
                </button>
                <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-purple-600 transition">
                  <p className="font-bold text-gray-900">💬 Contact Us</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
