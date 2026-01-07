import "../../styles/main.css";
import { useTranslation } from "react-i18next";
import LinkButton from "../../components/LinkButton";

const Usloviya = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="pages-heading">{t("pages.rules")}</h1>

      <div className="pages-content">
        <p className="pages-text">{t("usloviya.revision_date")}</p>
        <p className="pages-text">{t("usloviya.intro1")}</p>
        <p className="pages-text">{t("usloviya.intro2")}</p>

        <h2 className="pages-subheading">{t("usloviya.section1_title")}</h2>
        <p className="pages-text">
          <strong>1.1.</strong> {t("usloviya.section1_1_1")}
        </p>

        <h2 className="pages-subheading">{t("usloviya.section2_title")}</h2>
        <p className="pages-text">{t("usloviya.section2_text1")}</p>
        <p className="pages-text">
          <strong>{t("usloviya.section2_2_1")}</strong>
        </p>
        <p className="pages-text">{t("usloviya.section2_2_1_text")}</p>
        <p className="pages-text">{t("usloviya.section2_list1_label")}</p>
        <ul className="pages-list">
          <li>{t("usloviya.section2_list1_item1")}</li>
          <li>{t("usloviya.section2_list1_item2")}</li>
          <li>{t("usloviya.section2_list1_item3")}</li>
        </ul>
        <p className="pages-text">
          <strong>{t("usloviya.section2_2_2")}</strong>
        </p>
        <p className="pages-text">{t("usloviya.section2_list2_label")}</p>
        <ul className="pages-list">
          <li>{t("usloviya.section2_list2_item1")}</li>
          <li>{t("usloviya.section2_list2_item2")}</li>
          <li>{t("usloviya.section2_list2_item3")}</li>
          <li>{t("usloviya.section2_list2_item4")}</li>
        </ul>
        <p className="pages-text">
          <strong>{t("usloviya.section2_2_3")}</strong>
        </p>
        <ul className="pages-list">
          <li>{t("usloviya.section2_list3_item1")}</li>
          <li>{t("usloviya.section2_list3_item2")}</li>
          <li>{t("usloviya.section2_list3_item3")}</li>
          <li>{t("usloviya.section2_list3_item4")}</li>
        </ul>

        <h2 className="pages-subheading">{t("usloviya.section3_title")}</h2>
        <p className="pages-text">
          <strong>{t("usloviya.section3_3_1")}</strong>
        </p>
        <p className="pages-text">{t("usloviya.section3_list1_label")}</p>
        <ul className="pages-list">
          <li>{t("usloviya.section3_list1_item1")}</li>
          <li>{t("usloviya.section3_list1_item2")}</li>
        </ul>
        <p className="pages-text">
          <strong>{t("usloviya.section3_3_2")}</strong>
        </p>
        <p className="pages-text">{t("usloviya.section3_3_2_text")}</p>
        <p className="pages-text">{t("usloviya.section3_list2_label")}</p>
        <ul className="pages-list">
          <li>{t("usloviya.section3_list2_item1")}</li>
          <li>{t("usloviya.section3_list2_item2")}</li>
          <li>{t("usloviya.section3_list2_item3")}</li>
        </ul>
        <p className="pages-text">
          <strong>{t("usloviya.section3_3_3")}</strong>
        </p>
        <p className="pages-text">{t("usloviya.section3_3_3_text1")}</p>
        <p className="pages-text">{t("usloviya.section3_3_3_text2")}</p>
        <p className="pages-text">
          <strong>{t("usloviya.section3_3_4")}</strong>
        </p>
        <p className="pages-text">{t("usloviya.section3_3_4_text1")}</p>
        <p className="pages-text">{t("usloviya.section3_3_4_text2")}</p>
        <p className="pages-text">
          <strong>{t("usloviya.section3_3_5")}</strong>
        </p>
        <p className="pages-text">{t("usloviya.section3_3_5_text")}</p>

        <h2 className="pages-subheading">{t("usloviya.section4_title")}</h2>
        <p className="pages-text">
          <strong>4.1.</strong> {t("usloviya.section4_4_1")}
        </p>
        <p className="pages-text">
          <strong>4.2.</strong> {t("usloviya.section4_4_2")}
        </p>
        <p className="pages-text">
          <strong>4.3.</strong> {t("usloviya.section4_4_3")}
        </p>

        <h2 className="pages-subheading">{t("usloviya.section5_title")}</h2>
        <p className="pages-text">{t("usloviya.section5_company")}</p>
        <p className="pages-text">{t("usloviya.section5_ogrn_inn")}</p>
        <p className="pages-text">{t("usloviya.section5_address")}</p>
        <p className="pages-text">{t("usloviya.section5_email")}</p>
        <p className="pages-text">{t("usloviya.section5_website")}</p>
        <p className="pages-text">{t("usloviya.section5_phone")}</p>
      </div>

      <LinkButton />
    </div>
  );
};

export default Usloviya;
