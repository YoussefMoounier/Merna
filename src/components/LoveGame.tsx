'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  points: number
}

interface LoveGameProps {
  questions: Question[]
}

export default function LoveGame({ questions }: LoveGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const totalPossibleScore = questions.reduce((sum, q) => sum + q.points, 0);

  const handleAnswer = (selectedIndex: number) => {
    if (answered) return

    setAnswered(true)
    const correct = selectedIndex === currentQuestion.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + currentQuestion.points)
    }

    setShowFeedback(true)

    setTimeout(() => {
      setShowFeedback(false)
      setAnswered(false)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setShowSummary(true)
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowSummary(false)
    setAnswered(false)
    setIsCorrect(false)
  }

  if (showSummary) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-lg shadow-xl text-center text-white max-w-md mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4">نتيجة اللعبة</h2>
        <p className="text-xl mb-6">لقد حصلت على <span className="text-yellow-300 font-bold">{score}</span> نقطة!</p>
        
        {score === totalPossibleScore ? (
          <p className="text-lg text-yellow-300 font-bold">بما انك قولتي ابوس انا يبقي هاجي ابوس 😉❤️</p>
        ) : score > totalPossibleScore / 2 ? (
          <p className="text-lg">حلو حلو مش وحش </p>
        ) : (
          <p className="text-lg">يبنتل طب هوقع الموقع هه</p>
        )}

        <button
          onClick={resetGame}
          className="mt-8 bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition duration-300"
        >
          العب مرة أخرى
        </button>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-6 text-pink-600 text-center">{currentQuestion.question}</h3>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left px-4 py-3 border rounded-lg transition duration-300 \
                 ${answered ? (index === currentQuestion.correctAnswer ? 'bg-green-200 border-green-600' : (!isCorrect && answered ? 'bg-red-200 border-red-600' : 'border-gray-300')) : 'border-gray-300 hover:bg-gray-100'}
                 ${answered ? (index === currentQuestion.correctAnswer ? 'text-green-800' : (!isCorrect && answered ? 'text-red-800' : 'text-gray-800')) : 'text-black'}
               `}
            >
              {option}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 p-4 rounded-lg text-center font-bold \
                ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {isCorrect ? (
                <FaCheckCircle className="inline-block mr-2" />
              ) : (
                <FaTimesCircle className="inline-block mr-2" />
              )}
              {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة!'}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 text-center text-gray-700">
          السؤال {currentQuestionIndex + 1} من {questions.length}
        </div>

      </motion.div>
    </div>
  )
} 