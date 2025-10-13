'use client'
import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import WorkItem from './WorkItem'
import { WorkItem as WorkItemType, BeforeAfterProject, ImageIndex } from './types'
import { useMediaQuery } from 'react-responsive'
import ImageWithFallback from './ImageWithFallback';

// Данные проектов и описаний остаются без изменений
const beforeAfterProjects: BeforeAfterProject[] = [
  {
    name: "Проект A",
    type: "Кухня",
    before: "/Do.Posle/A1.jpg",
    after: "/Do.Posle/A2.jpg"
  },
  {
    name: "Проект B",
    type: "Шкаф-купе",
    before: "/Do.Posle/B1.jpg",
    after: "/Do.Posle/B2.jpg",
    additional: "/Do.Posle/B3.jpg"
  },
  {
    name: "Проект C",
    type: "Прихожая",
    before: "/Do.Posle/C1.jpg",
    after: "/Do.Posle/C2.jpg"
  },
  {
    name: "Проект D",
    type: "TV-зона",
    before: "/Do.Posle/D1.jpg",
    after: "/Do.Posle/D2.jpg"
  },
  {
    name: "Проект E",
    type: "Гардеробная",
    before: "/Do.Posle/E1.jpg",
    after: "/Do.Posle/E2.jpg"
  },
  {
    name: "Проект G",
    type: "Кухня",
    before: "/Do.Posle/G1.jpg",
    after: "/Do.Posle/G2.jpg"
  },
  {
    name: "Проект H",
    type: "Шкаф",
    before: "/Do.Posle/H1.jpg",
    after: "/Do.Posle/H2.jpg"
  },
  {
    name: "Проект R",
    type: "Прихожая",
    before: "/Do.Posle/R1.jpg",
    after: "/Do.Posle/R2.jpg"
  }
]

const kitchenDetails = [
  {
    id: 1,
    name: "Кухня №1",
    facades: "МДФ в плёнке цвет белый (верх), капучино (низ)",
    countertop: "влагостойкое ЛДСП цвет Дуб Вотан 38мм",
    hardware: "петли gtv с доводчиком",
    guides: "Направляющие unihopper с доводчиком",
    body: "ЛДСП цвет белый",
    price: "155 000 ₽"
  },
  {
    id: 2,
    name: "Кухня №2",
    facades: "МДФ в плёнке цвет бежевый",
    countertop: "влагостойкое ЛДСП цвет Кастило темный 38мм",
    hardware: "петли gtv с доводчиком",
    guides: "Направляющие unihopper скрытого монтажа с доводчиком",
    body: "ЛДСП цвет белый",
    price: "210 000 ₽"
  },
  {
    id: 3,
    name: "Кухня №3",
    facades: "МДФ в плёнке цвет Белый Софт",
    countertop: "влагостойкое ЛДСП цвет Черный Мрамор 38мм",
    hardware: "петли gtv без пружин, открывание от нажатия",
    guides: "Направляющие unihopper скрытого монтажа с доводчиком",
    body: "ЛДСП цвет белый",
    price: "155 000 ₽"
  },
  {
    id: 4,
    name: "Кухня №4",
    facades: "МДФ в плёнке цвет светлое дерево",
    countertop: "влагостойкое ЛДСП цвет Дуб Вотан 38мм",
    hardware: "петли gtv без пружины, открывание от нажатия",
    guides: "Направляющие unihopper push to open",
    body: "ЛДСП цвет белый",
    price: "120 000 ₽"
  },
  {
    id: 5,
    name: "Кухня №5",
    facades: "ЛДСП 16мм цвет Клауд",
    countertop: "влагостойкое ЛДСП цвет дуб сонома 38мм",
    hardware: "петли gtv без пружины, открывание от нажатия",
    guides: "Направляющие unihopper с доводчиком",
    body: "ЛДСП цвет Клауд",
    price: "62 000 ₽"
  },
  {
    id: 6,
    name: "Кухня №6",
    facades: "МДФ в плёнке цвет крем софт (верх), прованс (низ)",
    countertop: "влагостойкое ЛДСП цвет дуб экспрессив 38мм",
    hardware: "петли gtv с доводчиком",
    guides: "Направляющие unihopper с доводчиком",
    body: "ЛДСП цвет белый",
    price: "150 000 ₽"
  },
  {
    id: 7,
    name: "Кухня №7",
    facades: "МДФ в плёнке цвет Бархат Галиотис",
    countertop: "влагостойкое ЛДСП цвет Мрамор Соломанка 38мм",
    hardware: "петли gtv с доводчиком",
    guides: "Направляющие unihopper с доводчиком",
    body: "ЛДСП цвет светло серый",
    price: "110 000 ₽"
  },
  {
    id: 8,
    name: "Кухня №8",
    facades: "МДФ в плёнке цвет Грин Софт",
    countertop: "влагостойкое ЛДСП цвет Дуб Канадский 38мм",
    hardware: "петли gtv с доводчиком",
    guides: "Направляющие gtv с доводчиком",
    body: "ЛДСП цвет белый",
    price: "172 000 ₽"
  },
  {
    id: 9,
    name: "Кухня №9",
    facades: "МДФ в плёнке цвет белый софт (верх), океан софт (низ)",
    countertop: "влагостойкое ЛДСП цвет Мрамор 38мм",
    hardware: "петли gtv без пружин, открывание от нажатия",
    guides: "Направляющие GTV push to open",
    body: "ЛДСП цвет белый",
    price: "70 000 ₽"
  }
]

