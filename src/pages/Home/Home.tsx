import React, { useState } from "react";

import HomeHero from "./components/HomeHero";
import HomeSearch from "./components/HomeSearch";
import HomeCategories from "./components/HomeCategories";
import HomeSimCards from "./components/HomeSimCards";

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1);

  return (
    <div className="">
      <div>
        <HomeHero />
        <div className="bg-[linear-gradient(180deg,#FFFFFF_6.01%,rgba(136,196,255,0.59)_100%)]">
          <div className="container pb-7">
            <HomeSearch />
            <HomeCategories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <HomeSimCards activeCategory={activeCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
