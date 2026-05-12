import React from "react";
import { assets } from "./assets/assets";
import { motion } from "framer-motion";

const BookExchangeInfo = () => {
  const features = [
    {
      icon: "📚",
      title: "Easy Book Exchange",
      description: "List your books for sale or exchange in minutes with our simple process.",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Get up to 50% off on textbooks compared to original retail prices.",
    },
    {
      icon: "🔄",
      title: "Direct Swap",
      description: "Exchange your textbooks directly with other students on our platform.",
    },
    {
      icon: "🚚",
      title: "Safe Delivery",
      description: "Secure and reliable delivery options available for all orders.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-20 bg-white overflow-hidden"
      id="BookExchange"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How <span className="text-blue-600">Book Exchange</span> Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our platform makes it simple, secure, and affordable for students to buy, sell, and exchange textbooks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="bg-gray-50 rounded-3xl p-10 md:p-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Simple 4-Step Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "List Your Books", desc: "Add textbooks you want to sell or exchange" },
              { step: 2, title: "Find Buyers", desc: "Connect with students looking for those books" },
              { step: 3, title: "Negotiate Deal", desc: "Agree on price or exchange terms" },
              { step: 4, title: "Complete Exchange", desc: "Deliver and receive books safely" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-blue-100 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-blue-600 mb-3">✨ Quality Assured</h4>
            <p className="text-gray-700">All books are verified for condition before listing to ensure value.</p>
          </div>
          <div className="bg-blue-100 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-blue-600 mb-3">🛡️ Buyer Protection</h4>
            <p className="text-gray-700">Money-back guarantee if books don't meet description.</p>
          </div>
          <div className="bg-blue-100 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-blue-600 mb-3">🌱 Eco-Friendly</h4>
            <p className="text-gray-700">Reduce waste by reusing textbooks and supporting sustainability.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BookExchangeInfo;
