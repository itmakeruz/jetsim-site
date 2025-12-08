import { useTariffStore } from "@/store/tariffStore";
import type { Tariff } from "@/types/api";
import { useRef, useState, useEffect } from "react";
import CartItem from "./components/CartItem";

const CartPage = () => {
  const { selectedTariffs, setSelectedTariffs } = useTariffStore();
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

  const handleIncrease = (tariffId: number) => {
    const updated = selectedTariffs.map((t) =>
      t.id === tariffId ? { ...t, count: (t.count || 1) + 1 } : t
    );
    setSelectedTariffs(updated);
  };

  const handleDecrease = (tariffId: number) => {
    const tariff = selectedTariffs.find((t) => t.id === tariffId);
    if (!tariff) return;

    if ((tariff.count || 1) > 1) {
      const updated = selectedTariffs.map((t) =>
        t.id === tariffId ? { ...t, count: (t.count || 1) - 1 } : t
      );
      setSelectedTariffs(updated);
    } else {
      // Agar count 1 bo'lsa, tariffni o'chirish
      const updated = selectedTariffs.filter((t) => t.id !== tariffId);
      setSelectedTariffs(updated);
    }
  };

  return (
    <div>
      {selectedTariffs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Savat bo'sh</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-4">
            {selectedTariffs.map((tariff: Tariff) => (
              <CartItem
                key={tariff.id}
                tariff={tariff}
                isDropdownOpen={!!openDropdowns[tariff.id]}
                onToggleDropdown={() => toggleDropdown(tariff.id)}
                dropdownRef={(el) => {
                  dropdownRefs.current[tariff.id] = el;
                }}
                onIncrease={() => handleIncrease(tariff.id)}
                onDecrease={() => handleDecrease(tariff.id)}
              />
            ))}
          </div>
          <button className="bg-[#112D6C] text-white px-4 py-2 rounded-md w-full text-[22px] font-semibold">
            Оплатить
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
