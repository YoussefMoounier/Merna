'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useState } from 'react'

export default function LoveEffect() {
  const [showEffect, setShowEffect] = useState(false);

  const triggerEffect = () => {
    setShowEffect(true);
    // Hide the effect after a short duration
    setTimeout(() => {
      setShowEffect(false);
    }, 1500); // Effect duration
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={triggerEffect}
        className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-200"
      >
        <FaHeart className="text-xl" />
      </button>

      <AnimatePresence>
        {showEffect && (
          <motion.div
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom- full right-1/2 transform translate-x-1/2 mb-2 text-pink-500 text-4xl"
          >
            ❤️
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 