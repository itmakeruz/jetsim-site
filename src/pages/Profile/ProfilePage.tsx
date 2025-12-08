import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/authStore";
import { FormField } from "../../components/FormField";
import { UniversalInput } from "../../components/UniversalInput";
import { ImageUp } from "lucide-react";
import { UniversalTextarea } from "../../components/UniversalTextarea";
import { userAPI } from "../../services/api.service";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    fio: "",
    homePhone: "",
    country: "",
    city: "",
    address: "",
    about: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        fio: user.name || "",
        homePhone: user.phone_number || "",
        country: "",
        city: "",
        address: user.address || "",
        about: user.about || "",
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.fio);
      formDataToSend.append("phone_number", formData.homePhone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("about", formData.about);

      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      const response = await userAPI.updateUser(formDataToSend);

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        if (response.data.data) {
          setUser(response.data.data);
        }
        setSelectedImage(null);
        const fileInput = document.getElementById(
          "upload-input"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!user?.id) return;

    setIsDeletingImage(true);
    try {
      const response = await userAPI.deleteProfileImage(user.id);
      if (response.data.success) {
        toast.success("Profile image deleted successfully!");
        // Update user in store to remove image
        if (user) {
          setUser({ ...user, image: null });
        }
      } else {
        toast.error(response.data.message || "Failed to delete profile image");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to delete profile image"
      );
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleClearSelectedImage = () => {
    setSelectedImage(null);
    // Reset file input
    const fileInput = document.getElementById(
      "upload-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
  console.log(1);

  return (
    <div className="w-full grid grid-cols-[450px_1fr] gap-6">
      <div className="flex flex-col items-center p-[80px] lg:p-[80px] md:p-[60px] sm:p-[40px] xs:p-[20px] border border-[#b2b2b2] rounded-lg">
        <div className="flex flex-col items-center mb-[15px]">
          <label
            htmlFor="upload-input"
            className="upload-label w-[128px] max-w-[128px] h-[128px] shrink-0 rounded-full text-white gap-2 bg-[rgba(0,0,0,48%)] flex flex-col items-center justify-center mb-2.5 relative cursor-pointer"
          >
            {selectedImage ? (
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : user?.image ? (
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_URL}${user.image}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <>
                <ImageUp className="w-[24px] h-[24px]" />
                <span className="text-[12px]">
                  {t("profile.profile.download")}
                </span>
              </>
            )}
          </label>

          <input
            id="upload-input"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>
        <p className="text-[#919eab] font-normal text-[15px] md:text-[15px] sm:text-[13px] xs:text-[11px] leading-[18px] tracking-[0px] text-center">
          {t("profile.profile.permission")}
        </p>
        <p className="text-[#919eab] font-normal text-[15px] md:text-[15px] sm:text-[13px] xs:text-[11px] leading-[18px] tracking-[0px] text-center mb-[25px]">
          {t("profile.profile.permission2")}
        </p>

        {(user?.image || selectedImage) && (
          <button
            className="bg-[#ff563014] text-[#b71d18] border-none py-[10px] md:py-[10px] sm:py-[8px] xs:py-[6px] px-5 md:px-5 sm:px-4 xs:px-3 rounded cursor-pointer text-sm md:text-sm sm:text-xs xs:text-[10px] transition-colors"
            onClick={() => {
              if (selectedImage) {
                handleClearSelectedImage();
              } else {
                handleDeleteImage();
              }
            }}
            disabled={isDeletingImage}
          >
            {t("profile.profile.delete")}
          </button>
        )}
      </div>

      <form className="flex-1 flex flex-col items-center p-6 lg:p-6 md:p-4 sm:p-3 xs:p-2 border border-[#b2b2b2] rounded-lg">
        <div className="grid grid-cols-2 gap-4 w-full">
          <FormField label={t("profile.profile.fio")}>
            <UniversalInput
              type="text"
              name="fio"
              placeholder="ФИО"
              value={formData.fio}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label="Email">
            <UniversalInput
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={user?.email || ""}
              variant="readonly"
              readOnly
            />
          </FormField>
          <FormField label={t("profile.profile.phone")}>
            <UniversalInput
              type="tel"
              name="homePhone"
              placeholder="Номер телефона"
              value={formData.homePhone}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label={t("profile.profile.adres")}>
            <UniversalInput
              type="text"
              name="address"
              placeholder="Адрес"
              value={formData.address}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField className="col-span-2" label={t("profile.profile.about")}>
            <UniversalTextarea
              name="about"
              placeholder="О себе"
              value={formData.about}
              onChange={handleInputChange}
            />
          </FormField>
        </div>

        <button
          type="button"
          className="bg-[#007bff] mt-auto text-white border-none py-5 px-6 rounded-[10px] text-base md:text-base sm:text-sm xs:text-xs cursor-pointer self-end w-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : t("profile.profile.save")}
        </button>
      </form>
    </div>
  );
};
export default ProfilePage;
