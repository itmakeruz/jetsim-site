import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getImageUrl } from "../../config/imageUtils";
import { Share, QrCode } from "lucide-react";
import { NetworkBadge } from "../Badge";

interface StaticOrderCardProps {
  order: any;
}

const StaticOrderCard: React.FC<StaticOrderCardProps> = ({ order }) => {
  const { t } = useTranslation();
  const [isQrOpen, setIsQrOpen] = useState(false);

  const totalTraffic = order.tariff.quantity_internet || 0;
  const usedTraffic = order.tariff.usage || 0;
  const remainingTraffic = Math.max(totalTraffic - usedTraffic, 0);

  const getRemainingTrafficProgress = () => {
    if (totalTraffic === 0) return 0;
    return Math.min((remainingTraffic / totalTraffic) * 100, 100);
  };

  const formatTraffic = (traffic: number) => {
    // 1000 MB dan katta bo‘lsa — GB formatda ko‘rsatamiz
    // if (traffic >= 1000) {
    //   return `${(traffic / 1000).toFixed(2)} ГБ`;
    // }
    return `${traffic.toLocaleString()} МБ`;
  };

  // const getTrafficProgress = () => {
  //   if (totalTraffic === 0) return 0;
  //   return Math.min((usedTraffic / totalTraffic) * 100, 100);
  // };

  const getDaysProgress = (remaining: number, total: number) => {
    return Math.min((remaining / total) * 100, 100);
  };

  const qrImageUrl = getImageUrl(order.tariff.qrcode || "");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {order.region.name}
          </h3>
          <p className="text-black text-sm">
            {t("sims.tariff")}:{" "}
            <span className="font-bold">{order.tariff?.name}</span>
          </p>
        </div>
        <div className="w-16">
          <img
            className="w-full h-full object-contain rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
            src={getImageUrl(order.region.image)}
            alt=""
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-4 mb-6">
        {/* Traffic */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {t("sims.trafic")}
            </span>
            <span className="text-sm font-bold text-gray-900">
              {formatTraffic(remainingTraffic)} / {formatTraffic(totalTraffic)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${getRemainingTrafficProgress()}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Remaining Days */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {t("sims.remaining")}:
            </span>
            <span className="text-sm font-bold text-gray-900">
              {order.tariff.day_left || order.tariff.validity_period}{" "}
              {t("sims.days")}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${getDaysProgress(
                  order.tariff.day_left || order.tariff.validity_period,
                  order.tariff.validity_period
                )}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Network Support */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            {t("sims.network")}:
          </span>
          <div className="flex gap-2">
            {order.tariff.is_4g && <NetworkBadge label="4G" />}
            {order.tariff.is_5g && <NetworkBadge label="5G" />}
          </div>
        </div>

        {/* Coverage Area */}
        <div>
          <span className="text-sm font-medium text-gray-700 mb-2 block">
            {t("sims.coverage")}:
          </span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {order.tariff.regions
                ?.slice(0, 4)
                .map((region: any, index: number) => (
                  <img
                    key={index}
                    src={getImageUrl(region.image)}
                    alt={region.name}
                    className="w-6 h-4 rounded-sm border border-white shadow-sm"
                  />
                ))}
            </div>
            <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">
              {t("sims.details")}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsQrOpen(true)}
          className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          {t("sims.connect")}
          <QrCode className="w-4 h-4" />
        </button>
        <button className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors">
          <Share className="w-4 h-4" />
        </button>
      </div>

      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setIsQrOpen(false)}
            className="absolute inset-0 bg-black/50"
          ></div>
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl max-w-sm w-[90%]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">QR</h4>
              <button
                onClick={() => setIsQrOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {qrImageUrl ? (
              <img
                src={qrImageUrl}
                alt="QR Code"
                className="w-full h-auto rounded-xl"
              />
            ) : (
              <p className="text-sm text-gray-500">{t("common.notFound")}</p>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-red-500 text-center mt-4 leading-relaxed">
        {t("sims.disclaimer")}
      </p>
    </div>
  );
};

export default StaticOrderCard;
