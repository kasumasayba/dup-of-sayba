"use client"
import Image from "next/image"
import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
import { Button } from "@/components/ui/button"
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
      pricing: "Mulai dari Rp 25.000",
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
      pricing: "Mulai dari Rp 50.000",
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
      pricing: "Mulai dari Rp 30.000",
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
      pricing: "Mulai dari Rp 500.000",
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
      pricing: "Mulai dari Rp 2.000.000",
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
      pricing: "Mulai dari Rp 100.000",
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
      pricing: "Mulai dari Rp 75.000",
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
      pricing: "Mulai dari Rp 150.000",
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

export default function SaybaArcLinktree() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalSlide, setModalSlide] = useState(0)
  const [socialMenuOpen, setSocialMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const modalTouchStartX = useRef<number>(0)
  const modalTouchEndX = useRef<number>(0)

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

  // Touch handlers for modal slider
  const handleModalTouchStart = (e: React.TouchEvent) => {
    modalTouchStartX.current = e.targetTouches[0].clientX
  }

  const handleModalTouchMove = (e: React.TouchEvent) => {
    modalTouchEndX.current = e.targetTouches[0].clientX
  }

  const handleModalTouchEnd = () => {
    if (!modalTouchStartX.current || !modalTouchEndX.current) return

    const distance = modalTouchStartX.current - modalTouchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextModalSlide()
    }
    if (isRightSwipe) {
      prevModalSlide()
    }
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
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}
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
              <div className="w-12 h-12 rounded-lg border-2 border-orange-500 flex items-center justify-center overflow-hidden glow-hover interactive-scale">
                <Image
                  src="/sayba-square-logo.png"
                  alt="Sayba Arc Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
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

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center overflow-hidden glow-hover interactive-scale">
                <Image
                  src="/sayba-square-logo.png"
                  alt="Sayba Arc Logo"
                  width={40}
                  height={40}
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

      {/* Floating Social Media Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Social Media Options */}
          <div
            className={`absolute bottom-20 right-0 space-y-3 transition-all duration-500 ${
              socialMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="flex items-center justify-end space-x-3 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="bg-gray-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-gray-600">
                  {social.label}
                </span>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                  className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white shadow-lg glow-hover interactive-scale`}
                >
                  {social.icon}
                </a>
              </div>
            ))}
          </div>

          {/* Main Chat Button */}
          <button
            onClick={handleSocialToggle}
            onMouseEnter={playHover}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg glow-hover interactive-scale"
          >
            {socialMenuOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 lg:pt-20 pb-32">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="mb-8">
                  <div className="w-48 h-48 mx-auto rounded-full border-4 border-orange-500 shadow-2xl flex items-center justify-center overflow-hidden relative glow-hover interactive-scale">
                    <Image
                      src="/sayba-square-logo.png"
                      alt="Sayba Arc - Art You Believe"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">{t("sayba.arc")}</h1>
                <p className="text-xl text-gray-300 mb-4">{t("art.you.believe")}</p>
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">{t("hero.description")}</p>
              </div>

              {/* Main Links Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
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
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full glow-hover interactive-scale shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-16 ${link.bgColor} rounded-xl flex items-center justify-center text-white shadow-lg glow-hover`}
                          >
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                              {t(link.titleKey)}
                            </h3>
                            <p className="text-gray-400">{t(link.descriptionKey)}</p>
                          </div>
                          <ExternalLink className="h-6 w-6 text-gray-400 group-hover:text-orange-400 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>

              {/* Product Pages Carousel */}
              <Card className="bg-gray-800 border-gray-700 mb-12 glow-hover shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold text-white mb-4">{t("explore.collection")}</h2>
                    <p className="text-gray-400">{t("collection.subtitle")}</p>
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
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden max-w-md mx-auto">
            {/* Mobile Hero */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto rounded-full border-3 border-orange-500 shadow-2xl flex items-center justify-center overflow-hidden relative glow-hover interactive-scale">
                  <Image
                    src="/sayba-square-logo.png"
                    alt="Sayba Arc - Art You Believe"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{t("sayba.arc")}</h1>
              <p className="text-gray-300 text-sm mb-4">{t("art.you.believe")}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{t("hero.mobile.description")}</p>
            </div>

            {/* Mobile Main Links */}
            <div className="space-y-4 mb-8">
              {mainLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  onClick={handleLinkClick}
                >
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02] glow-hover interactive-scale shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 ${link.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg glow-hover`}
                        >
                          {link.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold group-hover:text-orange-400 transition-colors">
                            {t(link.titleKey)}
                          </h3>
                          <p className="text-gray-400 text-sm">{t(link.descriptionKey)}</p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* Mobile Product Pages Carousel */}
            <Card className="bg-gray-800 border-gray-700 mb-8 glow-hover shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">{t("explore.collection")}</h2>
                  <p className="text-gray-400 text-sm">{t("collection.subtitle")}</p>
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/95 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700 glow-hover shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{t("get.in.touch")}</h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:sayba.help@gmail.com"
                      onClick={handleLinkClick}
                      onMouseEnter={playHover}
                      className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors glow-hover interactive-scale"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="text-sm">sayba.help@gmail.com</span>
                    </a>
                    <a
                      href="tel:+6287721916495"
                      onClick={handleLinkClick}
                      onMouseEnter={playHover}
                      className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors glow-hover interactive-scale"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="text-sm">+62 877-2191-6495</span>
                    </a>
                    <a
                      href="https://www.sayba.shop"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      onMouseEnter={playHover}
                      className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors glow-hover interactive-scale"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="text-sm">www.sayba.shop</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 glow-hover shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{t("why.choose.us")}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-300 text-sm">{t("professional.quality")}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-300 text-sm">{t("fast.turnaround")}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-300 text-sm">{t("customer.support")}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-300 text-sm">{t("competitive.pricing")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center text-gray-500 text-xs mt-8 pt-6 border-t border-gray-700">
              <p>{t("copyright")}</p>
              <p className="mt-1">{t("powered.by")}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Product Detail Modal with Swipe */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
            {/* Modal Header with Navigation */}
            <div className="relative p-6 border-b border-gray-700">
              <button
                onClick={closeModal}
                onMouseEnter={playHover}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors glow-hover interactive-scale"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevModalSlide}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white glow-hover interactive-scale button-glow-bg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={t(selectedProduct.titleKey)}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{t(selectedProduct.titleKey)}</h2>
                    <p className="text-orange-400 font-medium">{t(selectedProduct.subtitleKey)}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextModalSlide}
                  onMouseEnter={playHover}
                  className="text-gray-400 hover:text-white glow-hover interactive-scale button-glow-bg"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Modal Content with Touch Support */}
            <div
              className="p-6"
              onTouchStart={handleModalTouchStart}
              onTouchMove={handleModalTouchMove}
              onTouchEnd={handleModalTouchEnd}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">{t("service.description")}</h3>
                <p className="text-gray-300 leading-relaxed mb-4">{t(selectedProduct.descriptionKey)}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">{t("services.provided")}</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      {selectedProduct.details?.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-white font-medium mb-2">{t("price.delivery")}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">{t("price.from")}</span>
                    <p className="text-orange-400 font-semibold">
                      {selectedProduct.details?.pricing || "Hubungi untuk quote"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">{t("delivery.time")}</span>
                    <p className="text-white">{selectedProduct.details?.delivery || "1-7 hari"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <p>{t("custom.quote")}</p>
                  <p>{t("contact.pricing")}</p>
                </div>

                <a
                  href="https://wa.me/6287721916495?text=_%2ASayba+Arc%2A_%0A%2AWebsite%2A+%E2%86%92+www.sayba.shop%0A%2AInstagram%2A+%E2%86%92+%40sayba.arc&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 glow-hover interactive-scale"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{t("order.now")}</span>
                </a>
              </div>

              {/* Modal Slide Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setModalSlide(index)
                      setSelectedProduct(products[index])
                      playClick()
                    }}
                    onMouseEnter={playHover}
                    className={`w-2 h-2 rounded-full transition-all duration-300 glow-hover interactive-scale ${
                      modalSlide === index ? "bg-orange-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
