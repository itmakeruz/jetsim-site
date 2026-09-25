import "../../styles/main.css";
import FAQ from "../../components/Faq";

const Faq = () => {
  const faqData = [
    {
      question: "Что такое eSIM?",
      answer: (
        <>
          eSIM (Embedded SIM) — это встроенный в смартфон или другое устройство
          чип, который заменяет пластиковую SIM-карту. Он позволяет подключать
          тарифы операторов дистанционно — без визита в салон и без физической
          SIM.
        </>
      ),
    },
    {
      question: "Чем eSIM отличается от обычной SIM-карты?",
      answer: (
        <ul>
          <li>
            Нет необходимости вставлять карту в слот — активация происходит
            через QR-код.
          </li>
          <li>Можно хранить несколько профилей eSIM на одном устройстве.</li>
          <li>
            Удобно для путешествий: можно заранее купить тарифы eSIM для другой
            страны.
          </li>
        </ul>
      ),
    },
    {
      question: "Какие устройства поддерживают eSIM?",
      answer: (
        <>
          Большинство новых моделей Apple, Samsung, Xiaomi, Huawei, Honor,
          OnePlus, Google Pixel, Realme, Vivo, iQOO, ZTE и др. поддерживают
          eSIM. Проверить совместимость можно через набор команды *#06# — если в
          списке есть EID, значит устройство готово к активации eSIM.
        </>
      ),
    },
    {
      question: "Как купить eSIM через ваш сервис?",
      answer: (
        <ol>
          <li>Выберите страну/тариф.</li>
          <li>
            Оплатите удобным способом (карта, Apple Pay, Google Pay и др.).
          </li>
          <li>Получите QR-код на e-mail и в личном кабинете.</li>
          <li>Отсканируйте QR-код на своём устройстве.</li>
        </ol>
      ),
    },
    {
      question: "Сколько времени занимает активация?",
      answer:
        "Активация происходит мгновенно после сканирования QR-кода. В среднем — 1–3 минуты.",
    },
  ];

  return (
    <div className="container py-12 md:py-16">
      <header className="mb-10 flex flex-col items-center text-center md:mb-14">
        <span className="inline-flex items-center rounded-full border border-main-blue/25 bg-white px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-main-blue">
          Частые вопросы
        </span>
        <h1 className="mt-5 text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-[-0.02em] text-[#0d141c]">
          F.A.Q
        </h1>
      </header>

      <FAQ items={faqData} />
    </div>
  );
};

export default Faq;
