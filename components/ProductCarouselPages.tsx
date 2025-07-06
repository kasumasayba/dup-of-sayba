"use client"
import { useState } from "react"
import Image from "next/image"
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
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-750/50 transition-all duration-500 hover:scale-[1.01] shadow-xl product-card-border cursor-pointer hover:shadow-2xl hover:shadow-orange-500/10">
                  <motion.button
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => onProductClick(product)}
                    onMouseEnter={playHover}
                    className="w-full group p-0 bg-transparent border-none"
                    disabled={isTransitioning}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-8">
                        {/* Product Image - 1:1 Aspect Ratio */}
                        <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={t(product.titleKey)}
                            width={320}
                            height={320}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 text-left">
                          <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col justify-center transition-all duration-300 group-hover:bg-gray-600/50">
                            <h3 className="text-4\
