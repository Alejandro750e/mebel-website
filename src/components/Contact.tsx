'use client'

import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import { FaWhatsapp, FaVk } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'

export default function Contact() {
  const phoneNumber = '+7 (996) 564-56-83'
  const phoneHref = '+79965645683'

  const [isMobile, setIsMobile] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleCallClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault()
      setShowTooltip(true)
    }
  }

  const hideTooltip = () => {
    setShowTooltip(false)
  }

  // Закрытие тултипа при клике вне его
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        hideTooltip()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section id="contact" className="section-padding section-contact">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
            Контакты
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto">
            Свяжитесь с нами для получения консультации и расчета стоимости
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Контактная информация */}
          <div className="space-y-6 sm:space-y-8">
            <div className="card-gradient rounded-2xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Контактная информация</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone size={18} className="text-[#4F8EDC] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Телефон</h4>
                    <p className="text-sm sm:text-base text-white">+7 (996) 564-56-83</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin size={18} className="text-[#4F8EDC] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Адрес</h4>
                    <p className="text-sm sm:text-base text-white">г. Нижний Новгород</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Clock size={18} className="text-[#4F8EDC] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Режим работы</h4>
                    <p className="text-sm sm:text-base text-white">Круглосуточно: 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="card-gradient rounded-xl p-3 sm:p-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4F8EDC]/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Phone size={16} className="sm:w-5 sm:h-5 text-[#4F8EDC]" />
                </div>
                <span className="text-xs sm:text-sm text-white">Бесплатный замер и консультация</span>
              </div>
              
              <div className="card-gradient rounded-xl p-3 sm:p-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4F8EDC]/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <MessageCircle size={16} className="sm:w-5 sm:h-5 text-[#4F8EDC]" />
                </div>
                <span className="text-xs sm:text-sm text-white">Индивидуальный подход к каждому клиенту</span>
              </div>
              
              <div className="card-gradient rounded-xl p-3 sm:p-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4F8EDC]/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Clock size={16} className="sm:w-5 sm:h-5 text-[#4F8EDC]" />
                </div>
                <span className="text-xs sm:text-sm text-white">Гарантия качества на все работы</span>
              </div>
            </div>
          </div>

          {/* Кнопки связи */}
          <div className="card-gradient rounded-2xl p-4 sm:p-6 lg:p-8">
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Связаться с нами
            </h4>
            <p className="text-xs sm:text-sm text-white mb-6">
              Выберите удобный способ связи
            </p>

            <div className="space-y-4 relative">
              {/* Кастомный тултип */}
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white text-black text-sm font-medium py-2 px-4 rounded-lg shadow-lg z-10 whitespace-nowrap">
                  {phoneNumber}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
                </div>
              )}

              <a
                ref={buttonRef}
                href={`tel:${phoneHref}`}
                onClick={handleCallClick}
                className="w-full btn-neon flex items-center justify-center space-x-2 text-xs sm:text-sm py-3 sm:py-4"
                aria-label="Позвонить нам"
              >
                <Phone size={18} className="sm:w-5 sm:h-5" />
                <span>Позвонить</span>
              </a>
              <a
                href="https://wa.me/79965645683"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 text-xs sm:text-sm py-3 sm:py-4 rounded transition"
                style={{ backgroundColor: '#25D366', color: 'white' }}
                aria-label="Написать в WhatsApp"
              >
                <FaWhatsapp className="sm:w-5 sm:h-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://vk.com/mebelmannizhniy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 text-xs sm:text-sm py-3 sm:py-4 rounded transition"
                style={{ backgroundColor: '#0077FF', color: 'white' }}
                aria-label="Перейти в группу VK"
              >
                <FaVk className="sm:w-5 sm:h-5" />
                <span>Группа ВКонтакте</span>
              </a>
            </div>

            <div className="mt-6 p-4 bg-[#4F8EDC]/10 border border-[#4F8EDC]/20 rounded-lg">
              <h5 className="text-sm font-semibold text-white mb-2">Для расчета стоимости</h5>
              <p className="text-xs text-white/80 mb-3">
                Используйте калькулятор выше для точного расчета стоимости вашей мебели
              </p>
              <a
                href="#calculator"
                className="text-xs text-[#4F8EDC] hover:text-[#4F8EDC]/80 transition-colors"
              >
                Перейти к калькулятору →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}