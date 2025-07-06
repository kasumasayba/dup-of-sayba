"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"

interface Product {
  id: number
  titleKey: string
  subtitleKey: string
  descriptionKey: string
}

interface SearchBarProps {
  onSearch: (query: string) => void
  onProductSelect: (productId: number) => void
  products: Product[]
}

export function SearchBar({ onSearch, onProductSelect, products }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()
  const { playClick, playHover } = useAudioFeedback()

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(
        (product) =>
          t(product.titleKey).toLowerCase().includes(query.toLowerCase()) ||
          t(product.subtitleKey).toLowerCase().includes(query.toLowerCase()) ||
          t(product.descriptionKey).toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts([])
    }
  }, [query, products, t])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    playClick()
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery("")
      setFilteredProducts([])
    }
  }

  const handleProductClick = (productId: number) => {
    onProductSelect(productId)
    setIsOpen(false)
    setQuery("")
    setFilteredProducts([])
    playClick()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
    playClick()
  }

  return (
    <div className="relative">
      {/* Search Toggle Button - Centered on mobile with glow effect */}
      <button
        onClick={handleToggle}
        onMouseEnter={playHover}
        className="w-12 h-12 md:w-10 md:h-10 rounded-lg border border-gray-600 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-orange-400 transition-all duration-300 hover:border-orange-500/50 touch-manipulation hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
      >
        <Search className="h-6 w-6 md:h-5 md:w-5" />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={handleToggle} />

            {/* Centered Search Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl shadow-orange-500/10 z-50"
            >
              <div className="p-4 md:p-6">
                {/* Search Input */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search.placeholder") || "Cari layanan..."}
                    className="w-full px-4 py-4 md:py-3 pr-14 md:pr-12 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/25 transition-all duration-300 text-base md:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 w-8 h-8 flex items-center justify-center touch-manipulation hover:scale-110 active:scale-95"
                  >
                    <X className="h-6 w-6 md:h-5 md:w-5" />
                  </button>
                </form>

                {/* Search Results */}
                {filteredProducts.length > 0 && (
                  <div className="space-y-2 max-h-60 md:max-h-64 overflow-y-auto">
                    <p className="text-sm text-gray-400 px-2 mb-3">
                      {filteredProducts.length} {t("results.found") || "hasil ditemukan"}
                    </p>
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        onMouseEnter={playHover}
                        className="w-full text-left p-4 md:p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 active:bg-gray-700/60 border border-gray-600/30 hover:border-orange-500/30 transition-all duration-300 group touch-manipulation hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] hover:-translate-y-0.5"
                      >
                        <h4 className="text-white font-medium group-hover:text-orange-400 transition-colors duration-300 text-base md:text-sm">
                          {t(product.titleKey)}
                        </h4>
                        <p className="text-gray-400 text-sm md:text-xs mt-1 group-hover:text-gray-300 transition-colors duration-300">
                          {t(product.subtitleKey)}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {query.trim() && filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-base md:text-sm">
                      {t("no.results") || "Tidak ada hasil ditemukan"}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
