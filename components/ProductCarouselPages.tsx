"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"

interface Product {
  id: number
  titleKey: string
  subtitleKey: string
  descriptionKey: string
  icon: React.ReactNode
  image: string
  bgColor: string
  link: string
  details: {
    features: string[]
    pricing: string
    delivery: string
  }
}

interface ProductCarouselPagesProps {
  products: Product[]
  currentSlide: number
  onSlideChange: (index: number) => void
  onProductClick: (product: Product) => void
  isAutoPlaying: boolean
}

export function ProductCarouselPages({
  products,
  currentSlide,
  onSlideChange,
  onProductClick,
  isAutoPlaying,
}: ProductCarouselPagesProps) {
  const [isPlaying, setIsPlaying] = useState(isAutoPlaying)
  const { t } = useLanguage()
  const { playClick, playSwipe, playHover } = useAudioFeedback()

  useEffect(() => {
    setIsPlaying(isAutoPlaying)
  }, [isAutoPlaying])

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % products.length
    onSlideChange(nextIndex)
    playSwipe()
  }

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + products.length) % products.length
    onSlideChange(prevIndex)
    playSwipe()
  }

  const goToSlide = (index: number) => {
    onSlideChange(index)
    playClick()
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
    playClick()
  }

  const handleProductClick = (product: Product) => {
    onProductClick(product)
    playClick()
  }

  const currentProduct = products[currentSlide]

  return (
    <div className="relative w-full">
      {/* Main Product Display */}
      <div className="relative mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <Card className="bg-gray-700/30 backdrop-blur-sm border-gray-600/50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-orange-500/10">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Product Image */}
                  <div className="relative aspect-square lg:aspect-auto lg:h-80 overflow-hidden">
                    <Image
                      src={currentProduct.image || "/placeholder.svg"}
                      alt={t(currentProduct.titleKey)}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className={`absolute inset-0 ${currentProduct.bgColor} opacity-20`} />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <div className={`inline-flex p-3 rounded-xl ${currentProduct.bgColor} mb-4`}>
                        {currentProduct.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{t(currentProduct.titleKey)}</h3>
                      <p className="text-orange-400 font-medium mb-4">{t(currentProduct.subtitleKey)}</p>
                      <p className="text-gray-300 leading-relaxed mb-6">{t(currentProduct.descriptionKey)}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Harga mulai dari:</span>
                        <span className="text-orange-400 font-semibold">{currentProduct.details.pricing}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Waktu pengerjaan:</span>
                        <span className="text-white">{currentProduct.details.delivery}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProductClick(currentProduct)}
                      onMouseEnter={playHover}
                      className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/30"
                    >
                      Lihat Detail
                    </motion.button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          onMouseEnter={playHover}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full shadow-lg z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          onMouseEnter={playHover}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full shadow-lg z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAutoPlay}
            onMouseEnter={playHover}
            className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>

        <div className="text-sm text-gray-400">
          {currentSlide + 1} / {products.length}
        </div>
      </div>

      {/* Slide Indicators - Much smaller without shadows */}
      <div className="flex justify-center space-x-1.5">
        {products.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={playHover}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 min-h-[32px] min-w-[32px] flex items-center justify-center touch-manipulation ${
              currentSlide === index ? "bg-orange-500" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${currentSlide === index ? "bg-orange-500" : "bg-gray-600"}`} />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
