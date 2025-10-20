interface NetworkBadgeProps {
  label: string;
}

export const NetworkBadge = ({ label }: NetworkBadgeProps) => {
  return (
    <span className="w-[53px] h-[32px] rounded-[6px] flex items-center justify-center bg-[#34C759] text-white font-bold text-sm">
      {label}
    </span>
  );
};
