"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"

interface SearchBarProps {
  onSearch: (query: string) => void
  onProductSelect: (productId: number) => void
  products: Array<{
    id: number
    titleKey: string
    subtitleKey: string
    descriptionKey: string
  }>
}

export function SearchBar({ onSearch, onProductSelect, products }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()
  const { playClick, playHover } = useAudioFeedback()

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return []

    return products.filter((product) => {
      const title = t(product.titleKey).toLowerCase()
      const subtitle = t(product.subtitleKey).toLowerCase()
      const description = t(product.descriptionKey).toLowerCase()
      const searchQuery = query.toLowerCase()

      return title.includes(searchQuery) || subtitle.includes(searchQuery) || description.includes(searchQuery)
    })
  }, [query, products, t])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    playClick()
    if (!isOpen) {
      setQuery("")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
    playClick()
  }

  const handleProductSelect = (productId: number) => {
    onProductSelect(productId)
    setIsOpen(false)
    setQuery("")
    playClick()
  }

  return (
    <div className="relative">
      {/* Search Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        onMouseEnter={playHover}
        className="text-gray-400 hover:text-white hover:bg-transparent transition-all duration-300 interactive-scale no-white-bg glow-hover"
        title={t("search.placeholder")}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </Button>

      {/* Search Bar Overlay - Desktop */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={handleToggle} />

          {/* Desktop Search Overlay */}
          <div className="hidden lg:block absolute top-12 right-0 w-96 bg-gray-800 border-2 border-gray-600 rounded-xl shadow-2xl z-50 p-6 search-overlay">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 pr-10 h-12 text-lg"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Desktop Search Results */}
            {filteredProducts.length > 0 && (
              <div className="mt-6 space-y-3 max-h-80 overflow-y-auto">
                <p className="text-sm text-gray-400 mb-3 font-medium">{t("search.results")}</p>
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    onMouseEnter={playHover}
                    className="w-full text-left p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 group glow-hover interactive-scale border border-gray-600"
                  >
                    <h4 className="text-white font-semibold group-hover:text-orange-400 transition-colors text-lg">
                      {t(product.titleKey)}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">{t(product.subtitleKey)}</p>
                  </button>
                ))}
              </div>
            )}

            {query.trim() && filteredProducts.length === 0 && (
              <div className="mt-6 text-center text-gray-400 py-8">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg">{t("no.results")}</p>
              </div>
            )}
          </div>

          {/* Mobile Search Overlay */}
          <div className="lg:hidden fixed inset-x-4 top-20 bg-gray-800 border-2 border-gray-600 rounded-xl shadow-2xl z-50 p-4 search-overlay">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 pr-10 h-12"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Mobile Search Results */}
            {filteredProducts.length > 0 && (
              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                <p className="text-sm text-gray-400 mb-2 font-medium">{t("search.results")}</p>
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className="w-full text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 group border border-gray-600"
                  >
                    <h4 className="text-white font-medium group-hover:text-orange-400 transition-colors">
                      {t(product.titleKey)}
                    </h4>
                    <p className="text-gray-400 text-sm">{t(product.subtitleKey)}</p>
                  </button>
                ))}
              </div>
            )}

            {query.trim() && filteredProducts.length === 0 && (
              <div className="mt-4 text-center text-gray-400 py-6">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>{t("no.results")}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
