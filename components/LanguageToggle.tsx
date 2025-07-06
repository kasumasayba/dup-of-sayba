"use client"
import { Globe } from "lucide-react"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"

interface LanguageToggleProps {
  language: string
  onToggle: () => void
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  const { playHover } = useAudioFeedback()

  return (
    <button
      onClick={onToggle}
      onMouseEnter={playHover}
      className="flex items-center space-x-2 px-3 py-2 md:px-2 md:py-1 rounded-lg border border-gray-600 bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-orange-400 transition-all duration-300 hover:border-orange-500/50 touch-manipulation hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
      title="Ganti Bahasa"
    >
      <Globe className="h-5 w-5 md:h-4 md:w-4" />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </button>
  )
}
