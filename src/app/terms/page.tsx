// app/terms/page.tsx
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212B38] via-[#37465B] to-[#212B38] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#37465B]/50 backdrop-blur-sm rounded-2xl border border-[#4F8EDC]/30 p-6 sm:p-8 shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Условия использования сайта
          </h1>

          <div className="prose prose-invert max-w-none space-y-5 text-white/90">
            <p>
              Настоящие Условия регулируют использование вами сайта <strong>mebelman-nn.ru</strong> (далее — «Сайт»).
            </p>

            <p>
              Сайт создан исключительно в <strong>ознакомительных целях</strong> как <strong>личное портфолио</strong> и <strong>не является коммерческим предложением</strong> или интернет-магазином. Автор сайта <strong>не занимается продажей мебели</strong>, изготовлением или установкой изделий.
            </p>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">1. Информация на Сайте</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Все фотографии, описания и цены носят <strong>исключительно демонстрационный характер</strong>.</li>
              <li>Цены указаны <strong>ориентировочно</strong> и <strong>не являются публичной офертой</strong> (в соответствии со ст. 437 ГК РФ).</li>
              <li>Окончательная стоимость, материалы, сроки и условия изготовления мебели <strong>определяются индивидуально</strong> после личного общения с производителями.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">2. Ответственность</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Автор сайта <strong>не несёт ответственности</strong> за точность указанной информации, возможные расхождения между изображениями и реальными изделиями (цвет, текстура, размеры), а также за действия третьих лиц (включая друзей-производителей мебели).</li>
              <li>Сайт не гарантирует, что представленные решения подойдут для вашего помещения без индивидуального проектирования.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">3. Заявки и контакты</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Если вы оставляете номер телефона через форму обратной связи, вы даёте согласие на <strong>однократный контакт</strong> для уточнения интересующих вас проектов.</li>
              <li>Дальнейшее взаимодействие (замер, расчёт, договор) происходит <strong>напрямую с производителями мебели</strong>, не с автором сайта.</li>
            </ul>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">4. Интеллектуальная собственность</h2>
            <p>
              Все материалы на Сайте (фото, тексты, дизайн) созданы автором или предоставлены с разрешения правообладателей. Копирование, распространение или использование контента без письменного согласия <strong>запрещено</strong>.
            </p>

            <h2 className="text-xl font-semibold text-[#4F8EDC] mt-6 mb-3">5. Изменения</h2>
            <p>
              Автор оставляет за собой право вносить изменения в настоящие Условия в любое время без уведомления. Актуальная версия всегда размещена на этой странице.
            </p>

            <p className="mt-6 pt-4 border-t border-[#4F8EDC]/30 text-sm text-white/70">
              <strong>Дата публикации:</strong> 24 сентября 2025 г.
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