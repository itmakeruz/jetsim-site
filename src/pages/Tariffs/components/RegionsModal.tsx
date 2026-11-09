import Modal from "@/components/jetstream/Modal";
import { getImageUrl } from "@/config/imageUtils";
import type { Region } from "@/types/api";
export default function RegionsModal({
  isOpen,
  onClose,
  regions,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  regions: Region[];
  title: string;
}) {
  return (
    <Modal open={isOpen} onClose={onClose} title={title}>
      <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2">
        {regions.map((region) => (
          <li
            key={region.id}
            className="flex items-center gap-3 rounded-xl bg-white border border-black/5 p-3 text-sm"
          >
            <img
              className="w-7 h-7 object-cover rounded-full shrink-0"
              src={getImageUrl(region.image)}
              alt=""
              loading="lazy"
            />
            {region.name}
          </li>
        ))}
      </ul>
    </Modal>
  );
}
