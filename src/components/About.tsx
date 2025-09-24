export default function About() {
  return (
    <section id="about" className="section-padding section-about">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Левая часть - изображение */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden border border-blue-200/50 shadow-2xl">
              {/* Фото мастерской */}
              <img 
                src="/rrre.jpg" 
                alt="Фото мастерской Mebel MAN" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Правая часть - текст */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
                О компании
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed">
                Мы специализируемся на производстве качественной мебели для вашего дома. 
                Более 10 лет создаем индивидуальные проекты, которые радуют наших клиентов.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="space-y-1 sm:space-y-2 card-gradient p-3 sm:p-4 rounded-xl">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">10+</div>
                <div className="text-xs sm:text-sm text-white">Лет опыта</div>
              </div>
              <div className="space-y-1 sm:space-y-2 card-gradient p-3 sm:p-4 rounded-xl">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">500+</div>
                <div className="text-xs sm:text-sm text-white">Реализованных проектов</div>
              </div>
              <div className="space-y-1 sm:space-y-2 card-gradient p-3 sm:p-4 rounded-xl">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">100%</div>
                <div className="text-xs sm:text-sm text-white">Гарантия качества</div>
              </div>
              <div className="space-y-1 sm:space-y-2 card-gradient p-3 sm:p-4 rounded-xl">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">24/7</div>
                <div className="text-xs sm:text-sm text-white">Поддержка клиентов</div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
                Наши услуги
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#4F8EDC] to-[#AEB6BF] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white">Кухни на заказ</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#4F8EDC] to-[#AEB6BF] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white">Шкафы-купе</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#4F8EDC] to-[#AEB6BF] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white">Гардеробные системы</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#4F8EDC] to-[#AEB6BF] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white">Комоды и тумбы</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#4F8EDC] to-[#AEB6BF] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white">Прихожие</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#4F8EDC] to-[#AEB6BF] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-white">Установка и сборка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 