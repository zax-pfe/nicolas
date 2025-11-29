import { useState, useEffect } from "react";

export default function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialise la valeur au chargement

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
