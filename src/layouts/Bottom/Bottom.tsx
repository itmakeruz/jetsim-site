import { useTranslation } from "react-i18next";
import { ASSETS } from "../../assets";
import Card from "../Cards/Cards";
import Footer from "../Footer/Footer";
import { useEffect, useRef } from "react";

const Bottom = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari uchun majburiy atributlar
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // iOS ba'zan birinchi autoplay'ni bloklaydi — e'tibor bermaymiz
      });
    }
  }, []);

  const steps = [
    <>
      {t("phone.nav1")}
      <span className="font-semibold text-main-blue">{t("phone.nav1-2")}</span>
      {t("phone.nav1-3")}{" "}
      <code className="inline-flex items-center rounded-md border border-main-blue/25 bg-main-blue/[0.07] px-2 py-0.5 font-mono text-[0.95em] font-semibold tracking-wider text-main-blue">
        *#06#
      </code>
      {t("phone.nav1-4")}
    </>,
    <>{t("phone.nav2")}</>,
    <>
      {t("phone.nav3")}
      <span className="font-semibold text-[#0d141c]">{t("phone.nav3-2")}</span>
      {t("phone.nav3-3")}
    </>,
  ];

  return (
    <div className="mt-[25px]">
      <section className="relative w-full overflow-hidden bg-[linear-gradient(160deg,#ffffff_0%,#eff6ff_55%,#e6f0ff_100%)]">
        {/* Свечение под телефоном — декоративное */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-[8%] h-[360px] w-[360px] rounded-full bg-main-blue/10 blur-3xl"
        />

        <div className="container relative grid items-end gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_380px] pt-14 md:pt-20">
          <div className="pb-14 md:pb-20 text-center lg:text-left">
            <span className="inline-flex items-center rounded-full border border-main-blue/25 bg-white/70 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-main-blue">
              {t("phone.eyebrow")}
            </span>

            <h2 className="mt-5 text-[26px] md:text-[32px] lg:text-[36px] leading-[1.18] font-semibold tracking-[-0.01em] text-[#0d141c] max-w-[30ch] mx-auto lg:mx-0 text-balance">
              {t("phone.heading")}
              <span className="text-main-blue">{t("phone.heading2")}</span>
              {t("phone.heading3")}
            </h2>

            <ol className="mt-8 flex flex-col gap-4 text-left">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm p-4 md:p-5 transition-colors duration-300 hover:border-main-blue/35"
                >
                  <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-main-blue text-[15px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[15px] md:text-base leading-[1.6] text-[#4f7096] pt-[3px]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-[13px] md:text-sm leading-[1.6] text-[#4f7096]/80 max-w-[62ch] mx-auto lg:mx-0">
              {t("phone.nav4")}
            </p>
          </div>

          <div className="relative mx-auto flex w-[300px] md:w-[340px] justify-center self-end">
            <div className="relative h-[430px] md:h-[490px] w-full overflow-hidden rounded-t-[55px]">
              <img
                className="absolute inset-0 h-full w-full object-cover object-top"
                src={ASSETS.phone2}
                alt=""
                aria-hidden="true"
              />
              <video
                ref={videoRef}
                className="relative h-full w-full rounded-[55px] object-cover object-top mix-blend-multiply"
                src={ASSETS.phoneVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              ></video>
            </div>
          </div>
        </div>
      </section>

      <Card />
      <Footer />
    </div>
  );
};

export default Bottom;
