"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface EnhancedLoadingScreenProps {
  onLoadingComplete: () => void
}

export function EnhancedLoadingScreen({ onLoadingComplete }: EnhancedLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  const steps = [
    "Memuat aset digital...",
    "Menyiapkan layanan kreatif...",
    "Mengoptimalkan performa...",
    "Finalisasi pengalaman...",
  ]

  useEffect(() => {
    // Extended 7-second animation sequence
    const animationSequence = [
      { delay: 0, action: () => setShowLogo(true) },
      { delay: 800, action: () => setShowText(true) },
      { delay: 1500, action: () => setShowProgress(true) },
      { delay: 2000, action: () => setShowParticles(true) },
    ]

    animationSequence.forEach(({ delay, action }) => {
      setTimeout(action, delay)
    })
  }, [])

  useEffect(() => {
    if (!showProgress) return

    // Extended progress for 7 seconds total
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 8 + 2 // Slower increment for 7 seconds
        const newProgress = Math.min(prev + increment, 100)

        // Update loading steps based on progress
        if (newProgress > 15 && currentStep === 0) setCurrentStep(1)
        if (newProgress > 40 && currentStep === 1) setCurrentStep(2)
        if (newProgress > 70 && currentStep === 2) setCurrentStep(3)

        if (newProgress >= 100) {
          setTimeout(onLoadingComplete, 1000) // Extended completion delay
          return 100
        }
        return newProgress
      })
    }, 150) // Slower interval for 7-second duration

    return () => clearInterval(progressInterval)
  }, [showProgress, currentStep, onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/8 via-transparent to-orange-500/8 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-orange-500/12 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-orange-400/15 rounded-full blur-2xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-orange-500/8 to-transparent rounded-full animate-pulse"></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Enhanced Logo Animation */}
        <div
          className={`mb-10 transition-all duration-1200 ease-out ${
            showLogo ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
          }`}
        >
          <div className="relative">
            {/* Main Logo Container */}
            <div className="w-40 h-40 mx-auto rounded-full border-4 border-orange-500 shadow-2xl flex items-center justify-center overflow-hidden relative bg-gray-800 backdrop-blur-sm">
              <Image
                src="/sayba-square-logo.png"
                alt="Sayba Arc Logo"
                width={160}
                height={160}
                className="w-full h-full object-cover rounded-full"
              />
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/25 to-transparent rounded-full"></div>
            </div>

            {/* Static Golden Glow Effects - No Rotation */}
            <div className="absolute -inset-1 rounded-full border-2 border-orange-400/60 shadow-lg"></div>
            <div className="absolute -inset-2 rounded-full border border-orange-300/40 shadow-md"></div>

            {/* Multiple pulsing rings - No rotation */}
            <div className="absolute -inset-3 w-46 h-46 mx-auto border border-orange-500/40 rounded-full animate-ping"></div>
            <div className="absolute -inset-6 w-52 h-52 mx-auto border border-orange-500/20 rounded-full animate-ping delay-500"></div>

            {/* Symmetrical static glow aura */}
            <div className="absolute -inset-4 bg-gradient-to-t from-orange-500/10 via-transparent to-orange-500/10 rounded-full blur-sm"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10 rounded-full blur-sm"></div>
            <div className="absolute -inset-5 bg-gradient-to-br from-orange-500/8 via-transparent to-orange-500/8 rounded-full blur-md"></div>
          </div>
        </div>

        {/* Enhanced Text Animation */}
        <div
          className={`mb-10 transition-all duration-1200 ease-out delay-500 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-5xl font-bold text-white mb-4 animate-pulse">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-300 bg-clip-text text-transparent">
              Sayba Arc
            </span>
          </h1>
          <p className="text-2xl text-orange-400 mb-6 font-medium">Art You Believe</p>
          <p className="text-gray-400 animate-pulse text-lg leading-relaxed">
            Memuat pengalaman digital terbaik untuk Anda...
          </p>
        </div>

        {/* Enhanced Progress Section */}
        <div
          className={`w-full max-w-md mx-auto transition-all duration-1200 ease-out delay-1000 ${
            showProgress ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Progress Bar Container */}
          <div className="relative mb-6">
            <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden backdrop-blur-sm border-2 border-gray-600/50 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Enhanced animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-ping"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 via-transparent to-orange-600/50 animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced progress indicator dot */}
            <div
              className="absolute -top-2 bg-orange-500 w-6 h-6 rounded-full shadow-xl transition-all duration-700 ease-out border-3 border-white/30"
              style={{ left: `calc(${progress}% - 12px)` }}
            >
              <div className="w-full h-full bg-orange-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-1 bg-orange-300 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced Progress Information */}
          <div className="flex justify-between items-center text-base mb-8">
            <span className="text-gray-300 animate-pulse font-semibold">{steps[currentStep]}</span>
            <span className="text-orange-400 font-mono font-bold text-2xl">{Math.round(progress)}%</span>
          </div>

          {/* Enhanced Loading Dots */}
          <div className="flex justify-center space-x-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-bounce shadow-lg"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1.2s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Particle Effects */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            ></div>
          ))}

          {/* Enhanced floating orbs */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute w-3 h-3 bg-gradient-to-r from-orange-500/50 to-orange-300/50 rounded-full animate-float blur-sm"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}
