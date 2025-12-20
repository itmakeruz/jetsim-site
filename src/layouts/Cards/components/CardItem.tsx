import React from "react";

interface CardItemProps {
  image: string;
  heading: string;
  text: string;
  variant: "left" | "right"; // left = border-right, right = border-left
  gradientType: "green" | "purple";
  imageFirst?: boolean;
}

const GRADIENT_STYLES = {
  green: "linear-gradient(145.99deg, #ffffff 47.52%, #60ff78 117.94%)",
  purple:
    "linear-gradient(189.81deg, #ffffff -3.56%, rgba(222, 177, 255, 0.3) 109.77%)",
};

const CardItem: React.FC<CardItemProps> = ({
  image,
  heading,
  text,
  variant,
  gradientType,
  imageFirst = false,
}) => {
  const baseCardClasses =
    "flex items-center py-[30px] px-3 pb-10 pl-5 lg:py-[30px] lg:px-3 lg:pb-10 lg:pl-5 md:py-5 md:px-[10px] md:pb-[30px] md:pl-[15px] max-md:py-[15px] max-md:px-[10px] max-[475px]:py-2.5 max-[475px]:px-2 transition-all duration-[400ms] group max-md:border max-md:rounded-md max-md:flex-col max-md:text-center max-md:w-full max-md:max-w-[400px] max-[475px]:max-w-[300px]";

  const borderClasses =
    variant === "left"
      ? "border-t border-r border-b border-black/30 lg:border-l-0"
      : "border-t border-l border-b border-black/30 lg:border-r-0";

  const headingClasses =
    "text-[#0d141c] text-2xl lg:text-2xl md:text-xl max-md:text-lg max-[475px]:text-base leading-[19.36px] lg:leading-[19.36px] md:leading-4 max-md:leading-[14px] max-[475px]:leading-3 max-w-[290px] lg:max-w-[290px] md:max-w-[250px] max-md:max-w-full";

  const textClasses =
    "text-[#4f7096] text-base lg:text-base md:text-sm max-md:text-[13px] max-[475px]:text-xs leading-6 lg:leading-6 md:leading-5 max-md:leading-[18px] max-[475px]:leading-4 font-medium max-w-[325px] lg:max-w-[325px] md:max-w-[280px] max-md:max-w-full mt-2.5 lg:mt-2.5 md:mt-2 max-md:mt-1.5 max-[475px]:mt-[5px]";

  const imageClasses =
    "w-[105px] h-[105px] lg:w-[105px] lg:h-[105px] md:w-[90px] md:h-[90px] max-md:w-20 max-md:h-20 max-[475px]:w-[60px] max-[475px]:h-[60px] object-contain max-md:my-2.5 max-[475px]:my-2";

  const content = (
    <>
      <div>
        <h2 className={headingClasses}>{heading}</h2>
        <p className={textClasses}>{text}</p>
      </div>
      <img className={imageClasses} src={image} alt={heading} />
    </>
  );

  return (
    <div
      className={`${baseCardClasses} ${borderClasses}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = GRADIENT_STYLES[gradientType];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "";
      }}
    >
      {imageFirst ? (
        <>
          <img className={imageClasses} src={image} alt={heading} />
          <div>
            <h2 className={headingClasses}>{heading}</h2>
            <p className={textClasses}>{text}</p>
          </div>
        </>
      ) : (
        content
      )}
    </div>
  );
};

export default CardItem;
