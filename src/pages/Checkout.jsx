import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Checkout({ cartItems = [], onCheckout }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = (subtotal * 0.08).toFixed(2)
  const shipping = subtotal > 50 ? 0 : 10
  const total = (parseFloat(subtotal) + parseFloat(tax) + shipping).toFixed(2)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const temp = {}
    const emailRe = /^\S+@\S+\.\S+$/
    const zipRe = /^\d{3,10}$/
    const expiryRe = /^(0[1-9]|1[0-2])\/\d{2}$/
    const cvvRe = /^\d{3,4}$/

    if (!formData.fullName.trim()) temp.fullName = 'Full name is required.'
    if (!emailRe.test(formData.email)) temp.email = 'Enter a valid email.'
    // normalize phone (allow spaces, dashes, parentheses)
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 7 || phoneDigits.length > 15) temp.phone = 'Enter a valid phone number.'
    if (!formData.address.trim()) temp.address = 'Address is required.'
    if (!formData.city.trim()) temp.city = 'City is required.'
    if (!zipRe.test(formData.zipCode)) temp.zipCode = 'Enter a valid ZIP/postal code.'
    if (!formData.country.trim()) temp.country = 'Country is required.'

    if (!formData.cardName.trim()) temp.cardName = 'Name on card is required.'
    // normalize card number (allow spaces/dashes)
    const cardDigits = formData.cardNumber.replace(/\D/g, '')
    if (cardDigits.length < 13 || cardDigits.length > 19) temp.cardNumber = 'Enter a valid card number.'
    if (!expiryRe.test(formData.expiry)) temp.expiry = 'Expiry must be MM/YY.'
    else {
      // check not expired
      const [mm, yy] = formData.expiry.split('/')
      const expMonth = parseInt(mm, 10)
      const expYear = 2000 + parseInt(yy, 10)
      const now = new Date()
      const expDate = new Date(expYear, expMonth - 1, 1)
      if (expDate < new Date(now.getFullYear(), now.getMonth(), 1)) temp.expiry = 'Card has expired.'
    }
    if (!cvvRe.test(formData.cvv)) temp.cvv = 'Enter a valid CVV.'

    setErrors(temp)
    return Object.keys(temp).length === 0
  }

  useEffect(() => {
    const valid = validateForm()
    setIsValid(valid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      alert('Please complete all required fields correctly.')
      return
    }

    onCheckout({ ...formData, total })
    alert('Order placed successfully!')
    navigate('/orders')
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Items to Checkout</h1>
          <button
            onClick={() => navigate('/cart')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Back to Cart
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📍 Shipping Address</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                  required
                />
                <textarea
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                  required
                />
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💳 Payment Method</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                  required
                />
                {errors.cardName && <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>}
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength="16"
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                  required
                />
                {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    maxLength="5"
                    className="border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                    required
                  />
                  {errors.expiry && <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>}
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                    className="border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none"
                    required
                  />
                  {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 pb-6 border-b-2 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} x {item.quantity}</span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 my-6 pb-6 border-b-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax (8%)</span>
                  <span className="font-bold">${tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-green-600">${total}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`w-full py-3 rounded-lg font-bold text-lg transition ${isValid ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} 
              >
                Place Order
              </button>

              {!isValid && Object.keys(errors).length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded text-sm text-yellow-800">
                  <p className="font-semibold mb-2">Please fix the following:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.entries(errors).map(([k, v]) => (
                      <li key={k}>{v}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => navigate('/cart')}
                className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
              >
                ← Back to Cart
              </button>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-semibold">🔒 This is a secure checkout</p>
                <p className="text-xs text-green-700 mt-1">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
