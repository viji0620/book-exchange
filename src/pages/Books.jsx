import React, { useState, useEffect } from 'react'
import { PRODUCTS } from '../data/products'
import { useNavigate, useLocation } from 'react-router-dom'
import LoginModal from '../components/LoginModal'

const images = import.meta.glob('../assest/*.{jpg,jpeg,png,svg}', { eager: true, query: '?url', import: 'default' })
const defaultCover = Object.values(images)[0] || ''

function resolveImage(img) {
  if (!img) return defaultCover
  if (img.startsWith('http')) return img
  // handle '/src/assest/...' or absolute Windows paths by extracting filename
  const filename = img.split(/[/\\]/).pop()
  const key = Object.keys(images).find(k => k.endsWith(filename))
  return key ? images[key] : defaultCover
}

// Sample books data with actual project images
const SAMPLE_BOOKS = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    author: 'David Smith',
    price: '45.99',
    condition: 'Like New',
    seller: 'John Admin',
    date: '2026-02-01',
    image: '/src/assest/project_img_1.jpg'
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    author: 'Prof. Mathematics',
    price: '38.50',
    condition: 'Good',
    seller: 'Sarah Student',
    date: '2026-02-02',
    image: '/src/assest/project_img_2.jpg'
  },
  {
    id: 3,
    title: 'Chemistry Fundamentals',
    author: 'Dr. Chemistry',
    price: '52.00',
    condition: 'Like New',
    seller: 'Mike Labs',
    date: '2026-02-03',
    image: '/src/assest/header_img (1).jpg'
  },
  {
    id: 4,
    title: 'Biology Essentials',
    author: 'Prof. Biology',
    price: '48.99',
    condition: 'Good',
    seller: 'Emma Science',
    date: '2026-02-04',
    image: '/src/assest/header_img (2).jpg'
  },
  {
    id: 5,
    title: 'Physics Principles',
    author: 'Dr. Physics',
    price: '55.99',
    condition: 'Like New',
    seller: 'Tom Scholar',
    date: '2026-02-05',
    image: '/src/assest/project_img_1.jpg'
  },
  {
    id: 6,
    title: 'English Literature',
    author: 'Prof. Literature',
    price: '35.00',
    condition: 'Good',
    seller: 'Lisa Books',
    date: '2026-02-06',
    image: '/src/assest/project_img_2.jpg'
  },
  {
    id: 7,
    title: 'Economics 101',
    author: 'Dr. Economics',
    price: '42.50',
    condition: 'Good',
    seller: 'Alex Trade',
    date: '2026-02-07',
    image: '/src/assest/header_img (1).jpg'
  },
  {
    id: 8,
    title: 'History of Mankind',
    author: 'Prof. History',
    price: '39.99',
    condition: 'Used',
    seller: 'David Time',
    date: '2026-02-08',
    image: '/src/assest/header_img (2).jpg'
  }
]

