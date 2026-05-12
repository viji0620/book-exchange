import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ cartCount = 0, wishlistCount = 0, user = null, onLogout = () => {} }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const categories = ['Fantasy Books']

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-purple-700">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-3xl font-black hover:text-amber-300 transition"
          >
            📚 Book Exchange Store
          </button>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 mx-8">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fantasy books..."
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 px-6 py-2 rounded-r-lg font-bold hover:bg-amber-600 transition"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/cart')}
              className="relative group"
            >
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden group-hover:block absolute right-0 mt-2 bg-gray-900 px-2 py-1 rounded text-sm whitespace-nowrap">Cart</span>
            </button>

            <button
              onClick={() => navigate('/wishlist')}
              className="relative group text-2xl hover:text-red-400 transition"
            >
              ❤️
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{wishlistCount}</span>
              )}
              <span className="hidden group-hover:block absolute right-0 mt-2 bg-gray-900 px-2 py-1 rounded text-sm whitespace-nowrap">Wishlist</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-2xl hover:text-amber-300 transition"
              >
                👤
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 z-50 bg-gray-900 rounded-lg shadow-xl py-2 border border-purple-600">
                  {user ? (
                    <>
                      <p className="px-4 py-2 font-bold text-amber-300">Hello, {user.name}!</p>
                      <button
                        onClick={() => { navigate('/orders'); setShowMenu(false) }}
                        className="w-full text-left px-4 py-2 hover:bg-purple-700 transition"
                      >
                        📦 My Orders
                      </button>
                      <button
                        onClick={() => { navigate('/profile'); setShowMenu(false) }}
                        className="w-full text-left px-4 py-2 hover:bg-purple-700 transition"
                      >
                        👤 Profile
                      </button>
                      <button
                        onClick={() => { onLogout(); setShowMenu(false) }}
                        className="w-full text-left px-4 py-2 hover:bg-red-700 transition text-red-300"
                      >
                        🚪 Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { navigate('/login'); setShowMenu(false) }}
                        className="w-full text-left px-4 py-2 hover:bg-purple-700 transition font-bold text-amber-300"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => { navigate('/signup'); setShowMenu(false) }}
                        className="w-full text-left px-4 py-2 hover:bg-purple-700 transition"
                      >
                        Create Account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t border-purple-700">
        <div className="max-w-7xl mx-auto px-6 py-2 flex gap-8">
          {categories.map(cat => (
            cat === 'Fantasy Books' ? (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                className="ml-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transform hover:scale-105 transition font-extrabold text-lg"
                aria-label="Fantasy Books"
              >
                <span className="text-xl">📚</span>
                <span className="leading-none">{cat}</span>
              </button>
            ) : (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                className="hover:text-amber-300 transition font-semibold text-sm"
              >
                {cat}
              </button>
            )
          ))}
          <button
            onClick={() => navigate('/seller')}
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-lg transform hover:scale-105 transition font-extrabold text-lg md:text-xl"
            aria-label="Sell Books"
          >
            <span className="text-2xl">✍️</span>
            <span className="leading-none">Sell Books</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
