import { useState } from "react";
import { getImageUrl } from "@/config/imageUtils";
import { destinationVisual } from "@/lib/destinationVisual";

/** A separate editorial cover; the small country flag is never stretched into a background. */
export default function DestinationPhoto({
  name,
  cover,
  className,
  width = 1000,
  height = 700,
  lazy = true,
}: {
  name: string;
  cover?: string | null;
  className: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}) {
  const uploaded = cover ? getImageUrl(cover) : null;
  const [failed, setFailed] = useState<string | null>(null);
  const src =
    uploaded && failed !== uploaded ? uploaded : destinationVisual(name);
  return (
    <img
      className={className}
      src={src}
      alt=""
      width={width}
      height={height}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      onError={
        uploaded && src === uploaded ? () => setFailed(uploaded) : undefined
      }
    />
  );
}
