import { getImageUrl } from "@/config/imageUtils";
interface ImagePreviewProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  rounded?: boolean;
  className?: string;
}
export function ImagePreview({
  src,
  alt = "",
  width,
  height,
  rounded = true,
  className = "",
}: ImagePreviewProps) {
  const style =
    width !== undefined || height !== undefined
      ? { width: width ?? height, height: height ?? width }
      : undefined;
  return (
    <div
      style={style}
      className={`shrink-0 overflow-hidden border border-black/5 ${rounded ? "rounded-full" : "rounded-md"} ${className}`}
    >
      <img
        src={getImageUrl(src)}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
