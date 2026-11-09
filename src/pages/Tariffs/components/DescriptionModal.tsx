import Modal from "@/components/jetstream/Modal";
export default function DescriptionModal({
  isOpen,
  onClose,
  title,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}) {
  return (
    <Modal open={isOpen} onClose={onClose} title={title}>
      <div className="js-modal-content whitespace-pre-line">{description}</div>
    </Modal>
  );
}
