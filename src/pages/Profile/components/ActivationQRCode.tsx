import React from "react";
import { getImageUrl } from "@/config/imageUtils";

interface ActivationQRCodeProps {
  qrCode: string;
}

const ActivationQRCode: React.FC<ActivationQRCodeProps> = ({ qrCode }) => {
  return (
    <div className="ew-installation-qr">
      <img
        className="w-full h-full object-contain"
        src={getImageUrl(qrCode)}
        alt="QR Code"
      />
    </div>
  );
};

export default ActivationQRCode;
