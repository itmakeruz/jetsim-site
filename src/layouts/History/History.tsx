import { useTranslation } from "react-i18next";
import "./History.css";
import SimCard from "../../components/SimCard/SimCard";

export const HistoryRender = () => {
  const { t } = useTranslation();
  const histories = [
    {
      id: 1,
      country: t("sims.germany"),
      flag: "🇩🇪",
      plans: [
        {
          traffic: "5 000 MB",
          network: ["4G", "5G"],
          status: "details",
          srok: "30",
          time: "14:30:40",
        },
      ],
    },
    {
      id: 2,
      country: t("sims.turkey"),
      flag: "🇹🇷",
      plans: [
        {
          traffic: "35 000 MB ",
          network: ["4G", "5G"],
          status: "details",
          srok: "30",
          time: "14:30:40",
        },
      ],
    },
    {
      id: 3,
      country: t("sims.usa"),
      flag: "🇺🇸",
      plans: [
        {
          traffic: "15 000 MB",
          network: ["4G", "5G"],
          srok: "30",
          time: "14:30:40",
          status: "details",
        },
      ],
    },
  ];
  return (
    <div className="my">
      <div className="my-wrapper">
        {histories.map((history) => (
          <SimCard
            key={history.id}
            flag={history.flag}
            country={history.country}
            historyPlans={history.plans}
            type="history"
          />
        ))}
      </div>
    </div>
  );
};
