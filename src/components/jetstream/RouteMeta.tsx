import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function RouteMeta() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const english = i18n.language.startsWith("en");
    document.documentElement.lang = english ? "en" : "ru";
    const keys: Record<string, string> = {
      "/": "everywhere.seoHome",
      "/countries": "countries.title",
      "/about": "everywhere.aboutTitle",
      "/how": "everywhere.storyTitle",
      "/faq": "everywhere.faqTitle",
      "/cart": "everywhere.cartTitle",
      "/payment": "everywhere.paymentTitle",
      "/login": "jetstream.authTitle",
      "/verify": "verification.title",
      "/profile": "everywhere.accountTitle",
      "/myesim": "everywhere.simsTitle",
      "/rule": "jetstream.documents",
      "/public-offer": "jetstream.offer",
      "/oferta": "jetstream.offer",
      "/privacy-policy": "jetstream.privacy",
      "/politika": "jetstream.privacy",
      "/refund-policy": "jetstream.refund",
      "/usloviya": "jetstream.refund",
    };
    const title = `${t(keys[pathname] || "jetstream.chooseSim").replace(/\n/g, " ")} — JetSim`;
    const description = t("everywhere.seoDescription");
    document.title = title;
    for (const selector of [
      'meta[name="title"]',
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ])
      document.querySelector(selector)?.setAttribute("content", title);
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ])
      document.querySelector(selector)?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", english ? "en_US" : "ru_RU");
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `https://jetsim.ru${pathname}`);
  }, [pathname, i18n.language, t]);
  return null;
}
