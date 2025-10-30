import { useState, useEffect, useRef } from "react";

export function useVirtualScroll() {
  const [scroll, setScroll] = useState(0); // Valeur cumulative du scroll virtuel
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault(); // Empêche le vrai scroll
      // On récupère le deltaY de la molette
      const delta = e.deltaY;
      scrollRef.current += delta; // On cumule la valeur
      setScroll(scrollRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return scroll;
}
