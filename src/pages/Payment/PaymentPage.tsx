import { useTariffStore } from "@/store/tariffStore";
import { useNavigate } from "react-router-dom";

import { ASSETS } from "@/assets";
import CartItem from "../Profile/components/CartItem";

const PaymentPage = () => {
  const { selectedTariffs } = useTariffStore();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="py-6 grow flex flex-col">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-[15px] mb-[26px]"
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
          <h1 className="text-[30px] font-bold text-[#0D141C]">Оплата</h1>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
          <div className="flex flex-col gap-3">
            {selectedTariffs.map((tariff) => (
              <CartItem key={tariff.id} tariff={tariff} />
            ))}
          </div>
          <div className="sticky top-4 h-max">
            <div className="flex flex-col gap-[26px]">
              <form className="flex items-center gap-2">
                <div className="flex flex-col gap-2 relative w-full">
                  <label
                    className="absolute top-0 left-[16px] bg-white px-1 translate-y-[-50%] text-[12px] font-medium text-[#637381]"
                    htmlFor=""
                  >
                    Email
                  </label>
                  <input
                    className="border border-[#919EAB33] px-[14px] py-[18px] text-[14px] rounded-[8px] w-full"
                    type="email"
                    required
                    placeholder="Email"
                  />
                </div>
                <button className="bg-[#112D6C] h-[54px] px-[64px] rounded-[8px] text-[16px] font-medium text-white">
                  Далее
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;
