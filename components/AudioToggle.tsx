"use client"
import { Volume2, VolumeX } from "lucide-react"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"

interface AudioToggleProps {
  audioEnabled: boolean
  onToggle: () => void
}

export function AudioToggle({ audioEnabled, onToggle }: AudioToggleProps) {
  const { playHover } = useAudioFeedback()

  return (
    <button
      onClick={onToggle}
      onMouseEnter={playHover}
      className="w-12 h-12 md:w-10 md:h-10 rounded-lg border border-gray-600 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-orange-400 transition-all duration-300 hover:border-orange-500/50 touch-manipulation hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
      title={audioEnabled ? "Matikan Audio" : "Nyalakan Audio"}
    >
      {audioEnabled ? <Volume2 className="h-6 w-6 md:h-5 md:w-5" /> : <VolumeX className="h-6 w-6 md:h-5 md:w-5" />}
    </button>
  )
}
