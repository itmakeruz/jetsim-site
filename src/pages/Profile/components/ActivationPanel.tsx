import React from "react";
import type { ActiveSim } from "@/types/api";
import { ASSETS } from "@/assets";
import DeviceInstructions from "./DeviceInstructions";
import ActivationQRCode from "./ActivationQRCode";
import SimDataSection from "./SimDataSection";
import SupportSection from "./SupportSection";

interface ActivationPanelProps {
  sim: ActiveSim;
}

const ActivationPanel: React.FC<ActivationPanelProps> = ({ sim }) => {
  return (
    <div className="grid md:grid-cols-[1fr_280px_1fr] gap-4 mt-5">
      {/* Left: Device Instructions */}
      <div className="flex flex-col md:gap-[10px] gap-1 h-full">
        <DeviceInstructions icon={ASSETS.apple} />
        <DeviceInstructions icon={ASSETS.android} />
      </div>

      {/* Center: QR Code */}
      <ActivationQRCode qrCode={sim.qr_code} />

      {/* Right: SIM Data and Support */}
      <div className="flex flex-col md:gap-[10px] gap-1 h-full">
        <SimDataSection sim={sim} />
        <SupportSection />
      </div>
    </div>
  );
};

export default ActivationPanel;
