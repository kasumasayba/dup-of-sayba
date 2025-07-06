"use client"
import Image from "next/image"
import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

import { useState, useEffect, useRef } from "react"
import {
  Instagram,
  MessageCircle,
  Facebook,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Briefcase,
  Code,
  Palette,
  Smartphone,
  Monitor,
  Bot,
  FileText,
  Settings,
  X,
  MessageSquare,
  Map,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"
import { useLanguage } from "@/hooks/useLanguage"
import { AudioToggle } from "@/components/AudioToggle"
import { LanguageToggle } from "@/components/LanguageToggle"
import { SearchBar } from "@/components/SearchBar"
import { ProductCarouselPages } from "@/components/ProductCarouselPages"
import { EnhancedLoadingScreen } from "@/components/EnhancedLoadingScreen"

const products = [
  {
    id: 1,
    titleKey: "jasa.tugas",
    subtitleKey: "jasa.tugas.subtitle",
    descriptionKey: "jasa.tugas.description",
    icon: <FileText className="h-8 w-8" />,
    image: "/research-service.gif",
    bgColor: "bg-blue-600",
    link: "#jasa-tugas",
    details: {
      features: [
        "Pembuatan presentasi PowerPoint profesional",
        "Formatting dokumen Word yang rapi",
        "Riset dan penulisan konten berkualitas",
        "Template custom sesuai kebutuhan",
        "Revisi unlimited hingga puas",
        "Pengerjaan cepat dan tepat waktu",
      ],
      pricing: "Rp 25.000",
      delivery: "1-3 hari kerja",
    },
  },
  {
    id: 2,
    titleKey: "jasa.oprek",
    subtitleKey: "jasa.oprek.subtitle",
    descriptionKey: "jasa.oprek.description",
    icon: <Settings className="h-8 w-8" />,
    image: "/web-design.gif",
    bgColor: "bg-gray-700",
    link: "#jasa-oprek",
    details: {
      features: [
        "Optimasi performa sistem",
        "Modifikasi konfigurasi sistem",
        "Troubleshooting dan perbaikan",
        "Peningkatan keamanan sistem",
        "Custom tweaking sesuai kebutuhan",
        "Support dan maintenance",
      ],
      pricing: "Rp 50.000",
      delivery: "1-5 hari kerja",
    },
  },
  {
    id: 3,
    titleKey: "aplikasi.crack",
    subtitleKey: "aplikasi.crack.subtitle",
    descriptionKey: "aplikasi.crack.description",
    icon: <Code className="h-8 w-8" />,
    image: "/mobile-apps.gif",
    bgColor: "bg-green-600",
    link: "#aplikasi-crack",
    details: {
      features: [
        "Instalasi dan konfigurasi software",
        "Dukungan teknis aplikasi",
        "Solusi software custom",
        "Maintenance dan update",
        "Troubleshooting masalah software",
        "Konsultasi pemilihan software",
      ],
      pricing: "Rp 30.000",
      delivery: "1-2 hari kerja",
    },
  },
  {
    id: 4,
    titleKey: "web.design",
    subtitleKey: "web.design.subtitle",
    descriptionKey: "web.design.description",
    icon: <Monitor className="h-8 w-8" />,
    image: "/web-design.gif",
    bgColor: "bg-purple-600",
    link: "#web-design",
    details: {
      features: [
        "Desain responsif untuk semua device",
        "UI/UX design yang modern",
        "Optimasi SEO dan performa",
        "Content Management System",
        "E-commerce integration",
        "Maintenance dan support",
      ],
      pricing: "Rp 500.000",
      delivery: "7-14 hari kerja",
    },
  },
  {
    id: 5,
    titleKey: "mobile.apps",
    subtitleKey: "mobile.apps.subtitle",
    descriptionKey: "mobile.apps.description",
    icon: <Smartphone className="h-8 w-8" />,
    image: "/mobile-apps.gif",
    bgColor: "bg-red-600",
    link: "#mobile-apps",
    details: {
      features: [
        "Native iOS dan Android development",
        "Cross-platform development",
        "App Store dan Play Store deployment",
        "Push notifications integration",
        "Backend API integration",
        "App maintenance dan updates",
      ],
      pricing: "Rp 2.000.000",
      delivery: "14-30 hari kerja",
    },
  },
  {
    id: 6,
    titleKey: "graphic.design",
    subtitleKey: "graphic.design.subtitle",
    descriptionKey: "graphic.design.description",
    icon: <Palette className="h-8 w-8" />,
    image: "/graphic-design.gif",
    bgColor: "bg-pink-600",
    link: "#graphic-design",
    details: {
      features: [
        "Logo design dan brand identity",
        "Marketing materials design",
        "Social media graphics",
        "Print design (brosur, poster, dll)",
        "Packaging design",
        "Brand guidelines development",
      ],
      pricing: "Rp 100.000",
      delivery: "3-7 hari kerja",
    },
  },
  {
    id: 7,
    titleKey: "autocad.service",
    subtitleKey: "autocad.service.subtitle",
    descriptionKey: "autocad.service.description",
    icon: <Settings className="h-8 w-8" />,
    image: "/autocad-service.gif",
    bgColor: "bg-orange-600",
    link: "#autocad-service",
    details: {
      features: [
        "Gambar teknis 2D dan 3D",
        "Desain arsitektur dan engineering",
        "Blueprint dan technical drawing",
        "Konversi file CAD",
        "Revisi dan modifikasi gambar",
        "Konsultasi desain teknis",
      ],
      pricing: "Rp 75.000",
      delivery: "2-5 hari kerja",
    },
  },
  {
    id: 8,
    titleKey: "arcgis.service",
    subtitleKey: "arcgis.service.subtitle",
    descriptionKey: "arcgis.service.description",
    icon: <Map className="h-8 w-8" />,
    image: "/autocad-service.gif",
    bgColor: "bg-teal-600",
    link: "#arcgis-service",
    details: {
      features: [
        "Pemetaan digital dengan ArcGIS",
        "Analisis spasial dan geospasial",
        "Pembuatan peta tematik",
        "Digitasi dan georeferensi",
        "Database spasial management",
        "Konsultasi sistem informasi geografis",
      ],
      pricing: "Rp 150.000",
      delivery: "3-7 hari kerja",
    },
  },
]

const socialLinks = [
  {
    icon: <Instagram className="h-5 w-5" />,
    link: "https://instagram.com/sayba.arc",
    label: "Instagram",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    link: "https://wa.me/6287721916495",
    label: "WhatsApp",
    color: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v5.73a3.87 3.87 0 0 1-3.14 3.78 3.87 3.87 0 0 1-4.08-2.87A3.87 3.87 0 0 1 9.75 4.5c.43 0 .85.08 1.25.23l1.02-2.3a6.12 6.12 0 0 0-1.27-.13A6.1 6.1 0 0 0 4.64 8.43a6.1 6.1 0 0 0 1.24 6.74 4.83 4.83 0 0 1 3.77 4.25V20h2.08v-5.73a3.87 3.87 0 0 1 3.14-3.78 3.87 3.87 0 0 1 4.08 2.87 3.87 3.87 0 0 1-3.23 4.12c-.43 0-.85-.08-1.25-.23l-1.02 2.3c.42.05.84.08 1.27.13a6.1 6.1 0 0 0 6.11-6.13 6.1 6.1 0 0 0-1.24-6.74z" />
      </svg>
    ),
    link: "https://tiktok.com/@sayba.arc",
    label: "TikTok",
    color: "bg-gradient-to-r from-gray-800 to-black",
  },
  {
    icon: <Facebook className="h-5 w-5" />,
    link: "https://facebook.com/sayba.arc",
    label: "Facebook",
    color: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
]

// Minimal animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
}

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
}

