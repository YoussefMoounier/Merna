'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { TargetAndTransition } from 'framer-motion'

interface Star {
  id: number
  name: string
  description: string
  date?: string
  coordinates: [number, number]
  image?: string
  chatImage?: string
}

interface BackgroundStar {
  id: number
  style: React.CSSProperties
  animate: TargetAndTransition
  transition: { duration: number; repeat: number; ease?: string }
}

interface StarMapProps {
  stars: Star[]
  finalMessage: string
}

export default function StarMap({ stars, finalMessage }: StarMapProps) {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [backgroundStars, setBackgroundStars] = useState<BackgroundStar[]>([])
  const [visibleStars, setVisibleStars] = useState(1)

  const handleStarClick = (star: Star) => {
    setSelectedStar(star)
    
    // Reveal the next star in sequence if the clicked star is the current visible one
    if (star.id === visibleStars && visibleStars < stars.length) {
      setVisibleStars(visibleStars + 1)
    } 
    
    // If the clicked star is the last star, ensure the final message is triggered
    if (star.id === stars.length && visibleStars <= stars.length) {
       // This condition should reliably trigger the final message display
      setVisibleStars(stars.length + 1)
    }
  }

  const handleCloseModal = () => {
    setSelectedStar(null)
  }

  useEffect(() => {
    const generatedStars: BackgroundStar[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      style: {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 10 + 5}px`,
        opacity: Math.random() * 0.6 + 0.2,
        color: '#ffffff',
      } as React.CSSProperties,
      animate: { 
        opacity: [Math.random() * 0.6 + 0.2, Math.random() * 0.8 + 0.2, Math.random() * 0.6 + 0.2],
        scale: [1, Math.random() * 0.5 + 1, 1],
      } as TargetAndTransition,
      transition: { 
        duration: Math.random() * 5 + 3,
        repeat: Infinity, 
        ease: "linear"
      },
    }))
    setBackgroundStars(generatedStars)

    // Trigger final message if all stars are visible initially (e.g., on load if state is saved)
    // Or if you want to show it automatically after a delay regardless of clicks:
    // const timer = setTimeout(() => {
    //   setShowFinalMessage(true)
    // }, 20000) // Show final message after 20 seconds

    // return () => clearTimeout(timer)

  }, [stars.length])

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-purple-900 to-black rounded-lg shadow-xl overflow-hidden">
      {/* Background animated stars */}
      {backgroundStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-white text-xs opacity-50 twinkling"
          style={star.style}
          animate={star.animate}
          transition={star.transition}
        >
          ⭐
        </motion.div>
      ))}

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Iterate from the first visible star up to the second-to-last visible star */}
        {Array.from({ length: Math.max(0, visibleStars - 1) }).map((_, index) => {
          const star = stars[index]
          const nextStar = stars[index + 1]
          // Explicitly check if both stars and their coordinates exist before drawing a line
          if (star && nextStar && star.coordinates && nextStar.coordinates) {
            return (
              <motion.line
                key={`line-${star.id}-${nextStar.id}`}
                x1={`${star.coordinates[0]}%`}
                y1={`${star.coordinates[1]}%`}
                x2={`${nextStar.coordinates[0]}%`}
                y2={`${nextStar.coordinates[1]}%`}
                stroke="#c084fc"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
              />
            )
          }
          return null
        })}
      </svg>

      {/* Main stars representing memories (display based on visibleStars) */}
      {stars.slice(0, visibleStars).map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-300 cursor-pointer z-10"
          style={{
            left: `${star.coordinates[0]}%`,
            top: `${star.coordinates[1]}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            scale: 1.5, 
            textShadow: "0 0 10px #fcd34d",
            z: 20
          }}
          onClick={() => handleStarClick(star)}
        >
          <span className="text-2xl md:text-4xl drop-shadow">🌟</span>
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
             {star.name}
          </span>
        </motion.div>
      ))}

      {/* Star Detail Modal */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto text-center relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-600">{selectedStar.name}</h3>
              {selectedStar.image && (
                 <img 
                   src={selectedStar.image} 
                   alt={selectedStar.name} 
                   className="mx-auto mb-4 rounded-lg shadow-md object-cover h-40 w-auto"
                 />
              )}
              <p className="text-gray-700 mb-4">{selectedStar.description}</p>
              {selectedStar.date && (
                <p className="text-gray-500 text-sm">{selectedStar.date}</p>
              )}
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
              >
                اغلاق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Message Section (display when all stars are visible) */}
      <AnimatePresence>
        {visibleStars > stars.length && (
           <motion.div
             className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40 backdrop-blur-sm"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <motion.div
               className="text-center p-8 max-w-2xl"
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
             >
               {/* You can add a star icon here if desired */}
               {/* <FaStar className="text-yellow-400 text-6xl mx-auto mb-6 animate-pulse" /> */}
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
  )
} 