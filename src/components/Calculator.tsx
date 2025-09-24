'use client'

import { useState } from 'react'
import { sendTelegramMessage } from '@/utils/telegram'
import { Ruler, Truck, MessageCircle, Clock, Shield, Star } from 'lucide-react'

interface RequestForm {
  furnitureType: string
  furnitureSubtype?: string
  area: string | number
  material: string
  lighting: boolean
  name: string
  phone: string
  message: string
}

interface FormErrors {
  area?: string
  name?: string
  phone?: string
}

const furnitureTypes = [
  { value: 'kitchen', label: 'Кухня' },
  { value: 'cabinet', label: 'Шкаф' },
  { value: 'entrance', label: 'Прихожая' },
  { value: 'chest', label: 'Комод' },
]

const kitchenSubtypes = [
  { value: 'straight', label: 'Прямая' },
  { value: 'l-shaped', label: 'Г-образная' },
  { value: 'u-shaped', label: 'П-образная' },
]

const materials = [
  { value: 'chipboard', label: 'ЛДСП' },
  { value: 'mdf', label: 'МДФ' },
  { value: 'solid', label: 'Массив дерева' },
  { value: 'plastic', label: 'Пластик' },
]

const advantages = [
  {
    icon: Ruler,
    title: 'Бесплатный замер',
    description: 'Наш специалист приедет к вам и проведет точные замеры помещения'
  },
  {
    icon: Truck,
    title: 'Бесплатная доставка',
    description: 'Подъем на любой этаж, аккуратная доставка и установка мебели'
  },
  {
    icon: MessageCircle,
    title: 'Бесплатная консультация',
    description: 'Получите профессиональную консультацию по выбору мебели'
  },
  {
    icon: Clock,
    title: 'Быстрые сроки',
    description: 'Изготавливаем мебель в кратчайшие сроки'
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Предоставляем гарантию на все виды работ'
  },
  {
    icon: Star,
    title: 'Индивидуальный подход',
    description: 'Каждый проект разрабатывается под ваши потребности'
  }
]

