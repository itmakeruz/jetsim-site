export const CartRender = () => {
  return (
    <div className="w-full">
      {/* {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 py-8">
          {t("profile.cart.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border border-[#0000004D] text-[14px] p-5 flex flex-col gap-2 rounded-[10px] relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-[40px]">
                    <img
                      className="w-full h-full object-contain rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
                      src={getImageUrl(item.region.image)}
                      alt=""
                    />
                  </div>
                  <h3 className="font-normal text-lg md:text-xl lg:text-2xl leading-[22.42px] tracking-[0px]">
                    {item.region.name}
                  </h3>
                </div>
              </div>
              <p>
                {t("sims.trafic")}{" "}
                <span className="font-bold">
                  {item.tariff.quantity_internet.toLocaleString()}мб
                </span>
              </p>
              <p>
                {t("sims.srok")}{" "}
                <span className="font-bold">
                  {item.tariff.validity_period} дней
                </span>
              </p>
              <p>
                {t("sims.set")}
                <span className="font-bold">
                  {" "}
                  {item.tariff.is_4g ? "4G" : ""}{" "}
                  {item.tariff.is_5g ? "5G" : ""}
                </span>
              </p>{" "}
              <p>
                {t("sims.trafic")}{" "}
                <span className="font-bold">
                  {item.tariff.quantity_internet.toLocaleString()}мб
                </span>
              </p>
              <p>
                {t("sims.price")}{" "}
                <span className="font-bold">
                  {item.tariff.price_sell.toLocaleString()} руб.
                </span>
              </p>
              <div className="w-full flex items-center gap-2">
                <p className="text-[12px]">Зона покрытия:</p>{" "}
                <div
                  className="relative flex h-[20px]"
                  ref={(el) => {
                    dropdownRefs.current[item.tariff.id] = el;
                  }}
                >
                  {item?.tariff?.regions
                    .slice(0, 4)
                    .map((region: Region, index: number) => (
                      <img
                        className="mr-[-5px] h-[20px] w-[24px] object-cover rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
                        src={getImageUrl(region.image)}
                        alt={region.name}
                        key={index}
                      />
                    ))}
                  <button
                    className="text-[14px] leading-[1.2] bg-main-blue text-white min-w-[95px] rounded-r-[10px] rounded-l-[2px] hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => toggleDropdown(item.tariff.id)}
                  >
                    Подробнее
                  </button>
                  {openDropdowns[item.tariff.id] && (
                    <div className="absolute top-full left-0 mt-1 rounded-[20px] p-2 z-50 min-w-[300px] max-h-[300px] overflow-y-auto bg-[#EFF6FF] flex flex-wrap gap-1">
                      {item.tariff.regions.map(
                        (region: Region, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-main-blue rounded-[20px] w-max"
                          >
                            <img
                              className="h-4 w-5 object-cover rounded-sm"
                              src={getImageUrl(region.image)}
                              alt={region.name}
                            />
                            <span className="text-xs text-white font-normal">
                              {region.name}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full border-[2px] items-center border-main-blue bg-main-blue rounded-[10px] overflow-hidden">
                <h3 className="bg-white rounded-l-[8px] w-full py-1 px-2 text-[20px] font-medium">
                  {item.tariff.type?.name}
                </h3>
                <div className="flex items-center gap-2 bg-main-blue rounded-lg px-4 py-2">
                  <button
                    onClick={() => removeFromCart(item.region, item.tariff)}
                    className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="flex items-center justify-center w-8 h-6 text-sm font-medium text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => addToCart(item.region, item.tariff)}
                    className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">
              Total: {cartTotal.toLocaleString()} руб.
            </span>
          </div>
          <button
            className="bg-[#007bff] text-white border-none py-2.5 px-6 rounded-[10px] text-base cursor-pointer w-full self-end disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBuyClick}
          >
            Оплатить
          </button>
        </div>
      )} */}
    </div>
  );
};
