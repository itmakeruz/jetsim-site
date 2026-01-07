import "../../styles/main.css";
import { useTranslation } from "react-i18next";
import LinkButton from "../../components/LinkButton";

const Confidential = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="pages-heading">{t("pages.confidential")}</h1>

      <div className="pages-content">
        <p className="pages-text">{t("confidential.title")}</p>
        <p className="pages-text">{t("confidential.revision_date")}</p>
        <p className="pages-text">{t("confidential.intro1")}</p>
        <p className="pages-text">{t("confidential.intro2")}</p>
        <ul className="pages-list">
          <li>{t("confidential.intro_list1")}</li>
          <li>{t("confidential.intro_list2")}</li>
          <li>{t("confidential.intro_list3")}</li>
          <li>{t("confidential.intro_list4")}</li>
          <li>{t("confidential.intro_list5")}</li>
        </ul>
        <p className="pages-text">
          <strong>{t("confidential.important")}</strong>{" "}
          {t("confidential.important_text")}
        </p>
        <p className="pages-text">{t("confidential.intro3")}</p>

        <h2 className="pages-subheading">{t("confidential.section1_title")}</h2>
        <p className="pages-text">{t("confidential.section1_operator")}</p>
        <p className="pages-text">{t("confidential.section1_ogrn")}</p>
        <p className="pages-text">{t("confidential.section1_inn")}</p>
        <p className="pages-text">{t("confidential.section1_address")}</p>
        <p className="pages-text">{t("confidential.section1_email")}</p>
        <p className="pages-text">{t("confidential.section1_phone")}</p>
        <p className="pages-text">{t("confidential.section1_contact")}</p>
        <p className="pages-text">{t("confidential.section1_contact_email")}</p>
        <p className="pages-text">{t("confidential.section1_text")}</p>

        <h2 className="pages-subheading">{t("confidential.section2_title")}</h2>
        <p className="pages-text">{t("confidential.section2_jetsim")}</p>
        <p className="pages-text">{t("confidential.section2_software")}</p>
        <p className="pages-text">{t("confidential.section2_services")}</p>
        <p className="pages-text">{t("confidential.section2_website")}</p>
        <p className="pages-text">{t("confidential.section2_user")}</p>
        <p className="pages-text">{t("confidential.section2_pd")}</p>
        <p className="pages-text">{t("confidential.section2_processing")}</p>
        <p className="pages-text">{t("confidential.section2_partners")}</p>

        <h2 className="pages-subheading">{t("confidential.section3_title")}</h2>
        <p className="pages-text">{t("confidential.section3_text")}</p>
        <p className="pages-text">
          <strong>{t("confidential.section3_ident")}</strong>
        </p>
        <p className="pages-text">{t("confidential.section3_ident_text")}</p>
        <p className="pages-text">
          <strong>{t("confidential.section3_orders")}</strong>
        </p>
        <p className="pages-text">{t("confidential.section3_orders_text")}</p>
        <p className="pages-text">{t("confidential.section3_orders_note")}</p>
        <p className="pages-text">
          <strong>{t("confidential.section3_technical")}</strong>
        </p>
        <p className="pages-text">
          {t("confidential.section3_technical_text")}
        </p>
        <p className="pages-text">
          <strong>{t("confidential.section3_support")}</strong>
        </p>
        <p className="pages-text">{t("confidential.section3_support_text")}</p>
        <p className="pages-text">
          <strong>{t("confidential.section3_special")}</strong>
        </p>
        <p className="pages-text">{t("confidential.section3_special_text")}</p>

        <h2 className="pages-subheading">{t("confidential.section4_title")}</h2>
        <p className="pages-text">{t("confidential.section4_text")}</p>
        <p className="pages-text">
          <strong>{t("confidential.section4_contract")}</strong>{" "}
          {t("confidential.section4_contract_text")}
        </p>
        <p className="pages-text">
          <strong>{t("confidential.section4_law")}</strong>{" "}
          {t("confidential.section4_law_text")}
        </p>
        <p className="pages-text">
          <strong>{t("confidential.section4_security")}</strong>{" "}
          {t("confidential.section4_security_text")}
        </p>
        <p className="pages-text">
          <strong>{t("confidential.section4_marketing")}</strong>{" "}
          {t("confidential.section4_marketing_text")}
        </p>
        <p className="pages-text">
          <strong>{t("confidential.section4_analytics")}</strong>{" "}
          {t("confidential.section4_analytics_text")}
        </p>

        <h2 className="pages-subheading">{t("confidential.section5_title")}</h2>
        <ul className="pages-list">
          <li>{t("confidential.section5_list1")}</li>
          <li>{t("confidential.section5_list2")}</li>
          <li>{t("confidential.section5_list3")}</li>
        </ul>

        <h2 className="pages-subheading">{t("confidential.section6_title")}</h2>
        <p className="pages-text">{t("confidential.section6_text")}</p>

        <h2 className="pages-subheading">{t("confidential.section7_title")}</h2>
        <p className="pages-text">{t("confidential.section7_text")}</p>
        <ul className="pages-list">
          <li>{t("confidential.section7_list1")}</li>
          <li>{t("confidential.section7_list2")}</li>
          <li>{t("confidential.section7_list3")}</li>
          <li>{t("confidential.section7_list4")}</li>
        </ul>
        <p className="pages-text">{t("confidential.section7_text2")}</p>

        <h2 className="pages-subheading">{t("confidential.section8_title")}</h2>
        <p className="pages-text">{t("confidential.section8_text")}</p>
        <ul className="pages-list">
          <li>{t("confidential.section8_list1")}</li>
          <li>{t("confidential.section8_list2")}</li>
          <li>{t("confidential.section8_list3")}</li>
          <li>{t("confidential.section8_list4")}</li>
          <li>{t("confidential.section8_list5")}</li>
        </ul>
        <p className="pages-text">{t("confidential.section8_text2")}</p>
        <p className="pages-text">{t("confidential.section8_text3")}</p>

        <h2 className="pages-subheading">{t("confidential.section9_title")}</h2>
        <p className="pages-text">{t("confidential.section9_text")}</p>
        <p className="pages-text">{t("confidential.section9_text2")}</p>

        <h2 className="pages-subheading">
          {t("confidential.section10_title")}
        </h2>
        <p className="pages-text">{t("confidential.section10_text")}</p>
        <ul className="pages-list">
          <li>{t("confidential.section10_list1")}</li>
          <li>{t("confidential.section10_list2")}</li>
          <li>{t("confidential.section10_list3")}</li>
          <li>{t("confidential.section10_list4")}</li>
        </ul>
        <p className="pages-text">{t("confidential.section10_text2")}</p>

        <h2 className="pages-subheading">
          {t("confidential.section11_title")}
        </h2>
        <p className="pages-text">{t("confidential.section11_text")}</p>
        <ul className="pages-list">
          <li>{t("confidential.section11_list1")}</li>
          <li>{t("confidential.section11_list2")}</li>
          <li>{t("confidential.section11_list3")}</li>
          <li>{t("confidential.section11_list4")}</li>
        </ul>
        <p className="pages-text">{t("confidential.section11_text2")}</p>
        <p className="pages-text">{t("confidential.section11_email")}</p>
        <p className="pages-text">{t("confidential.section11_text3")}</p>

        <h2 className="pages-subheading">
          {t("confidential.section12_title")}
        </h2>
        <p className="pages-text">{t("confidential.section12_text")}</p>
        <ul className="pages-list">
          <li>{t("confidential.section12_list1")}</li>
          <li>{t("confidential.section12_list2")}</li>
          <li>{t("confidential.section12_list3")}</li>
          <li>{t("confidential.section12_list4")}</li>
          <li>{t("confidential.section12_list5")}</li>
        </ul>
        <p className="pages-text">{t("confidential.section12_text2")}</p>

        <h2 className="pages-subheading">
          {t("confidential.section13_title")}
        </h2>
        <p className="pages-text">{t("confidential.section13_text")}</p>

        <h2 className="pages-subheading">
          {t("confidential.section14_title")}
        </h2>
        <p className="pages-text">{t("confidential.section14_text1")}</p>
        <p className="pages-text">{t("confidential.section14_text2")}</p>
        <p className="pages-text">{t("confidential.section14_text3")}</p>

        <h2 className="pages-subheading">
          {t("confidential.section15_title")}
        </h2>
        <p className="pages-text">{t("confidential.section15_company")}</p>
        <p className="pages-text">{t("confidential.section15_ogrn")}</p>
        <p className="pages-text">{t("confidential.section15_inn")}</p>
        <p className="pages-text">{t("confidential.section15_address")}</p>
        <p className="pages-text">{t("confidential.section15_email")}</p>
        <p className="pages-text">{t("confidential.section15_phone")}</p>
      </div>

      <LinkButton />
    </div>
  );
};

export default Confidential;
