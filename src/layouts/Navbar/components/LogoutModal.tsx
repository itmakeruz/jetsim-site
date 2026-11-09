import { useTranslation } from "react-i18next";
import Modal from "@/components/jetstream/Modal";
export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Modal open={isOpen} onClose={onClose} title={t("modal.logout_title")}>
      <p className="js-copy">{t("modal.logout_message")}</p>
      <div className="flex flex-wrap gap-3 mt-8">
        <button className="js-btn js-btn--outline" onClick={onClose}>
          {t("modal.logout_cancel")}
        </button>
        <button className="js-btn" onClick={onConfirm}>
          {t("modal.logout_confirm")}
        </button>
      </div>
    </Modal>
  );
}
