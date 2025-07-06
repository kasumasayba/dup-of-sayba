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

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsComplete(true)
          setTimeout(() => {
            onLoadingComplete()
          }, 800)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="text-center space-y-8">
        {/* Logo with fade animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-32 h-32 mx-auto rounded-full border-2 border-orange-500/30 shadow-2xl flex items-center justify-center overflow-hidden relative bg-gray-800/50 backdrop-blur-sm"
        >
          <Image
            src="/sayba-square-logo.png"
            alt="Sayba Arc Loading"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>

        {/* Brand text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-light text-white tracking-wide">Sayba Arc</h1>
          <p className="text-orange-400 font-light tracking-wider">Art You Believe</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-64 mx-auto"
        >
          <div className="w-full bg-gray-700/50 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-sm mt-3 font-light"
          >
            Loading... {Math.round(progress)}%
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
