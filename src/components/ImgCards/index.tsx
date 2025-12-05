import { getImageUrl } from "@/config/imageUtils";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  width?: number; // px bo'yicha o'lcham, default 40px
  height?: number; // px bo'yicha o'lcham, default 40px
  rounded?: number; // px bo'yicha radius, default 2px
}

export const ImagePreview = ({
  src,
  alt = "",
  width = 40,
  height = 30,
}: ImagePreviewProps) => {
  return (
    <div
      className={`w-[${width}px] h-[${height}px] rounded-full shrink-0 overflow-hidden border-2 border-white drop-shadow-[0px_0px_12px_#C1CDD9]`}
      style={{ width: width, height: height }}
    >
      <img
        src={getImageUrl(src)}
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};
