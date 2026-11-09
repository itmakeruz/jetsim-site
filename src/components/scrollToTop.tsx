import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const AutoScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let observer: MutationObserver | undefined;
    const scroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return false;
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      return true;
    };
    if (!scroll()) {
      observer = new MutationObserver(() => {
        if (scroll()) observer?.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
    return () => observer?.disconnect();
  }, [pathname, hash]);
  return null;
};
