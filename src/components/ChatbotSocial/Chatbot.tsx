import { useState } from "react";
import { X, MessageCircle, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ASSETS } from "@/assets";
export default function FloatingSocialMenu() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <aside
      className="js-support"
      aria-label={t("jetstream.support")}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      {open && (
        <div className="js-support-links" id="support-links">
          <a
            href="https://t.me/Operator1jet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ASSETS.telegram} alt="" />
            Telegram
            <ArrowUpRight size={13} />
          </a>
          <a
            href="https://max.ru/u/f9LHodD0cOLjNJVFzTXrS0_f9s7hEANWEYwVHYH55gY8cheoaTnvfpP7IP8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ASSETS.max} alt="" />
            MAX
            <ArrowUpRight size={13} />
          </a>
        </div>
      )}
      <button
        className="js-support-toggle"
        type="button"
        aria-label={open ? t("jetstream.close") : t("jetstream.supportChat")}
        aria-controls="support-links"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </aside>
  );
}
