'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'

interface Star {
  id: number
  name: string
  description: string
  date: string
  coordinates: [number, number]
  image?: string
  chatImage?: string
}

interface StarMapProps {
  stars: Star[]
  finalMessage: string
}

export default function StarMap({ stars, finalMessage }: StarMapProps) {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [visibleStars, setVisibleStars] = useState<number>(1)
  const [showConstellation, setShowConstellation] = useState(false)

  const handleStarClick = (star: Star) => {
    setSelectedStar(star)
    if (star.id === visibleStars && visibleStars < stars.length) {
      setVisibleStars(visibleStars + 1)
      setShowConstellation(true)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedStar && !(event.target as HTMLElement).closest('.star-modal')) {
        setSelectedStar(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedStar])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        <FaStar className="inline-block mr-2 animate-pulse" />
        خريطة نجوم حبنا
        <FaStar className="inline-block ml-2 animate-pulse" />
      </h2>

      <div className="relative bg-gradient-to-b from-purple-900 via-black to-purple-900 rounded-xl p-8 min-h-[600px] overflow-hidden">
        {/* Background Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={`bg-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full">
          {stars.slice(0, visibleStars).map((star, index) => {
            if (index < visibleStars - 1) {
              const nextStar = stars[index + 1]
              return (
                <motion.line
                  key={`line-${star.id}`}
                  x1={`${star.coordinates[0]}%`}
                  y1={`${star.coordinates[1]}%`}
                  x2={`${nextStar.coordinates[0]}%`}
                  y2={`${nextStar.coordinates[1]}%`}
                  stroke="rgba(236, 72, 153, 0.5)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.3 }}
                />
              )
            }
            return null
          })}
        </svg>

        {/* Stars */}
        {stars.slice(0, visibleStars).map((star, index) => (
          <motion.div
            key={star.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${star.coordinates[0]}%`,
              top: `${star.coordinates[1]}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.3 
            }}
            onClick={() => handleStarClick(star)}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaStar className="text-yellow-400 text-3xl drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-800 p-3 rounded-lg shadow-lg w-48">
                <h3 className="font-bold text-sm text-pink-600">{star.name}</h3>
                <p className="text-xs text-gray-600">{star.date}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Star Details Modal */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
              onClick={() => setSelectedStar(null)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-lg w-full relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setSelectedStar(null)}
                >
                  <FaTimes />
                </button>

                <h3 className="text-2xl font-bold text-pink-600 mb-4">
                  {selectedStar.name}
                </h3>
                <p className="text-gray-600 mb-2">{selectedStar.date}</p>
                <p className="text-gray-700 mb-4">{selectedStar.description}</p>

                {selectedStar.image && (
                  <div className="mt-4">
                    <img
                      src={selectedStar.image}
                      alt={selectedStar.name}
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Message */}
        <AnimatePresence>
          {visibleStars === stars.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40 backdrop-blur-sm"
            >
              <motion.div
                className="text-center p-8 max-w-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaStar className="text-yellow-400 text-6xl mx-auto mb-6 animate-pulse" />
                <h3 className="text-4xl font-bold text-white mb-4">
                  أنتي نجمتي الوحيدة
                </h3>
                <p className="text-xl text-gray-200 whitespace-pre-line">
                  {finalMessage}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 