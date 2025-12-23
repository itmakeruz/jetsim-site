import { ImagePreview } from "@/components/ImgCards";

interface TariffHeaderProps {
  image: string;
  title: string;
}

const TariffHeader: React.FC<TariffHeaderProps> = ({ image, title }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full gap-2.5">
        <ImagePreview src={image} alt={title} width={40} height={40} />
        <h3 className="font-normal w-full text-lg md:text-xl lg:text-2xl leading-[1] tracking-[0px]">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default TariffHeader;
