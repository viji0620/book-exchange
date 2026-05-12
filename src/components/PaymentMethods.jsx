import React, { useState } from "react";
import { motion } from "framer-motion";

const PaymentMethods = () => {
  const [selectedPayment, setSelectedPayment] = useState(0);

  const paymentMethods = [
    {
      id: 1,
      icon: "💳",
      name: "Credit Card",
      description: "Visa, Mastercard, American Express",
      features: ["Fast processing", "Secure transactions", "Worldwide accepted"],
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      icon: "🏦",
      name: "Debit Card",
      description: "Direct bank debit from your account",
      features: ["Lower fees", "Instant transfer", "Direct from bank"],
      color: "from-green-400 to-green-600",
    },
    {
      id: 3,
      icon: "🏪",
      name: "Digital Wallet",
      description: "PayPal, Google Pay, Apple Pay",
      features: ["One-click payment", "Mobile friendly", "Extra security"],
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 4,
      icon: "💵",
      name: "Cash Payment",
      description: "In-person exchange meeting",
      features: ["Zero fees", "Instant transfer", "Local meetup"],
      color: "from-orange-400 to-orange-600",
    },
    {
      id: 5,
      icon: "🏧",
      name: "Bank Transfer",
      description: "Direct bank-to-bank transfer",
      features: ["Secure", "Low fees", "Scheduled payments"],
      color: "from-red-400 to-red-600",
    },
    {
      id: 6,
      icon: "📱",
      name: "Mobile Money",
      description: "M-Pesa, GCash, and similar services",
      features: ["Easy access", "No bank needed", "Instant transfer"],
      color: "from-pink-400 to-pink-600",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      id="PaymentMethods"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Flexible <span className="text-blue-600">Payment Methods</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from multiple secure payment options that work best for you. All transactions are protected and encrypted.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedPayment(index)}
              className={`rounded-2xl p-8 cursor-pointer transition transform hover:scale-105 ${
                selectedPayment === index
                  ? "ring-4 ring-blue-500 shadow-xl"
                  : "shadow-lg hover:shadow-xl"
              } bg-white`}
            >
              <div className="text-5xl mb-4">{method.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {method.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{method.description}</p>
              
              {selectedPayment === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <ul className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Security Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-10 md:p-16 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="font-bold text-gray-900 mb-2">256-bit Encryption</h4>
              <p className="text-gray-700 text-sm">
                Bank-level security for all transactions
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-4">✓</div>
              <h4 className="font-bold text-gray-900 mb-2">Verified Payments</h4>
              <p className="text-gray-700 text-sm">
                All payment methods are verified and secure
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="font-bold text-gray-900 mb-2">Fraud Protection</h4>
              <p className="text-gray-700 text-sm">
                Advanced fraud detection systems in place
              </p>
            </motion.div>
          </div>
        </div>

        {/* Fee Information */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Transaction Fees</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700">Credit/Debit Card</span>
                <span className="font-bold text-gray-900">2.5%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700">Digital Wallet</span>
                <span className="font-bold text-gray-900">1.5%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700">Bank Transfer</span>
                <span className="font-bold text-gray-900">Free</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700">Cash Payment</span>
                <span className="font-bold text-gray-900">Free</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700">Mobile Money</span>
                <span className="font-bold text-gray-900">1%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700">Student Discount</span>
                <span className="font-bold text-green-600">-10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PaymentMethods;
