import { NextRequest, NextResponse } from 'next/server'

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
  message += ` <b>Дата:</b> ${timestamp}\n`
  message += ` <b>Имя:</b> ${data.name}\n`
  message += ` <b>Телефон:</b> ${data.phone}\n`

  if (data.email) {
    message += ` <b>Email:</b> ${data.email}\n`
  }

  if (data.type === 'calculator') {
    message += `\n🧮 <b>РАСЧЕТ СТОИМОСТИ</b>\n`
    message += ` <b>Тип мебели:</b> ${data.furnitureType}\n`
    if (data.furnitureSubtype) {
      message += ` <b>Конфигурация:</b> ${data.furnitureSubtype}\n`
    }
    if (data.area !== undefined) {
      message += ` <b>Площадь:</b> ${data.area} м²\n`
    }
    message += ` <b>Материал:</b> ${data.material}\n`
    if (data.lighting) {
      message += ` <b>Подсветка:</b> Да\n`
    }
    if (data.message) {
      message += `\n <b>Комментарий:</b>\n${data.message}\n`
    }
  } else {
    message += `\n <b>СООБЩЕНИЕ</b>\n`
    if (data.message) {
      message += `${data.message}\n`
    }
  }

  message += `\n🌐 <b>Источник:</b> Сайт`
  return message
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as TelegramMessage

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
    }

    const text = formatTelegramMessage(data)

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Telegram failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}