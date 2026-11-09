import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
export interface PremiumOption {
  value: string;
  label: string;
  shortLabel?: string;
  image?: string;
  description?: string;
  disabled?: boolean;
}
const EMPTY = "__jetsim_all__";
export default function PremiumSelect({
  label,
  value,
  options,
  onValueChange,
  compact = false,
  className = "",
}: {
  label: string;
  value: string;
  options: PremiumOption[];
  onValueChange: (value: string) => void;
  compact?: boolean;
  className?: string;
}) {
  const selected = options.find((option) => option.value === value);
  return (
    <Select.Root
      value={value || EMPTY}
      onValueChange={(next) => onValueChange(next === EMPTY ? "" : next)}
    >
      <Select.Trigger
        className={`ew-select-trigger ${compact ? "ew-select-trigger--compact" : ""} ${className}`}
        aria-label={label}
      >
        {selected?.image && (
          <img
            className="ew-select-flag"
            src={selected.image}
            width="25"
            height="17"
            alt=""
          />
        )}
        <Select.Value>
          {compact ? selected?.shortLabel || selected?.label : selected?.label}
        </Select.Value>
        <Select.Icon asChild>
          <ChevronDown size={15} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={`ew-select-content ${compact ? "ew-select-content--language" : ""}`}
          position="popper"
          align={compact ? "end" : "start"}
          sideOffset={9}
          collisionPadding={{ top: 76, bottom: 100, left: 14, right: 14 }}
        >
          <div className="ew-select-heading">
            {label}
            <span aria-hidden="true">↙</span>
          </div>
          <Select.ScrollUpButton className="ew-select-scroll">
            <ChevronUp size={15} />
          </Select.ScrollUpButton>
          <Select.Viewport className="ew-select-viewport">
            {options.map((option) => (
              <Select.Item
                className="ew-select-option"
                value={option.value || EMPTY}
                disabled={option.disabled}
                key={option.value || EMPTY}
                textValue={option.label}
              >
                {option.image && (
                  <img
                    className="ew-select-flag"
                    src={option.image}
                    width="28"
                    height="19"
                    alt=""
                  />
                )}
                <div className="ew-select-option-copy">
                  <Select.ItemText>{option.label}</Select.ItemText>
                  {option.description && <small>{option.description}</small>}
                </div>
                <Select.ItemIndicator className="ew-select-check">
                  <Check size={15} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="ew-select-scroll">
            <ChevronDown size={15} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
