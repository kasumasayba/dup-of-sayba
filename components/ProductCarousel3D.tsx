"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"
import { useLanguage } from "@/hooks/useLanguage"

interface Product {
  id: number
  titleKey: string
  subtitleKey: string
  image: string
}

interface ProductCarousel3DProps {
  products: Product[]
  currentSlide: number
  onSlideChange: (index: number) => void
  onProductClick: (product: Product) => void
  isAutoPlaying: boolean
}

export function ProductCarousel3D({
  products,
  currentSlide,
  onSlideChange,
  onProductClick,
  isAutoPlaying,
}: ProductCarousel3DProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const { playSwipe, playHover, playClick } = useAudioFeedback()
  const { t } = useLanguage()

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    onSlideChange((currentSlide + 1) % products.length)
    playSwipe()
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    onSlideChange((currentSlide - 1 + products.length) % products.length)
    playSwipe()
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    onSlideChange(index)
    playClick()
    setTimeout(() => setIsTransitioning(false), 600)
  }

  // Touch handlers with improved sensitivity
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 30
    const isRightSwipe = distance < -30

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Get visible products with proper indexing
  const getVisibleProducts = () => {
    const prevIndex = (currentSlide - 1 + products.length) % products.length
    const nextIndex = (currentSlide + 1) % products.length

    return {
      prev: products[prevIndex],
      current: products[currentSlide],
      next: products[nextIndex],
    }
  }

  const visibleProducts = getVisibleProducts()

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop 3D Carousel */}
      <div className="hidden lg:block">
        <div
          className="relative h-96 flex items-center justify-center perspective-1000"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Product - Left */}
          <div className="absolute left-8 transform-gpu transition-all duration-500 ease-out opacity-70 scale-75 -rotate-y-15 z-10">
            <button
              onClick={() => goToSlide((currentSlide - 1 + products.length) % products.length)}
              onMouseEnter={playHover}
              className="group"
              disabled={isTransitioning}
            >
              <Card className="w-48 h-64 bg-gray-700/40 border-gray-600 hover:bg-gray-600/40 transition-all duration-300 group-hover:scale-105 glow-hover">
                <CardContent className="p-3">
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-3 shadow-md">
                    <Image
                      src={visibleProducts.prev.image || "/placeholder.svg"}
                      alt={t(visibleProducts.prev.titleKey)}
                      width={192}
                      height={160}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-white text-sm font-medium text-center group-hover:text-orange-400 transition-colors line-clamp-2">
                    {t(visibleProducts.prev.titleKey)}
                  </h3>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Current Product - Center */}
          <div className="relative transform-gpu transition-all duration-500 ease-out scale-100 z-20">
            <button
              onClick={() => onProductClick(visibleProducts.current)}
              onMouseEnter={playHover}
              className="group"
              disabled={isTransitioning}
            >
              <Card className="w-80 h-80 bg-gray-700/60 border-gray-600 hover:bg-gray-600/60 transition-all duration-300 group-hover:scale-105 glow-hover shadow-2xl">
                <CardContent className="p-6">
                  <div className="w-full h-56 rounded-xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:shadow-orange-500/20">
                    <Image
                      src={visibleProducts.current.image || "/placeholder.svg"}
                      alt={t(visibleProducts.current.titleKey)}
                      width={320}
                      height={224}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-orange-400 transition-colors mb-2 text-center line-clamp-2">
                    {t(visibleProducts.current.titleKey)}
                  </h3>
                  <p className="text-orange-400 text-lg text-center line-clamp-1">
                    {t(visibleProducts.current.subtitleKey)}
                  </p>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Next Product - Right */}
          <div className="absolute right-8 transform-gpu transition-all duration-500 ease-out opacity-70 scale-75 rotate-y-15 z-10">
            <button
              onClick={() => goToSlide((currentSlide + 1) % products.length)}
              onMouseEnter={playHover}
              className="group"
              disabled={isTransitioning}
            >
              <Card className="w-48 h-64 bg-gray-700/40 border-gray-600 hover:bg-gray-600/40 transition-all duration-300 group-hover:scale-105 glow-hover">
                <CardContent className="p-3">
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-3 shadow-md">
                    <Image
                      src={visibleProducts.next.image || "/placeholder.svg"}
                      alt={t(visibleProducts.next.titleKey)}
                      width={192}
                      height={160}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-white text-sm font-medium text-center group-hover:text-orange-400 transition-colors line-clamp-2">
                    {t(visibleProducts.next.titleKey)}
                  </h3>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              onMouseEnter={playHover}
              disabled={isTransitioning}
              className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 glow-hover"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              onMouseEnter={playHover}
              disabled={isTransitioning}
              className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 glow-hover"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Optimized Carousel */}
      <div className="lg:hidden">
        <div
          className="relative h-72 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Product - Mobile */}
          <div className="absolute left-2 transform-gpu transition-all duration-500 ease-out opacity-50 scale-60 z-10">
            <button
              onClick={() => goToSlide((currentSlide - 1 + products.length) % products.length)}
              className="group"
              disabled={isTransitioning}
            >
              <Card className="w-32 h-40 bg-gray-700/30 border-gray-600">
                <CardContent className="p-2">
                  <div className="w-full h-24 rounded-md overflow-hidden mb-2">
                    <Image
                      src={visibleProducts.prev.image || "/placeholder.svg"}
                      alt={t(visibleProducts.prev.titleKey)}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white text-xs font-medium text-center line-clamp-2">
                    {t(visibleProducts.prev.titleKey)}
                  </h3>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Current Product - Mobile Center */}
          <div className="relative transform-gpu transition-all duration-500 ease-out scale-100 z-20 mx-4">
            <button
              onClick={() => onProductClick(visibleProducts.current)}
              className="group"
              disabled={isTransitioning}
            >
              <Card className="w-48 h-60 bg-gray-700/60 border-gray-600 hover:bg-gray-600/60 transition-all duration-300 group-hover:scale-105 glow-hover shadow-xl">
                <CardContent className="p-4">
                  <div className="w-full h-36 rounded-lg overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:shadow-orange-500/20">
                    <Image
                      src={visibleProducts.current.image || "/placeholder.svg"}
                      alt={t(visibleProducts.current.titleKey)}
                      width={192}
                      height={144}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-white text-lg font-medium group-hover:text-orange-400 transition-colors mb-1 text-center line-clamp-2">
                    {t(visibleProducts.current.titleKey)}
                  </h3>
                  <p className="text-orange-400 text-sm text-center line-clamp-1">
                    {t(visibleProducts.current.subtitleKey)}
                  </p>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Next Product - Mobile */}
          <div className="absolute right-2 transform-gpu transition-all duration-500 ease-out opacity-50 scale-60 z-10">
            <button
              onClick={() => goToSlide((currentSlide + 1) % products.length)}
              className="group"
              disabled={isTransitioning}
            >
              <Card className="w-32 h-40 bg-gray-700/30 border-gray-600">
                <CardContent className="p-2">
                  <div className="w-full h-24 rounded-md overflow-hidden mb-2">
                    <Image
                      src={visibleProducts.next.image || "/placeholder.svg"}
                      alt={t(visibleProducts.next.titleKey)}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white text-xs font-medium text-center line-clamp-2">
                    {t(visibleProducts.next.titleKey)}
                  </h3>
                </CardContent>
              </Card>
            </button>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              disabled={isTransitioning}
              className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={isTransitioning}
              className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-3 mt-8">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={playHover}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 glow-hover interactive-scale disabled:opacity-50 ${
              currentSlide === index
                ? "bg-orange-500 scale-125 shadow-lg shadow-orange-500/50"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
