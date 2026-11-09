import { rememberEsimAcknowledgement } from "@/lib/esimAcknowledgement";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/jetstream/Modal";
import Compatibility from "@/components/jetstream/Compatibility";

/** The existing ten-second compatibility acknowledgement remains part of checkout. */
export default function ESIMSupportModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [delay, setDelay] = useState(10);
  const { t } = useTranslation();
  useEffect(() => {
    if (!isOpen) return;
    const start = Date.now();
    const timer = window.setInterval(
      () => setDelay(Math.max(0, 10 - Math.floor((Date.now() - start) / 1000))),
      250,
    );
    return () => {
      window.clearInterval(timer);
      setDelay(10);
    };
  }, [isOpen]);
  return (
    <Modal open={isOpen} onClose={onClose} title={t("esim_modal.title")} wide>
      <Compatibility compact />
      <p className="js-compat-note text-ink mt-6">{t("jetstream.termsRead")}</p>
      <p className="js-small mt-3">{t("jetstream.rememberCompatibility")}</p>
      <div className="js-modal-actions">
        <button
          type="button"
          className="js-btn js-btn--ghost"
          onClick={onClose}
        >
          {t("jetstream.notSure")}
        </button>
        <button
          type="button"
          className="js-btn js-btn--blue"
          disabled={delay > 0}
          onClick={() => {
            if (delay > 0) return;
            rememberEsimAcknowledgement();
            onConfirm();
            onClose();
          }}
        >
          {t("jetstream.readyConfirm")}
          {delay > 0 && ` (${delay})`}
        </button>
      </div>
    </Modal>
  );
}
