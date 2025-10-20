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
  rounded = 2,
}: ImagePreviewProps) => {
  return (
    <div
      className={`w-[${width}px] h-[${height}px]`}
      style={{ width: width, height: height }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-left"
        style={{
          borderRadius: `${rounded}px`,
          outline: "1px solid rgba(0,0,0,0.1)",
          outlineOffset: "-1px",
        }}
      />
    </div>
  );
};
