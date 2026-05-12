import React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const BookListings = ({ filters }) => {

  const allBooks = [
    {
      id: 1,
      title: 'Calculus: Early Transcendentals',
      author: 'James Stewart',
      price: 3500,
      originalPrice: 12000,
      condition: 'Good',
      seller: 'Kamal Perera',
      university: 'University of Moratuwa',
      course: 'MATH101',
      category: 'Mathematics',
      description: 'Slightly used, no highlighting. All pages intact.',
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms in Java',
      author: 'Robert Lafore',
      price: 2800,
      originalPrice: 9000,
      condition: 'Like New',
      seller: 'Nimal Silva',
      university: 'SLIIT',
      course: 'CS201',
      category: 'IT / Computer Science',
      description: 'Barely used. Excellent condition.',
    },
    {
      id: 3,
      title: 'Introduction to Algorithms',
      author: 'Cormen et al.',
      price: 5500,
      originalPrice: 15000,
      condition: 'Like New',
      seller: 'Saman Kumara',
      university: 'University of Moratuwa',
      course: 'CS301',
      category: 'IT / Computer Science',
      description: 'Used for one semester only.',
    },
    {
      id: 4,
      title: 'Principles of Marketing',
      author: 'Philip Kotler',
      price: 4000,
      originalPrice: 11000,
      condition: 'Good',
      seller: 'Amaya Fernando',
      university: 'University of Colombo',
      course: 'MKT301',
      category: 'Business',
      description: 'Minor highlighting in early chapters.',
    },
    {
      id: 5,
      title: 'Engineering Mechanics: Statics',
      author: 'J.L. Meriam',
      price: 3200,
      originalPrice: 10000,
      condition: 'Fair',
      seller: 'Ruwan Pathirana',
      university: 'University of Moratuwa',
      course: 'ENG101',
      category: 'Engineering',
      description: 'Some notes written in pencil.',
    },
    {
      id: 6,
      title: 'Organic Chemistry',
      author: 'Paula Yurkanis Bruice',
      price: 4500,
      originalPrice: 13000,
      condition: 'Good',
      seller: 'Thisara Jayasinghe',
      university: 'University of Peradeniya',
      course: 'CHEM201',
      category: 'Science',
      description: 'Cover worn slightly, pages clean.',
    },
  ]

  const filterBooks = () => {
    if (!filters) return allBooks
    return allBooks.filter(book => {
      if (filters.university && book.university !== filters.university) return false
      if (filters.category && book.category !== filters.category) return false
      if (filters.condition && book.condition !== filters.condition) return false
      if (filters.course && !book.course.toLowerCase().includes(filters.course.toLowerCase())) return false
      if (filters.bookName && !book.title.toLowerCase().includes(filters.bookName.toLowerCase())) return false
      if (filters.maxPrice && book.price > filters.maxPrice) return false
      return true
    })
  }

  const filteredBooks = filterBooks()

  const handleContact = (book) => {
    toast.success(`Contact ${book.seller}`)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full bg-gray-100 py-20"
      id="Books"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold tracking-widest mb-2">
            TEXTBOOK MARKETPLACE
          </p>
          <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>
              Available <span className='text-blue-600'>Books</span>
            </h1>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
             Affordable textbooks shared by verified university students
            </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBooks.map(book => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >

              {/* IMAGE */}
              <div className="h-56 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="w-24 h-32 bg-white rounded-md shadow" />
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col h-full">
                <div>
                  <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {book.author}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      Rs. {book.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {book.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {book.course}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                      {book.category}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                      {book.condition}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                    {book.description}
                  </p>
                </div>

                {/* BUTTON – PERFECTLY ALIGNED */}
                <button
                  onClick={() => handleContact(book)}
                  className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
                >
                  Contact Seller
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default BookListings