'use client'

import { Phone, Send } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'

export default function Hero() {
  const scrollToRequest = () => {
    const element = document.getElementById('calculator')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.animation = 'neon-palette 1.5s ease infinite'
    e.currentTarget.style.boxShadow = '0 0 30px rgba(79, 142, 220, 0.6)'
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.animation = 'neon-palette 3s ease infinite'
    e.currentTarget.style.boxShadow = '0 0 20px rgba(79, 142, 220, 0.3)'
  }

  const [showPhonePopup, setShowPhonePopup] = useState(false)

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Фоновое изображение с градиентами */}
      <div className="absolute inset-0 z-0">
        {/* Фоновое изображение без параллакс эффекта */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Затемняющий слой для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#212B38]/60 via-[#37465B]/50 to-[#AEEFFF]/40"></div>
        
        {/* Дополнительные градиентные слои */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#726EFF]/20 via-transparent to-[#5AFFE7]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08C6AB]/10 to-[#212B38]/30"></div>
        
        {/* Новый эффект: затемнение слева, плавный переход вправо */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#212B38]/80 via-[#212B38]/40 to-transparent"></div>
        
        {/* Дополнительный затемняющий слой для мобильной версии */}
        <div className="absolute inset-0 bg-black/30 sm:hidden"></div>
        
        {/* Плавающие элементы без параллакс эффекта */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-[#4F8EDC]/20 rounded-full blur-xl"
        ></div>
        <div 
          className="absolute top-40 right-20 w-32 h-32 bg-[#08C6AB]/20 rounded-full blur-xl"
        ></div>
        <div 
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#726EFF]/20 rounded-full blur-xl"
        ></div>
      </div>

      {/* Основной контент без параллакс эффекта */}
      <div 
        className="relative z-10 w-full flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Левая часть — контент */}
        <div className="flex flex-col justify-center flex-1 max-w-3xl mx-auto lg:mx-0 pt-16 sm:pt-20 lg:pt-0">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Логотип и название */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#4F8EDC] leading-tight drop-shadow-[0_0_20px_rgba(79,142,220,0.8)] drop-shadow-[0_0_40px_rgba(79,142,220,0.4)]">
                Mebel MAN
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-light">
                Качественная мебель для вашего дома
              </p>
            </div>

            {/* Описание */}
            <div className="space-y-4">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white max-w-2xl mx-auto lg:mx-0">
                Производство и установка кухонь, шкафов, гардеробных, прихожих, комодов и многое другое по индивидуальным проектам.
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white max-w-2xl mx-auto lg:mx-0 font-semibold" style={{marginTop: '0.5em'}}>
                Работаем в Нижнем Новгороде и Нижегородской области
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  className="btn-neon w-full sm:w-auto text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-3"
                  onClick={scrollToRequest}
                  aria-label="Рассчитать стоимость мебели"
                >
                  РАССЧИТАТЬ СТОИМОСТЬ
                </button>
                <button 
                  className="w-full sm:w-auto text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-white font-semibold transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 border-0"
                  style={{
                    background: 'linear-gradient(45deg, #1a2332, #2d3748, #4F8EDC, #2d3748, #1a2332)',
                    backgroundSize: '400% 400%',
                    animation: 'neon-palette 3s ease infinite',
                    boxShadow: '0 0 20px rgba(79, 142, 220, 0.3)'
                  }}
                  onClick={scrollToCatalog}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  aria-label="Посмотреть примеры работ"
                >
                  СМОТРЕТЬ РАБОТЫ
                </button>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-6 pt-3 sm:pt-4 lg:pt-6">
              {/* Telegram */}
              <a
                href="https://t.me/+79965645683"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#4F8EDC] transition-colors hover:scale-110 transform duration-200"
                aria-label="Наш Telegram"
              >
                <Send size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              {/* Phone: мобильная версия */}
              <a
                href="tel:+79965645683"
                className="text-white hover:text-[#4F8EDC] transition-colors hover:scale-110 transform duration-200 sm:hidden"
                aria-label="Позвонить нам"
              >
                <Phone size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              {/* Phone: десктопная версия */}
              <button
                type="button"
                className="hidden sm:inline text-white hover:text-[#4F8EDC] transition-colors hover:scale-110 transform duration-200 relative"
                aria-label="Показать номер телефона"
                onClick={() => setShowPhonePopup(!showPhonePopup)}
                onBlur={() => setShowPhonePopup(false)}
              >
                <Phone size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                {showPhonePopup && (
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-[#212B38] text-white text-xs rounded shadow-lg z-50 whitespace-nowrap">
                    +7 (996) 564-56-83
                  </span>
                )}
              </button>
              {/* WhatsApp */}
              <a
                href="https://wa.me/79965645683"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#25D366] transition-colors hover:scale-110 transform duration-200"
                aria-label="Написать в WhatsApp"
              >
                <FaWhatsapp size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>
        {/* Правая часть — пустая на мобильных, видимая на десктопе */}
        <div className="hidden lg:flex flex-1"></div>
      </div>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-4 h-6 sm:w-5 sm:h-8 md:w-6 md:h-10 border-2 border-[#4F8EDC] rounded-full flex justify-center">
          <div className="w-0.5 h-1.5 sm:h-2 md:h-3 bg-gradient-to-b from-[#4F8EDC] to-[#AEB6BF] rounded-full mt-1 sm:mt-1.5 md:mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}