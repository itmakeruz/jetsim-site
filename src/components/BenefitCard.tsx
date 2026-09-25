interface BenefitProps {
  benefit1: string;
  benefit2: string;
  benefit3: string;
  benefit4: string;
}

/**
 * Эмодзи зашиты в начало строк перевода («📡 200+ стран…»), поэтому отделяем
 * первый символ и показываем его иконкой, а не частью текста абзаца.
 */
const splitIcon = (value: string) => {
  const trimmed = value.trim();
  const spaceIndex = trimmed.indexOf(" ");

  if (spaceIndex === -1) return { icon: "", text: trimmed };

  return {
    icon: trimmed.slice(0, spaceIndex),
    text: trimmed.slice(spaceIndex + 1),
  };
};

export default function BenefitCard({
  benefit1,
  benefit2,
  benefit3,
  benefit4,
}: BenefitProps) {
  const items = [benefit1, benefit2, benefit3, benefit4]
    .filter(Boolean)
    .map(splitIcon);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.text}
          className="flex h-full flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5
            transition-all duration-300 hover:-translate-y-0.5 hover:border-main-blue/35
            hover:shadow-[0_12px_28px_-16px_rgba(25,120,229,0.45)]"
        >
          {item.icon && (
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-main-blue/[0.08] text-[20px] leading-none"
            >
              {item.icon}
            </span>
          )}
          <p className="text-[15px] leading-[1.55] text-[#0d141c]">
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}
