import DestinationPhoto from "@/components/jetstream/DestinationPhoto";
import { CircleHelp } from "lucide-react";
import Modal from "@/components/jetstream/Modal";
import type { Region, Tariff } from "@/types/api";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BackButtonWithTitle from "@/components/BackButtonWithTitle";

/**
 * Названия приходят с API уже локализованными и с произвольными добавками
 * («Вьетнам 5G», «Вьетнам 4G »), поэтому сравнивать строки целиком нельзя —
 * ищем подстроку сразу в обоих языках.
 */
const INSTALL_NOTICE_RULES: { notice: string; patterns: string[] }[] = [
  { notice: "vietnam", patterns: ["вьетнам", "vietnam"] },
  { notice: "thailand", patterns: ["таиланд", "thailand"] },
  { notice: "africa6", patterns: ["африка 6", "africa 6"] },
];

/**
 * Страница открывается двумя разными маршрутами с разной формой данных:
 *  - /tariffs/:region_group_id — `regions` в ответе уже содержит имя самого
 *    пакета («Вьетнам 5G», «Африка 6»), заголовка достаточно;
 *  - /tariffs/ids=<страна> — `regions` содержит только страну («ЮАР»),
 *    а нужный пакет («Африка 6») виден лишь внутри каждого тарифа как
 *    `region_group.name`. Без тарифов уведомление на этом маршруте никогда
 *    бы не сработало.
 * Поэтому сопоставляем по объединению обоих источников.
 */
function matchInstallNotices(
  regions: Region[] | undefined,
  tariffs:
    { local: Tariff[]; regional: Tariff[]; global: Tariff[] } | undefined,
): string[] {
  const names = [
    ...(regions ?? []).map((region) => region?.name),
    ...[
      ...(tariffs?.local ?? []),
      ...(tariffs?.regional ?? []),
      ...(tariffs?.global ?? []),
    ].map((tariff) => tariff?.region_group?.name),
  ];

  const haystack = names
    .filter(Boolean)
    .map((name) => name!.toLowerCase())
    .join(" ");

  if (!haystack.trim()) return [];

  return INSTALL_NOTICE_RULES.filter((rule) =>
    rule.patterns.some((pattern) => haystack.includes(pattern)),
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

interface SingleRegionHeadProps {
  regions: Region[];
  tariffs?: { local: Tariff[]; regional: Tariff[]; global: Tariff[] };
}

function SingleRegionHead({ regions, tariffs }: SingleRegionHeadProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const installNotices = useMemo(
    () => matchInstallNotices(regions, tariffs),
    [regions, tariffs],
  );

  const names = regions.map((region) => region.name).join(" ");
  const cover = regions.length === 1 ? regions[0].cover_image : null;
  return (
    <div className="js-catalogue-head ew-catalogue-photo">
      <DestinationPhoto
        name={names}
        cover={cover}
        className="ew-catalogue-image"
        height={600}
        lazy={false}
      />
      <span className="ew-eyebrow">{t("everywhere.catalogueEyebrow")}</span>
      <div className="js-catalogue-intro">
        <BackButtonWithTitle
          title={
            regions?.map((region) => region.name).join(", ") ||
            t("jetstream.destinations")
          }
        />
        <button
          type="button"
          className="js-btn js-btn--ghost"
          aria-label={t("jetstream.how")}
          onClick={() => setIsModalOpen(true)}
        >
          <CircleHelp size={17} />
          <span className="hidden sm:inline">{t("jetstream.how")}</span>
        </button>
      </div>
      <p className="js-copy">{t("jetstream.catalogueLead")}</p>
      {installNotices.length > 0 && (
        <div className="js-install-notice mt-6">
          <h2 className="font-semibold mb-2 tracking-normal">
            {t("install_notice.title")}
          </h2>
          <InstallNoticeList notices={installNotices} />
        </div>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("jetstream.how")}
        wide
      >
        {installNotices.length > 0 && (
          <div className="js-install-notice mb-5">
            <h3 className="font-semibold mb-2">{t("install_notice.title")}</h3>
            <InstallNoticeList notices={installNotices} />
          </div>
        )}
        {isModalOpen && (
          <iframe
            className="w-full aspect-video rounded-xl bg-black"
            src="https://www.youtube.com/embed/RI7Qn9ILBPg?si=wfq1abvW6R9HBLuC"
            title={t("jetstream.installGuide")}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </Modal>
    </div>
  );
}
export default SingleRegionHead;
