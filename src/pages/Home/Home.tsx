import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SimCard from "../../components/SimCard/SimCard";
import { useCustomGet } from "../../hooks/useCustomGet";
import endpoints from "../../services/endpoints";
import i18n from "../../i18n";
import "./Home.css";
import { url } from "../../config/api";

export type RegionResponse = {
  status: number;
  data: Region[];
};

export type Region = {
  id: number;
  name_ru: string;
  name_en: string;
  image: string;
  status: string;
  category: any[];
  created_at: string;
};

type Country = {
  id: number;
  name: string;
  flag: string;
  plans: {
    type: string;
    traffic: string;
    cost: string;
    network: string[];
    status: string;
  }[];
};

type Category = {
  id: number;
  name: string;
  icon: string;
  countries: Country[];
};

const defaultCountries: Country[] = [
  {
    id: 1,
    name: i18n.language === "ru" ? "Турция" : "Turkey",
    flag: "🇹🇷",
    plans: [
      {
        type: "economy",
        traffic: "20 000 MB",
        cost: "30 days",
        network: ["4G", "5G"],
        status: "details",
      },
      {
        type: "standard",
        traffic: "20 000 MB",
        cost: "30 days",
        network: ["4G", "5G"],
        status: "details",
      },
      {
        type: "turbo",
        traffic: "20 000 MB",
        cost: "30 days",
        network: ["4G", "5G"],
        status: "details",
      },
    ],
  },
];

const createCategories = (regions: Region[]): Category[] => {
  return regions.map((region) => ({
    id: region.id,
    name: i18n.language === "ru" ? region.name_ru : region.name_en,
    icon: region.image,
    countries: defaultCountries,
  }));
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [id, setId] = useState(null);

  const { data: regionsData } = useCustomGet({
    key: "regions",
    endpoint: endpoints.getregions,
    enabled: true,
  });

  useEffect(() => {
    if (regionsData?.data?.length > 0 && !activeCategory) {
      const firstRegion = regionsData.data[0];
      setActiveCategory(
        i18n.language === "ru" ? firstRegion.name_ru : firstRegion.name_en
      );
    }
  }, [regionsData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setSearchTerm("");
  };

  const categories: Category[] = regionsData
    ? createCategories(regionsData.data)
    : [];

  const { data } = useCustomGet({
    key: ["tariffs"],
    endpoint: endpoints.tariffs,
  });

  const { data: tariffsRegion } = useCustomGet({
    key: ["tariffsRegion", id],
    endpoint: endpoints.tarrifsById,
    params: { category_id: id },
    enabled: !!id,
  });

  // const filteredCategories = categories
  //   .filter((category) => !activeCategory || category.name === activeCategory)
  //   .map((category) => ({
  //     ...category,
  //     countries: category.countries.filter(
  //       (country) =>
  //         (i18n.language === "ru" ? country.name : t(`sims.${country.name}`))
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         (i18n.language === "ru" ? category.name : t(`sims.${category.name}`))
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase())
  //     ),
  //   }))
  //   .filter((category) => category.countries.length > 0);

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">{t("sims.title")}</h1>
        <p className="subtitle">{t("sims.subtitle")}</p>
        <p className="subtitle">{t("sims.subtitle2")}</p>
        <input
          type="text"
          placeholder={t("sims.search_placeholder")}
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="category-buttons">
          {data?.data?.map((category: any) => (
            <button
              key={category.id}
              onClick={() => {
                handleCategoryClick(category.name);
                setId(category.id);
              }}
              className={
                activeCategory === category.name
                  ? "category-button active"
                  : "category-button"
              }
            >
              {category.name}{" "}
              <img
                className="country-img"
                src={`${url}${category.icon}`}
                alt=""
              />
            </button>
          ))}
        </div>
        {tariffsRegion?.data?.map((category: any, ind: any) => (
          <div key={category.id} className="category-section">
            <div className="card-grid">
              <SimCard
                key={ind}
                flag={category.image}
                country={category.name}
                plans={category?.tariffs}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
