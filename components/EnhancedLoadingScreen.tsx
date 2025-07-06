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
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="text-center space-y-8">
        {/* Logo with enhanced animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="w-24 h-24 mx-auto rounded-full border-2 border-orange-500/30 shadow-2xl flex items-center justify-center overflow-hidden bg-gray-800/50 backdrop-blur-sm"
          >
            <Image
              src="/sayba-square-logo.png"
              alt="Sayba Arc Loading"
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Brand name with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold text-white tracking-wide">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="font-light"
            >
              Sayba
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            >
              Arc
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-gray-400 text-lg font-light"
          >
            Art You Believe
          </motion.p>
        </motion.div>

        {/* Enhanced progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="w-64 mx-auto space-y-3"
        >
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full relative"
            >
              <motion.div
                animate={{ x: [-20, 20, -20] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.div>
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="text-gray-400 text-sm font-medium"
          >
            Loading... {progress}%
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
