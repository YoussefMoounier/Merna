'use client'

import { motion } from 'framer-motion'
import { FaHeart, FaComments, FaImage, FaCalendar } from 'react-icons/fa'

interface Memory {
  id: number
  date: string
  title: string
  description: string
  type: 'chat' | 'meeting' | 'date' | 'special'
  image?: string
  chatImage?: string
}

interface LoveTimelineProps {
  memories: Memory[]
}

export default function LoveTimeline({ memories }: LoveTimelineProps) {
  const getIcon = (type: Memory['type']) => {
    switch (type) {
      case 'chat':
        return <FaComments className="text-blue-500" />
      case 'meeting':
        return <FaHeart className="text-pink-500" />
      case 'date':
        return <FaCalendar className="text-purple-500" />
      case 'special':
        return <FaImage className="text-green-500" />
      default:
        return <FaHeart className="text-pink-500" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        <FaHeart className="inline-block mr-2" />
        Our Love Story
        <FaHeart className="inline-block ml-2" />
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 sm:left-4 sm:-translate-x-0" />

        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`relative mb-8 w-full pr-8 sm:pr-0 sm:w-[calc(50%-2rem)] ${
              index % 2 === 0 ? 'sm:ml-auto' : 'sm:mr-auto'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-pink-500 flex items-center justify-center sm:left-1/2">
              {getIcon(memory.type)}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{memory.date}</span>
                <span className="text-pink-500">•</span>
                <span className="text-sm font-medium text-gray-700">{memory.title}</span>
              </div>

              <p className="text-gray-600 mb-4">{memory.description}</p>

              {memory.image && (
                <div className="mb-4">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {memory.chatImage && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Our Chat:</p>
                  <img
                    src={memory.chatImage}
                    alt="Chat screenshot"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 