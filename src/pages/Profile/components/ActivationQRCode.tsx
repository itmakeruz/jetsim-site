import React from "react";
import { getImageUrl } from "@/config/imageUtils";

interface ActivationQRCodeProps {
  qrCode: string;
}

const ActivationQRCode: React.FC<ActivationQRCodeProps> = ({ qrCode }) => {
  return (
    <div className="border border-[#0000004D] rounded-[12px] overflow-hidden aspect-square">
      <img
        className="w-full h-full object-contain"
        src={getImageUrl(qrCode)}
        alt="QR Code"
      />
    </div>
  );
};

export default ActivationQRCode;
