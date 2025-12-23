import { ImagePreview } from "@/components/ImgCards";
import { toast } from "react-toastify";

interface TariffHeaderProps {
  image: string;
  title: string;
  iccid?: string;
}

const TariffHeader: React.FC<TariffHeaderProps> = ({ image, title, iccid }) => {
  const handleCopyIccid = (iccid: string) => {
    navigator.clipboard.writeText(iccid);
    toast.success(iccid);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full gap-2.5">
        <ImagePreview src={image} alt={title} width={40} height={40} />
        <h3 className="font-normal w-full text-lg md:text-xl lg:text-2xl leading-[1] tracking-[0px]">
          {title}
        </h3>
        {iccid && (
          <span
            title={iccid}
            onClick={() => handleCopyIccid(iccid)}
            className="text-sm cursor-copy text-black font-bold"
          >
            ...{iccid?.slice(-5)}
          </span>
        )}
      </div>
    </div>
  );
};

export default TariffHeader;
