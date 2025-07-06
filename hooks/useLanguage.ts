"use client"

import { useState, useEffect, useCallback } from "react"

export type Language = "en" | "id"

interface Translations {
  en: {
    [key: string]: string
  }
  id: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    // Navigation
    "sayba.arc": "Sayba Arc",
    "art.you.believe": "Art You Believe",

    // Hero
    "hero.description":
      "Sayba Arc is a trusted provider of digital services and creative solutions. With the motto 'Art You Believe', we offer various professional services from task assistance, web design, mobile apps, graphic design, to AutoCAD services. Realize your creative ideas with us!",
    "hero.mobile.description":
      "Digital solutions, creative services, and innovative technology for your business needs",

    // Services
    "explore.collection": "Explore Our Collection",
    "collection.subtitle": "Discover innovative solutions crafted with passion and expertise",

    // Main Links
    "portfolio.website": "Portfolio Website",
    "portfolio.description": "View my complete portfolio and past projects",
    "whatsapp.business": "WhatsApp Business",
    "whatsapp.description": "Contact me directly for projects and consultations",
    "ai.customer.service": "AI Customer Service",
    "ai.description": "24/7 automated support and instant responses",
    "book.consultation": "Book a Consultation",
    "consultation.description": "Schedule a free consultation call to discuss your project",

    // Products
    "jasa.tugas": "Task Services",
    "jasa.tugas.subtitle": "PowerPoint & Word",
    "jasa.tugas.description":
      "Professional PowerPoint and Word document creation services with the best quality. We help you complete academic assignments and business presentations with satisfying results.",

    "jasa.oprek": "System Modification",
    "jasa.oprek.subtitle": "System Optimization",
    "jasa.oprek.description":
      "System modification and performance optimization services for various technical needs. We help optimize your system to run more efficiently and according to your needs.",

    "aplikasi.crack": "Software Solutions",
    "aplikasi.crack.subtitle": "Application Support",
    "aplikasi.crack.description":
      "Software and application solutions for various business and personal needs. We provide installation assistance, configuration, and technical support for the software you need.",

    "web.design": "Web Design",
    "web.design.subtitle": "Custom Websites",
    "web.design.description":
      "Modern, responsive, and user-friendly website design and development. We create websites that are not only visually appealing but also optimized for SEO and performance.",

    "mobile.apps": "Mobile Apps",
    "mobile.apps.subtitle": "iOS & Android",
    "mobile.apps.description":
      "Native and cross-platform mobile application development for iOS and Android. From concept to deployment on App Store and Play Store, we handle all your mobile app needs.",

    "graphic.design": "Graphic Design",
    "graphic.design.subtitle": "Visual Identity",
    "graphic.design.description":
      "Professional graphic design services for branding and marketing needs. We create strong and consistent visual identities to increase your business brand awareness.",

    "autocad.service": "AutoCAD Service",
    "autocad.service.subtitle": "Technical Drawing",
    "autocad.service.description":
      "Technical design services using AutoCAD for various architectural and engineering needs. We provide precise technical drawings that meet industry standards.",

    "jasa.perpetaan.arcgis": "ArcGIS Mapping Service",
    "jasa.perpetaan.arcgis.subtitle": "GIS & Spatial Analysis",
    "jasa.perpetaan.arcgis.description":
      "Professional GIS mapping and spatial analysis services using ArcGIS. We provide comprehensive geospatial solutions for various mapping and analysis needs.",

    // Modal
    "service.description": "Service Description",
    "services.provided": "Services Provided:",
    "price.delivery": "Price & Delivery Time",
    "price.from": "Starting from:",
    "delivery.time": "Delivery time:",
    "custom.quote": "Need a custom quote?",
    "contact.pricing": "Contact us for detailed pricing",
    "order.now": "Order Now",

    // Footer
    "get.in.touch": "Get In Touch",
    "why.choose.us": "Why Choose Us?",
    "professional.quality": "Professional quality and attention to detail",
    "fast.turnaround": "Fast turnaround times and reliable delivery",
    "customer.support": "24/7 customer support and consultation",
    "competitive.pricing": "Competitive pricing and flexible packages",
    copyright: "© 2024 Sayba Arc - Art You Believe",
    "powered.by": "Powered by creativity and innovation",

    // Search
    "search.placeholder": "Search services...",
    "search.results": "Search results:",
    "no.results": "No results found",

