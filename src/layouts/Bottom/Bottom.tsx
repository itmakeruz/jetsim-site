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

  return (
    <div className="mt-[25px]">
      <div
        className="pt-5 md:pt-[38px] mb-[25px] border-b border-black/30"
        style={{
          background:
            "linear-gradient(158.86deg, rgba(255, 255, 255, 0.2) 34.21%, rgba(28, 122, 229, 0.06) 55.4%)",
        }}
      >
        <div className="container flex flex-col md:flex-row items-center gap-5 md:gap-[50px] text-center md:text-left">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl leading-[100%] font-medium max-w-full md:max-w-[600px] mb-[15px]">
              {t("phone.heading")}
              <span className="text-[#1978E5]">{t("phone.heading2")}</span>
              {t("phone.heading3")}
            </h1>

            <ul className="flex flex-col py-2 px-[15px] md:py-2.5 md:px-5 lg:py-3 lg:px-[30px] border border-black/30 rounded-[10px] bg-white mx-auto max-w-full md:max-w-[90%]">
              <li className="relative pl-[15px] md:pl-5 before:content-['•'] before:absolute before:left-0 before:text-black before:text-base md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                {t("phone.nav1")}
                <span className="text-[#1978E5]">{t("phone.nav1-2")}</span>
                {t("phone.nav1-3")}
              </li>

              <li className="relative pl-[15px] md:pl-5 before:content-['•'] before:absolute before:left-0 before:text-black before:text-base md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                {t("phone.nav2")}
              </li>

              <li className="relative pl-[15px] md:pl-5 before:content-['•'] before:absolute before:left-0 before:text-black before:text-base md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                {t("phone.nav3")}
                <span className="text-[#28AF40]">{t("phone.nav3-2")}</span>
                {t("phone.nav3-3")}
              </li>
            </ul>
          </div>
          <div className="flex justify-center px-[20px] py-[10px] items-center overflow-hidden h-[450px] rounded-t-[55px] shrink-0 w-[340px] relative">
            <img
              className="w-full h-full object-top object-cover absolute inset-0"
              src={ASSETS.phone2}
              alt=""
            />
            <video
              ref={videoRef}
              className="w-full h-full rounded-[55px] mix-blend-multiply object-cover object-top"
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
      <Card />
      <Footer />
    </div>
  );
};

export default Bottom;
