import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mebel MAN - Качественная мебель для вашего дома',
  description: 'Производство и установка кухонь, шкафов, гардеробных, комодов и прихожих. Качественная мебель по индивидуальным проектам в Москве.',
  keywords: 'мебель, кухни, шкафы, гардеробные, прихожие, комоды, Москва, изготовление мебели, мебель на заказ',
  authors: [{ name: 'Mebel MAN' }],
  creator: 'Mebel MAN',
  publisher: 'Mebel MAN',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mebelman.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://mebelman.ru',
    title: 'Mebel MAN - Качественная мебель для вашего дома',
    description: 'Производство и установка кухонь, шкафов, гардеробных, комодов и прихожих. Качественная мебель по индивидуальным проектам.',
    siteName: 'Mebel MAN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mebel MAN - Качественная мебель',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mebel MAN - Качественная мебель для вашего дома',
    description: 'Производство и установка кухонь, шкафов, гардеробных, комодов и прихожих.',
    images: ['/og-image.jpg'],
    creator: '@mebelman',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'business',
  classification: 'мебельная компания',
  other: {
    'geo.region': 'RU-MOW',
    'geo.placename': 'Москва',
    'geo.position': '55.7558;37.6176',
    'ICBM': '55.7558, 37.6176',
    'DC.title': 'Mebel MAN - Качественная мебель для вашего дома',
    'DC.creator': 'Mebel MAN',
    'DC.subject': 'мебель, кухни, шкафы',
    'DC.description': 'Производство и установка мебели',
    'DC.publisher': 'Mebel MAN',
    'DC.contributor': 'Mebel MAN',
    'DC.date': '2024-01-01',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://mebelman.ru',
    'DC.language': 'ru',
    'DC.coverage': 'Москва',
    'DC.rights': 'Copyright 2024 Mebel MAN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#212B38" />
        <meta name="msapplication-TileColor" content="#212B38" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Mebel MAN",
              "description": "Производство и установка кухонь, шкафов, гардеробных, комодов и прихожих",
              "url": "https://mebelman.ru",
              "telephone": "+79001234567",
              "email": "info@mebelman.ru",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Примерная, д. 123",
                "addressLocality": "Москва",
                "addressCountry": "RU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 55.7558,
                "longitude": 37.6176
              },
              "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00",
              "priceRange": "$$",
              "currenciesAccepted": "RUB",
              "paymentAccepted": "Cash, Credit Card",
              "areaServed": "Москва и Московская область",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 55.7558,
                  "longitude": 37.6176
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Мебель",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Кухни на заказ"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Шкафы-купе"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Гардеробные системы"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://t.me/yourchannel"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 