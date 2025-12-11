import { ImagePreview } from "@/components/ImgCards";

interface TariffHeaderProps {
  image: string;
  name: string;
  title: string;
}

const TariffHeader: React.FC<TariffHeaderProps> = ({ image, name, title }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <ImagePreview
          src={image}
          alt={name}
          width={60}
          height={40}
          rounded={false}
        />
        <h3 className="font-normal text-lg md:text-xl lg:text-2xl leading-[1] tracking-[0px]">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default TariffHeader;
