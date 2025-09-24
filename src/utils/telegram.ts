interface TelegramMessage {
  name: string
  phone: string
  email?: string
  message?: string
  furnitureType?: string
  furnitureSubtype?: string
  area?: number
  material?: string
  doors?: number
  drawers?: number
  lighting?: boolean
  type: 'contact' | 'calculator'
}

export const sendTelegramMessage = async (data: TelegramMessage): Promise<boolean> => {
  try {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('Telegram bot token or chat ID not configured')
      return false
    }

    // Формируем сообщение
    const message = formatTelegramMessage(data)
    
    // Отправляем сообщение через Telegram Bot API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`)
    }

    const result = await response.json()
    return result.ok === true
  } catch (error) {
    console.error('Error sending Telegram message:', error)
    return false
  }
}

const formatTelegramMessage = (data: TelegramMessage): string => {
  const timestamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  let message = `🚨 <b>НОВАЯ ЗАЯВКА</b>\n\n`
  message += `📅 <b>Дата:</b> ${timestamp}\n`
  message += `👤 <b>Имя:</b> ${data.name}\n`
  message += `📞 <b>Телефон:</b> ${data.phone}\n`

  if (data.email) {
    message += `📧 <b>Email:</b> ${data.email}\n`
  }

  if (data.type === 'calculator') {
    message += `\n🧮 <b>РАСЧЕТ СТОИМОСТИ</b>\n`
    message += `📋 <b>Тип мебели:</b> ${data.furnitureType}\n`
    
    if (data.furnitureSubtype) {
      message += `🔧 <b>Конфигурация:</b> ${data.furnitureSubtype}\n`
    }
    
    message += `📏 <b>Площадь:</b> ${data.area} м²\n`
    message += `🪵 <b>Материал:</b> ${data.material}\n`
    
    if (data.lighting) {
      message += `💡 <b>Подсветка:</b> Да\n`
    }
    
    if (data.message) {
      message += `\n💬 <b>Комментарий:</b>\n${data.message}\n`
    }
  } else {
    message += `\n💬 <b>СООБЩЕНИЕ</b>\n`
    if (data.message) {
      message += `${data.message}\n`
    }
  }

  message += `\n🌐 <b>Источник:</b> Сайт mebelman.ru`
  
  return message
}

// Функция для проверки конфигурации Telegram
export const checkTelegramConfig = (): boolean => {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
  
  return !!(botToken && chatId)
} 