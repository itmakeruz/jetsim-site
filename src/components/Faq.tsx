import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface FAQProps {
  items: {
    question: string;
    answer: ReactNode;
  }[];
}

/**
 * Каждый пункт — отдельный компонент со своим состоянием.
 * Раньше useState вызывался внутри items.map(), что нарушает правила хуков:
 * работало только пока список не меняет длину и порядок.
 */
const FaqItem = ({ question, answer }: { question: string; answer: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-200 ${
        open ? "border-main-blue/40" : "border-black/10 hover:border-main-blue/30"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <h3 className="text-[16px] md:text-[17px] font-semibold leading-[1.35] text-[#0d141c]">
          {question}
        </h3>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? "rotate-180 bg-main-blue text-white" : "bg-main-blue/10 text-main-blue"
          }`}
        >
          <ChevronDown size={17} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="border-t border-black/10 px-5 pb-5 pt-4 text-[15px] leading-[1.65] text-[#4f7096] md:px-6 md:pb-6
                [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mt-1.5 [&_li]:marker:text-main-blue"
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = ({ items }: FAQProps) => {
  return (
    <div className="mx-auto flex max-w-[860px] flex-col gap-3">
      {items.map((item) => (
        <FaqItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;
