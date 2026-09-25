import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  placeholder?: string;
  selectedCount: number;
}

function SearchInput({
  value,
  onChange,
  onFocus,
  placeholder,
  selectedCount,
}: SearchInputProps) {
  const { t } = useTranslation();

  return (
    <>
      <input
        type="text"
        placeholder={
          selectedCount === 0
            ? placeholder || t("common.search_placeholder")
            : ""
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className="flex-1 min-w-[120px] p-2 md:text-base text-[14px] text-[#0d141c] placeholder:text-[#8FA6C0] outline-none bg-transparent"
      />
      <button
        type="submit"
        aria-label="Найти"
        className="absolute right-1.5 flex items-center justify-center rounded-[10px] bg-main-blue transition-all duration-200 hover:bg-[#1565C0] hover:shadow-[0_8px_18px_-8px_rgba(25,120,229,0.9)] md:w-[48px] md:h-[48px] w-[38px] h-[38px]"
      >
        <Search className="md:w-6 md:h-6 w-5 h-5 text-[#FFFFFF]" />
      </button>
    </>
  );
}

export default SearchInput;
