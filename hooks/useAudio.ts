"use client"

import { useCallback, useRef, useState, useEffect } from "react"

interface AudioOptions {
  volume?: number
  playbackRate?: number
  preload?: boolean
}

interface AudioState {
  isLoading: boolean
  isPlaying: boolean
  error: string | null
}

export function useAudio(src: string, options: AudioOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioState>({
    isLoading: true,
    isPlaying: false,
    error: null,
  })

  useEffect(() => {
    const audio = new Audio(src)
    audio.volume = options.volume ?? 0.3
    audio.playbackRate = options.playbackRate ?? 1
    audio.preload = options.preload ? "auto" : "metadata"

    const handleCanPlayThrough = () => {
      setState((prev) => ({ ...prev, isLoading: false }))
    }

    const handleError = (e: Event) => {
      console.warn(`Audio loading failed for ${src}:`, e)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to load audio",
      }))
    }

    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }))
    }

    const handleEnded = () => {
      setState((prev) => ({ ...prev, isPlaying: false }))
    }

    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }))
    }

    audio.addEventListener("canplaythrough", handleCanPlayThrough)
    audio.addEventListener("error", handleError)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("pause", handlePause)

    audioRef.current = audio

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("pause", handlePause)
      audio.pause()
      audioRef.current = null
    }
  }, [src, options.volume, options.playbackRate, options.preload])

  const play = useCallback(() => {
    if (audioRef.current && !state.isLoading && !state.error) {
      // Reset audio to beginning for consistent playback
      audioRef.current.currentTime = 0

      // Play with error handling
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Silently handle play failures (e.g., user hasn't interacted with page yet)
          console.warn("Audio play failed:", error)
        })
      }
    }
  }, [state.isLoading, state.error])

  const pause = useCallback(() => {
    if (audioRef.current && !state.error) {
      audioRef.current.pause()
    }
  }, [state.error])

  const stop = useCallback(() => {
    if (audioRef.current && !state.error) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [state.error])

  return { play, pause, stop, ...state }
}
