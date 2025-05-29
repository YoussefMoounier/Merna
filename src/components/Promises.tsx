'use client'

import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

interface Promise {
  id: number
  text: string
}

interface PromisesProps {
  promises: Promise[]
}

export default function Promises({ promises }: PromisesProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        <FaHeart className="inline-block mr-2" />
        وعود للمستقبل
        <FaHeart className="inline-block ml-2" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promises.map((promise) => (
          <motion.div
            key={promise.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: promise.id * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <p className="text-gray-700 text-lg text-center">{promise.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 