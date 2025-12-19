import { ASSETS } from "@/assets";
import type { Region } from "@/types/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SingleRegionHead({ regions }: { regions: Region[] }) {
  const navigate = useNavigate();
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
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-[15px]"
        >
          <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#E8EDF2]">
            <img
              src={ASSETS.backArrow}
              alt="back"
              className="translate-x-[-1px]"
              width="13"
              height="22"
            />
          </div>
          <h1 className="text-[30px] font-bold text-[#0D141C]">
            {regions && regions.length > 0
              ? regions.map((region) => region.name).join(", ")
              : ""}
          </h1>
        </button>
        <button
          onClick={handleOpenModal}
          className="flex flex-col items-center gap-[6px] max-w-[150px]"
        >
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#E8EDF2]">
            <img
              src={ASSETS.questionMark}
              alt="question"
              width="25"
              height="25"
            />
          </div>
          <span className="text-sm font-medium text-[#4F7096] leading-[1.1]">
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
