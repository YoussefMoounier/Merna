'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaGift, FaHeart } from 'react-icons/fa'

interface Wish {
  id: number
  title: string
  description: string
  price: number
  image: string
  reserved: boolean
}

interface WishlistProps {
  wishes: Wish[]
}

export default function Wishlist({ wishes }: WishlistProps) {
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        <FaGift className="inline-block mr-2" />
        Birthday Wishlist
        <FaHeart className="inline-block ml-2" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishes.map((wish) => (
          <motion.div
            key={wish.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative aspect-video">
              <img
                src={wish.image}
                alt={wish.title}
                className="w-full h-full object-cover"
              />
              {wish.reserved && (
                <div className="absolute top-2 right-2 bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                  Reserved
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {wish.title}
              </h3>
              <p className="text-gray-600 mb-4">{wish.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-pink-600 font-bold">${wish.price}</span>
                <button
                  onClick={() => setSelectedWish(wish)}
                  className={`px-4 py-2 rounded-full ${
                    wish.reserved
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                  disabled={wish.reserved}
                >
                  {wish.reserved ? 'Reserved' : 'Reserve Gift'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedWish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedWish(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-pink-600 mb-4">
              Reserve {selectedWish.title}
            </h3>
            <p className="text-gray-600 mb-4">{selectedWish.description}</p>
            <p className="text-lg font-semibold mb-4">
              Price: ${selectedWish.price}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedWish(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle reservation logic here
                  setSelectedWish(null)
                }}
                className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
              >
                Confirm Reservation
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 