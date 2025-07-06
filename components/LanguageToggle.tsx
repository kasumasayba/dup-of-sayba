"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/hooks/useLanguage"

interface LanguageToggleProps {
  language: Language
  onToggle: () => void
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="text-gray-400 hover:text-white hover:bg-transparent transition-colors interactive-scale flex items-center space-x-2 no-white-bg"
      title={language === "en" ? "Switch to Indonesian" : "Switch to English"}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </Button>
  )
}
