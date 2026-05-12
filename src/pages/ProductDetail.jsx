import React, { useState } from 'react'

const images = import.meta.glob('../assest/*.{jpg,jpeg,png,svg}', { eager: true, query: '?url', import: 'default' })

const defaultCover = Object.values(images)[0] || ''

function resolveImage(img) {
  if (!img) return defaultCover
  if (img.startsWith('http')) return img
  const filename = img.split(/[/\\]/).pop()
  const key = Object.keys(images).find(k => k.endsWith(filename))
  return key ? images[key] : defaultCover
}
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'

export default function ProductDetail({ onAddToCart, onAddToWishlist }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [savedToWishlist, setSavedToWishlist] = useState(false)

  const product = PRODUCTS.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/products')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const savings = (product.originalPrice - product.price).toFixed(2)

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleAddToWishlist = () => {
    if (typeof onAddToWishlist === 'function') {
      onAddToWishlist(product)
      setSavedToWishlist(true)
      setTimeout(() => setSavedToWishlist(false), 1500)
    } else {
      // fallback to localStorage
      const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
      if (!saved.find(i => i.id === product.id)) {
        saved.push(product)
        localStorage.setItem('wishlist', JSON.stringify(saved))
        setSavedToWishlist(true)
        setTimeout(() => setSavedToWishlist(false), 1500)
      }
    }
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <button onClick={() => navigate('/')} className="hover:text-purple-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-purple-600">Products</button>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div>
              <div className="relative">
                <img src={resolveImage(product.image)} alt={product.name} className="w-full rounded-lg" />
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded font-bold text-lg">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-bold text-lg">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b-2">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-black text-green-600">${product.price}</span>
                  <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
                </div>
                <p className="text-red-600 font-bold">Save ${savings} ({discount}%)</p>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <p className={`text-lg font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </p>
                <p className="text-gray-600">Seller: <span className="font-bold">{product.seller}</span></p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mb-6">
                <label className="block font-bold text-gray-900 mb-2">Quantity:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 px-4 py-2 rounded font-bold hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 px-4 py-2 rounded font-bold hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 rounded-lg font-bold text-lg transition ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  } ${!product.inStock && 'opacity-50 cursor-not-allowed'}`}
                >
                  {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
                </button>
                <button onClick={handleAddToWishlist} className={`flex-1 border-2 border-purple-600 py-4 rounded-lg font-bold text-lg transition ${savedToWishlist ? 'bg-purple-600 text-white border-purple-600' : 'text-purple-600 hover:bg-purple-50'}`}>
                  {savedToWishlist ? '✓ Saved' : '❤️ Add to Wishlist'}
                </button>
              </div>

              {/* Free Delivery */}
              <div className="mt-6 pt-6 border-t-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="font-bold text-gray-900">FREE Delivery</p>
                    <p className="text-sm text-gray-600">Orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <p className="font-bold text-gray-900">Secure Checkout</p>
                    <p className="text-sm text-gray-600">SSL 256-bit encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(related => (
                <button
                  key={related.id}
                  onClick={() => navigate(`/product/${related.id}`)}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img src={resolveImage(related.image)} alt={related.name} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{related.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-xs text-gray-600">{related.rating}</span>
                    </div>
                    <span className="text-lg font-black text-green-600">${related.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
