'use client'

import { motion } from 'framer-motion'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'

interface Location {
  id: number
  name: string
  description: string
  date: string
  coordinates: [number, number]
  image?: string
}

interface LoveMapProps {
  locations: Location[]
}

export default function LoveMap({ locations }: LoveMapProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // إنشاء عنصر الصوت
    audioRef.current = new Audio()
    audioRef.current.src = '/map.mp3'
    audioRef.current.loop = true

    // معالجة الأخطاء
    audioRef.current.onerror = (e) => {
      console.error('Error loading audio:', e)
    }

    // دالة للتحقق من ظهور السكشن
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // تشغيل الصوت عندما يظهر السكشن
          audioRef.current?.play().then(() => {
            setIsPlaying(true)
          }).catch(error => {
            console.error('Error playing audio:', error)
          })
        } else {
          // إيقاف الصوت عندما يختفي السكشن
          audioRef.current?.pause()
          setIsPlaying(false)
        }
      })
    }

    // إنشاء مراقب للتحقق من ظهور السكشن
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5 // تشغيل الصوت عندما يكون 50% من السكشن مرئياً
    })

    // بدء مراقبة السكشن
    const section = document.getElementById('love-map-section')
    if (section) {
      observer.observe(section)
    }

    // تنظيف عند إزالة المكون
    return () => {
      if (section) {
        observer.unobserve(section)
      }
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  return (
    <div id="love-map-section" className="w-full max-w-4xl mx-auto">
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-100 p-4 mb-8 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.4699813682835!2d31.370235!3d31.046428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAyJzQ3LjAiTiAzMcKwMjInMTIuOCJF!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center"
          >
            <FaMapMarkerAlt className="text-pink-500 text-4xl animate-bounce" />
            <div className="bg-white px-4 py-2 rounded-full shadow-lg mt-2">
              <p className="text-pink-600 font-bold">أول مرة اتقابلنا ❤️</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaMapMarkerAlt className="text-pink-500 text-2xl" />
          <h3 className="font-bold text-xl text-pink-600">أول لقاء</h3>
        </div>
        <p className="text-gray-600 mb-4">
        المكان ده هيفضل اكتر مكان مميز بالنسبالي طووول عمري لانه المكان الي اول مرة شوفتك فيه ولحد دلوقتي فاكر تفاصيل المكان 
        </p>
        <p className="text-sm text-gray-500">01/30/2025</p>
      </motion.div>
    </div>
  )
} 