import { apiFailure } from "@/lib/apiFailure";
import { useNavigate } from "react-router-dom";
import LogoutModal from "@/layouts/Navbar/components/LogoutModal";
import { useTariffStore } from "@/store/tariffStore";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/authStore";
import { FormField } from "../../components/FormField";
import { UniversalInput } from "../../components/UniversalInput";
import {
  Camera,
  UserRound,
  LogOut,
  ArrowUpRight,
  LockKeyhole,
} from "lucide-react";
import { UniversalTextarea } from "../../components/UniversalTextarea";
import { userAPI } from "../../services/api.service";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, setUser, logout } = useAuthStore();

  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const clearCart = useTariffStore((state) => state.setSelectedTariffs);
  const [formData, setFormData] = useState({
    fio: "",
    homePhone: "",
    country: "",
    city: "",
    address: "",
    about: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);
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
    >,
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
        toast.success(t("everywhere.profileSaved"));
        if (response.data.data) {
          setUser(response.data.data);
        }
        setSelectedImage(null);
        const fileInput = document.getElementById(
          "upload-input",
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        toast.error(response.data.message || t("everywhere.profileFailed"));
      }
    } catch (cause: unknown) {
      const error = apiFailure(cause);
      toast.error(
        error.response?.data?.message || t("everywhere.profileFailed"),
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
        toast.success(t("everywhere.imageDeleted"));
        // Update user in store to remove image
        if (user) {
          setUser({ ...user, image: null });
        }
      } else {
        toast.error(response.data.message || t("everywhere.imageDeleteFailed"));
      }
    } catch (cause: unknown) {
      const error = apiFailure(cause);
      toast.error(
        error.response?.data?.message || t("everywhere.imageDeleteFailed"),
      );
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleClearSelectedImage = () => {
    setSelectedImage(null);
    // Reset file input
    const fileInput = document.getElementById(
      "upload-input",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const dirty =
    !!selectedImage ||
    formData.fio !== (user?.name || "") ||
    formData.homePhone !== (user?.phone_number || "") ||
    formData.address !== (user?.address || "") ||
    formData.about !== (user?.about || "");
  return (
    <div className="ew-profile-layout">
      <aside className="ew-profile-identity">
        <span className="ew-eyebrow">{t("everywhere.yourAccount")}</span>
        <label className="ew-profile-avatar">
          <input
            id="upload-input"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileUpload}
            className="sr-only"
            aria-label={t("profile.profile.download")}
          />
          {previewUrl ? (
            <img src={previewUrl} alt={t("everywhere.selectedPhoto")} />
          ) : user?.image ? (
            <img
              src={
                /^https?:/.test(user.image)
                  ? user.image
                  : `${import.meta.env.VITE_API_URL}${user.image}`
              }
              alt={t("everywhere.profilePhoto")}
            />
          ) : (
            <UserRound size={40} strokeWidth={1.25} />
          )}
          <span className="ew-avatar-camera">
            <Camera size={17} />
          </span>
        </label>
        <h2>{user?.name || t("everywhere.yourProfile")}</h2>
        <p className="ew-profile-email">{user?.email}</p>
        <label className="ew-profile-upload" htmlFor="upload-input">
          {t("everywhere.changePhoto")}
          <ArrowUpRight size={15} />
        </label>
        <p className="ew-profile-file-note">
          <span>{t("profile.profile.permission")}</span>
          <span>{t("profile.profile.permission2")}</span>
        </p>
        {(user?.image || selectedImage) && (
          <button
            type="button"
            className="ew-profile-remove-photo"
            disabled={isDeletingImage}
            onClick={() => {
              if (selectedImage) handleClearSelectedImage();
              else void handleDeleteImage();
            }}
          >
            {t("profile.profile.delete")}
          </button>
        )}
        <button
          type="button"
          className="ew-profile-logout"
          onClick={() => setConfirmLogout(true)}
        >
          <LogOut size={16} />
          {t("jetstream.logout")}
        </button>
      </aside>
      <form
        className="ew-profile-form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
      >
        <header>
          <div>
            <span className="ew-eyebrow">
              {t("everywhere.personalDetails")}
            </span>
            <h2>{t("everywhere.profileFormTitle")}</h2>
          </div>
          <span className="ew-profile-form-icon">
            <UserRound size={22} strokeWidth={1.4} />
          </span>
        </header>
        <div className="ew-profile-fields">
          <FormField label={t("profile.profile.fio")}>
            <UniversalInput
              name="fio"
              autoComplete="name"
              placeholder={t("everywhere.fullName")}
              value={formData.fio}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label={t("everywhere.emailLabel")}>
            <div className="ew-readonly-field">
              <UniversalInput
                name="email"
                type="email"
                autoComplete="email"
                value={user?.email || ""}
                variant="readonly"
                readOnly
              />
              <LockKeyhole size={15} />
            </div>
          </FormField>
          <FormField label={t("profile.profile.phone")}>
            <UniversalInput
              name="homePhone"
              type="tel"
              autoComplete="tel"
              placeholder={t("everywhere.phoneLabel")}
              value={formData.homePhone}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField label={t("profile.profile.adres")}>
            <UniversalInput
              name="address"
              autoComplete="street-address"
              placeholder={t("everywhere.addressLabel")}
              value={formData.address}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField
            className="ew-profile-about-field"
            label={t("profile.profile.about")}
          >
            <UniversalTextarea
              name="about"
              rows={3}
              placeholder={t("everywhere.aboutLabel")}
              value={formData.about}
              onChange={handleInputChange}
            />
          </FormField>
        </div>
        <footer className="ew-profile-form-footer">
          <p aria-live="polite">
            <i className={dirty ? "is-dirty" : ""} />
            {t(
              dirty
                ? "everywhere.unsavedChanges"
                : "everywhere.profileSaveHint",
            )}
          </p>
          <button type="submit" className="js-btn" disabled={isLoading}>
            {t(isLoading ? "everywhere.saving" : "profile.profile.save")}
            <ArrowUpRight size={16} />
          </button>
        </footer>
      </form>
      <LogoutModal
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        onConfirm={() => {
          logout();
          clearCart([]);
          navigate("/");
        }}
      />
    </div>
  );
};
export default ProfilePage;
