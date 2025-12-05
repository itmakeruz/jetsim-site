import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function HomeSearch() {
  const [inputValue, setInputValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <form className="mx-auto w-full max-w-[730px] border border-[#8A8AC7] bg-[#F0F0FB] rounded-[10px]">
      <input
        type="text"
        placeholder={t("sims.search_placeholder")}
        value={inputValue}
        onChange={handleSearch}
        className="w-full p-5 text-center text-base text-[#4F7096]  outline-none"
      />
    </form>
  );
}

export default HomeSearch;
