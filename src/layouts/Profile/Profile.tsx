import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/authStore";

export const ProfileRender = () => {
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
    }
  };

  const { t } = useTranslation();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    fio: "",
    homePhone: "",
    country: "",
    city: "",
    address: "",
    about: "",
  });

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        fio: user.name || "",
        homePhone: "",
        country: "",
        city: "",
        address: "",
        about: "",
      });
    }
  }, [user]);

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
    <div className="flex gap-6 lg:flex-row flex-col items-stretch w-full">
      <div className="flex flex-col items-center p-[80px] lg:p-[80px] md:p-[60px] sm:p-[40px] xs:p-[20px] border border-[#b2b2b2] rounded-lg">
        <div className="flex flex-col items-center mb-[15px]">
          <label
            htmlFor="upload-input"
            className="w-[120px] md:w-[120px] sm:w-[100px] xs:w-[80px] h-[120px] md:h-[120px] sm:h-[100px] xs:h-[80px] rounded-full bg-[#6a696970] flex items-center justify-center mb-2.5 border-2 border-dashed border-[#ccc] relative cursor-pointer"
          >
            <svg
              className="text-[#999] w-6 h-6 md:w-6 md:h-6 sm:w-6 sm:h-6 xs:w-5 xs:h-5"
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
          <div className="text-base md:text-base sm:text-sm xs:text-xs text-[#333] mb-2.5 text-center">
            {t("profile.profile.download")}
          </div>
        </div>
        <p className="text-[#919eab] font-normal text-[15px] md:text-[15px] sm:text-[13px] xs:text-[11px] leading-[18px] tracking-[0px] text-center">
          {t("profile.profile.permission")}
        </p>
        <p className="text-[#919eab] font-normal text-[15px] md:text-[15px] sm:text-[13px] xs:text-[11px] leading-[18px] tracking-[0px] text-center mb-[25px]">
          {t("profile.profile.permission2")}
        </p>

        <button className="bg-[#ff563014] text-[#b71d18] border-none py-[10px] md:py-[10px] sm:py-[8px] xs:py-[6px] px-5 md:px-5 sm:px-4 xs:px-3 rounded cursor-pointer text-sm md:text-sm sm:text-xs xs:text-[10px] transition-colors">
          {t("profile.profile.delete")}
        </button>
      </div>

      <form className="flex-1 flex flex-col items-center p-6 lg:p-6 md:p-4 sm:p-3 xs:p-2 border border-[#b2b2b2] rounded-lg">
        <div className="flex gap-4 lg:flex-row flex-col w-full">
          <div className="flex flex-col mb-4 flex-1 min-w-0 max-w-full">
            <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] leading-[18px] font-normal text-[#637381] mb-0.5">
              {t("profile.profile.fio")}
            </label>
            <input
              type="text"
              name="fio"
              value={formData.fio}
              onChange={handleInputChange}
              className="py-3 px-3 border border-[#919EAB33] rounded-xl text-sm md:text-sm sm:text-xs xs:text-[10px] bg-white transition-colors text-[#919EAB] focus:outline-none"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1 min-w-0 max-w-full">
            <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] leading-[18px] font-normal text-[#637381] mb-0.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              className="py-3 px-3 border border-[#919EAB33] rounded-xl text-sm md:text-sm sm:text-xs xs:text-[10px] bg-white transition-colors text-[#919EAB] focus:outline-none"
              readOnly
            />
          </div>
        </div>

        <div className="flex gap-4 lg:flex-row flex-col w-full">
          <div className="flex flex-col mb-4 flex-1 min-w-0 max-w-full">
            <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] leading-[18px] font-normal text-[#637381] mb-0.5">
              {t("profile.profile.phone")}
            </label>
            <input
              type="tel"
              name="homePhone"
              value={formData.homePhone}
              onChange={handleInputChange}
              className="py-3 px-3 border border-[#919EAB33] rounded-xl text-sm md:text-sm sm:text-xs xs:text-[10px] bg-white transition-colors text-[#919EAB] focus:outline-none"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1 min-w-0 max-w-full">
            <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] leading-[18px] font-normal text-[#637381] mb-0.5">
              {t("profile.profile.adres")}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="py-3 px-3 border border-[#919EAB33] rounded-xl text-sm md:text-sm sm:text-xs xs:text-[10px] bg-white transition-colors text-[#919EAB] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4 lg:flex-row flex-col w-full">
          <div className="flex flex-col mb-4 flex-1 min-w-0 max-w-full">
            <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] leading-[18px] font-normal text-[#637381] mb-0.5">
              {t("profile.profile.country")}
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="py-3 px-3 border border-[#919EAB33] rounded-xl text-sm md:text-sm sm:text-xs xs:text-[10px] bg-white transition-colors text-[#919EAB] focus:outline-none cursor-pointer"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-4 flex-1 min-w-0 max-w-full">
            <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] leading-[18px] font-normal text-[#637381] mb-0.5">
              {t("profile.profile.region")}
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="py-3 px-3 border border-[#919EAB33] rounded-xl text-sm md:text-sm sm:text-xs xs:text-[10px] bg-white transition-colors text-[#919EAB] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 w-full">
          <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] leading-[18px] font-normal text-[#637381] mb-0.5">
            {t("profile.profile.about")}
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            rows={4}
            className="py-3 px-3 border border-[#919EAB33] rounded-xl text-sm md:text-sm sm:text-xs xs:text-[10px] bg-white transition-colors text-[#919EAB] focus:outline-none resize-y min-h-[80px]"
          />
        </div>

        <button
          type="button"
          className="bg-[#007bff] text-white border-none py-5 px-6 rounded-[16.18px] text-base md:text-base sm:text-sm xs:text-xs cursor-pointer self-end w-full"
          onClick={handleSave}
        >
          {t("profile.profile.save")}
        </button>
      </form>
    </div>
  );
};
