import HeaderLeft from "./components/HeaderLeft";
import HeaderRight from "./components/HeaderRight";

const Navbar: React.FC = () => {
  return (
    <header className="relative z-[11]">
      <div className="container">
        <div className="flex relative z-[1] justify-between items-center my-[10px]">
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