export default function Books({ onAddToCart }) {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginAction, setLoginAction] = useState('')
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    condition: 'Good',
    image: null,
    imagePreview: null,
    catalogImage: '',
    imageURL: '',
    rating: 4.5,
    description: '',
    originalPrice: ''
  })
  const [imageError, setImageError] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    // Load books or initialize with sample books
    const savedBooks = localStorage.getItem('books')
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    } else {
      // Initialize with sample books on first load
      localStorage.setItem('books', JSON.stringify(SAMPLE_BOOKS))
      setBooks(SAMPLE_BOOKS)
    }
  }, [])

  // Auto-open add form when navigated from /seller or when query ?open=1 is present
  const location = useLocation()
  useEffect(() => {
    const stored = localStorage.getItem('user')
    const hasStored = !!stored

    const params = new URLSearchParams(location.search)
    const open = params.get('open')
    if (location.pathname === '/seller' || open === '1') {
      if (!hasStored && !user) {
        setLoginAction('sell')
        setShowLoginModal(true)
      } else {
        setShowAddForm(true)
      }
    }
  }, [location.pathname, location.search])

  const handleAddBookClick = () => {
    if (!user) {
      setLoginAction('sell')
      setShowLoginModal(true)
    } else {
      setShowAddForm(prev => !prev)
    }
  }

  const handleBuyClick = (book) => {
    if (!user) {
      setLoginAction('buy')
      setShowLoginModal(true)
      return
    }
    // prefer App-level handler so cart state stays in sync
    if (typeof onAddToCart === 'function') {
      onAddToCart(book, 1)
    } else {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existing = savedCart.find(i => i.id === book.id)
      if (existing) {
        const updated = savedCart.map(i => i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i)
        localStorage.setItem('cart', JSON.stringify(updated))
      } else {
        const item = { ...book, quantity: 1 }
        localStorage.setItem('cart', JSON.stringify([...savedCart, item]))
      }
    }

    navigate('/checkout')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewBook(prev => ({
          ...prev,
          image: reader.result,
          imagePreview: reader.result
        }))
        setImageError('')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageURLChange = (e) => {
    const url = e.target.value
    setNewBook(prev => ({
      ...prev,
      imageURL: url,
      image: url,
      imagePreview: url
    }))
    setImageError('')
  }

  const catalogImages = Array.from(new Set(PRODUCTS.map(p => p.image).filter(Boolean)))

  const handleCatalogSelect = (e) => {
    const img = e.target.value
    setNewBook(prev => ({
      ...prev,
      catalogImage: img,
      image: img,
      imagePreview: img
    }))
    setImageError('')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddBook = (e) => {
    e.preventDefault()
    if (!newBook.image) {
      setImageError('Please add a cover image — upload, paste a URL, or choose from catalog')
      return
    }

    if (newBook.title && newBook.author && newBook.price && newBook.image) {
      const bookToAdd = {
        id: Date.now(),
        title: newBook.title,
        author: newBook.author,
        price: parseFloat(newBook.price),
        originalPrice: newBook.originalPrice ? parseFloat(newBook.originalPrice) : null,
        condition: newBook.condition,
        image: newBook.image,
        imagePreview: newBook.imagePreview,
        seller: user.name,
        date: new Date().toLocaleDateString(),
        rating: newBook.rating || 0,
        description: newBook.description || '',
        reviews: 0
      }
      const updatedBooks = [...books, bookToAdd]
      setBooks(updatedBooks)
      localStorage.setItem('books', JSON.stringify(updatedBooks))
      setNewBook({ title: '', author: '', price: '', condition: 'Good', image: null, imagePreview: null, catalogImage: '', imageURL: '', rating: 4.5, description: '', originalPrice: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id)
    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-600 text-white p-4 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black">📚 BookSwap</h1>
          <div className="flex items-center gap-6">
            {user && <span className="font-semibold text-purple-100">Welcome, {user?.name}!</span>}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 transition font-bold shadow-lg"
              >
                Logout
              </button>
            )}
            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="bg-amber-500 px-6 py-2 rounded-lg hover:bg-amber-600 transition font-bold shadow-lg"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Add Book Section */}
        <div className="mb-8">
          <button
            onClick={handleAddBookClick}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {showAddForm ? '❌ Cancel' : '+ Add Your Book'}
          </button>
        </div>

        {/* Add Book Form */}
        {user && showAddForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8 border-2 border-green-100">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-900">📖 Add Your Book for Sale</h2>
            <form onSubmit={handleAddBook} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Book Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={newBook.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Original Price (optional)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={newBook.originalPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                    placeholder="e.g. 24.99"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Condition</label>
                  <select
                    name="condition"
                    value={newBook.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                  >
                    <option>Good</option>
                    <option>Like New</option>
                    <option>Used</option>
                    <option>Fair</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Upload Book Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Or choose from catalog covers</label>
                  <select
                    value={newBook.catalogImage}
                    onChange={handleCatalogSelect}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                  >
                    <option value="">-- Pick an existing cover --</option>
                    {catalogImages.map((img, idx) => (
                      <option key={idx} value={img}>Cover {idx + 1}</option>
                    ))}
                  </select>
                  <label className="block text-gray-700 font-semibold mb-2 mt-3">Or enter image URL</label>
                  <input
                    type="url"
                    name="imageURL"
                    value={newBook.imageURL}
                    onChange={handleImageURLChange}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                  />
                </div>
              </div>

              {newBook.imagePreview && (
                <div className="mt-4">
                  <p className="text-gray-700 font-semibold mb-2">Image Preview:</p>
                  <img src={newBook.imagePreview} alt="Preview" className="h-48 object-cover rounded-lg shadow-lg" />
                </div>
              )}
              {imageError && (
                <p className="text-red-600 font-semibold mt-3">{imageError}</p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Rating (1.0 - 5.0)</label>
                  <input
                    type="number"
                    name="rating"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newBook.rating}
                    onChange={(e) => setNewBook(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                    className="w-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Short Description</label>
                  <textarea
                    name="description"
                    value={newBook.description}
                    onChange={(e) => setNewBook(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-gray-50"
                    placeholder="Add a short description or notes about the book"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition shadow-lg"
              >
                ✓ Add Book
              </button>
            </form>
          </div>
        )}

        {/* Books Grid */}
              {books.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">📚 No Books Available</h2>
            <p className="text-gray-600 mb-6 text-lg">Be the first to add a book for sale!</p>
            <button
              onClick={handleAddBookClick}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-lg inline-block"
            >
              Add First Book
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-black text-purple-900">Available Books ({books.length})</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded mt-2"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map(book => (
                <div key={book.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 border border-gray-100">
                  {book.originalPrice && book.originalPrice > book.price && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                      -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                    </div>
                  )}
                    <div className="w-full h-48 flex items-center justify-center bg-gray-50 p-0">
                    <img src={resolveImage(book.image)} alt={book.title} className="w-full h-48 object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 truncate text-purple-900">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 font-semibold">{book.author}</p>
                    <div className="space-y-1 mb-3 text-sm">
                      <p className="text-gray-600">Condition: <span className="font-bold text-amber-600">{book.condition}</span></p>
                      <p className="text-gray-600">Seller: <span className="font-bold text-indigo-600">{book.seller}</span></p>
                      {book.rating !== undefined && (
                        <p className="text-gray-600">Rating: <span className="font-bold text-yellow-500">{book.rating.toFixed ? book.rating.toFixed(1) : book.rating} ★</span> <span className="text-gray-400">({book.reviews || 0})</span></p>
                      )}
                      {book.description && (
                        <p className="text-gray-600 truncate">{book.description}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="text-3xl font-black text-green-600">${book.price}</span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <span className="text-sm text-gray-500 line-through ml-3">${book.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleBuyClick(book)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-bold shadow-md"
                      >
                        Buy Now
                      </button>
                      {user?.name === book.seller && (
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-rose-700 transition font-bold shadow-md"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        action={loginAction}
      />
    </div>
  )
}
