'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaLock, FaUnlock } from 'react-icons/fa'

interface SecretMessage {
  id: number
  title: string
  content: string
  hint: string
  password: string
  unlocked: boolean
}

interface SecretMessagesProps {
  messages: SecretMessage[]
}

export default function SecretMessages({ messages }: SecretMessagesProps) {
  const [selectedMessage, setSelectedMessage] = useState<SecretMessage | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [unlockedMessagesState, setUnlockedMessagesState] = useState<SecretMessage[]>(messages);

  const handleUnlock = (message: SecretMessage) => {
    if (password === message.password) {
      const updatedMessages = unlockedMessagesState.map(msg =>
        msg.id === message.id ? { ...msg, unlocked: true } : msg
      );
      setUnlockedMessagesState(updatedMessages);
      setSelectedMessage(updatedMessages.find(msg => msg.id === message.id) || null);
      setPassword('')
      setError('')
    } else {
      setError('Incorrect password. Try again!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        <FaLock className="inline-block mr-2" />
        Secret Messages
        <FaUnlock className="inline-block ml-2" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {message.title}
            </h3>
            <p className="text-gray-600 mb-4">{message.hint}</p>
            <button
              onClick={() => setSelectedMessage(unlockedMessagesState.find(msg => msg.id === message.id) || null)}
              className="w-full px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              {unlockedMessagesState.find(msg => msg.id === message.id)?.unlocked ? 'View Message' : 'Unlock Message'}
            </button>
          </motion.div>
        ))}
      </div>

      {selectedMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedMessage(null)
            setPassword('')
            setError('')
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {selectedMessage.unlocked ? (
              <>
                <h3 className="text-2xl font-bold text-pink-600 mb-4">
                  {selectedMessage.title}
                </h3>
                <p className="text-gray-600">{selectedMessage.content}</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-pink-600 mb-4">
                  Unlock Message
                </h3>
                <p className="text-gray-600 mb-4">{selectedMessage.hint}</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mb-4"
                  placeholder="Enter password"
                />
                {error && (
                  <p className="text-red-500 mb-4">{error}</p>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setSelectedMessage(null)
                      setPassword('')
                      setError('')
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUnlock(selectedMessage)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
                  >
                    Unlock
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 