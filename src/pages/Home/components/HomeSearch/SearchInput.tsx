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
        className="flex-1 min-w-[120px] p-2 md:text-base text-[14px] text-[#4F7096] outline-none bg-transparent"
      />
      <button
        type="submit"
        className="absolute right-1 bg-[#8A8AC7] md:rounded-[10px] rounded-[6px] md:w-[50px] md:h-[50px] w-[40px] h-[40px] flex items-center justify-center"
      >
        <Search className="md:w-6 md:h-6 w-5 h-5 text-[#FFFFFF]" />
      </button>
    </>
  );
}

export default SearchInput;
