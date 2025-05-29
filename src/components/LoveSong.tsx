'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const lyrics = [
  {
    text: 'دي الضحكة',
    image: 'laugh.jpg',
    duration: 1200
  },
  {
    text: 'وده الكلام',
    image: 'talking.jpg',
    duration: 1500
  },
  {
    text: 'دي النظرة',
    image: 'look.jpg',
    duration: 1500
  },
  {
    text: 'وده السلام',
    image: 'greeting.jpg',
    duration: 1500
  }
]

export default function LoveSong() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // إنشاء عنصر الصوت
    audioRef.current = new Audio()
    audioRef.current.src = '/12.mp3'
    audioRef.current.loop = true

    // دالة للتحقق من ظهور السكشن
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // تشغيل الصوت عندما يظهر السكشن
          audioRef.current?.play().catch(error => {
            console.error('Error playing audio:', error)
          })
          setIsVisible(true)
          // بدء تحريك السلايدر
          startSlideshow()
        } else {
          setIsInView(false)
          // إيقاف الصوت عندما يختفي السكشن
          audioRef.current?.pause()
          setIsVisible(false)
          // إيقاف تحريك السلايدر
          stopSlideshow()
        }
      })
    }

    // إنشاء مراقب للتحقق من ظهور السكشن
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    })

    // بدء مراقبة السكشن
    const section = document.getElementById('love-song-section')
    if (section) {
      observer.observe(section)
    }

    // تنظيف عند إزالة المكون
    return () => {
      if (section) {
        observer.unobserve(section)
      }
      stopSlideshow()
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const startSlideshow = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % lyrics.length)
    }, lyrics[currentIndex].duration)
  }

  const stopSlideshow = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // تحديث المؤقت عند تغيير الصورة
  useEffect(() => {
    if (isInView && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % lyrics.length)
      }, lyrics[currentIndex].duration)
    }
  }, [currentIndex, isInView])

  return (
    <div id="love-song-section" className="w-full max-w-4xl mx-auto py-16">
      <div className="relative h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={lyrics[currentIndex].image}
                alt={lyrics[currentIndex].text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <h3 className="text-3xl font-bold text-white mb-2">
                  {lyrics[currentIndex].text}
                </h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 