const wardrobeDetails = [
  {
    id: 1,
    name: "Шкаф-купе №1",
    body: "Лдсп Lamarty 16 мм декор Каньон песчаный",
    doors: "Premial система Classic",
    filling: "Лдсп Каньон песчаный",
    hardware: "Шариковые направляющие Gtv с доводчиком",
    price: "140 000 ₽"
  },
  {
    id: 2,
    name: "Шкаф-купе №2",
    body: "ЛДСП Тэффи",
    doors: "Premial система Classic",
    hardware: "Направляющие unihopper скрытого монтажа",
    price: "210 000 ₽"
  },
  {
    id: 3,
    name: "Шкаф-купе №3",
    body: "Лдсп Lamarty 16 мм декор Каньон песчаный",
    doors: "Premial система Classic",
    filling: "Лдсп Каньон песчаный",
    hardware: "Шариковые направляющие Gtv с доводчиком",
    price: "140 000 ₽"
  },
  {
    id: 4,
    name: "Шкаф-купе №4",
    doors: "Premial Узкорамочная система Elephant, профиль-ручка Fish",
    filling: "Зеркало серебро",
    price: "46 000 ₽"
  }
]

const shelfDetails = [
  {
    id: 1,
    name: "Шкаф №1",
    body: "Лдсп Lamarty 16 мм декор тэффи, айконик",
    facades: "Лдсп Lamarty 16 мм декор Тэффи. Открывание торцевые ручки, Push to Open.",
    hardware: "Петли Gtv с доводчиком, шариковые направляющие Gtv с доводчиком",
    countertop: "Столешница 32 мм",
    price: "130 000 ₽"
  },
  {
    id: 2,
    name: "Шкаф №2",
    body: "Лдсп Lamarty 16 мм декор Бохо",
    facades: "Лдсп Lamarty 16 мм декор Белый Шагрень. Открывание накладные ручки клиента. Push to Open.",
    hardware: "Петли Gtv с доводчиком, шариковые направляющие Gtv с доводчиком, кабель канал Gtv. Вентиляционная решетка Gtv.",
    additional: "Выдвижная вешалка для одежды",
    price: "94 000 ₽"
  },
  {
    id: 3,
    name: "Шкаф №3",
    body: "Лдсп Lamarty 16 мм декор Аллюминий",
    facades: "Лдсп Lamarty 16 мм декор Аллюминий. Открывание Push to Open.",
    hardware: "Петли Gtv с доводчиком",
    price: "31 000 ₽"
  },
  {
    id: 4,
    name: "Шкаф №4",
    description: "Описание в процессе разработки",
    price: "Узнать стоимость"
  },
  {
    id: 5,
    name: "Шкаф №5",
    description: "Описание в процессе разработки",
    price: "Узнать стоимость"
  },
  {
    id: 6,
    name: "Шкаф №6",
    description: "Описание в процессе разработки",
    price: "Узнать стоимость"
  }
]

const entranceDetails = [
  {
    id: 1,
    name: "Прихожая №1",
    body: "Лдсп Lamarty 16 мм декор серый, Бамбук",
    facades: "Лдсп Lamarty 16 мм декор серый",
    hardware: "Шариковые направляющие Gtv с доводчиком, Петли Gtv с доводчиком",
    price: "140 000 ₽"
  },
  {
    id: 2,
    name: "Прихожая №2",
    body: "Лдсп 16 мм декор песчаный каньон",
    facades: "Лдсп 16 мм",
    hardware: "Петли Gtv с доводчиком",
    price: "22 000 ₽"
  }
]

