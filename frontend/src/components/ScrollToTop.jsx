import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls window to top on every route change.
 * Also disables browser scroll-restoration so back-nav doesn't jump mid-page.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);
  return null;
}
