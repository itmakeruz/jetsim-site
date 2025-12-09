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
        className="flex-1 min-w-[120px] p-2 text-base text-[#4F7096] outline-none bg-transparent"
      />
      <button
        type="submit"
        className="absolute right-1 bg-[#8A8AC7] rounded-[10px] w-[50px] h-[50px] flex items-center justify-center"
      >
        <Search className="w-6 h-6 text-[#FFFFFF]" />
      </button>
    </>
  );
}

export default SearchInput;
