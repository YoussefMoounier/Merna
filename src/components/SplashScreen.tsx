'use client'

import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { AnimationControls, Transition } from 'framer-motion'
import type { TargetAndTransition } from 'framer-motion'

interface BackgroundElement {
  id: number;
  style: React.CSSProperties;
  animate: TargetAndTransition;
  transition: { duration: number; repeat: number; ease?: string };
}

interface SplashScreenProps {
  onStart: () => void
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [backgroundElements, setBackgroundElements] = useState<BackgroundElement[] | null>(null) // Use null initially to prevent rendering on server

  useEffect(() => {
    // Generate random positions and styles on the client side
    const generateBackgroundElements = () => {
      const elements: BackgroundElement[] = [];
      const count = 30; // Number of floating elements

      for (let i = 0; i < count; i++) {
        elements.push({
          id: i,
          style: {
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`, // Random size
            opacity: Math.random() * 0.5 + 0.2, // Random opacity
            color: Math.random() > 0.5 ? '#ec4899' : '#3b82f6', // Pink or Blue
          } as React.CSSProperties, // Cast to React.CSSProperties
          animate: { // Ensure this structure matches TargetAndTransition
            y: [0, Math.random() * 100 - 50, 0], // Float up and down
            x: [0, Math.random() * 100 - 50, 0], // Float left and right
            rotate: [0, Math.random() * 360, 0], // Rotate
            opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.5 + 0.2, Math.random() * 0.5 + 0.2], // Vary opacity
          } as TargetAndTransition, // Cast to TargetAndTransition
          transition: { // Ensure this structure is compatible
            duration: Math.random() * 10 + 5, // Random duration
            repeat: Infinity,
            ease: "linear", // Use linear ease for continuous motion
          },
        });
      }
      return elements;
    };

    setBackgroundElements(generateBackgroundElements());
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
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-pink-500"
            style={element.style}
            animate={element.animate}
            transition={element.transition}
          >
            <FaHeart />
          </motion.div>
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