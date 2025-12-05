import { useState } from "react";
import ModalLayout from "../Modal/Modal";
import HeaderLeft from "./components/HeaderLeft";
import HeaderRight from "./components/HeaderRight";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="relative z-[1]">
      <div className="container">
        <div className="flex relative z-[1] justify-between items-center my-[10px]">
          <HeaderLeft />
          <HeaderRight />
        </div>
        {isModalOpen && (
          <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
