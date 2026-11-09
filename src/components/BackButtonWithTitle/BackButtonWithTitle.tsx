import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface Props {
  title: string;
  onBackClick?: () => void;
  backPath?: string;
  className?: string;
}
export default function BackButtonWithTitle({
  title,
  onBackClick,
  backPath = "/",
  className = "",
}: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={`js-back-title ${className}`}>
      <button
        type="button"
        className="js-icon-btn"
        aria-label={t("jetstream.back")}
        onClick={() => (onBackClick ? onBackClick() : navigate(backPath))}
      >
        <ArrowLeft size={19} />
      </button>
      <h1>{title}</h1>
    </div>
  );
}
