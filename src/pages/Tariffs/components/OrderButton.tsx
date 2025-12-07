import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useTariffStore } from "@/store/tariffStore";
import { ArrowRight } from "lucide-react";

interface OrderButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const OrderButton = ({ onClick, disabled }: OrderButtonProps) => {
  const { selectedTariff, setSelectedTariff } = useTariffStore();
  const { setCartItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const handleOrderClick = async () => {
    if (!selectedTariff) return;

    try {
      if (isAuthenticated) {
        // Add tariff for each region with the selected eSIM count
        const promises = selectedTariff.regions.map((region) =>
          cartAPI.addToBasket({
            tariff_id: selectedTariff.id,
            quantity: selectedTariff?.count,
            region_id: region.id,
          })
        );

        const responses = await Promise.all(promises);
        // Update cart with the last response (all should have the same cart state)
        if (
          responses.length > 0 &&
          responses[responses.length - 1]?.data?.data?.items
        ) {
          setCartItems(responses[responses.length - 1].data.data.items);
        }
      } else {
        // For non-authenticated users, add to local storage
        const localStorageCart = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );

        selectedTariff.regions.forEach((region) => {
          const existingItemIndex = localStorageCart.findIndex(
            (item: any) =>
              item.tariff.id === selectedTariff.id &&
              item.region.id === region.id
          );

          if (existingItemIndex >= 0) {
            localStorageCart[existingItemIndex].quantity +=
              selectedTariff?.count;
          } else {
            localStorageCart.push({
              tariff: selectedTariff,
              region: region,
              quantity: selectedTariff?.count,
            });
          }
        });

        localStorage.setItem("cartItems", JSON.stringify(localStorageCart));
        setCartItems(localStorageCart);
      }

      setSelectedTariff(null);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center rounded gap-2 px-10 bg-[#112D6C] text-white font-bold text-[28px] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Оформить заказ <ArrowRight className="w-7 h-7" />
    </button>
  );
};

export default OrderButton;
