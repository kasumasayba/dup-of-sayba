import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sayba Arc - Art You Believe | Digital Solutions & Creative Services",
  description:
    "Sayba Arc menyediakan layanan digital profesional termasuk Jasa Tugas, Web Design, Mobile Apps, Graphic Design, AutoCAD Service, ArcGIS Service, dan System Modification. Art You Believe - Solusi kreatif untuk kebutuhan digital Anda.",
  keywords:
    "sayba arc, sayba, art you believe, jasa tugas, web design, mobile apps, graphic design, autocad service, jasa oprek, aplikasi crack, arcgis service, perpetaan, digital solutions, creative services, powerpoint, word, system modification, sayba arc vercel, sayba.shop",
  authors: [{ name: "Sayba Arc" }],
  creator: "Sayba Arc",
  publisher: "Sayba Arc",
  robots: "index, follow",
  openGraph: {
    title: "Sayba Arc - Art You Believe | Digital Solutions & Creative Services",
    description:
      "Layanan digital profesional dan solusi kreatif untuk semua kebutuhan bisnis Anda. Dari web design hingga mobile apps, kami wujudkan ide Anda menjadi kenyataan.",
    url: "https://www.sayba.shop",
    siteName: "Sayba Arc",
    images: [
      {
        url: "/sayba-new-logo.png",
        width: 1200,
        height: 630,
        alt: "Sayba Arc - Art You Believe",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayba Arc - Art You Believe",
    description: "Digital solutions & creative services untuk semua kebutuhan bisnis Anda",
    images: ["/sayba-new-logo.png"],
  },
  verification: {
    google: "googlee85d0dc9f6a47b1b",
  },
  alternates: {
    canonical: "https://www.sayba.shop",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta name="google-site-verification" content="googlee85d0dc9f6a47b1b" />
        <link rel="canonical" href="https://www.sayba.shop" />
        <link rel="alternate" href="https://sayba-arc.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sayba Arc",
              alternateName: ["Sayba", "Sayba Arc Vercel"],
              description: "Art You Believe - Digital solutions and creative services",
              url: ["https://www.sayba.shop", "https://sayba-arc.vercel.app"],
              logo: "https://www.sayba.shop/sayba-new-logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-877-2191-6495",
                contactType: "customer service",
                availableLanguage: ["Indonesian", "English"],
              },
              sameAs: [
                "https://instagram.com/sayba.arc",
                "https://tiktok.com/@sayba.arc",
                "https://facebook.com/sayba.arc",
                "https://wa.me/6287721916495",
              ],
              service: [
                {
                  "@type": "Service",
                  name: "Jasa Tugas",
                  description: "Professional PowerPoint and Word document services",
                  keywords: ["powerpoint", "word", "tugas", "presentasi"],
                },
                {
                  "@type": "Service",
                  name: "Web Design",
                  description: "Modern responsive website design and development",
                  keywords: ["website", "web design", "responsive", "ui/ux"],
                },
                {
                  "@type": "Service",
                  name: "Mobile Apps",
                  description: "Native and cross-platform mobile application development",
                  keywords: ["mobile app", "android", "ios", "aplikasi"],
                },
                {
                  "@type": "Service",
                  name: "Graphic Design",
                  description: "Brand identity, logos, and visual design services",
                  keywords: ["logo", "branding", "design grafis", "visual"],
                },
                {
                  "@type": "Service",
                  name: "AutoCAD Service",
                  description: "Professional CAD design and technical drawings",
                  keywords: ["autocad", "cad", "technical drawing", "blueprint"],
                },
                {
                  "@type": "Service",
                  name: "ArcGIS Service",
                  description: "Professional GIS mapping and spatial analysis services",
                  keywords: ["arcgis", "gis", "mapping", "spatial analysis", "perpetaan"],
                },
                {
                  "@type": "Service",
                  name: "Jasa Oprek",
                  description: "System modifications and optimizations",
                  keywords: ["system modification", "optimization", "troubleshooting"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
                addressLocality: "Indonesia",
              },
              foundingDate: "2024",
              slogan: "Art You Believe",
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
