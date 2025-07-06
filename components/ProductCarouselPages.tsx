"use client"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"
import { useLanguage } from "@/hooks/useLanguage"
import { motion } from "framer-motion"

interface Product {
  id: number
  titleKey: string
  subtitleKey: string
  image: string
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { playSwipe, playHover, playClick } = useAudioFeedback()
  const { t } = useLanguage()

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    onSlideChange((currentSlide + 1) % products.length)
    playSwipe()
    setTimeout(() => setIsTransitioning(false), 400)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    onSlideChange((currentSlide - 1 + products.length) % products.length)
    playSwipe()
    setTimeout(() => setIsTransitioning(false), 400)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    onSlideChange(index)
    playClick()
    setTimeout(() => setIsTransitioning(false), 400)
  }

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="w-full flex-shrink-0 px-4">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-750/50 transition-all duration-300 hover:scale-[1.02] shadow-xl product-card-border cursor-pointer">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => onProductClick(product)}
                    onMouseEnter={playHover}
                    className="w-full group p-0 bg-transparent border-none"
                    disabled={isTransitioning}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-8">
                        {/* Product Image - 1:1 Aspect Ratio */}
                        <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={t(product.titleKey)}
                            width={320}
                            height={320}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 text-left">
                          <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col justify-center">
                            <h3 className="text-4xl font-bold text-white group-hover:text-orange-400 transition-colors mb-4">
                              {t(product.titleKey)}
                            </h3>
                            <p className="text-2xl text-orange-400 font-medium mb-6">{t(product.subtitleKey)}</p>
                            <div className="bg-gray-600/50 rounded-lg p-4">
                              <p className="text-gray-300 text-lg leading-relaxed">
                                {t(`${product.titleKey.replace(/\./g, ".")}.description`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </motion.button>
                </Card>
              </div>
            ))}
          </motion.div>

          {/* Desktop Navigation Buttons */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              onMouseEnter={playHover}
              disabled={isTransitioning}
              className="w-14 h-14 bg-gray-900/90 backdrop-blur-sm border-2 border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 glow-hover shadow-xl"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              onMouseEnter={playHover}
              disabled={isTransitioning}
              className="w-14 h-14 bg-gray-900/90 backdrop-blur-sm border-2 border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 glow-hover shadow-xl"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full max-w-full">
        <div className="relative overflow-hidden rounded-xl">
          <motion.div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100})` }} // Fixed the error here
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="w-full flex-shrink-0 px-1">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-750/50 transition-all duration-300 shadow-lg mobile-product-card-border cursor-pointer">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => onProductClick(product)}
                    className="w-full group p-0 bg-transparent border-none min-h-[60px] touch-manipulation"
                    disabled={isTransitioning}
                  >
                    <CardContent className="p-3">
                      {/* Mobile Product Image - 1:1 Aspect Ratio */}
                      <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg mb-3 transition-all duration-300 relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={t(product.titleKey)}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Mobile Product Info - Centered */}
                      <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 text-center">
                        <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-1">
                          {t(product.titleKey)}
                        </h3>
                        <p className="text-sm text-orange-400 font-medium">{t(product.subtitleKey)}</p>
                      </div>
                    </CardContent>
                  </motion.button>
                </Card>
              </div>
            ))}
          </motion.div>

          {/* Mobile Navigation Buttons */}
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              disabled={isTransitioning}
              className="w-10 h-10 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 shadow-lg min-h-[40px] min-w-[40px] touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={isTransitioning}
              className="w-10 h-10 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 shadow-lg min-h-[40px] min-w-[40px] touch-manipulation"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Page Indicators - Smaller */}
      <div className="flex justify-center space-x-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={playHover}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all duration-300 glow-hover interactive-scale disabled:opacity-50 min-h-[32px] min-w-[32px] flex items-center justify-center touch-manipulation ${
              currentSlide === index ? "bg-orange-500 shadow-lg shadow-orange-500/50" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-orange-500" : "bg-gray-600"}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
