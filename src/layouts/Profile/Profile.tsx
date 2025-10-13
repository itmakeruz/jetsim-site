import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Profile.css";

export const ProfileRender = () => {
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
    }
  };

  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fio: "unknown",
    homePhone: "unknown",
    country: "",
    city: "unknown",
    address: "unknown",
    about:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue,\n\nelit erat euismod orci, ac placerat erat dolor lectus quis orci.",
  });

  const countries = ["Россия", "Украина", "Беларусь"]; // Пример стран

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
  };

  return (
    <div className="info">
      <div className="info-left">
        <div className="upload-photo-container">
          <label htmlFor="upload-input" className="upload-photo-circle">
            <svg
              className="upload-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
          </label>
          <input
            id="upload-input"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <div className="upload-photo-label">
            {t("profile.profile.download")}
          </div>
        </div>
        <p className="file-text">{t("profile.profile.permission")}</p>
        <p className="file-text file-mb">{t("profile.profile.permission2")}</p>

        <button className="upload-button">{t("profile.profile.delete")}</button>
      </div>

      <form className="info-right">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t("profile.profile.fio")}</label>
            <input
              type="text"
              name="fio"
              value={formData.fio}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value="unknown"
              className="form-input"
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              {t("profile.profile.phone")}
            </label>
            <input
              type="tel"
              name="homePhone"
              value={formData.homePhone}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("profile.profile.adres")}</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t("profile.profile.country")}</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="form-select"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{t("profile.profile.region")}</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label">{t("profile.profile.about")}</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            rows={4}
            className="form-textarea"
          />
        </div>

        <button type="button" className="save-button" onClick={handleSave}>
          {t("profile.profile.save")}
        </button>   
      </form>
    </div>
  );
};
