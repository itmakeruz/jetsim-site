import { useTranslation } from "react-i18next";
import "./My.css";
import SimCard from "../../components/SimCard/SimCard";

export const MyRender = () => {
  const { t } = useTranslation();
  const mysims = [
    {
      id: 1,
      country: t("sims.germany"),
      flag: "🇩🇪",
      plans: [
        {
          type: t("economy"),
          traffic: "5 000 MB",
          remaining: "10",
          network: ["4G", "5G"],
          status: "details",
        },
      ],
    },
    {
      id: 2,
      country: t("sims.turkey"),
      flag: "🇹🇷",
      plans: [
        {
          type: t("turbo"),
          traffic: "35 000 MB ",
          remaining: "13",
          network: ["4G", "5G"],
          status: "details",
        },
      ],
    },
    {
      id: 3,
      country: t("sims.usa"),
      flag: "🇺🇸",
     plans: [
        {
          type: t("standard"),
          traffic: "15 000 MB",
          remaining: "4",
          network: ["4G", "5G"],
          status: "details",
        },
      ],
    },
  ];
  return (
    <div className="my">
      <div className="my-wrapper">
        {mysims.map((my) => (
          <SimCard
            key={my.id}
            flag={my.flag}
            country={my.country}
            myPlans={my.plans}
            type="my"
          />
        ))}
      </div>
    </div>
  );
};
