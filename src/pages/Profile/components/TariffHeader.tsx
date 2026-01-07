import { ImagePreview } from "@/components/ImgCards";
import { toast } from "react-toastify";

interface TariffHeaderProps {
  id?: number;
  image: string;
  title: string;
}

const TariffHeader: React.FC<TariffHeaderProps> = ({ id, image, title }) => {
  const handleCopyId = (id: number) => {
    navigator.clipboard.writeText(id.toString());
    toast.success(id);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full gap-2.5">
        <ImagePreview src={image} alt={title} width={40} height={40} />
        <h3
          title={title}
          className="font-normal line-clamp-1 w-full text-lg md:text-xl lg:text-2xl leading-[1] tracking-[0px]"
        >
          {title}
        </h3>
        {id && (
          <span
            onClick={() => handleCopyId(id)}
            className="text-sm text-black shrink-0 font-bold"
          >
            ID: {id}
          </span>
        )}
      </div>
    </div>
  );
};

export default TariffHeader;
