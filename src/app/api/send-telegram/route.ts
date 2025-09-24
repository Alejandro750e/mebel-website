// pages/api/send-telegram.ts
import type { NextApiRequest, NextApiResponse } from 'next'

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { data } = req.body as { data: TelegramMessage }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('Missing Telegram env vars')
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  try {
    const message = formatTelegramMessage(data)
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Telegram API error:', err)
      return res.status(500).json({ error: 'Failed to send message' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error in send-telegram API:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}