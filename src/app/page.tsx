'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Catalog from '@/components/Catalog'
import Calculator from '@/components/Calculator'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-black text-white">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Hero />
        <About />
        <Catalog />
        <Calculator />
        <Contact />
        <Footer />
      </main>
    </ErrorBoundary>
  )
} 