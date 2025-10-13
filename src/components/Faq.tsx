import "../styles/main.css"; 
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface FAQProps {
  items: {
    question: string;
    answer: ReactNode;
  }[];
}

const FAQ = ({ items }: FAQProps) => {
  return (
    <div className="faq-container">
      {items.map((item, index) => {
        const [open, setOpen] = useState(false);

        return (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpen(!open)}
            >
              <h3 className="faq-title">{item.question}</h3>
              {open ? (
                <ChevronUp className="faq-chevron" size={15} />
              ) : (
                <ChevronDown className="faq-chevron" size={15} />
              )}
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="faq-answer-container"
                >
                  <div className="faq-answer">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;