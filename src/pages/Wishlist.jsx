import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Wishlist() {
  const navigate = useNavigate()
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      setWishlistItems(JSON.parse(saved))
    }
  }, [])

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id)
    setWishlistItems(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8">❤️ My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6">Save items to your wishlist</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold"
            >
              Continue Shopping →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-xs text-gray-600">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-black text-green-600">${item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="flex-1 bg-purple-600 text-white py-1 rounded text-sm font-bold hover:bg-purple-700 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex-1 bg-red-600 text-white py-1 rounded text-sm font-bold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
