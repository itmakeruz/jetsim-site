import { useTariffStore } from "@/store/tariffStore";
import { useAuthStore } from "@/store/authStore";
import { cartAPI } from "@/services/api.service";

const ESIMCounter = () => {
  const {
    selectedTariff,
    selectedTariffs,
    setSelectedTariffs,
    setSelectedTariff,
    increaseQuantity,
    decreaseQuantity,
  } = useTariffStore();
  const { isAuthenticated } = useAuthStore();

  const selectedTariffData = selectedTariffs.find(
    (t) => t.id === selectedTariff?.id
  );

  const handleDecrease = async () => {
    if (!selectedTariffData || !selectedTariff) return;

    // Agar tariff cart'da bo'lsa, decreaseQuantity ishlatamiz (backend'ga ham jo'natadi)
    if (selectedTariffData) {
      await decreaseQuantity(selectedTariff.id);

      // Local state'ni yangilash
      const updated = selectedTariffs.find((t) => t.id === selectedTariff.id);
      if (updated) {
        if (updated.quantity > 1) {
          setSelectedTariff({
            ...selectedTariff,
            quantity: updated.quantity,
          });
        } else {
          setSelectedTariff(null);
        }
      }
    }
  };

  const handleIncrease = async () => {
    if (!selectedTariff) return;

    const exists = selectedTariffs.find((t) => t.id === selectedTariff.id);

    if (exists) {
      // Agar tariff cart'da bo'lsa, increaseQuantity ishlatamiz (backend'ga ham jo'natadi)
      await increaseQuantity(selectedTariff.id);

      // Local state'ni yangilash
      const updated = selectedTariffs.find((t) => t.id === selectedTariff.id);
      if (updated) {
        setSelectedTariff({
          ...selectedTariff,
          quantity: updated.quantity,
        });
      }
    } else {
      // Agar tariff cart'da yo'q bo'lsa, avval qo'shamiz
      if (isAuthenticated) {
        try {
          await cartAPI.addToBasket({
            tariff_id: selectedTariff.id,
            quantity: 1,
          });
          // Cart'ni yangilash
          const { useTariffStore } = await import("@/store/tariffStore");
          await useTariffStore.getState().fetchCartFromAPI();

          // Local state'ni yangilash
          const updatedTariffs = useTariffStore.getState().selectedTariffs;
          const added = updatedTariffs.find((t) => t.id === selectedTariff.id);
          if (added) {
            setSelectedTariff({ ...selectedTariff, quantity: added.quantity });
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      } else {
        // localStorage'ga saqlash
        setSelectedTariffs([
          ...selectedTariffs,
          { ...selectedTariff, quantity: 1 },
        ]);
        setSelectedTariff({ ...selectedTariff, quantity: 1 });
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-black font-semibold text-[14px] leading-none">
        Количество eSIM
      </span>

      <div className="flex gap-2 h-[40px] py-2 px-2 items-center font-semibold justify-center bg-[#E8EBEE] rounded-[8px]">
        <button
          onClick={handleDecrease}
          className="w-[24px] h-[24px] text-[22px] flex items-center justify-center hover:bg-[#B4BDC8] rounded"
        >
          -
        </button>
        <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
        <span className="w-[40px] text-center leading-none text-[18px]">
          {selectedTariffData?.quantity || 0}
        </span>
        <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
        <button
          onClick={handleIncrease}
          className="w-[24px] h-[24px] text-[22px] flex items-center justify-center hover:bg-[#B4BDC8] rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ESIMCounter;
