import { Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#212B38] via-[#37465B] to-[#212B38] border-t border-[#4F8EDC]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Mebel MAN</h3>
            <p className="text-white text-sm leading-relaxed">
              Производство и установка качественной мебели для вашего дома. 
              Индивидуальный подход и гарантия качества на все работы.
            </p>
          </div>

          {/* Услуги */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Услуги</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>Кухни на заказ</li>
              <li>Шкафы-купе</li>
              <li>Гардеробные системы</li>
              <li>Прихожие</li>
              <li>Комоды и тумбы</li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Контакты</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-white" />
                <span className="text-white">+7 (996) 564-56-83</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-white" />
                <span className="text-white">г. Нижний Новгород</span>
              </div>
            </div>
          </div>

          {/* Рабочие часы */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Режим работы</h4>
            <div className="space-y-2 text-sm text-white">
              <div className="flex justify-between">
                <span>Круглосуточно:</span>
                <span>24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-[#4F8EDC]/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white">
              © 2025 Mebel MAN. Все права защищены.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-white hover:text-[#4F8EDC] transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="text-white hover:text-[#4F8EDC] transition-colors">
                Условия использования
              </a>
            </div>
          </div>
          
          {/* ВАЖНО: не является офертой */}
          <div className="mt-3 text-xs text-white/60 text-center">
            Цены и описания носят ознакомительный характер и не являются публичной офертой.
          </div>

          {/* Информация о cookies */}
          <div className="mt-4 text-xs text-white text-center opacity-80">
            Используя наш сайт, вы соглашаетесь с использованием файлов cookies.
          </div>
        </div>
      </div>
    </footer>
  )
}