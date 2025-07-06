"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/hooks/useLanguage"
import { Volume2, VolumeX } from "lucide-react"

interface EnhancedLoadingScreenProps {
  onLoadingComplete: () => void
}

export function EnhancedLoadingScreen({ onLoadingComplete }: EnhancedLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="text-center space-y-8">
        {/* Logo with elegant fade animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-32 h-32 mx-auto rounded-full border-2 border-orange-500/30 shadow-2xl flex items-center justify-center overflow-hidden relative bg-gray-800/50 backdrop-blur-sm">
            <Image
              src="/sayba-square-logo.png"
              alt="Sayba Arc Logo"
              width={128}
              height={128}
              className="w-24 h-24 object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Brand text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-light text-white tracking-wide">{t("sayba.arc")}</h1>
          <p className="text-xl text-orange-400 font-light tracking-wider">{t("art.you.believe")}</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-64 mx-auto space-y-4"
        >
          <div className="w-full bg-gray-700/50 rounded-full h-2 backdrop-blur-sm">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-gray-400 text-sm font-light">{progress}%</p>
        </motion.div>

        {/* Audio toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={toggleAudio}
          className="flex items-center justify-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors duration-300 mx-auto"
        >
          {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          <span className="text-sm font-light">{audioEnabled ? t("audio.on") : t("audio.off")}</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
