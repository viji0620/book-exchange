import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
const images = import.meta.glob('../assest/*.{jpg,jpeg,png,svg}', { eager: true, query: '?url', import: 'default' })

const defaultCover = Object.values(images)[0] || ''

function resolveImage(img) {
  if (!img) return defaultCover
  if (img.startsWith('http')) return img
  const filename = img.split(/[/\\]/).pop()
  const key = Object.keys(images).find(k => k.endsWith(filename))
  return key ? images[key] : defaultCover
}

export default function Products({ onAddToWishlist }) {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('relevant')
  const [filterCategory, setFilterCategory] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500)
  const [minRating, setMinRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const { category } = useParams()
  const { search } = useLocation()

  // when route param or query changes, update filters accordingly
  useEffect(() => {
    if (category) {
      // convert slug (dashes) back to spaces
      setFilterCategory(category.replace(/-/g, ' '))
    }
    const params = new URLSearchParams(search)
    const q = params.get('q')
    if (q) {
      // simple full text filter: will be applied by filteredAndSorted
      setFilterCategory('')
      // we'll treat minRating 0 etc. products filter will include name/search matches if we expand code below
    }
  }, [category, search])

  const filteredAndSorted = useMemo(() => {
    let filtered = PRODUCTS.filter(p => {
      const matchesCategory = !filterCategory || p.category === filterCategory
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice
      const matchesRating = p.rating >= minRating
      // also support search query param
      const params = new URLSearchParams(window.location.search)
      const q = params.get('q')
      const matchesSearch = !q || p.name.toLowerCase().includes(q.toLowerCase())
      return matchesCategory && matchesPrice && matchesRating && matchesSearch
    })

    let sorted = [...filtered]
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        sorted.reverse()
        break
      default:
        break
    }
    return sorted
  }, [filterCategory, minPrice, maxPrice, minRating, sortBy])

  const categories = [...new Set(PRODUCTS.map(p => p.category))]

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-gray-900">All Products</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-purple-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            {showFilters ? '✕ Close Filters' : '⚙ Filters'}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64`}>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              {/* Sort */}
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-2 focus:border-purple-600 focus:outline-none"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!filterCategory}
                      onChange={() => setFilterCategory('')}
                      className="w-4 h-4"
                    />
                    <span>All Categories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={filterCategory === cat}
                        onChange={() => setFilterCategory(cat)}
                        className="w-4 h-4"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min: ${minPrice}</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max: ${maxPrice}</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4"
                      />
                      <span>
                        {rating === 0 ? 'All Ratings' : `${rating}+ ⭐`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredAndSorted.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setFilterCategory('')
                    setMinPrice(0)
                    setMaxPrice(500)
                    setMinRating(0)
                  }}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4 font-semibold">Showing {filteredAndSorted.length} products</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredAndSorted.map(product => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1 relative">
                      <div className="w-full text-left block">
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="w-full block"
                          aria-label={`View ${product.name}`}
                        >
                          <div className="relative">
                              <div className="w-full h-40 flex items-center justify-center bg-gray-50 text-center p-0">
                              <img src={resolveImage(product.image)} alt={product.name} className="w-full h-40 object-cover" />
                            </div>
                            {product.originalPrice > product.price && (
                              <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded font-bold text-xs">
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                              </span>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h3>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-yellow-500 text-sm">★</span>
                              <span className="text-xs text-gray-600">{product.rating} ({product.reviews})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-black text-green-600">${product.price}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                        </button>

                        <div className="absolute top-2 left-2">
                          <button
                            onClick={() => onAddToWishlist && onAddToWishlist(product)}
                            className="bg-white/90 px-2 py-1 rounded-full shadow text-red-500 hover:bg-white"
                            aria-label="Add to wishlist"
                          >
                            ❤️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
