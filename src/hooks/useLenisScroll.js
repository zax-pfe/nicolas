import { useMotionValue } from "framer-motion";
import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenisScroll() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const lenis = new Lenis();

    function update(time) {
      lenis.raf(time);
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);

    // écoute des events Lenis
    lenis.on("scroll", ({ scroll, limit }) => {
      scrollY.set(scroll);
      scrollYProgress.set(scroll / limit);
    });

    return () => {
      lenis.destroy();
    };
  }, [scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
}
