import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Index'
import Products from './pages/Products'
import Books from './pages/Books'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'

function App() {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))

    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCartItems(JSON.parse(savedCart))

    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const handleAddToCart = (product, quantity = 1) => {
    if (!user) {
      window.alert('Please login to add items to cart')
      return
    }
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      return [...prev, { ...product, quantity }]
    })
  }

  const handleUpdateCartQuantity = (productId, quantity) => {
    setCartItems(prev => quantity <= 0 ? prev.filter(i => i.id !== productId) : prev.map(i => i.id === productId ? { ...i, quantity } : i))
  }

  const handleRemoveFromCart = (productId) => setCartItems(prev => prev.filter(i => i.id !== productId))

  const handleAddToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev
      return [...prev, { ...product }]
    })
  }

  const handleRemoveFromWishlist = (productId) => setWishlistItems(prev => prev.filter(i => i.id !== productId))

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleCheckout = (orderData) => {
    if (!user) return
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const newOrder = {
      id: Date.now(),
      ...orderData,
      items: cartItems,
      total: orderData.total,
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    }
    orders.push(newOrder)
    localStorage.setItem('orders', JSON.stringify(orders))
    setCartItems([])
  }

  return (
    <Router>
      <Navbar cartCount={cartItems.length} wishlistCount={wishlistItems.length} user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products onAddToWishlist={handleAddToWishlist} />} />
        <Route path="/books" element={<Books onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />} />
        <Route path="/seller" element={<Books onAddToCart={handleAddToCart} />} />
        <Route path="/category/:category" element={<Products />} />
        <Route path="/search" element={<Products />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/checkout" element={user ? <Checkout cartItems={cartItems} onCheckout={handleCheckout} /> : <Navigate to="/login" />} />
        <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        <Route path="/wishlist" element={user ? <Wishlist /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
