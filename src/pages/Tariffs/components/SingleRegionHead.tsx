import { ASSETS } from "@/assets";
import type { Region } from "@/types/api";
import { useState } from "react";
import BackButtonWithTitle from "@/components/BackButtonWithTitle";

function SingleRegionHead({ regions }: { regions: Region[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-[26px]">
        <BackButtonWithTitle
          title={
            regions && regions.length > 0
              ? regions.map((region) => region.name).join(", ")
              : ""
          }
        />
        <button
          onClick={handleOpenModal}
          className="flex flex-col items-center md:gap-[6px] gap-[4px] max-w-[150px]"
        >
          <div className="md:w-[40px] md:h-[40px] w-[35px] h-[35px] flex items-center justify-center rounded-full bg-[#E8EDF2]">
            <img
              src={ASSETS.questionMark}
              alt="question"
              className="md:w-[25px] w-[22px] md:h-[25px] h-[22px]"
            />
          </div>
          <span className="md:text-sm text-[12px] font-medium text-[#4F7096] leading-[1.1] md:block hidden">
            Как работают пакеты JetSim eSIM
          </span>
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-[10px] w-[95%] md:w-[90%] lg:w-[80%] max-w-[800px] relative shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#0D141C]">
                Как работают пакеты JetSim eSIM?
              </h2>

              <div className="w-full mb-6">
                <div className="relative w-full aspect-video bg-black rounded-[8px] overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/RI7Qn9ILBPg?si=wfq1abvW6R9HBLuC"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full bg-main-blue hover:bg-[#1565c0] text-white py-3 px-6 rounded-[8px] transition-colors duration-200 text-[20px] font-semibold hover:text-white"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleRegionHead;
