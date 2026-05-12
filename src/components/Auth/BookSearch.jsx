import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const BookSearch = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    university: '',
    course: '',
    bookName: '',
    condition: '',
    maxPrice: '',
    category: ''
  })

  const universities = [
    'University of Colombo',
    'University of Moratuwa',
    'University of Peradeniya',
    'University of Kelaniya',
    'SLIIT',
    'NSBM',
    'IIT',
    'NIBM'
  ]

  const categories = [
    'Engineering',
    'Medicine',
    'Business',
    'IT/Computer Science',
    'Arts',
    'Science',
    'Law',
    'Mathematics'
  ]

  const conditions = [
    'Brand New',
    'Like New',
    'Good',
    'Fair',
    'Acceptable'
  ]

  const handleSearch = () => {
    if (!searchData.university && !searchData.bookName && !searchData.course) {
      toast.error('Please select university or enter book name!')
      return
    }

    toast.success('Searching books... Check results below!')
    onSearch(searchData)
  }

  const handleReset = () => {
    setSearchData({
      university: '',
      course: '',
      bookName: '',
      condition: '',
      maxPrice: '',
      category: ''
    })
    toast.info('Filters cleared!')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='bg-gray-50 py-20' 
      id='Search'
    >
      <div className='container mx-auto px-6 md:px-20 lg:px-32'>
        {/* Header */}
        <div className='text-center mb-12'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>
              Find Your <span className='text-blue-600'>Perfect Textbook</span>
            </h1>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Search from thousands of textbooks. Save up to 70% compared to retail prices.
            </p>
          </motion.div>
        </div>

        {/* Main Search Card - QuickBooks Style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'
        >
          {/* Quick Search Bar */}
          <div className='mb-8 pb-8 border-b border-gray-200'>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>
              Quick Search
            </label>
            <div className='flex gap-3'>
              <input 
                type='text'
                value={searchData.bookName}
                onChange={(e) => setSearchData({...searchData, bookName: e.target.value})}
                placeholder='Search by book name, ISBN, or author...'
                className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700'
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className='bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className='mb-6'>
            <h3 className='text-sm font-semibold text-gray-700 mb-4'>Filter Results</h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/* University */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  University
                </label>
                <select 
                  value={searchData.university}
                  onChange={(e) => setSearchData({...searchData, university: e.target.value})}
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white'
                >
                  <option value=''>All Universities</option>
                  {universities.map((uni, index) => (
                    <option key={index} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Category
                </label>
                <select 
                  value={searchData.category}
                  onChange={(e) => setSearchData({...searchData, category: e.target.value})}
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white'
                >
                  <option value=''>All Categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Course Code */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Course Code
                </label>
                <input 
                  type='text'
                  value={searchData.course}
                  onChange={(e) => setSearchData({...searchData, course: e.target.value})}
                  placeholder='e.g., CS101, MATH201'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700'
                />
              </div>

              {/* Condition */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Condition
                </label>
                <select 
                  value={searchData.condition}
                  onChange={(e) => setSearchData({...searchData, condition: e.target.value})}
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white'
                >
                  <option value=''>Any Condition</option>
                  {conditions.map((cond, index) => (
                    <option key={index} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Max Price
                </label>
                <select 
                  value={searchData.maxPrice}
                  onChange={(e) => setSearchData({...searchData, maxPrice: e.target.value})}
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white'
                >
                  <option value=''>Any Price</option>
                  <option value='1000'>Under Rs. 1,000</option>
                  <option value='2000'>Under Rs. 2,000</option>
                  <option value='3000'>Under Rs. 3,000</option>
                  <option value='5000'>Under Rs. 5,000</option>
                  <option value='10000'>Under Rs. 10,000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200'>
            <button 
              onClick={handleSearch}
              className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              Apply Filters
            </button>
            <button 
              onClick={handleReset}
              className='sm:w-auto bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition'
            >
              Clear All
            </button>
          </div>

          {/* Active Filters */}
          {(searchData.university || searchData.bookName || searchData.course || searchData.category || searchData.condition || searchData.maxPrice) && (
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-sm font-semibold text-gray-700'>Active Filters:</p>
                <button 
                  onClick={handleReset}
                  className='text-sm text-blue-600 hover:text-blue-700 font-medium'
                >
                  Clear all
                </button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {searchData.university && (
                  <span className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200'>
                    {searchData.university}
                    <button onClick={() => setSearchData({...searchData, university: ''})} className='hover:text-blue-900'>×</button>
                  </span>
                )}
                {searchData.bookName && (
                  <span className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200'>
                    "{searchData.bookName}"
                    <button onClick={() => setSearchData({...searchData, bookName: ''})} className='hover:text-blue-900'>×</button>
                  </span>
                )}
                {searchData.course && (
                  <span className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200'>
                    Course: {searchData.course}
                    <button onClick={() => setSearchData({...searchData, course: ''})} className='hover:text-blue-900'>×</button>
                  </span>
                )}
                {searchData.category && (
                  <span className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200'>
                    {searchData.category}
                    <button onClick={() => setSearchData({...searchData, category: ''})} className='hover:text-blue-900'>×</button>
                  </span>
                )}
                {searchData.condition && (
                  <span className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200'>
                    {searchData.condition}
                    <button onClick={() => setSearchData({...searchData, condition: ''})} className='hover:text-blue-900'>×</button>
                  </span>
                )}
                {searchData.maxPrice && (
                  <span className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200'>
                    Under Rs. {searchData.maxPrice}
                    <button onClick={() => setSearchData({...searchData, maxPrice: ''})} className='hover:text-blue-900'>×</button>
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats Cards - QuickBooks Style */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className='bg-blue-200 p-6 rounded-lg border border-gray-200 hover:shadow-md transition'
          >
            <div className='text-3xl font-bold text-gray-600 mb-1'>1,234</div>
            <div className='text-m text-gray-600'>Books Available</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className='bg-blue-200 p-6 rounded-lg border border-gray-200 hover:shadow-md transition'
          >
            <div className='text-3xl font-bold text-gray-600 mb-1'>650+</div>
            <div className='text-m text-gray-600'>Active Sellers</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className='bg-blue-200 p-6 rounded-lg border border-gray-200 hover:shadow-md transition'
          >
            <div className='text-3xl font-bold text-gray-600 mb-1'>Rs. 45k</div>
            <div className='text-m text-gray-600'>Avg. Savings</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className='bg-blue-200 p-6 rounded-lg border border-gray-200 hover:shadow-md transition'
          >
            <div className='text-3xl font-bold text-gray-600 mb-1'>4.9★</div>
            <div className='text-m text-gray-600'>User Rating</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default BookSearch