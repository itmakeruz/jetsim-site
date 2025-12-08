import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { cartAPI } from "../../services/api.service";
import StaticOrderCard from "../../components/StaticOrderCard/StaticOrderCard";
import Loader from "../../components/Loader";
import type { StaticOrderItem } from "../../types/api";
import "../../layouts/My/My.css";

const ActivePage = () => {
  const { t } = useTranslation();

  const {
    data: ordersResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["staticOrders", "active"],
    queryFn: async () => {
      return await cartAPI.getStaticOrders();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className="my">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-red-500 text-lg mb-4">{t("error.title")}</div>
          <p className="text-gray-600 mb-4">
            {error.message || "Failed to fetch orders"}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t("error.retry")}
          </button>
        </div>
      </div>
    );
  }

  const orders = ordersResponse?.data?.data || [];
  // Filter active orders - check for active status or orders with remaining days/traffic
  const activeOrders = orders.filter((order: StaticOrderItem) => {
    const status = order.status?.toLowerCase();
    return (
      status === "active" ||
      status === "активный" ||
      (order.remaining_days !== undefined && order.remaining_days > 0) ||
      (order.remaining_traffic !== undefined && order.remaining_traffic > 0)
    );
  });

  if (activeOrders.length === 0) {
    return (
      <div className="my">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-gray-500 text-lg mb-4">{t("my.no_orders")}</div>
          <p className="text-gray-400">{t("my.no_orders_description")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeOrders.map((order: StaticOrderItem) => (
        <StaticOrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default ActivePage;
