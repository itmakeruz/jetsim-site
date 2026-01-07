import "../../styles/main.css";
import { useTranslation } from "react-i18next";

const Oferta = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="pages-heading">{t("pages.oferta")}</h1>

      <div className="pages-content">
        <p className="pages-text">
          <strong>{t("oferta.title")}</strong>
        </p>
        <p className="pages-text">{t("oferta.intro1")}</p>
        <p className="pages-text">{t("oferta.intro2")}</p>
        <p className="pages-text">{t("oferta.intro3")}</p>
        <p className="pages-text">{t("oferta.intro4")}</p>
        <p className="pages-text">{t("oferta.intro5")}</p>

        <h2 className="pages-subheading">{t("oferta.section1_title")}</h2>
        <p className="pages-text">
          <strong>1.1.</strong> {t("oferta.section1_1_1")}
        </p>
        <p className="pages-text">
          <strong>1.2.</strong> {t("oferta.section1_1_2")}
        </p>
        <p className="pages-text">
          <strong>1.3.</strong> {t("oferta.section1_1_3")}
        </p>
        <p className="pages-text">
          <strong>1.4.</strong> {t("oferta.section1_1_4")}
        </p>
        <p className="pages-text">
          <strong>1.5.</strong> {t("oferta.section1_1_5")}
        </p>
        <p className="pages-text">
          <strong>1.6.</strong> {t("oferta.section1_1_6")}
        </p>
        <p className="pages-text">
          <strong>1.7.</strong> {t("oferta.section1_1_7")}
        </p>
        <p className="pages-text">
          <strong>1.8.</strong> {t("oferta.section1_1_8")}
        </p>
        <p className="pages-text">
          <strong>1.9.</strong> {t("oferta.section1_1_9")}
        </p>
        <p className="pages-text">
          <strong>1.10.</strong> {t("oferta.section1_1_10")}
        </p>
        <p className="pages-text">
          <strong>1.11.</strong> {t("oferta.section1_1_11")}
        </p>
        <p className="pages-text">{t("oferta.section1_text1")}</p>
        <p className="pages-text">{t("oferta.section1_text2")}</p>
        <ul className="pages-list">
          <li>{t("oferta.section1_list1")}</li>
          <li>{t("oferta.section1_list2")}</li>
          <li>{t("oferta.section1_list3")}</li>
        </ul>

        <h2 className="pages-subheading">{t("oferta.section2_title")}</h2>
        <p className="pages-text">
          <strong>2.1.</strong> {t("oferta.section2_2_1")}
        </p>
        <p className="pages-text">
          <strong>2.2.</strong> {t("oferta.section2_2_2")}
        </p>
        <p className="pages-text">{t("oferta.section2_text1")}</p>
        <p className="pages-text">
          <strong>2.3.</strong> {t("oferta.section2_2_3")}
        </p>
        <p className="pages-text">{t("oferta.section2_text2")}</p>
        <p className="pages-text">
          <strong>2.4.</strong> {t("oferta.section2_2_4")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section3_title")}</h2>
        <p className="pages-text">
          <strong>3.1.</strong> {t("oferta.section3_3_1")}
        </p>
        <p className="pages-text">
          <strong>3.2.</strong> {t("oferta.section3_3_2")}
        </p>
        <p className="pages-text">
          <strong>3.2.1.</strong> {t("oferta.section3_3_2_1")}
        </p>
        <p className="pages-text">
          <strong>3.2.2.</strong> {t("oferta.section3_3_2_2")}
        </p>
        <p className="pages-text">
          <strong>3.2.3.</strong> {t("oferta.section3_3_2_3")}
        </p>
        <p className="pages-text">
          <strong>3.3.</strong> {t("oferta.section3_3_3")}
        </p>
        <p className="pages-text">{t("oferta.section3_text1")}</p>
        <p className="pages-text">
          <strong>3.4.</strong> {t("oferta.section3_3_4")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section3_list1")}</li>
          <li>{t("oferta.section3_list2")}</li>
          <li>{t("oferta.section3_list3")}</li>
        </ul>
        <p className="pages-text">
          <strong>3.5.</strong> {t("oferta.section3_3_5")}
        </p>
        <p className="pages-text">
          <strong>3.6.</strong> {t("oferta.section3_3_6")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section4_title")}</h2>
        <p className="pages-text">
          <strong>4.1.</strong> {t("oferta.section4_4_1")}
        </p>
        <p className="pages-text">
          <strong>4.2.</strong> {t("oferta.section4_4_2")}
        </p>
        <p className="pages-text">
          <strong>4.3.</strong> {t("oferta.section4_4_3")}
        </p>
        <p className="pages-text">
          <strong>4.4.</strong> {t("oferta.section4_4_4")}
        </p>
        <p className="pages-text">{t("oferta.section4_text1")}</p>
        <p className="pages-text">
          <strong>4.5.</strong> {t("oferta.section4_4_5")}
        </p>
        <p className="pages-text">
          <strong>4.6.</strong> {t("oferta.section4_4_6")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section5_title")}</h2>
        <p className="pages-text">
          <strong>5.1.</strong> {t("oferta.section5_5_1")}
        </p>
        <p className="pages-text">{t("oferta.section5_text1")}</p>
        <p className="pages-text">
          <strong>5.2.</strong> {t("oferta.section5_5_2")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section5_list1")}</li>
          <li>{t("oferta.section5_list2")}</li>
          <li>{t("oferta.section5_list3")}</li>
        </ul>
        <p className="pages-text">
          <strong>5.3.</strong> {t("oferta.section5_5_3")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section5_list4")}</li>
          <li>{t("oferta.section5_list5")}</li>
          <li>{t("oferta.section5_list6")}</li>
        </ul>

        <h2 className="pages-subheading">{t("oferta.section6_title")}</h2>
        <p className="pages-text">
          <strong>6.1.</strong> {t("oferta.section6_6_1")}
        </p>
        <p className="pages-text">{t("oferta.section6_text1")}</p>
        <p className="pages-text">
          <strong>6.2.</strong> {t("oferta.section6_6_2")}
        </p>
        <p className="pages-text">{t("oferta.section6_text2")}</p>
        <p className="pages-text">
          <strong>6.3.</strong> {t("oferta.section6_6_3")}
        </p>
        <p className="pages-text">{t("oferta.section6_text3")}</p>
        <p className="pages-text">
          <strong>6.4.</strong> {t("oferta.section6_6_4")}
        </p>
        <p className="pages-text">
          <strong>6.5.</strong> {t("oferta.section6_6_5")}
        </p>
        <p className="pages-text">
          <strong>6.6.</strong> {t("oferta.section6_6_6")}
        </p>
        <p className="pages-text">{t("oferta.section6_text4")}</p>
        <p className="pages-text">
          <strong>6.7.</strong> {t("oferta.section6_6_7")}
        </p>
        <p className="pages-text">
          <strong>6.8.</strong> {t("oferta.section6_6_8")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section7_title")}</h2>
        <p className="pages-text">
          <strong>7.1.</strong> {t("oferta.section7_7_1")}
        </p>
        <p className="pages-text">{t("oferta.section7_text1")}</p>
        <p className="pages-text">
          <strong>7.2.</strong> {t("oferta.section7_7_2")}
        </p>
        <p className="pages-text">{t("oferta.section7_text2")}</p>
        <p className="pages-text">{t("oferta.section7_text3")}</p>
        <p className="pages-text">
          <strong>7.3.</strong> {t("oferta.section7_7_3")}
        </p>
        <p className="pages-text">{t("oferta.section7_text4")}</p>
        <p className="pages-text">
          <strong>7.4.</strong> {t("oferta.section7_7_4")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section7_list1")}</li>
          <li>{t("oferta.section7_list2")}</li>
          <li>{t("oferta.section7_list3")}</li>
          <li>{t("oferta.section7_list4")}</li>
          <li>{t("oferta.section7_list5")}</li>
          <li>{t("oferta.section7_list6")}</li>
          <li>{t("oferta.section7_list7")}</li>
          <li>{t("oferta.section7_list8")}</li>
        </ul>
        <p className="pages-text">
          <strong>7.5.</strong> {t("oferta.section7_7_5")}
        </p>
        <p className="pages-text">
          <strong>7.6.</strong> {t("oferta.section7_7_6")}
        </p>
        <p className="pages-text">
          <strong>7.7.</strong> {t("oferta.section7_7_7")}
        </p>
        <p className="pages-text">{t("oferta.section7_text5")}</p>

        <h2 className="pages-subheading">{t("oferta.section8_title")}</h2>
        <p className="pages-text">
          <strong>8.1.</strong> {t("oferta.section8_8_1")}
        </p>
        <p className="pages-text">
          <strong>8.2.</strong> {t("oferta.section8_8_2")}
        </p>
        <p className="pages-text">
          <strong>8.3.</strong> {t("oferta.section8_8_3")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section9_title")}</h2>
        <p className="pages-text">
          <strong>9.1.</strong> {t("oferta.section9_9_1")}
        </p>
        <p className="pages-text">{t("oferta.section9_text1")}</p>
        <p className="pages-text">
          <strong>9.2.</strong> {t("oferta.section9_9_2")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section9_list1")}</li>
          <li>{t("oferta.section9_list2")}</li>
          <li>{t("oferta.section9_list3")}</li>
        </ul>
        <p className="pages-text">{t("oferta.section9_text2")}</p>
        <p className="pages-text">
          <strong>9.3.</strong> {t("oferta.section9_9_3")}
        </p>
        <p className="pages-text">{t("oferta.section9_text3")}</p>
        <p className="pages-text">{t("oferta.section9_text4")}</p>
        <p className="pages-text">
          <strong>9.4.</strong> {t("oferta.section9_9_4")}
        </p>
        <p className="pages-text">{t("oferta.section9_text5")}</p>
        <p className="pages-text">
          <strong>9.5.</strong> {t("oferta.section9_9_5")}
        </p>
        <p className="pages-text">
          <strong>9.6.</strong> {t("oferta.section9_9_6")}
        </p>
        <p className="pages-text">
          <strong>9.7.</strong> {t("oferta.section9_9_7")}
        </p>
        <p className="pages-text">
          <strong>9.8.</strong> {t("oferta.section9_9_8")}
        </p>
        <p className="pages-text">
          <strong>9.9.</strong> {t("oferta.section9_9_9")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section10_title")}</h2>
        <p className="pages-text">
          <strong>10.1.</strong> {t("oferta.section10_10_1")}
        </p>
        <p className="pages-text">{t("oferta.section10_text1")}</p>
        <p className="pages-text">{t("oferta.section10_text2")}</p>
        <p className="pages-text">
          <strong>10.2.</strong> {t("oferta.section10_10_2")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section10_list1")}</li>
          <li>{t("oferta.section10_list2")}</li>
          <li>{t("oferta.section10_list3")}</li>
          <li>{t("oferta.section10_list4")}</li>
          <li>{t("oferta.section10_list5")}</li>
          <li>{t("oferta.section10_list6")}</li>
        </ul>
        <p className="pages-text">
          <strong>10.3.</strong> {t("oferta.section10_10_3")}
        </p>
        <p className="pages-text">
          <strong>10.4.</strong> {t("oferta.section10_10_4")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section10_list7")}</li>
          <li>{t("oferta.section10_list8")}</li>
          <li>{t("oferta.section10_list9")}</li>
        </ul>

        <h2 className="pages-subheading">{t("oferta.section11_title")}</h2>
        <p className="pages-text">
          <strong>11.1.</strong> {t("oferta.section11_11_1")}
        </p>
        <p className="pages-text">{t("oferta.section11_text1")}</p>
        <p className="pages-text">{t("oferta.section11_text2")}</p>
        <p className="pages-text">{t("oferta.section11_text3")}</p>
        <p className="pages-text">
          <strong>11.2.</strong> {t("oferta.section11_11_2")}
        </p>
        <p className="pages-text">{t("oferta.section11_text4")}</p>
        <p className="pages-text">
          <strong>11.3.</strong> {t("oferta.section11_11_3")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section11_list1")}</li>
          <li>{t("oferta.section11_list2")}</li>
          <li>{t("oferta.section11_list3")}</li>
          <li>{t("oferta.section11_list4")}</li>
          <li>{t("oferta.section11_list5")}</li>
          <li>{t("oferta.section11_list6")}</li>
        </ul>
        <p className="pages-text">
          <strong>11.4.</strong> {t("oferta.section11_11_4")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section12_title")}</h2>
        <p className="pages-text">
          <strong>12.1.</strong> {t("oferta.section12_12_1")}
        </p>
        <p className="pages-text">
          <strong>12.2.</strong> {t("oferta.section12_12_2")}
        </p>
        <ul className="pages-list">
          <li>{t("oferta.section12_list1")}</li>
          <li>{t("oferta.section12_list2")}</li>
        </ul>
        <p className="pages-text">
          <strong>12.3.</strong> {t("oferta.section12_12_3")}
        </p>
        <p className="pages-text">
          <strong>12.4.</strong> {t("oferta.section12_12_4")}
        </p>
        <p className="pages-text">
          <strong>12.5.</strong> {t("oferta.section12_12_5")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section13_title")}</h2>
        <p className="pages-text">
          <strong>13.1.</strong> {t("oferta.section13_13_1")}
        </p>
        <p className="pages-text">
          <strong>13.2.</strong> {t("oferta.section13_13_2")}
        </p>
        <p className="pages-text">
          <strong>13.3.</strong> {t("oferta.section13_13_3")}
        </p>
        <p className="pages-text">
          <strong>13.4.</strong> {t("oferta.section13_13_4")}
        </p>
        <p className="pages-text">{t("oferta.section13_text1")}</p>
        <p className="pages-text">
          <strong>13.5.</strong> {t("oferta.section13_13_5")}
        </p>
        <p className="pages-text">{t("oferta.section13_text2")}</p>
        <p className="pages-text">
          <strong>13.6.</strong> {t("oferta.section13_13_6")}
        </p>
        <p className="pages-text">
          <strong>13.7.</strong> {t("oferta.section13_13_7")}
        </p>
        <p className="pages-text">{t("oferta.section13_text3")}</p>
        <p className="pages-text">
          <strong>13.8.</strong> {t("oferta.section13_13_8")}
        </p>

        <h2 className="pages-subheading">{t("oferta.section14_title")}</h2>
        <p className="pages-text">{t("oferta.section14_company")}</p>
        <p className="pages-text">{t("oferta.section14_ogrn")}</p>
        <p className="pages-text">{t("oferta.section14_inn")}</p>
        <p className="pages-text">{t("oferta.section14_address")}</p>
        <p className="pages-text">{t("oferta.section14_email")}</p>
        <p className="pages-text">{t("oferta.section14_phone")}</p>
      </div>
    </div>
  );
};

export default Oferta;
