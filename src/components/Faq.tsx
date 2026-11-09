import { Plus } from "lucide-react";
import type { ReactNode } from "react";

export default function FAQ({
  items,
}: {
  items: { question: string; answer: ReactNode }[];
}) {
  return (
    <div className="js-faq-list">
      {items.map((item, index) => (
        <details className="js-faq-item" key={item.question}>
          <summary>
            <span className="ew-faq-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.question}</span>
            <Plus aria-hidden="true" />
          </summary>
          <div className="js-faq-answer">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
