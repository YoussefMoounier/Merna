'use client'

import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { AnimationControls, Transition } from 'framer-motion'

interface SplashScreenProps {
  onStart: () => void
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [backgroundElements, setBackgroundElements] = useState<{
    hearts: { id: number; style: { left: string; top: string; fontSize: string }; animate: AnimationControls | object; transition: Transition }[];
    orbs: { id: number; style: { left: string; top: string; opacity: number }; animate: AnimationControls | object; transition: Transition }[];
    sparkles: { id: number; style: { left: string; top: string }; animate: AnimationControls | object; transition: Transition }[];
  } | null>(null) // Use null initially to prevent rendering on server

  useEffect(() => {
    // Generate random positions and styles on the client side
    const generatedHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 2 + 1}rem`,
      },
      animate: {
        y: [0, -100, 0],
        x: [0, Math.random() * 50 - 25, 0],
        opacity: [0.2, 0.8, 0.2],
        rotate: [0, 360],
      },
      transition: {
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        delay: Math.random() * 2,
      },
    }))

    const generatedOrbs = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0.1,
      },
      animate: {
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        scale: [1, 1.5, 1],
        opacity: [0.1, 0.2, 0.1],
      },
      transition: {
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 2,
      },
    }))

    const generatedSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      },
      animate: {
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
      },
      transition: {
        duration: 1 + Math.random(),
        repeat: Infinity,
        delay: Math.random() * 2,
      },
    }))

    setBackgroundElements({ hearts: generatedHearts, orbs: generatedOrbs, sparkles: generatedSparkles })
  }, [])

  if (!backgroundElements) {
    // Render a placeholder or null on the server to prevent mismatch
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 to-black overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating hearts */}
        {backgroundElements.hearts.map((heart) => (
          <motion.div
            key={`heart-${heart.id}`}
            className="absolute text-pink-500"
            style={heart.style}
            animate={heart.animate}
            transition={heart.transition}
          >
            <FaHeart />
          </motion.div>
        ))}

        {/* Glowing orbs */}
        {backgroundElements.orbs.map((orb) => (
          <motion.div
            key={`orb-${orb.id}`}
            className="absolute w-32 h-32 bg-white rounded-full blur-3xl"
            style={orb.style}
            animate={orb.animate}
            transition={orb.transition}
          />
        ))}

        {/* Sparkles */}
        {backgroundElements.sparkles.map((sparkle) => (
          <motion.div
            key={`sparkle-${sparkle.id}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={sparkle.style}
            animate={sparkle.animate}
            transition={sparkle.transition}
          />
        ))}
      </div>

      <div className="relative text-center z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            مستعدة يا ميرنتي؟
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <FaHeart className="inline-block mx-2 text-pink-500" />
            انتي مش زي الباقي علشان كدا لازم تهنئة عيد ميلادك تبقي مختلفة
            <FaHeart className="inline-block mx-2 text-pink-500" />
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px rgba(255,255,255,0.5)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={onStart}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          مستعدة
        </motion.button>
      </div>
    </motion.div>
  )
} 