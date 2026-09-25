import { ASSETS } from "@/assets";
import type { Region } from "@/types/api";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButtonWithTitle from "@/components/BackButtonWithTitle";

/**
 * Названия приходят с API уже локализованными и с произвольными добавками
 * («Вьетнам 5G», «Вьетнам 4G »), поэтому сравнивать строки целиком нельзя —
 * ищем страну по подстроке сразу в обоих языках.
 */
const INSTALL_NOTICE_RULES: { notice: string; patterns: string[] }[] = [
  { notice: "vietnam", patterns: ["вьетнам", "vietnam"] },
  { notice: "thailand", patterns: ["таиланд", "thailand"] },
];

function matchInstallNotices(regions: Region[] | undefined): string[] {
  const haystack = (regions ?? [])
    .map((region) => region?.name?.toLowerCase() ?? "")
    .join(" ");

  if (!haystack.trim()) return [];

  return INSTALL_NOTICE_RULES.filter((rule) =>
    rule.patterns.some((pattern) => haystack.includes(pattern))
  ).map((rule) => rule.notice);
}

function InstallNoticeList({ notices }: { notices: string[] }) {
  const { t } = useTranslation();

  return (
    <ul className="flex flex-col gap-2">
      {notices.map((notice) => (
        <li
          key={notice}
          className="text-sm md:text-base text-[#5C3D00] leading-snug"
        >
          {t(`install_notice.${notice}`)}
        </li>
      ))}
    </ul>
  );
}

function SingleRegionHead({ regions }: { regions: Region[] }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const installNotices = useMemo(() => matchInstallNotices(regions), [regions]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-[26px]">
        <BackButtonWithTitle
          title={
            regions && regions.length > 0
              ? regions.map((region) => region.name).join(", ")
              : ""
          }
        />
        <button
          onClick={handleOpenModal}
          className="flex flex-col items-center md:gap-[6px] gap-[4px] max-w-[150px]"
        >
          <div className="md:w-[40px] md:h-[40px] w-[35px] h-[35px] flex items-center justify-center rounded-full bg-[#E8EDF2]">
            <img
              src={ASSETS.questionMark}
              alt="question"
              className="md:w-[25px] w-[22px] md:h-[25px] h-[22px]"
            />
          </div>
          <span className="md:text-sm text-[12px] font-medium text-[#4F7096] leading-[1.1] md:block hidden">
            Как работают пакеты JetSim eSIM
          </span>
        </button>
      </div>

      {/* Условие установки видно сразу: раньше оно жило только внутри модалки «?» */}
      {installNotices.length > 0 && (
        <div className="mb-[26px] flex gap-3 rounded-[12px] border border-[#F0B429] bg-[#FFF8E6] p-4 md:p-5">
          <svg
            className="mt-[2px] h-5 w-5 shrink-0 md:h-6 md:w-6"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" fill="#F0B429" />
            <path
              d="M12 7v6"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16.5" r="1.25" fill="#fff" />
          </svg>
          <div className="flex flex-col gap-1">
            <h3 className="text-base md:text-lg font-semibold text-[#8A5A00]">
              {t("install_notice.title")}
            </h3>
            <InstallNoticeList notices={installNotices} />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-[10px] w-[95%] md:w-[90%] lg:w-[80%] max-w-[800px] relative shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#0D141C]">
                Как работают пакеты JetSim eSIM?
              </h2>

              {installNotices.length > 0 && (
                <div className="mb-6 rounded-[8px] border border-[#F0B429] bg-[#FFF8E6] p-4">
                  <h3 className="mb-2 text-base md:text-lg font-semibold text-[#8A5A00]">
                    {t("install_notice.title")}
                  </h3>
                  <InstallNoticeList notices={installNotices} />
                </div>
              )}

              <div className="w-full mb-6">
                <div className="relative w-full aspect-video bg-black rounded-[8px] overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/RI7Qn9ILBPg?si=wfq1abvW6R9HBLuC"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full bg-main-blue hover:bg-[#1565c0] text-white py-3 px-6 rounded-[8px] transition-colors duration-200 text-[20px] font-semibold hover:text-white"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleRegionHead;
