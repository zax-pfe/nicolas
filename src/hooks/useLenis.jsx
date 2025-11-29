import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function useLenis(callback) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    lenis.on("scroll", callback);
    requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", callback);
    };
  }, [callback]);
}
