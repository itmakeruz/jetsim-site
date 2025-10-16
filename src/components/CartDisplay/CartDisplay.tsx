import React from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import { getImageUrl } from "../../config/imageUtils";
import { Minus, Plus } from "lucide-react";

const CartDisplay: React.FC = () => {
  const { t } = useTranslation();
  const { cartItems, updateQuantity, addToCart } = useCart();

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="my-4 mx-auto w-max">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-lg font-medium text-gray-700">
          {t("cart.in_cart")}:
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white border border-main-blue rounded-lg px-4 py-2"
          >
            <img
              src={getImageUrl(item.flag)}
              alt={item.name}
              className="w-6 h-4 object-cover rounded-sm"
            />

            <span className="text-sm font-medium text-gray-700">
              {item.plan.type?.name}
            </span>

            <div className="flex items-center gap-2 bg-main-blue rounded-lg px-4 py-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="flex items-center justify-center w-8 h-6 text-sm font-medium text-white">
                {item.quantity}
              </span>

              <button
                onClick={() => addToCart(item.region, item.plan)}
                className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartDisplay;
