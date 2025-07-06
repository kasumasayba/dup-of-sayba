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
      {/* Search Toggle Button */}
      <motion.button
        onClick={handleToggle}
        onMouseEnter={playHover}
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgba(249, 115, 22, 0.1)",
          borderColor: "rgba(249, 115, 22, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-lg border-2 border-gray-600 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-orange-400 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
      >
        <Search className="h-5 w-5" />
      </motion.button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={handleToggle}
            />

            {/* Search Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-4 bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl z-50"
            >
              <div className="p-4">
                {/* Search Input */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search.placeholder") || "Search products..."}
                    className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </form>

                {/* Search Results */}
                {filteredProducts.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <p className="text-sm text-gray-400 px-2 mb-2">
                      {filteredProducts.length} {t("results.found") || "results found"}
                    </p>
                    {filteredProducts.map((product) => (
                      <motion.button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        onMouseEnter={playHover}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30 hover:border-orange-500/30 transition-all duration-300 group"
                      >
                        <h4 className="text-white font-medium group-hover:text-orange-400 transition-colors duration-300">
                          {t(product.titleKey)}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">
                          {t(product.subtitleKey)}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                )}

                {query.trim() && filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">{t("no.results") || "No results found"}</p>
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
