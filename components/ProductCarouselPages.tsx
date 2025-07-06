"use client"
import type React from "react"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
  details?: {
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
  const { t } = useLanguage()
  const { playClick, playSwipe, playHover } = useAudioFeedback()

  const nextSlide = () => {
    const next = (currentSlide + 1) % products.length
    onSlideChange(next)
    playSwipe()
  }

  const prevSlide = () => {
    const prev = (currentSlide - 1 + products.length) % products.length
    onSlideChange(prev)
    playSwipe()
  }

  const goToSlide = (index: number) => {
    onSlideChange(index)
    playClick()
  }

  const handleProductClick = (product: Product) => {
    onProductClick(product)
    playClick()
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl bg-gray-700/20 backdrop-blur-sm border border-gray-600/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Product Image */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden border border-gray-600/30 shadow-lg">
                  <Image
                    src={products[currentSlide].image || "/placeholder.svg"}
                    alt={t(products[currentSlide].titleKey)}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className={`inline-flex p-3 rounded-xl ${products[currentSlide].bgColor} mb-4`}>
                  {products[currentSlide].icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t(products[currentSlide].titleKey)}</h3>

                <p className="text-orange-400 text-lg md:text-xl font-medium mb-4">
                  {t(products[currentSlide].subtitleKey)}
                </p>

                <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                  {t(products[currentSlide].descriptionKey)}
                </p>

                {/* Pricing Info */}
                {products[currentSlide].details && (
                  <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-400">Mulai dari</span>
                        <p className="text-orange-400 font-bold text-lg">{products[currentSlide].details.pricing}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400">Pengerjaan</span>
                        <p className="text-white font-medium">{products[currentSlide].details.delivery}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleProductClick(products[currentSlide])}
                  onMouseEnter={playHover}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 hover:-translate-y-0.5 touch-manipulation"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={playHover}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 touch-manipulation"
        >
          <ChevronLeft className="h-6 w-6 mx-auto" />
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={playHover}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 touch-manipulation"
        >
          <ChevronRight className="h-6 w-6 mx-auto" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-3 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={playHover}
            className={`w-3 h-3 rounded-full transition-all duration-300 touch-manipulation hover:scale-125 ${
              currentSlide === index
                ? "bg-orange-500 shadow-lg shadow-orange-500/50"
                : "bg-gray-600 hover:bg-gray-500 hover:shadow-md hover:shadow-gray-500/25"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-300">Auto</span>
          </div>
        </div>
      )}
    </div>
  )
}
