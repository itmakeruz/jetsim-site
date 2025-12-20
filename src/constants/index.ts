import {
  InternetIcon,
  SmsIcon,
  CallsIcon,
  InternetSpeedIcon,
} from "@/components/icons/TariffIcons";

export const categories = [
  {
    id: 1,
    name: "Популярный",
    key: "popular",
  },
  {
    id: 2,
    name: "Локальные",
    key: "local",
  },
  {
    id: 3,
    name: "Региональные",
    key: "regional",
  },
  {
    id: 4,
    name: "Глобальные",
    key: "global",
  },
];

export const tariffDetails = [
  {
    id: 1,
    name: "Интернет",
    key: "internet",
    icon: InternetIcon,
  },
  {
    id: 2,
    name: "SMS",
    key: "sms",
    icon: SmsIcon,
  },
  {
    id: 3,
    name: "Звонки",
    key: "calls",
    icon: CallsIcon,
  },
  {
    id: 4,
    name: "5G",
    key: "internetSpeed",
    icon: InternetSpeedIcon,
  },
];
