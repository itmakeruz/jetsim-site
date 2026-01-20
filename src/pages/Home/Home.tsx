import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "@/constants";

import HomeHero from "./components/HomeHero";
import HomeSearch from "./components/HomeSearch";
import HomeCategories from "./components/HomeCategories";
import HomeSimCards from "./components/HomeSimCards";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type");

  // Valid category keys
  const validKeys = categories.map((cat) => cat.key);

  // Initialize from URL or default to "popular"
  const getCategoryFromUrl = (): string | null => {
    if (typeParam && validKeys.includes(typeParam)) {
      return typeParam;
    }
    return "popular";
  };

  const [activeCategory, setActiveCategory] = useState<string | null>(
    getCategoryFromUrl()
  );

  // Sync with URL when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlCategory = getCategoryFromUrl();
    setActiveCategory(urlCategory);
  }, [typeParam]);

  // Update URL when category changes
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
    if (category) {
      setSearchParams({ type: category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="">
      <div>
        <HomeHero />
        <div className="bg-[linear-gradient(180deg,#FFFFFF_6.01%,rgba(136,196,255,0.59)_100%)]">
          <div className="container pb-7">
            <HomeSearch />
            <HomeCategories
              activeCategory={activeCategory}
              setActiveCategory={handleCategoryChange}
            />
            <HomeSimCards activeCategory={activeCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
