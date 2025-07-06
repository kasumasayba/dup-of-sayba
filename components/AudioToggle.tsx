"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioToggleProps {
  audioEnabled: boolean
  onToggle: () => void
}

export function AudioToggle({ audioEnabled, onToggle }: AudioToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={`transition-all duration-300 interactive-scale hover:bg-transparent no-white-bg ${
        audioEnabled ? "text-orange-400 hover:text-orange-300" : "text-gray-400 hover:text-white"
      }`}
      title={audioEnabled ? "Matikan feedback audio" : "Aktifkan feedback audio"}
    >
      {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  )
}
