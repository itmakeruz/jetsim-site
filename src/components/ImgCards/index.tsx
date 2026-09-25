import { getImageUrl } from "@/config/imageUtils";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  /** Размер в px. Если не задан — размер берётся из className (в т.ч. адаптивный) */
  width?: number;
  height?: number;
  rounded?: boolean;
  className?: string;
}

export const ImagePreview = ({
  src,
  alt = "",
  width,
  height,
  rounded = true,
  className = "",
}: ImagePreviewProps) => {
  // Класс w-[${width}px] использовать нельзя: Tailwind собирает только те классы,
  // которые видит в коде строкой, поэтому новое значение молча не применялось.
  // Инлайн-стиль ставим только если размер пришёл пропсами — иначе он перебил бы
  // адаптивные классы у вызовов, которые задают размер через className.
  const hasExplicitSize = width !== undefined || height !== undefined;
  const style = hasExplicitSize
    ? { width: width ?? height, height: height ?? width }
    : undefined;

  return (
    <div
      style={style}
      className={`${
        rounded ? "rounded-full" : "rounded-[2px]"
      } shrink-0 overflow-hidden border-2 border-white drop-shadow-[0px_0px_12px_#C1CDD9] ${className}`}
    >
      <img
        src={getImageUrl(src)}
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};
