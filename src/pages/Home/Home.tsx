import React from "react";

import HomeHero from "./components/HomeHero";
import HomeSearch from "./components/HomeSearch";
import HomeCategories from "./components/HomeCategories";
import HomeSimCards from "./components/HomeSimCards";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="content">
        <HomeHero />
        <HomeSearch />

        <HomeCategories />
        <HomeSimCards />
      </div>
    </div>
  );
};

export default Home;
