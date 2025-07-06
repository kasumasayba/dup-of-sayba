"use client"

import { useCallback, useState, useEffect } from "react"
import { useAudio } from "./useAudio"

export function useAudioFeedback() {
  const [audioEnabled, setAudioEnabled] = useState(true)

  // Load audio preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("audioEnabled")
    if (saved !== null) {
      setAudioEnabled(JSON.parse(saved))
    }
  }, [])

  // Save audio preferences to localStorage
  const toggleAudio = useCallback(() => {
    const newState = !audioEnabled
    setAudioEnabled(newState)
    localStorage.setItem("audioEnabled", JSON.stringify(newState))
  }, [audioEnabled])

  // Audio hooks with optimized settings
  const clickSound = useAudio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/click-SipFinfWgDThPGAMlnIX3aM0DYN9Uf.mp3", {
    volume: 0.25,
    preload: true,
  })
  const swipeSound = useAudio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Swipe-0pilu1KKqggIVROFycIUdilCK5cBjF.mp3", {
    volume: 0.2,
    preload: true,
  })
  const modalSound = useAudio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/model-wCrPqSUkzoMN2TR8kNXnxLM06T73aY.mp3", {
    volume: 0.3,
    preload: true,
  })
  const hoverSound = useAudio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hover-3ISaUZbgNouSYe0N8S0gi9bAmPzM9B.mp3", {
    volume: 0.15,
    preload: true,
  })
  const successSound = useAudio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Success-WtuLBrqIHFgEL9FGf9TCiIvuJaAAo9.mp3", {
    volume: 0.35,
    preload: true,
  })

  // Audio feedback functions with error handling
  const playClick = useCallback(() => {
    if (audioEnabled && !clickSound.error) {
      clickSound.play()
    }
  }, [audioEnabled, clickSound])

  const playSwipe = useCallback(() => {
    if (audioEnabled && !swipeSound.error) {
      swipeSound.play()
    }
  }, [audioEnabled, swipeSound])

  const playModal = useCallback(() => {
    if (audioEnabled && !modalSound.error) {
      modalSound.play()
    }
  }, [audioEnabled, modalSound])

  const playHover = useCallback(() => {
    if (audioEnabled && !hoverSound.error) {
      hoverSound.play()
    }
  }, [audioEnabled, hoverSound])

  const playSuccess = useCallback(() => {
    if (audioEnabled && !successSound.error) {
      successSound.play()
    }
  }, [audioEnabled, successSound])

  // Audio status for debugging
  const audioStatus = {
    click: { loading: clickSound.isLoading, error: clickSound.error },
    swipe: { loading: swipeSound.isLoading, error: swipeSound.error },
    modal: { loading: modalSound.isLoading, error: modalSound.error },
    hover: { loading: hoverSound.isLoading, error: hoverSound.error },
    success: { loading: successSound.isLoading, error: successSound.error },
  }

  return {
    audioEnabled,
    toggleAudio,
    playClick,
    playSwipe,
    playModal,
    playHover,
    playSuccess,
    audioStatus, // For debugging purposes
  }
}
