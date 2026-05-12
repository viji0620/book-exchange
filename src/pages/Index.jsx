import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/products'

export default function Home() {
  const navigate = useNavigate()
  const [currentBanner, setCurrentBanner] = useState(0)

  const banners = [
    // swap electronics for a book collection name
    { title: 'Up to 70% OFF', subtitle: 'on Fantasy Books', color: 'from-blue-600 to-cyan-500' },
    // second slide updated to mention romantic books instead of trends
    { title: 'New Arrivals', subtitle: 'Latest Romantic Books', color: 'from-pink-600 to-rose-500' },
    { title: 'Home Essentials', subtitle: 'Best Deals', color: 'from-orange-600 to-red-500' }
  ]

  const deals = PRODUCTS.filter(p => p.originalPrice - p.price > 20)
  const topRated = PRODUCTS.filter(p => p.rating >= 4.7).sort(() => Math.random() - 0.5).slice(0, 8)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Carousel */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className={`bg-gradient-to-r ${banners[currentBanner].color} rounded-xl p-12 text-white text-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 right-5 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          </div>
          <h2 className="text-5xl font-black mb-4 relative z-10">{banners[currentBanner].title}</h2>
          <p className="text-2xl mb-8 relative z-10">{banners[currentBanner].subtitle}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-white text-purple-900 px-10 py-3 rounded-lg font-bold hover:bg-amber-50 transition relative z-10"
          >
            Shop Now →
          </button>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6 relative z-10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-3 h-3 rounded-full transition ${idx === currentBanner ? 'bg-white w-8' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-3xl font-black text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:scale-105 text-center"
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-gray-600 text-sm">{cat.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Deals */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-3xl font-black text-gray-900">⚡ Flash Deals</h2>
          <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Save up to 70%</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {deals.slice(0, 4).map(product => (
            <button
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <span className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded font-bold text-sm">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-green-600">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Rated Products */}
      <div className="max-w-7xl mx-auto px-6 mt-12 mb-12">
        <h2 className="text-3xl font-black text-gray-900 mb-6">⭐ Top Rated Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topRated.map(product => (
            <button
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                </div>
                <span className="text-lg font-black text-green-600">${product.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