    // Audio
    "disable.audio": "Disable audio feedback",
    "enable.audio": "Enable audio feedback",
  },
  id: {
    // Navigation
    "sayba.arc": "Sayba Arc",
    "art.you.believe": "Art You Believe",

    // Hero
    "hero.description":
      "Sayba Arc adalah penyedia layanan digital dan solusi kreatif terpercaya. Dengan motto 'Art You Believe', kami menghadirkan berbagai layanan profesional mulai dari jasa tugas, web design, mobile apps, graphic design, hingga AutoCAD service dan ArcGIS Service. Wujudkan ide kreatif Anda bersama kami!",
    "hero.mobile.description": "Solusi digital, layanan kreatif, dan teknologi inovatif untuk kebutuhan bisnis Anda",

    // Services
    "explore.collection": "Jelajahi Koleksi Kami",
    "collection.subtitle": "Temukan solusi inovatif yang dibuat dengan passion dan keahlian",

    // Main Links
    "portfolio.website": "Website Portfolio",
    "portfolio.description": "Lihat portfolio lengkap dan proyek-proyek sebelumnya",
    "whatsapp.business": "WhatsApp Bisnis",
    "whatsapp.description": "Hubungi saya langsung untuk proyek dan konsultasi",
    "ai.customer.service": "Layanan Pelanggan AI",
    "ai.description": "Dukungan otomatis 24/7 dan respon instan",
    "book.consultation": "Booking Konsultasi",
    "consultation.description": "Jadwalkan panggilan konsultasi gratis untuk membahas proyek Anda",

    // Products
    "jasa.tugas": "Jasa Tugas",
    "jasa.tugas.subtitle": "PowerPoint & Word",
    "jasa.tugas.description":
      "Layanan profesional pembuatan dokumen PowerPoint dan Word dengan kualitas terbaik. Kami membantu Anda menyelesaikan tugas akademik dan presentasi bisnis dengan hasil yang memuaskan.",

    "jasa.oprek": "Jasa Oprek",
    "jasa.oprek.subtitle": "Modifikasi Sistem",
    "jasa.oprek.description":
      "Layanan modifikasi sistem dan optimasi performa untuk berbagai kebutuhan teknis. Kami membantu mengoptimalkan sistem Anda agar berjalan lebih efisien dan sesuai kebutuhan.",

    "aplikasi.crack": "Aplikasi Crack",
    "aplikasi.crack.subtitle": "Solusi Software",
    "aplikasi.crack.description":
      "Solusi software dan aplikasi untuk berbagai kebutuhan bisnis dan personal. Kami menyediakan bantuan instalasi, konfigurasi, dan dukungan teknis untuk software yang Anda butuhkan.",

    "web.design": "Web Design",
    "web.design.subtitle": "Website Custom",
    "web.design.description":
      "Desain dan pengembangan website modern yang responsif dan user-friendly. Kami menciptakan website yang tidak hanya menarik secara visual, tetapi juga optimal untuk SEO dan performa.",

    "mobile.apps": "Mobile Apps",
    "mobile.apps.subtitle": "iOS & Android",
    "mobile.apps.description":
      "Pengembangan aplikasi mobile native dan cross-platform untuk iOS dan Android. Dari konsep hingga deployment di App Store dan Play Store, kami handle semua kebutuhan mobile app Anda.",

    "graphic.design": "Graphic Design",
    "graphic.design.subtitle": "Identitas Visual",
    "graphic.design.description":
      "Layanan desain grafis profesional untuk kebutuhan branding dan marketing. Kami menciptakan identitas visual yang kuat dan konsisten untuk meningkatkan brand awareness bisnis Anda.",

    "autocad.service": "AutoCAD Service",
    "autocad.service.subtitle": "Gambar Teknis",
    "autocad.service.description":
      "Layanan desain teknis menggunakan AutoCAD untuk berbagai kebutuhan arsitektur dan engineering. Kami menyediakan gambar teknis yang presisi dan sesuai standar industri.",

    "jasa.perpetaan.arcgis": "Jasa Perpetaan ArcGIS",
    "jasa.perpetaan.arcgis.subtitle": "GIS & Analisis Spasial",
    "jasa.perpetaan.arcgis.description":
      "Layanan profesional pemetaan GIS dan analisis spasial menggunakan ArcGIS. Kami menyediakan solusi geospasial komprehensif untuk berbagai kebutuhan pemetaan dan analisis.",

    // Modal
    "service.description": "Deskripsi Layanan",
    "services.provided": "Layanan yang Disediakan:",
    "price.delivery": "Harga & Waktu Pengerjaan",
    "price.from": "Harga mulai dari:",
    "delivery.time": "Waktu pengerjaan:",
    "custom.quote": "Butuh penawaran khusus?",
    "contact.pricing": "Hubungi kami untuk detail harga",
    "order.now": "Pesan Sekarang",

    // Footer
    "get.in.touch": "Hubungi Kami",
    "why.choose.us": "Mengapa Memilih Kami?",
    "professional.quality": "Kualitas profesional dan perhatian terhadap detail",
    "fast.turnaround": "Waktu pengerjaan cepat dan pengiriman terpercaya",
    "customer.support": "Dukungan pelanggan 24/7 dan konsultasi",
    "competitive.pricing": "Harga kompetitif dan paket fleksibel",
    copyright: "© 2024 Sayba Arc - Art You Believe",
    "powered.by": "Didukung oleh kreativitas dan inovasi",

    // Search
    "search.placeholder": "Cari layanan...",
    "search.results": "Hasil pencarian:",
    "no.results": "Tidak ada hasil ditemukan",

    // Audio
    "disable.audio": "Matikan feedback audio",
    "enable.audio": "Aktifkan feedback audio",
  },
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("id") // Default to Indonesian

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "id")) {
      setLanguage(saved)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    const newLang: Language = language === "en" ? "id" : "en"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
  }, [language])

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || key
    },
    [language],
  )

  return { language, toggleLanguage, t }
}
