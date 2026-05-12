import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full py-20 bg-gray-100 overflow-hidden"
      id="About"
    >
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg px-6 md:px-12 py-16 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT SIDE */}
        <div className="relative grid grid-cols-2 gap-6">
          
          {/* Stats Card */}
          <div className="col-span-2 bg-white shadow-md rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">300+</h3>
              <p className="text-sm text-blue-600">
                Sales in July 2025 with 5 star ratings
              </p>
            </div>
          </div>

          {/* Image Card 1 */}
          <div className="bg-gray-600 rounded-2xl p-4 flex items-center justify-center">
            <img
              src={assets.project_img_1}
              alt="product"
              className="rounded-xl object-cover"
            />
          </div>

          {/* Image Card 2 */}
          <div className="bg-gray-600 rounded-2xl p-4 flex items-center justify-center">
            <img
              src={assets.project_img_2}
              alt="product"
              className="rounded-xl object-cover"
            />
          </div>

          {/* Rating */}
        
        </div>

        {/* RIGHT SIDE */}
        <div>
          <p className="text-blue-600 font-semibold tracking-widest mb-3">
            A BIT
          </p>

         <div className='text-left mb-10'>
        <h2 className='text-3xl sm:text-5xl font-bold text-gray-900 mb-4'>
          About <span className='text-blue-600'>Us</span>
        </h2>
      </div>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-lg">
           We are a student-focused bookstore designed to make university education more affordable and accessible. Our platform allows university students to find both new and gently used textbooks at significantly reduced prices often up to half the original cost. By connecting students who want to buy, sell, or exchange textbooks, we help reduce academic expenses while promoting reuse and sustainability. Whether you’re looking for the latest edition or a reliable used copy, we make it easy to get the right book at the right price.
          </p>

          <button className="bg-blue-200 hover:bg-gray-700 text-black px-8 py-3 rounded-full shadow-lg transition">
            Explore More
          </button>
        </div>

      </div>
    </motion.section>
  );
};

export default About;