const tvZoneDetails = [
  {
    id: 1,
    name: "TV и ПК зона №1",
    body: "Лдсп Lamarty 16 мм декор Венге",
    facades: "Лдсп Lamarty 16 мм декор Белый кристалл",
    hardware: "Петли Gtv с доводчиком, шариковые направляющие Gtv с доводчиком",
    price: "65 000 ₽"
  },
  {
    id: 2,
    name: "TV и ПК зона №2",
    body: "Лдсп Lamarty 16 мм декор Венге",
    facades: "Лдсп Lamarty 16 мм декор Каньон Песчаный",
    hardware: "Шариковые направляющие Gtv с доводчиком, Петли Gtv с доводчиком",
    price: "47 000 ₽"
  },
  {
    id: 3,
    name: "TV и ПК зона №3",
    body: "Лдсп Lamarty 16 мм декор Эра",
    facades: "Лдсп Lamarty 16 мм декор Бетон. Открывание накладные ручки Боярд.",
    hardware: "Петли Gtv с доводчиком, шариковые направляющие Gtv с доводчиком, кабель канал Gtv",
    countertop: "Столешница 32мм",
    price: "89 000 ₽"
  },
  {
    id: 4,
    name: "TV и ПК зона №4",
    body: "Лдсп Lamarty 16 мм декор Белый Кристалл",
    facades: "Лдсп Lamarty 16 мм декор Ирис . Открывание торцевые ручки Боярд.",
    hardware: "Петли Gtv с доводчиком, шариковые направляющие Gtv с доводчиком",
    additional: "Трапециевидная металл. опора в стиле Лофт",
    countertop: "Столешница 32мм",
    price: "52 000 ₽"
  },
  {
    id: 5,
    name: "TV и ПК зона №5",
    body: "Лдсп Lamarty 16 мм декор Айконик, Серый",
    facades: "Лдсп Lamarty 16 мм декор Серый. Открывание торцевые ручки Боярд. Push to Open.",
    hardware: "Петли Gtv с доводчиком, шариковые направляющие Gtv с доводчиком, кабель канал Gtv",
    countertop: "Столешница 32мм",
    price: "58 000 ₽"
  },
  {
    id: 6,
    name: "TV и ПК зона №6",
    body: "Лдсп Lamarty 16 мм декор Айконик, Клауд",
    facades: "Лдсп Lamarty 16 мм декор Клауд. Открывание Push to Open.",
    hardware: "Петли Gtv без пружины, вентиляционная решетка Gtv",
    countertop: "Столешница 32мм",
    price: "52 000 ₽"
  },
  {
    id: 7,
    name: "TV и ПК зона №7",
    body: "Лдсп Lamarty 16 мм декор Крафт",
    facades: "Лдсп Lamarty 16 мм декор Фантом. Торцевые ручки клиента.",
    hardware: "Петли Gtv с доводчиком, шариковые направляющие Gtv с доводчиком",
    countertop: "Столешница 32мм",
    price: "82 000 ₽"
  }
]

const works: WorkItemType[] = [
  {
    id: 1,
    title: "Современные кухни",
    category: "Кухни",
    description: "Современная кухня с эргономичным дизайном",
    images: [
      "/kithen/A1.jpg", "/kithen/A2.jpg", "/kithen/A3.jpg",
      "/kithen/B1.jpg", "/kithen/B2.jpg",
      "/kithen/С1.jpg", "/kithen/С2.jpg",
      "/kithen/D1.jpg", "/kithen/D2.jpg",
      "/kithen/E1.jpg", "/kithen/E2.jpg",
      "/kithen/F1.jpg", "/kithen/F2.jpg",
      "/kithen/G1.jpg", "/kithen/G2.jpg",
      "/kithen/R.jpg", "/kithen/W.jpg"
    ]
  },
  {
    id: 2,
    title: "Шкафы",
    category: "Шкафы",
    description: "Функциональный шкаф с качественной фурнитурой и удобной системой хранения.",
    images: [
      "/Shkaf/A1.jpg", "/Shkaf/A2.jpg", "/Shkaf/A3.jpg", "/Shkaf/A4.jpg",
      "/Shkaf/B1.jpg", "/Shkaf/B2.jpg", "/Shkaf/B3.jpg",
      "/Shkaf/C1.jpg", "/Shkaf/C2.jpg",
      "/Shkaf/D1.jpg", "/Shkaf/D2.jpg", "/Shkaf/D3.jpg",
      "/Shkaf/E1.jpg", "/Shkaf/E2.jpg", "/Shkaf/E3.jpg",
      "/Shkaf/F1.jpg", "/Shkaf/F2.jpg", "/Shkaf/F3.jpg"
    ]
  },
  {
    id: 3,
    title: "Шкафы-купе",
    category: "Шкафы",
    description: "Современный шкаф-купе с зеркальными дверями и внутренним освещением.",
    images: [
      "/Shkaf Cupe/A1.jpg", "/Shkaf Cupe/A2.jpg", "/Shkaf Cupe/A3.jpg",
      "/Shkaf Cupe/B1.jpg", "/Shkaf Cupe/B2.jpg",
      "/Shkaf Cupe/C.jpg", "/Shkaf Cupe/D.jpg"
    ]
  },
  {
    id: 4,
    title: "TV и ПК зоны",
    category: "TV-зоны",
    description: "Современная TV и ПК зона с функциональной мебелью и стильным дизайном.",
    images: [
      "/TV-zona/A1.jpg", "/TV-zona/A2.jpg",
      "/TV-zona/B1.jpg", "/TV-zona/B2.jpg",
      "/TV-zona/C1.jpg", "/TV-zona/C2.jpg",
      "/TV-zona/D1.jpg",
      "/TV-zona/E1.jpg",
      "/TV-zona/F1.jpg",
      "/TV-zona/G1.jpg", "/TV-zona/G2.jpg"
    ]
  },
  {
    id: 5,
    title: "Прихожие",
    category: "Прихожие",
    description: "Прихожая с зеркалом и местом для обуви.",
    images: [
      "/Prihozay/A1.jpg", "/Prihozay/A2.jpg", "/Prihozay/A3.jpg",
      "/Prihozay/B1.jpg"
    ]
  },
  {
    id: 6,
    title: "До/После",
    category: "До/После",
    description: "Преображение интерьера: примеры наших работ до и после установки.",
    images: [
      "/Do.Posle/A1.jpg", "/Do.Posle/A2.jpg",
      "/Do.Posle/B1.jpg", "/Do.Posle/B2.jpg", "/Do.Posle/B3.jpg",
      "/Do.Posle/C1.jpg", "/Do.Posle/C2.jpg",
      "/Do.Posle/D1.jpg", "/Do.Posle/D2.jpg",
      "/Do.Posle/E1.jpg", "/Do.Posle/E2.jpg",
      "/Do.Posle/G1.jpg", "/Do.Posle/G2.jpg",
      "/Do.Posle/H1.jpg", "/Do.Posle/H2.jpg",
      "/Do.Posle/R1.jpg", "/Do.Posle/R2.jpg"
    ]
  }
]

