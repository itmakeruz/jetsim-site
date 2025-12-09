import { useTariffStore } from "@/store/tariffStore";
import type { cartTariff } from "@/types/api";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import CartItem from "./components/CartItem";

const CartPage = () => {
  const { selectedTariffs } = useTariffStore();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleDropdown = (tariffId: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [tariffId]: !prev[tariffId],
    }));
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(openDropdowns).forEach((tariffId) => {
        const ref = dropdownRefs.current[Number(tariffId)];
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdowns((prev) => ({
            ...prev,
            [tariffId]: false,
          }));
        }
      });
    };

    if (Object.values(openDropdowns).some((isOpen) => isOpen)) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdowns]);

  return (
    <div>
      {selectedTariffs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Savat bo'sh</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-4">
            {selectedTariffs.map((tariff: cartTariff) => (
              <CartItem
                key={tariff.id}
                tariff={tariff}
                isDropdownOpen={!!openDropdowns[tariff.id]}
                onToggleDropdown={() => toggleDropdown(tariff.id)}
                dropdownRef={(el) => {
                  dropdownRefs.current[tariff.id] = el;
                }}
              />
            ))}
          </div>
          <button
            onClick={() => navigate(APP_ROUTES.PAYMENT)}
            className="bg-[#112D6C] text-white px-4 py-2 rounded-md w-full text-[22px] font-semibold"
          >
            Оплатить
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
