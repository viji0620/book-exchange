import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import SignIn from './signln'
import SignUp from './signup'

const Navbar = () => {
  const [_showMobileMenu, _setShowMobileMenu] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  useEffect(() => {
    document.body.style.overflow = _showMobileMenu ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [_showMobileMenu])

  const handleSwitchToSignUp = () => {
    setShowSignIn(false)
    setShowSignUp(true)
  }

  const handleSwitchToSignIn = () => {
    setShowSignUp(false)
    setShowSignIn(true)
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center py-6 px-6 md:px-20 lg:px-32">

          {/* Logo */}
          <div className="flex items-center gap-4 cursor-pointer">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  width="240"
  height="72"
  viewBox="0 0 420 220"
  className="h-16 md:h-20"
  preserveAspectRatio="xMinYMid meet"
>
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow
        dx="0"
        dy="4"
        stdDeviation="10"
        floodColor="#000000"
        floodOpacity="0.25"
      />
    </filter>
  </defs>

  {/* Icon */}
  <g transform="translate(32, 36)" filter="url(#shadow)">
    <svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      stroke="oklch(88.2% 0.059 254.128)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  </g>

  {/* Text */}
  <text
    x="190"
    y="130"
    fontFamily="Poppins, Arial, sans-serif"
    fontSize="58"
    fontWeight="700"
    fill="oklch(88.2% 0.059 254.128)"
  >
    BookSwap
  </text>
</svg>

          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-7 text-blue-200 font-bold text-xl">
            <a href="#Header" className="hover:text-gray-500 transition">Home</a>
            <a href="#About" className="hover:text-gray-500 transition">About</a>
            <a href="#BookExchange" className="hover:text-gray-500 transition">Book Exchange</a>
            <a href="#Search" className="hover:text-gray-500 transition">Search Books</a>
            <a href="#PaymentMethods" className="hover:text-gray-500 transition">Payments</a>
            <a href="#Testimonials" className="hover:text-gray-500 transition">Reviews</a>
          </ul>

          {/* Desktop Button */}
          <button
            onClick={() => setShowSignUp(true)}
            className="hidden md:block bg-blue-200 text-gray-800 px-8 py-2 rounded-full hover:bg-gray-500 transition shadow-md font-semibold"
          >
            SignUp
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => _setShowMobileMenu(true)}
            className="md:hidden w-7 h-7 flex flex-col justify-center cursor-pointer gap-1"
          >
            <span className="w-7 h-1 bg-blue-200"></span>
            <span className="w-7 h-1 bg-blue-200"></span>
            <span className="w-7 h-1 bg-blue-200"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            _showMobileMenu ? 'fixed w-full' : 'h-0 w-0'
          } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all z-50`}
        >
          <div className="flex justify-end p-6">
            <img
              onClick={() => _setShowMobileMenu(false)}
              src={assets.cross_icon}
              className="w-6 cursor-pointer"
              alt="close"
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium text-blue-200">
            <a onClick={() => _setShowMobileMenu(false)} href="#Header" className="px-4 py-2 rounded-full hover:bg-gray-100">Home</a>
            <a onClick={() => _setShowMobileMenu(false)} href="#About" className="px-4 py-2 rounded-full hover:bg-gray-100">About</a>
            <a onClick={() => _setShowMobileMenu(false)} href="#BookExchange" className="px-4 py-2 rounded-full hover:bg-gray-100">Book Exchange</a>
            <a onClick={() => _setShowMobileMenu(false)} href="#Search" className="px-4 py-2 rounded-full hover:bg-gray-100">Search Books</a>
            <a onClick={() => _setShowMobileMenu(false)} href="#PaymentMethods" className="px-4 py-2 rounded-full hover:bg-gray-100">Payments</a>
            <a onClick={() => _setShowMobileMenu(false)} href="#Testimonials" className="px-4 py-2 rounded-full hover:bg-gray-100">Reviews</a>
          </ul>

          <button
            onClick={() => {
              _setShowMobileMenu(false)
              setShowSignUp(true)
            }}
            className="mt-6 mx-auto block bg-gray-200 text-black px-8 py-2 rounded-full hover:bg-gray-500 transition font-light">
            SignUp
          </button>
        </div>
      </div>

      {/* Auth Modals */}
      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onSwitchToSignUp={handleSwitchToSignUp}
        />
      )}

      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          onSwitchToSignIn={handleSwitchToSignIn}
        />
      )}
    </>
  )
}

export default Navbar