const AnimatedSection = ({
  children,
  className = "",
  variant = fadeIn,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  variant?: any
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variant}
      transition={{ ...variant.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function SaybaArcLinktree() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalSlide, setModalSlide] = useState(0)
  const [socialMenuOpen, setSocialMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  // Hooks
  const { audioEnabled, toggleAudio, playClick, playSwipe, playModal, playHover, playSuccess } = useAudioFeedback()
  const { language, toggleLanguage, t } = useLanguage()

  // Main links with translations
  const mainLinks = [
    {
      titleKey: "portfolio.website",
      descriptionKey: "portfolio.description",
      icon: <Globe className="h-6 w-6" />,
      link: "https://sayba-arc-portfolio.com",
      bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    },
    {
      titleKey: "whatsapp.business",
      descriptionKey: "whatsapp.description",
      icon: <MessageCircle className="h-6 w-6" />,
      link: "https://wa.me/6287721916495",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      titleKey: "ai.customer.service",
      descriptionKey: "ai.description",
      icon: <Bot className="h-6 w-6" />,
      link: "#ai-support",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      titleKey: "book.consultation",
      descriptionKey: "consultation.description",
      icon: <Briefcase className="h-6 w-6" />,
      link: "#consultation",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
  ]

  // Auto-slide products every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || isLoading) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length)
      playSwipe()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isLoading, playSwipe])

  // Pause auto-play when modal is open
  useEffect(() => {
    setIsAutoPlaying(!isModalOpen)
  }, [isModalOpen])

  // Fade in effect after loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const nextModalSlide = () => {
    const nextIndex = (modalSlide + 1) % products.length
    setModalSlide(nextIndex)
    setSelectedProduct(products[nextIndex])
    playSwipe()
  }

  const prevModalSlide = () => {
    const prevIndex = (modalSlide - 1 + products.length) % products.length
    setModalSlide(prevIndex)
    setSelectedProduct(products[prevIndex])
    playSwipe()
  }

  const openProductModal = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setModalSlide(product.id - 1)
    setIsModalOpen(true)
    playModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    playClick()
  }

  const handleSocialToggle = () => {
    setSocialMenuOpen(!socialMenuOpen)
    playClick()
  }

  const handleLinkClick = () => {
    playSuccess()
  }

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
  }

  const handleProductSelect = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setCurrentSlide(productId - 1)
      openProductModal(product)
    }
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <EnhancedLoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-opacity duration-500 overflow-x-hidden ${showContent ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop blur when social menu is open */}
      {socialMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setSocialMenuOpen(false)} />
      )}

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Circular logo for header */}
              <div className="w-12 h-12 rounded-full border-2 border-orange-500/50 flex items-center justify-center overflow-hidden bg-gray-800/30 backdrop-blur-sm shadow-lg shadow-orange-500/20">
                <Image
                  src="/sayba-circle-logo.png"
                  alt="Sayba Arc Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold text-white">{t("sayba.arc")}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <SearchBar onSearch={handleSearch} onProductSelect={handleProductSelect} products={products} />
              <LanguageToggle language={language} onToggle={toggleLanguage} />
              <AudioToggle audioEnabled={audioEnabled} onToggle={toggleAudio} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Centered search bar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Circular logo for mobile header */}
              <div className="w-12 h-12 rounded-full border-2 border-orange-500/50 flex items-center justify-center overflow-hidden bg-gray-800/30 backdrop-blur-sm shadow-lg shadow-orange-500/20">
                <Image
                  src="/sayba-circle-logo.png"
                  alt="Sayba Arc Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-lg font-bold text-white">{t("sayba.arc")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <SearchBar onSearch={handleSearch} onProductSelect={handleProductSelect} products={products} />
              <LanguageToggle language={language} onToggle={toggleLanguage} />
              <AudioToggle audioEnabled={audioEnabled} onToggle={toggleAudio} />
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Social Media Chat - Enhanced with glow effects */}
      <div className="fixed bottom-6 right-4 md:right-6 z-50">
        <div className="relative">
          {/* Social Media Options */}
          <div
            className={`absolute bottom-20 right-0 space-y-3 transition-all duration-300 ease-out ${
              socialMenuOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center justify-end space-x-3">
                <span className="bg-gray-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-gray-600 hidden md:block shadow-lg">
                  {social.label}
                </span>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                  className={`w-14 h-14 md:w-12 md:h-12 ${social.color} rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation hover:shadow-xl hover:-translate-y-1`}
                >
                  {social.icon}
                </a>
              </div>
            ))}
          </div>

          {/* Main Chat Button - Enhanced with glow */}
          <button
            onClick={handleSocialToggle}
            onMouseEnter={playHover}
            className="w-16 h-16 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1"
          >
            {socialMenuOpen ? (
              <X className="h-7 w-7 md:h-6 md:w-6" />
            ) : (
              <MessageSquare className="h-7 w-7 md:h-6 md:w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 lg:pt-20 pb-32 w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-6 md:py-8 max-w-full">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <AnimatedSection className="text-center mb-16">
                <div className="mb-10">
                  <div className="w-32 h-32 mx-auto rounded-full border-2 border-orange-500/50 shadow-2xl shadow-orange-500/25 flex items-center justify-center overflow-hidden relative bg-gray-800/30 backdrop-blur-sm">
                    <Image
                      src="/sayba-circle-logo.png"
                      alt="Sayba Arc - Art You Believe"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-5xl font-bold text-white tracking-wide">Sayba Arc</h1>
                  <p className="text-xl text-orange-400 font-light tracking-wider">Art You Believe</p>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
                  <div className="max-w-4xl mx-auto">
                    <p className="text-gray-400 leading-relaxed text-lg font-light text-center">
                      Sayba Arc adalah penyedia layanan digital dan solusi kreatif terpercaya. Dengan motto 'Art You
                      Believe', kami menghadirkan berbagai layanan profesional mulai dari jasa tugas, web design, mobile
                      apps, graphic design, hingga AutoCAD service dan ArcGIS Service. Wujudkan ide kreatif Anda bersama
                      kami!
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Main Links Grid - Enhanced with glow effects */}
              <AnimatedSection className="grid md:grid-cols-2 gap-6 mb-16">
                {mainLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                  >
                    <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300 h-full hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02] hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-14 h-14 ${link.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                          >
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white group-hover:text-orange-400 transition-colors duration-300 mb-2">
                              {t(link.titleKey)}
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                              {t(link.descriptionKey)}
                            </p>
                          </div>
                          <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-all duration-300 group-hover:scale-110" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </AnimatedSection>

              {/* Product Pages Carousel */}
              <AnimatedSection>
                <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/30 mb-12 shadow-xl shadow-orange-500/10">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-light text-white mb-4">{t("explore.collection")}</h2>
                      <p className="text-gray-400 font-light">{t("collection.subtitle")}</p>
                    </div>

                    <ProductCarouselPages
                      products={products}
                      currentSlide={currentSlide}
                      onSlideChange={setCurrentSlide}
                      onProductClick={openProductModal}
                      isAutoPlaying={isAutoPlaying}
                    />
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>

          {/* Mobile Layout - Enhanced with glow effects */}
          <div className="lg:hidden w-full max-w-md mx-auto">
            {/* Mobile Hero */}
            <AnimatedSection className="text-center mb-10 px-4">
              <div className="mb-8">
                <div className="w-28 h-28 mx-auto rounded-full border-2 border-orange-500/50 shadow-2xl shadow-orange-500/25 flex items-center justify-center overflow-hidden relative bg-gray-800/30 backdrop-blur-sm">
                  <Image
                    src="/sayba-circle-logo.png"
                    alt="Sayba Arc - Art You Believe"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white tracking-wide">Sayba Arc</h1>
                <p className="text-lg text-orange-400 font-light tracking-wider">Art You Believe</p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
                <p className="text-gray-400 text-base leading-relaxed font-light text-center">
                  Sayba Arc adalah penyedia layanan digital dan solusi kreatif terpercaya. Dengan motto 'Art You
                  Believe', kami menghadirkan berbagai layanan profesional mulai dari jasa tugas, web design, mobile
                  apps, graphic design, hingga AutoCAD service dan ArcGIS Service. Wujudkan ide kreatif Anda bersama
                  kami!
                </p>
              </div>
            </AnimatedSection>

            {/* Mobile Main Links - Enhanced with glow effects */}
            <AnimatedSection className="space-y-4 mb-12 px-4">
              {mainLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group touch-manipulation"
                  onClick={handleLinkClick}
                >
                  <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/30 hover:bg-gray-800/50 active:bg-gray-800/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02] hover:-translate-y-1">
                    <CardContent className="p-5">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-14 h-14 ${link.bgColor} rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                        >
                          {link.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium group-hover:text-orange-400 group-active:text-orange-400 transition-colors duration-300 text-base">
                            {t(link.titleKey)}
                          </h3>
                          <p className="text-gray-400 text-sm group-hover:text-gray-300 group-active:text-gray-300 transition-colors duration-300 mt-1">
                            {t(link.descriptionKey)}
                          </p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-orange-400 group-active:text-orange-400 transition-all duration-300 flex-shrink-0 group-hover:scale-110" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </AnimatedSection>

            {/* Mobile Product Pages Carousel */}
            <AnimatedSection className="px-4">
              <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/30 mb-8 shadow-xl shadow-orange-500/10">
                <CardContent className="p-5">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-light text-white mb-2">{t("explore.collection")}</h2>
                    <p className="text-gray-400 text-sm font-light">{t("collection.subtitle")}</p>
                  </div>

                  <ProductCarouselPages
                    products={products}
                    currentSlide={currentSlide}
                    onSlideChange={setCurrentSlide}
                    onProductClick={openProductModal}
                    isAutoPlaying={isAutoPlaying}
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Footer - Enhanced with glow effects */}
      <AnimatedSection>
        <footer className="bg-gray-900/95 border-t border-gray-700 py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                  <CardContent className="p-5 md:p-6">
                    <h3 className="text-lg font-medium text-white mb-4">{t("get.in.touch")}</h3>
                    <div className="space-y-3">
                      <a
                        href="mailto:sayba.help@gmail.com"
                        onClick={handleLinkClick}
                        onMouseEnter={playHover}
                        className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 active:text-orange-400 transition-all duration-300 touch-manipulation py-1 hover:scale-105"
                      >
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">sayba.help@gmail.com</span>
                      </a>
                      <a
                        href="tel:+6287721916495"
                        onClick={handleLinkClick}
                        onMouseEnter={playHover}
                        className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 active:text-orange-400 transition-all duration-300 touch-manipulation py-1 hover:scale-105"
                      >
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">+62 877-2191-6495</span>
                      </a>
                      <a
                        href="https://www.sayba.shop"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        onMouseEnter={playHover}
                        className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 active:text-orange-400 transition-all duration-300 touch-manipulation py-1 hover:scale-105"
                      >
                        <Globe className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">www.sayba.shop</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                  <CardContent className="p-5 md:p-6">
                    <h3 className="text-lg font-medium text-white mb-4">{t("why.choose.us")}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-orange-500/50"></div>
                        <p className="text-gray-300 text-sm">{t("professional.quality")}</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-orange-500/50"></div>
                        <p className="text-gray-300 text-sm">{t("fast.turnaround")}</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-orange-500/50"></div>
                        <p className="text-gray-300 text-sm">{t("customer.support")}</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-orange-500/50"></div>
                        <p className="text-gray-300 text-sm">{t("competitive.pricing")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center text-gray-500 text-xs mt-6 md:mt-8 pt-6 border-t border-gray-700">
                <p>{t("copyright")}</p>
                <p className="mt-1">{t("powered.by")}</p>
              </div>
            </div>
          </div>
        </footer>
      </AnimatedSection>

      {/* Product Detail Modal - Enhanced with glow effects */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gray-800/95 backdrop-blur-sm rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl shadow-orange-500/20"
          >
            {/* Modal Header */}
            <div className="relative p-4 md:p-6 border-b border-gray-700/50">
              <button
                onClick={closeModal}
                onMouseEnter={playHover}
                className="absolute top-4 right-4 text-gray-400 hover:text-white active:text-white transition-all duration-300 w-8 h-8 flex items-center justify-center touch-manipulation hover:scale-110 active:scale-95"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center pr-8">
                <h2 className="text-xl md:text-2xl font-light text-white mb-2">{t(selectedProduct.titleKey)}</h2>
                <p className="text-orange-400 font-light text-sm md:text-base">{t(selectedProduct.subtitleKey)}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6">
              {/* Product Image */}
              <div className="relative mb-6">
                <div className="w-full max-w-xs mx-auto aspect-square rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={t(selectedProduct.titleKey)}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Navigation Buttons - Enhanced with glow */}
                <button
                  onClick={prevModalSlide}
                  onMouseEnter={playHover}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:border-orange-500 hover:text-orange-400 active:border-orange-500 active:text-orange-400 transition-all duration-300 rounded-full touch-manipulation hover:shadow-lg hover:shadow-orange-500/25 hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="h-6 w-6 md:h-5 md:w-5 mx-auto" />
                </button>

                <button
                  onClick={nextModalSlide}
                  onMouseEnter={playHover}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 bg-gray-900/90 backdrop-blur-sm border border-gray-600 text-white hover:border-orange-500 hover:text-orange-400 active:border-orange-500 active:text-orange-400 transition-all duration-300 rounded-full touch-manipulation hover:shadow-lg hover:shadow-orange-500/25 hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="h-6 w-6 md:h-5 md:w-5 mx-auto" />
                </button>
              </div>

              {/* Product Info */}
              <div className="text-left mb-6">
                <h3 className="text-lg font-medium text-white mb-3">{t("service.description")}</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {t(selectedProduct.descriptionKey)}
                </p>
              </div>

              {/* Features */}
              {selectedProduct.details && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-3">{t("features.included")}</h4>
                  <div className="grid gap-2">
                    {selectedProduct.details.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-orange-500/50"></div>
                        <p className="text-gray-300 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              {selectedProduct.details && (
                <div className="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-600/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-400 text-sm">{t("starting.from")}</span>
                      <p className="text-orange-400 font-bold text-xl">{selectedProduct.details.pricing}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">{t("delivery.time")}</span>
                      <p className="text-white font-medium">{selectedProduct.details.delivery}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons - Enhanced with glow */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/6287721916495"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-600 active:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center touch-manipulation hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
                >
                  {t("order.now")}
                </a>
                <a
                  href="https://wa.me/6287721916495"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center border border-gray-600 hover:border-gray-500 active:border-gray-500 touch-manipulation hover:shadow-lg hover:shadow-gray-500/25 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
                >
                  {t("ask.question")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