export default function Calculator() {
  const [form, setForm] = useState<RequestForm>({
    furnitureType: 'kitchen',
    furnitureSubtype: 'straight',
    area: '',
    material: 'chipboard',
    lighting: false,
    name: '',
    phone: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Валидация площади (только для типов мебели, где нужна площадь)
    if (form.furnitureType !== 'chest') {
      const areaValue = typeof form.area === 'string' ? parseFloat(form.area) : form.area
      if (!form.area || areaValue <= 0) {
        newErrors.area = 'Пожалуйста, укажите площадь больше 0'
      } else if (areaValue > 1000) {
        newErrors.area = 'Площадь не может быть больше 1000 м²'
      }
    }

    // Валидация имени
    if (!form.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    // Валидация телефона
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    if (!form.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона'
    } else if (!phoneRegex.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Пожалуйста, укажите корректный номер телефона'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Отправляем данные в Telegram
      const telegramData = {
        name: form.name,
        phone: form.phone,
        furnitureType: furnitureTypes.find(t => t.value === form.furnitureType)?.label || '',
        furnitureSubtype: form.furnitureType === 'kitchen' ? kitchenSubtypes.find(s => s.value === form.furnitureSubtype)?.label : undefined,
        area: form.furnitureType !== 'chest' ? (typeof form.area === 'string' ? parseFloat(form.area) : form.area) : undefined,
        material: materials.find(m => m.value === form.material)?.label || '',
        lighting: form.lighting,
        message: form.message,
        type: 'calculator' as const
      }

      const telegramSuccess = await sendTelegramMessage(telegramData)
      
      if (telegramSuccess) {
        console.log('Заявка успешно отправлена в Telegram')
        setShowSuccess(true)
        
        // Очищаем форму после успешной отправки
        setForm({
          furnitureType: 'kitchen',
          furnitureSubtype: 'straight',
          area: '',
          material: 'chipboard',
          lighting: false,
          name: '',
          phone: '',
          message: '',
        })
        
        // Скрываем успех через 5 секунд
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        console.warn('Не удалось отправить заявку в Telegram')
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof RequestForm, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    
    // Очищаем ошибку при вводе
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="calculator" className="section-padding section-calculator">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
            Рассчитать стоимость
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white">
            Заполните форму и мы свяжемся с вами для обсуждения деталей
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Форма */}
          <div className="card-gradient rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                  Тип мебели
                </label>
                <select
                  value={form.furnitureType}
                  onChange={(e) => handleInputChange('furnitureType', e.target.value)}
                  className="w-full bg-[#37465B] border border-[#4F8EDC]/30 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-[#4F8EDC] focus:ring-2 focus:ring-[#4F8EDC]/20 transition-all duration-200 text-sm"
                  aria-label="Выберите тип мебели"
                >
                  {furnitureTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Подтип для кухни */}
              {form.furnitureType === 'kitchen' && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                    Конфигурация кухни
                  </label>
                  <select
                    value={form.furnitureSubtype}
                    onChange={(e) => handleInputChange('furnitureSubtype', e.target.value)}
                    className="w-full bg-[#37465B] border border-[#4F8EDC]/30 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-[#4F8EDC] focus:ring-2 focus:ring-[#4F8EDC]/20 transition-all duration-200 text-sm"
                    aria-label="Выберите конфигурацию кухни"
                  >
                    {kitchenSubtypes.map(subtype => (
                      <option key={subtype.value} value={subtype.value}>
                        {subtype.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {form.furnitureType !== 'chest' && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                    Площадь (м²) *
                  </label>
                  <input
                    type="number"
                    value={form.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    placeholder="Введите площадь"
                    className={`w-full bg-[#37465B] border text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-[#4F8EDC]/20 transition-all duration-200 text-sm ${
                      errors.area 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[#4F8EDC]/30 focus:border-[#4F8EDC]'
                    }`}
                    aria-label="Введите площадь помещения"
                    aria-describedby={errors.area ? 'area-error' : undefined}
                  />
                  {errors.area && (
                    <p id="area-error" className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.area}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                  Материал
                </label>
                <select
                  value={form.material}
                  onChange={(e) => handleInputChange('material', e.target.value)}
                  className="w-full bg-[#37465B] border border-[#4F8EDC]/30 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-[#4F8EDC] focus:ring-2 focus:ring-[#4F8EDC]/20 transition-all duration-200 text-sm"
                  aria-label="Выберите материал"
                >
                  {materials.map(material => (
                    <option key={material.value} value={material.value}>
                      {material.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="lighting"
                  checked={form.lighting}
                  onChange={(e) => handleInputChange('lighting', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500/20"
                  aria-label="Внутренняя подсветка"
                />
                <label htmlFor="lighting" className="text-xs sm:text-sm font-medium text-white">
                  Внутренняя подсветка
                </label>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                  Комментарий (необязательно)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Дополнительная информация, пожелания..."
                  rows={3}
                  className="w-full bg-[#37465B] border border-[#4F8EDC]/30 text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-[#4F8EDC] focus:ring-2 focus:ring-[#4F8EDC]/20 transition-all duration-200 text-sm resize-none"
                  aria-label="Дополнительная информация"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Имя"
                    className={`w-full bg-white border text-gray-900 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    aria-label="Введите ваше имя"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className={`w-full bg-white border text-gray-900 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    aria-label="Введите номер телефона"
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full btn-neon disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm py-2 sm:py-3"
                disabled={isSubmitting}
                aria-label="Отправить заявку"
              >
                {isSubmitting ? 'ОТПРАВЛЯЕМ...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
              </button>
            </form>
          </div>

          {/* Преимущества */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gradient mb-4 sm:mb-6">
              Наши преимущества
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {advantages.map((advantage, index) => {
                const IconComponent = advantage.icon
                return (
                  <div key={index} className="card-gradient rounded-xl p-3 sm:p-4">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4F8EDC]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent size={18} className="sm:w-5 sm:h-5 text-[#4F8EDC]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base font-semibold text-white mb-1">
                          {advantage.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-white/80">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="card-gradient rounded-xl p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl font-bold text-gradient mb-3 sm:mb-4">
                Как мы работаем
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 bg-[#4F8EDC] rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <span className="text-xs sm:text-sm text-white">Вы оставляете заявку</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 bg-[#4F8EDC] rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <span className="text-xs sm:text-sm text-white">Мы связываемся с вами</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 bg-[#4F8EDC] rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <span className="text-xs sm:text-sm text-white">Проводим бесплатный замер</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 bg-[#4F8EDC] rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                  <span className="text-xs sm:text-sm text-white">Изготавливаем и устанавливаем</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 