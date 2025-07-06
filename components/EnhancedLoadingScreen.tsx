"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface EnhancedLoadingScreenProps {
  onLoadingComplete: () => void
}

export function EnhancedLoadingScreen({ onLoadingComplete }: EnhancedLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showAlternateText, setShowAlternateText] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsComplete(true)
          setTimeout(() => {
            onLoadingComplete()
          }, 1000)
          return 100
        }
        return prev + Math.random() * 10 + 3
      })
    }, 200)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlternateText((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="text-center space-y-8">
        {/* Logo with fade animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-40 h-40 mx-auto rounded-full border-4 border-orange-500/50 shadow-2xl flex items-center justify-center overflow-hidden relative bg-gray-800/50 backdrop-blur-sm"
        >
          <Image
            src="/sayba-square-logo.png"
            alt="Sayba Arc Loading"
            width={160}
            height={160}
            className="w-full h-full object-cover rounded-full"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-orange-500"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

        {/* Brand text with alternating highlight effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <div className="relative h-20 flex items-center justify-center">
            <motion.h1
              key={showAlternateText ? "alt-loading" : "main-loading"}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className={`text-6xl font-bold tracking-wide absolute bg-gradient-to-r ${
                showAlternateText
                  ? "from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl"
                  : "from-white via-gray-100 to-gray-200 bg-clip-text text-transparent drop-shadow-2xl"
              }`}
              style={{
                textShadow: showAlternateText
                  ? "0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)"
                  : "0 0 30px rgba(255, 255, 255, 0.2)",
              }}
            >
              {showAlternateText ? "Art You Believe" : "Sayba Arc"}
            </motion.h1>
          </div>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="w-80 mx-auto"
        >
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-gray-400 text-sm mt-4 font-light"
          >
            Loading... {Math.round(progress)}%
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
