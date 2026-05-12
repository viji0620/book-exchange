import React from 'react'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden relative bg-blue-50' style={{backgroundImage: `url(${assets.header_img_1})`, backgroundAttachment: 'fixed'}} id='Header'>
     <Navbar/>
     <motion.div
      initial={{opacity: 0, y: 100}}
      transition={{duration: 1.5}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-blue-600'
     >
      <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20'>
        Buy & Sell Textbooks at Half Price
      </h2>
      <div className='space-x-6 mt-16'>
        <a href="#Books" className='bg-white hover:bg-gray-500 px-8 py-3 rounded inline-block text-gray-800 transition'>
          Browse Books
        </a>
        <a href="#Sell" className='bg-blue-200 hover:bg-gray-500 px-8 py-3 rounded inline-block text-gray-800 transition'>
          Sell Your Books
        </a>
      </div>
     </motion.div>
    </div>
  )
}

export default Header