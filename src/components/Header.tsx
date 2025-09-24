'use client'

import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { Menu, X, Send, Phone } from 'lucide-react'

interface HeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [showPhonePopup, setShowPhonePopup] = useState(false)
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent)
  const nameRef = useRef<HTMLSpanElement>(null)
  const [nameWidth, setNameWidth] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    if (nameRef.current) {
      setNameWidth(nameRef.current.offsetWidth)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  // Обработка клавиатурной навигации
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      scrollToSection(sectionId)
    }
  }

  // Закрытие popup по клику вне
  useEffect(() => {
    if (!showPhonePopup) return
    const handleClick = (e: MouseEvent) => {
      const popup = document.getElementById('phone-popup')
      if (popup && !popup.contains(e.target as Node)) {
        setShowPhonePopup(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showPhonePopup])

  // Обработка Escape для закрытия мобильного меню
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, setIsMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#212B38]/95 backdrop-blur-md border-b border-[#4F8EDC]/20 shadow-sm" role="banner">
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
        {/* Логотип */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gradient leading-tight whitespace-nowrap">Mebel MAN</span>
        </div>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6" role="navigation" aria-label="Основная навигация">
          <button
            onClick={() => scrollToSection('home')}
            onKeyDown={(e) => handleKeyDown(e, 'home')}
            className={`text-xs lg:text-sm font-medium transition-all duration-200 ${
              activeSection === 'home' 
                ? 'text-[#4F8EDC] border-b-2 border-[#4F8EDC]' 
                : 'text-white hover:text-[#4F8EDC] hover:scale-105'
            }`}
            aria-label="Перейти на главную страницу"
            aria-current={activeSection === 'home' ? 'page' : undefined}
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection('about')}
            onKeyDown={(e) => handleKeyDown(e, 'about')}
            className={`text-xs lg:text-sm font-medium transition-all duration-200 ${
              activeSection === 'about' 
                ? 'text-[#4F8EDC] border-b-2 border-[#4F8EDC]' 
                : 'text-white hover:text-[#4F8EDC] hover:scale-105'
            }`}
            aria-label="Перейти к разделу о компании"
            aria-current={activeSection === 'about' ? 'page' : undefined}
          >
            О компании
          </button>
          <button
            onClick={() => scrollToSection('catalog')}
            onKeyDown={(e) => handleKeyDown(e, 'catalog')}
            className={`text-xs lg:text-sm font-medium transition-all duration-200 ${
              activeSection === 'catalog' 
                ? 'text-[#4F8EDC] border-b-2 border-[#4F8EDC]' 
                : 'text-white hover:text-[#4F8EDC] hover:scale-105'
            }`}
            aria-label="Перейти к каталогу работ"
            aria-current={activeSection === 'catalog' ? 'page' : undefined}
          >
            Каталог
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            onKeyDown={(e) => handleKeyDown(e, 'calculator')}
            className={`text-xs lg:text-sm font-medium transition-all duration-200 ${
              activeSection === 'calculator' 
                ? 'text-[#4F8EDC] border-b-2 border-[#4F8EDC]' 
                : 'text-white hover:text-[#4F8EDC] hover:scale-105'
            }`}
            aria-label="Перейти к расчету стоимости"
            aria-current={activeSection === 'calculator' ? 'page' : undefined}
          >
            Рассчитать стоимость
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            onKeyDown={(e) => handleKeyDown(e, 'contact')}
            className={`text-xs lg:text-sm font-medium transition-all duration-200 ${
              activeSection === 'contact' 
                ? 'text-[#4F8EDC] border-b-2 border-[#4F8EDC]' 
                : 'text-white hover:text-[#4F8EDC] hover:scale-105'
            }`}
            aria-label="Перейти к контактам"
            aria-current={activeSection === 'contact' ? 'page' : undefined}
          >
            Контакты
          </button>
        </nav>

        {/* Правая часть */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Социальные сети */}
          <div className="hidden sm:flex items-center gap-1 relative">
            <button
              onClick={() => {
                window.open('https://t.me/+79965645683', '_blank')
              }}
              className="flex items-center justify-center text-white hover:text-[#4F8EDC] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F8EDC] p-2 rounded-full"
              aria-label="Открыть чат в Telegram"
              style={{background: 'none', border: 'none', margin: 0, cursor: 'pointer'}}
            >
              <Send size={22} />
            </button>
            <button
              onClick={() => {
                if (isMobile) {
                  window.location.href = 'tel:+79965645683'
                } else {
                  setShowPhonePopup(true)
                }
              }}
              className="flex items-center justify-center text-white hover:text-[#4F8EDC] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F8EDC] p-2 rounded-full"
              aria-label="Показать номер телефона"
              style={{background: 'none', border: 'none', margin: 0, cursor: 'pointer'}}
            >
              <Phone size={22} />
            </button>
            {showPhonePopup && !isMobile && (
              <div id="phone-popup" className="absolute right-0 top-10 bg-[#212B38] border border-[#4F8EDC] rounded-lg shadow-2xl px-5 py-2 text-white text-base whitespace-nowrap animate-fade-in z-50" style={{minWidth: '170px'}}>
                <span className="font-semibold tracking-wide">+7 (996) 564-56-83</span>
              </div>
            )}
          </div>

          {/* Кнопка заказа */}
          <button
            onClick={() => scrollToSection('calculator')}
            onKeyDown={(e) => handleKeyDown(e, 'calculator')}
            className="btn-neon text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2"
            aria-label="Рассчитать стоимость мебели"
          >
            РАССЧИТАТЬ СТОИМОСТЬ
          </button>

          {/* Мобильное меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setIsMenuOpen(!isMenuOpen)
              }
            }}
            className="md:hidden text-white hover:text-[#4F8EDC] transition-colors p-1"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div 
          className="md:hidden bg-[#212B38]/95 backdrop-blur-md border-t border-[#4F8EDC]/20"
          id="mobile-menu"
          role="navigation"
          aria-label="Мобильная навигация"
        >
          <div className="px-3 sm:px-4 py-3 space-y-2">
            <button
              onClick={() => scrollToSection('home')}
              onKeyDown={(e) => handleKeyDown(e, 'home')}
              className="block w-full text-left text-white hover:text-[#4F8EDC] transition-colors py-2 text-sm"
              aria-label="Перейти на главную страницу"
              aria-current={activeSection === 'home' ? 'page' : undefined}
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection('about')}
              onKeyDown={(e) => handleKeyDown(e, 'about')}
              className="block w-full text-left text-white hover:text-[#4F8EDC] transition-colors py-2 text-sm"
              aria-label="Перейти к разделу о компании"
              aria-current={activeSection === 'about' ? 'page' : undefined}
            >
              О компании
            </button>
            <button
              onClick={() => scrollToSection('catalog')}
              onKeyDown={(e) => handleKeyDown(e, 'catalog')}
              className="block w-full text-left text-white hover:text-[#4F8EDC] transition-colors py-2 text-sm"
              aria-label="Перейти к каталогу работ"
              aria-current={activeSection === 'catalog' ? 'page' : undefined}
            >
              Каталог
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              onKeyDown={(e) => handleKeyDown(e, 'calculator')}
              className="block w-full text-left text-white hover:text-[#4F8EDC] transition-colors py-2 text-sm"
              aria-label="Перейти к расчету стоимости"
              aria-current={activeSection === 'calculator' ? 'page' : undefined}
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              onKeyDown={(e) => handleKeyDown(e, 'contact')}
              className="block w-full text-left text-white hover:text-[#4F8EDC] transition-colors py-2 text-sm"
              aria-label="Перейти к контактам"
              aria-current={activeSection === 'contact' ? 'page' : undefined}
            >
              Контакты
            </button>
          </div>
        </div>
      )}
    </header>
  )
} 