const categories = ["Все", "Кухни", "Шкафы", "Прихожая", "TV-зоны", "До/После"]

export default function Catalog() {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [selectedWork, setSelectedWork] = useState<WorkItemType | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [quickOrderKitchen, setQuickOrderKitchen] = useState<any>(null)
  const [quickOrderPhone, setQuickOrderPhone] = useState("")
  const [isSubmittingQuickOrder, setIsSubmittingQuickOrder] = useState(false)
  const [showQuickOrderSuccess, setShowQuickOrderSuccess] = useState(false)

  const getImageLabel = (work: WorkItemType, imageIndex: number) => {
    if (work.category === "До/После") {
      const imagePath = work.images[imageIndex]
      const fileName = imagePath.split('/').pop()?.split('.')[0] || ''
      if (fileName.endsWith('1')) return "ДО"
      else if (fileName.endsWith('2') || fileName.endsWith('3')) return "ПОСЛЕ"
    }
    return null
  }

  const filteredWorks = selectedCategory === "Все"
    ? works
    : works.filter(work => {
      if (selectedCategory === "Прихожая") return work.category === "Прихожие"
      if (selectedCategory === "TV-зоны") return work.category === "TV-зоны"
      if (selectedCategory === "До/После") return work.category === "До/После"
      return work.category === selectedCategory
    })

  const nextImage = useCallback(() => {
    if (selectedWork) {
      setCurrentImageIndex(prev =>
        prev === selectedWork.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [selectedWork])

  const prevImage = useCallback(() => {
    if (selectedWork) {
      setCurrentImageIndex(prev =>
        prev === 0 ? selectedWork.images.length - 1 : prev - 1
      )
    }
  }, [selectedWork])

  const openModal = useCallback((work: WorkItemType) => {
    setSelectedWork(work)
    setCurrentImageIndex(0)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedWork(null)
    setCurrentImageIndex(0)
    setZoomedImage(null)
  }, [])

  const handleModalKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
    else if (e.key === 'ArrowLeft') prevImage()
    else if (e.key === 'ArrowRight') nextImage()
  }, [closeModal, prevImage, nextImage])

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl)
  }

  const closeZoomedImage = () => {
    setZoomedImage(null)
  }

  const openQuickOrderModal = (item: any) => {
    setQuickOrderKitchen(item)
    setQuickOrderPhone("")
    setShowQuickOrderSuccess(false)
  }

  const closeQuickOrderModal = () => {
    setQuickOrderKitchen(null)
    setQuickOrderPhone("")
    setShowQuickOrderSuccess(false)
  }

  const handleQuickOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickOrderPhone.trim()) {
      return
    }

    setIsSubmittingQuickOrder(true)

    try {
      let message = `Быстрый заказ: ${quickOrderKitchen.name}\n`
      if (quickOrderKitchen.price && quickOrderKitchen.price !== "Узнать стоимость") {
        message += `Цена: ${quickOrderKitchen.price}\n`
      }
      if (quickOrderKitchen.facades) {
        message += `Фасады: ${quickOrderKitchen.facades}\n`
        message += `Столешница: ${quickOrderKitchen.countertop || "не указана"}\n`
        message += `Фурнитура: ${quickOrderKitchen.hardware}\n`
        if (quickOrderKitchen.additional) {
          message += `Дополнительно: ${quickOrderKitchen.additional}\n`
        }
        message += `Корпус: ${quickOrderKitchen.body}\n`
      }

      const telegramData = {
        name: "Быстрый заказ",
        phone: quickOrderPhone,
        furnitureType: "Шкаф",
        furnitureSubtype: quickOrderKitchen.name,
        area: undefined,
        material: quickOrderKitchen.facades || "По запросу",
        lighting: false,
        message: message,
        type: 'calculator' as const
      }

      // 🔒 Безопасная отправка через API-роут
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telegramData),
      })

      if (response.ok) {
        console.log('Быстрый заказ успешно отправлен в Telegram')
        setShowQuickOrderSuccess(true)
        setTimeout(() => {
          setShowQuickOrderSuccess(false)
          closeQuickOrderModal()
        }, 3000)
      } else {
        console.warn('Не удалось отправить быстрый заказ в Telegram')
        alert('Ошибка отправки. Попробуйте позже.')
      }
    } catch (error) {
      console.error('Ошибка при отправке быстрого заказа:', error)
      alert('Произошла ошибка. Проверьте соединение.')
    } finally {
      setIsSubmittingQuickOrder(false)
    }
  }

  return (
    <section id="catalog" className="section-padding section-catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-5">
            Наши работы
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto">
            Посмотрите примеры наших работ и вдохновитесь идеями для вашего дома
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 text-xs sm:text-sm ${selectedCategory === category
                ? 'bg-gradient-to-r from-[#4F8EDC] to-[#AEB6BF] text-white shadow-lg'
                : 'bg-[#37465B]/80 text-white hover:bg-[#4F8EDC]/20 border border-[#4F8EDC]/30 shadow-md'
                }`}
              aria-label={`Показать работы в категории ${category}`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {filteredWorks.map((work) => (
            <WorkItem key={work.id} work={work} onOpen={openModal} />
          ))}
        </div>

        {/* Основное модальное окно */}
        {selectedWork && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onKeyDown={handleModalKeyDown}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
            <div className={`relative card-gradient rounded-xl ${isMobile ? 'w-full h-full' : 'max-w-6xl w-full max-h-[95vh]'} overflow-y-auto shadow-2xl`}>
              <div className="p-3 sm:p-4">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-[#4F8EDC] transition-colors hover:scale-110 transform p-2"
                    aria-label="Закрыть модальное окно"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 ${isMobile ? 'h-auto' : 'h-[70vh]'}`}>
                  <div className={`relative ${isMobile ? 'w-full h-64' : 'flex-1'} bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 overflow-hidden`}>
                    {selectedWork.images.length > 0 ? (
                      <>
                        <div
                          className="w-full h-full flex items-center justify-center cursor-pointer relative"
                          onClick={() => openZoomedImage(selectedWork.images[currentImageIndex])}
                        >
                          <ImageWithFallback
                            src={selectedWork.images[currentImageIndex]}
                            alt={`${selectedWork.title} - фото ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white p-1 rounded-full">
                            <ZoomIn size={20} />
                          </div>
                        </div>
                        {getImageLabel(selectedWork, currentImageIndex) && (
                          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
                            <span className="font-bold text-sm sm:text-lg tracking-wider">
                              {getImageLabel(selectedWork, currentImageIndex)}
                            </span>
                          </div>
                        )}
                        {selectedWork.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                              }}
                              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
                              aria-label="Предыдущее фото"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                              }}
                              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
                              aria-label="Следующее фото"
                            >
                              <ChevronRight size={24} />
                            </button>
                            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
                              {selectedWork.images.map((_, index: ImageIndex) => (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
                                  }}
                                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                  aria-label={`Перейти к фото ${index + 1}`}
                                  aria-current={index === currentImageIndex ? 'true' : 'false'}
                                />
                              ))}
                            </div>
                            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                              {currentImageIndex + 1} / {selectedWork.images.length}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-4xl sm:text-6xl mb-4 animate-float">🏠</div>
                          <p className="text-sm sm:text-lg">Фото работы</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* БЛОК ОПИСАНИЙ И КНОПОК */}
                  {(selectedWork.title === "Современные кухни" ||
                    selectedWork.title === "Шкафы" ||
                    selectedWork.title === "Шкафы-купе" ||
                    selectedWork.title === "TV и ПК зоны" ||
                    selectedWork.title === "Прихожие") && (
                      <div className={`${isMobile ? 'w-full' : 'w-96'} bg-gradient-to-br from-[#212B38] to-[#37465B] rounded-xl border border-[#4F8EDC]/20 p-4 sm:p-5 text-white flex flex-col`}>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#4F8EDC]">
                            {(() => {
                              if (selectedWork.title === "Современные кухни") {
                                if (currentImageIndex < 3) return "Кухня №1"
                                else if (currentImageIndex < 5) return "Кухня №2"
                                else if (currentImageIndex < 7) return "Кухня №3"
                                else if (currentImageIndex < 9) return "Кухня №4"
                                else if (currentImageIndex < 11) return "Кухня №5"
                                else if (currentImageIndex < 13) return "Кухня №6"
                                else if (currentImageIndex < 15) return "Кухня №7"
                                else if (currentImageIndex < 16) return "Кухня №8"
                                else if (currentImageIndex < 17) return "Кухня №9"
                                else return "Кухня"
                              } else if (selectedWork.title === "Шкафы") {
                                if (currentImageIndex < 4) return "Шкаф №1"
                                else if (currentImageIndex < 7) return "Шкаф №2"
                                else if (currentImageIndex < 9) return "Шкаф №3"
                                else if (currentImageIndex < 12) return "Шкаф №4"
                                else if (currentImageIndex < 15) return "Шкаф №5"
                                else if (currentImageIndex < 18) return "Шкаф №6"
                                else return "Шкаф"
                              } else if (selectedWork.title === "Шкафы-купе") {
                                if (currentImageIndex < 3) return "Шкаф-купе №1"
                                else if (currentImageIndex < 5) return "Шкаф-купе №2"
                                else if (currentImageIndex < 6) return "Шкаф-купе №3"
                                else if (currentImageIndex < 7) return "Шкаф-купе №4"
                                else return "Шкаф-купе"
                              } else if (selectedWork.title === "TV и ПК зоны") {
                                if (currentImageIndex < 2) return "TV и ПК зона №1"
                                else if (currentImageIndex < 4) return "TV и ПК зона №2"
                                else if (currentImageIndex < 6) return "TV и ПК зона №3"
                                else if (currentImageIndex < 7) return "TV и ПК зона №4"
                                else if (currentImageIndex < 8) return "TV и ПК зона №5"
                                else if (currentImageIndex < 9) return "TV и ПК зона №6"
                                else if (currentImageIndex < 11) return "TV и ПК зона №7"
                                else return "TV и ПК зона"
                              } else if (selectedWork.title === "Прихожие") {
                                if (currentImageIndex < 3) return "Прихожая №1"
                                else if (currentImageIndex < 4) return "Прихожая №2"
                                else return "Прихожая"
                              }
                            })()}
                          </h3>
                          <div className="space-y-2 sm:space-y-2.5">
                            {selectedWork.title === "Современные кухни" ? (
                              (() => {
                                let kitchenIndex = 0;
                                if (currentImageIndex < 3) kitchenIndex = 0;
                                else if (currentImageIndex < 5) kitchenIndex = 1;
                                else if (currentImageIndex < 7) kitchenIndex = 2;
                                else if (currentImageIndex < 9) kitchenIndex = 3;
                                else if (currentImageIndex < 11) kitchenIndex = 4;
                                else if (currentImageIndex < 13) kitchenIndex = 5;
                                else if (currentImageIndex < 15) kitchenIndex = 6;
                                else if (currentImageIndex < 16) kitchenIndex = 7;
                                else if (currentImageIndex < 17) kitchenIndex = 8;
                                else kitchenIndex = 0;
                                const kitchen = kitchenDetails[kitchenIndex];
                                return (
                                  <>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фасады:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{kitchen.facades}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Столешница:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{kitchen.countertop}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фурнитура:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{kitchen.hardware}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Направляющие:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{kitchen.guides}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Корпус:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{kitchen.body}</span>
                                    </div>
                                  </>
                                );
                              })()
                            ) : selectedWork.title === "Шкафы-купе" ? (
                              (() => {
                                let wardrobeIndex = 0;
                                if (currentImageIndex < 3) wardrobeIndex = 0;
                                else if (currentImageIndex < 5) wardrobeIndex = 1;
                                else if (currentImageIndex < 6) wardrobeIndex = 2;
                                else if (currentImageIndex < 7) wardrobeIndex = 3;
                                else wardrobeIndex = 0;
                                const wardrobe = wardrobeDetails[wardrobeIndex];
                                return (
                                  <>
                                    {wardrobeIndex !== 3 && (
                                      <div className="flex flex-col space-y-0.5">
                                        <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Корпус:</span>
                                        <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{wardrobe.body}</span>
                                      </div>
                                    )}
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Двери-Купе:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{wardrobe.doors}</span>
                                    </div>
                                    {wardrobe.filling && (
                                      <div className="flex flex-col space-y-0.5">
                                        <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Наполнение:</span>
                                        <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{wardrobe.filling}</span>
                                      </div>
                                    )}
                                    {wardrobeIndex !== 3 && (
                                      <div className="flex flex-col space-y-0.5">
                                        <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фурнитура:</span>
                                        <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{wardrobe.hardware}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })()
                            ) : selectedWork.title === "TV и ПК зоны" ? (
                              (() => {
                                let tvIndex = 0;
                                if (currentImageIndex < 2) tvIndex = 0;
                                else if (currentImageIndex < 4) tvIndex = 1;
                                else if (currentImageIndex < 6) tvIndex = 2;
                                else if (currentImageIndex < 7) tvIndex = 3;
                                else if (currentImageIndex < 8) tvIndex = 4;
                                else if (currentImageIndex < 9) tvIndex = 5;
                                else if (currentImageIndex < 11) tvIndex = 6;
                                else tvIndex = 0;
                                const tv = tvZoneDetails[tvIndex];
                                return (
                                  <>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Корпус:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{tv.body}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фасады:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{tv.facades}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фурнитура:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{tv.hardware}</span>
                                    </div>
                                    {tv.countertop && (
                                      <div className="flex flex-col space-y-0.5">
                                        <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Столешница:</span>
                                        <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{tv.countertop}</span>
                                      </div>
                                    )}
                                    {tv.additional && (
                                      <div className="flex flex-col space-y-0.5">
                                        <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Дополнительно:</span>
                                        <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{tv.additional}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })()
                            ) : selectedWork.title === "Шкафы" ? (
                              (() => {
                                let shelfIndex = 0;
                                if (currentImageIndex < 4) shelfIndex = 0;
                                else if (currentImageIndex < 7) shelfIndex = 1;
                                else if (currentImageIndex < 9) shelfIndex = 2;
                                else if (currentImageIndex < 12) shelfIndex = 3;
                                else if (currentImageIndex < 15) shelfIndex = 4;
                                else if (currentImageIndex < 18) shelfIndex = 5;
                                else shelfIndex = 0;
                                const shelf = shelfDetails[shelfIndex];
                                if (shelf.description) {
                                  return (
                                    <div className="text-center text-sm text-[#AEB6BF] mt-4 italic">
                                      {shelf.description}
                                    </div>
                                  );
                                }
                                return (
                                  <>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Корпус:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{shelf.body}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фасады:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{shelf.facades}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фурнитура:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{shelf.hardware}</span>
                                    </div>
                                    {shelf.countertop && (
                                      <div className="flex flex-col space-y-0.5">
                                        <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Столешница:</span>
                                        <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{shelf.countertop}</span>
                                      </div>
                                    )}
                                    {shelf.additional && (
                                      <div className="flex flex-col space-y-0.5">
                                        <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Дополнительно:</span>
                                        <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{shelf.additional}</span>
                                      </div>
                                    )}
                                  </>
                                );
                              })()
                            ) : selectedWork.title === "Прихожие" ? (
                              (() => {
                                let entranceIndex = 0;
                                if (currentImageIndex < 3) entranceIndex = 0;
                                else if (currentImageIndex < 4) entranceIndex = 1;
                                else entranceIndex = 0;
                                const entrance = entranceDetails[entranceIndex];
                                return (
                                  <>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фасады:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{entrance.facades}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Фурнитура:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{entrance.hardware}</span>
                                    </div>
                                    <div className="flex flex-col space-y-0.5">
                                      <span className="text-xs sm:text-sm font-semibold text-[#4F8EDC]">Корпус:</span>
                                      <span className="text-xs sm:text-sm text-[#AEB6BF] leading-relaxed">{entrance.body}</span>
                                    </div>
                                  </>
                                );
                              })()
                            ) : (
                              <div className="text-center text-sm text-[#AEB6BF] mt-4">
                                Описание доступно для каждого проекта — выберите фото.
                              </div>
                            )}
                          </div>
                        </div>

                      {/* КНОПКА БЫСТРОГО ЗАКАЗА */}
                      <div className="mt-4">
                        {selectedWork.title === "Современные кухни" ? (
                          (() => {
                            let kitchenIndex = 0;
                            if (currentImageIndex < 3) kitchenIndex = 0;
                            else if (currentImageIndex < 5) kitchenIndex = 1;
                            else if (currentImageIndex < 7) kitchenIndex = 2;
                            else if (currentImageIndex < 9) kitchenIndex = 3;
                            else if (currentImageIndex < 11) kitchenIndex = 4;
                            else if (currentImageIndex < 13) kitchenIndex = 5;
                            else if (currentImageIndex < 15) kitchenIndex = 6;
                            else if (currentImageIndex < 16) kitchenIndex = 7;
                            else if (currentImageIndex < 17) kitchenIndex = 8;
                            else kitchenIndex = 0;
                            const kitchen = kitchenDetails[kitchenIndex];
                            return (
                              <button
                                onClick={() => openQuickOrderModal(kitchen)}
                                className="w-full bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] hover:from-[#3B7BC7] hover:to-[#07B59A] text-white px-4 py-3 rounded-lg shadow-lg text-center font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform relative"
                              >
                                <div className="flex flex-col items-center">
                                  <span>{kitchen.price || "Цена по запросу"}</span>
                                </div>
                                {kitchen.price && kitchen.price !== "Цена по запросу" && (
                                  <span className="absolute bottom-1 right-2 text-[7px] text-white italic opacity-70">*цена может отличаться</span>
                                )}
                              </button>
                            );
                          })()
                        ) : selectedWork.title === "Шкафы" ? (
                          (() => {
                            let shelfIndex = 0;
                            if (currentImageIndex < 4) shelfIndex = 0;
                            else if (currentImageIndex < 7) shelfIndex = 1;
                            else if (currentImageIndex < 9) shelfIndex = 2;
                            else if (currentImageIndex < 12) shelfIndex = 3;
                            else if (currentImageIndex < 15) shelfIndex = 4;
                            else if (currentImageIndex < 18) shelfIndex = 5;
                            else shelfIndex = 0;
                            const shelf = shelfDetails[shelfIndex];
                            return (
                              <button
                                onClick={() => openQuickOrderModal(shelf)}
                                className="w-full bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] hover:from-[#3B7BC7] hover:to-[#07B59A] text-white px-4 py-3 rounded-lg shadow-lg text-center font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform relative"
                              >
                                <div className="flex flex-col items-center">
                                  <span>{shelf.price}</span>
                                </div>
                                {shelf.price && shelf.price !== "Узнать стоимость" && (
                                  <span className="absolute bottom-1 right-2 text-[7px] text-white italic opacity-70">*цена может отличаться</span>
                                )}
                              </button>
                            );
                          })()
                        ) : selectedWork.title === "Шкафы-купе" ? (
                          (() => {
                            let wardrobeIndex = 0;
                            if (currentImageIndex < 3) wardrobeIndex = 0;
                            else if (currentImageIndex < 5) wardrobeIndex = 1;
                            else if (currentImageIndex < 6) wardrobeIndex = 2;
                            else if (currentImageIndex < 7) wardrobeIndex = 3;
                            else wardrobeIndex = 0;
                            const wardrobe = wardrobeDetails[wardrobeIndex];
                            return (
                              <button
                                onClick={() => openQuickOrderModal(wardrobe)}
                                className="w-full bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] hover:from-[#3B7BC7] hover:to-[#07B59A] text-white px-4 py-3 rounded-lg shadow-lg text-center font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform relative"
                              >
                                <div className="flex flex-col items-center">
                                  <span>{wardrobe.price}</span>
                                </div>
                                {wardrobe.price && wardrobe.price !== "Узнать стоимость" && (
                                  <span className="absolute bottom-1 right-2 text-[7px] text-white italic opacity-70">*цена может отличаться</span>
                                )}
                              </button>
                            );
                          })()
                        ) : selectedWork.title === "TV и ПК зоны" ? (
                          (() => {
                            let tvIndex = 0;
                            if (currentImageIndex < 2) tvIndex = 0;
                            else if (currentImageIndex < 4) tvIndex = 1;
                            else if (currentImageIndex < 6) tvIndex = 2;
                            else if (currentImageIndex < 7) tvIndex = 3;
                            else if (currentImageIndex < 8) tvIndex = 4;
                            else if (currentImageIndex < 9) tvIndex = 5;
                            else if (currentImageIndex < 11) tvIndex = 6;
                            else tvIndex = 0;
                            const tv = tvZoneDetails[tvIndex];
                            return (
                              <button
                                onClick={() => openQuickOrderModal(tv)}
                                className="w-full bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] hover:from-[#3B7BC7] hover:to-[#07B59A] text-white px-4 py-3 rounded-lg shadow-lg text-center font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform relative"
                              >
                                <div className="flex flex-col items-center">
                                  <span>{tv.price}</span>
                                </div>
                                {tv.price && tv.price !== "Узнать стоимость" && (
                                  <span className="absolute bottom-1 right-2 text-[7px] text-white italic opacity-70">*цена может отличаться</span>
                                )}
                              </button>
                            );
                          })()
                        ) : selectedWork.title === "Прихожие" ? (
                          (() => {
                            let entranceIndex = 0;
                            if (currentImageIndex < 3) entranceIndex = 0;
                            else if (currentImageIndex < 4) entranceIndex = 1;
                            else entranceIndex = 0;
                            const entrance = entranceDetails[entranceIndex];
                            return (
                              <button
                                onClick={() => openQuickOrderModal(entrance)}
                                className="w-full bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] hover:from-[#3B7BC7] hover:to-[#07B59A] text-white px-4 py-3 rounded-lg shadow-lg text-center font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform relative"
                              >
                                <div className="flex flex-col items-center">
                                  <span>{entrance.price}</span>
                                </div>
                                {entrance.price && entrance.price !== "Узнать стоимость" && (
                                  <span className="absolute bottom-1 right-2 text-[7px] text-white italic opacity-70">*цена может отличаться</span>
                                )}
                              </button>
                            );
                          })()
                        ) : null}
                      </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно для увеличенного изображения */}
        {zoomedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeZoomedImage}
          >
            <div className="relative max-w-6xl max-h-[90vh]">
              <button
                onClick={closeZoomedImage}
                className="absolute -top-12 right-0 text-white hover:text-[#4F8EDC] transition-colors p-2"
                aria-label="Закрыть увеличенное изображение"
              >
                <X size={32} />
              </button>
              <ImageWithFallback
                src={zoomedImage}
                alt="Увеличенное изображение"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* Модальное окно быстрого заказа */}
        {quickOrderKitchen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-order-modal-title"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeQuickOrderModal}></div>
            <div className="relative bg-gradient-to-br from-[#212B38] to-[#37465B] rounded-xl border border-[#4F8EDC]/20 p-4 sm:p-6 text-white shadow-2xl max-w-md w-full">
              <div className="flex justify-end mb-4">
                <button
                  onClick={closeQuickOrderModal}
                  className="text-white hover:text-[#4F8EDC] transition-colors hover:scale-110 transform p-2"
                  aria-label="Закрыть модальное окно"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="text-center mb-6">
                <h3 id="quick-order-modal-title" className="text-xl sm:text-2xl font-bold text-[#4F8EDC] mb-2">
                  {quickOrderKitchen.name}
                </h3>
                <p className="text-lg font-semibold text-white mb-4">
                  {quickOrderKitchen.price}
                </p>
                <p className="text-sm text-[#AEB6BF]">
                  {quickOrderKitchen.price === "Узнать стоимость"
                    ? "Оставьте номер телефона — мы рассчитаем стоимость под ваш проект"
                    : "Оставьте номер телефона для уточнения размеров — цена может отличаться"}
                </p>
              </div>
              {showQuickOrderSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              )}
              <form onSubmit={handleQuickOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    value={quickOrderPhone}
                    onChange={(e) => setQuickOrderPhone(e.target.value)}
                    placeholder="+7 (999) 999-99-99"
                    className="w-full bg-[#37465B] border border-[#4F8EDC]/30 text-white rounded-lg px-4 py-3 focus:border-[#4F8EDC] focus:ring-2 focus:ring-[#4F8EDC]/20 transition-all duration-200 text-sm"
                    aria-label="Введите номер телефона"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] hover:from-[#3B7BC7] hover:to-[#07B59A] text-white px-4 py-3 rounded-lg shadow-lg text-center font-semibold text-sm transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmittingQuickOrder}
                  aria-label="Отправить заявку"
                >
                  {isSubmittingQuickOrder ? 'ОТПРАВЛЯЕМ...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}