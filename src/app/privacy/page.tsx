// app/privacy/page.tsx
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212B38] via-[#37465B] to-[#212B38] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#37465B]/50 backdrop-blur-sm rounded-2xl border border-[#4F8EDC]/30 p-6 sm:p-8 shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Политика конфиденциальности
          </h1>

          <div className="prose prose-invert max-w-none space-y-5 text-white/90">
            <p>
              Настоящий сайт <strong>https://mebelman-nn.ru</strong> является личным портфолио и <strong>не связан с предпринимательской деятельностью</strong>. Автор сайта — физическое лицо, не зарегистрированное в качестве индивидуального предпринимателя.
            </p>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">Сбор персональных данных</h2>
            <p>
              Единственный способ передать данные — это добровольно оставить заявку через форму обратной связи. В этом случае вы можете указать:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>имя</strong> (обязательно для идентификации запроса);</li>
              <li><strong>номер телефона</strong> (обязательно для связи).</li>
            </ul>
            <p>
              Иные персональные данные (email и т.д.) <strong>не запрашиваются и не обрабатываются</strong>.
            </p>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">Цель обработки</h2>
            <p>
              Предоставленные данные используются <strong>исключительно для однократной связи</strong> с целью:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>ответа на ваш запрос,</li>
              <li>уточнения параметров проекта,</li>
              <li>передачи информации друзьям-производителям мебели.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">Хранение и передача данных</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Данные <strong>не хранятся</strong> на сервере сайта.</li>
              <li>Сообщения отправляются напрямую в <strong>Telegram</strong> и <strong>не сохраняются в базе данных</strong>.</li>
              <li>Персональные данные <strong>не передаются третьим лицам</strong>, кроме как производителям мебели — <strong>по вашему запросу</strong>.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">Согласие</h2>
            <p>
              Отправляя номер телефона через форму на сайте, вы <strong>добровольно даёте согласие</strong> на его использование в целях связи.
            </p>
            <p>
              Вы вправе <strong>отозвать это согласие</strong> в любое время, отправив сообщение в Telegram.
            </p>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">Использование аналитики и cookies</h2>
            <p>
              На сайте <strong>могут использоваться</strong> сервисы веб-аналитики (в частности, <strong>Яндекс.Метрика</strong>) для сбора <strong>обезличенной информации</strong> о посетителях:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>количество просмотров страниц,</li>
              <li>источник перехода (поиск, соцсети и т.д.),</li>
              <li>тип устройства и браузера.</li>
            </ul>
            <p>
              Эти данные <strong>не позволяют идентифицировать вас лично</strong> и используются <strong>исключительно для понимания</strong>, сколько людей посещает сайт и какие разделы популярны.  
              Сбор осуществляется с соблюдением требований законодательства РФ.
            </p>

            <p className="mt-6 pt-4 border-t border-[#4F8EDC]/30 text-sm text-white/70">
              <strong>Дата публикации:</strong> 24 сентября 2025 г.<br />
              <strong>Контакт для вопросов:</strong> <a href="https://t.me/a1esaf" className="text-[#4F8EDC] hover:underline" target="_blank" rel="noopener noreferrer">@a1esaf</a>
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#4F8EDC] to-[#08C6AB] text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}