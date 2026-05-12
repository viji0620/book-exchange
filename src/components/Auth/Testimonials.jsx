import React from "react";
import { testimonialsData, assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-20 bg-white"
      id="Testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        {/* TOP HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Customer <span className="text-blue-600">Reviews</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Hear from our satisfied customers who have experienced the convenience
            and savings of buying and selling textbooks through our platform.
          </p>

          <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
            <span>4.2/5</span>
            <img src={assets.star_icon} alt="star" className="w-4" />
            <span className="font-medium">Trustpilot</span>
            <span>Based on 5210 reviews</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-4 gap-12 items-start">
          
          {/* LEFT TEXT */}
          <div className="lg:col-span-1">
            <div className="text-gray-700">
              <div className="text-6xl text-gray-300 leading-none mb-4">“</div>
              <h3 className="text-xl font-medium">
                What our customers are saying
              </h3>
            </div>
          </div>

          {/* REVIEWS GRID (NO SCROLL) */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <img
                      key={i}
                      src={assets.star_icon}
                      alt="star"
                      className="w-4"
                    />
                  ))}
                </div>

                {/* text */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {item.text}
                </p>

                {/* profile */}
                <div className="flex items-center gap-3">
                  {/* USER IMAGE – comes from assets.js */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;