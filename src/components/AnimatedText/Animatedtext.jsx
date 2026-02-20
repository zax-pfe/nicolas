import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

export default function AnimatedText({
  children,
  delay = 0.2,
  staggerAmount = 0.3,
}) {
  const textRef = useRef(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(SplitText);

      const split = new SplitText(textRef.current, {
        type: "chars, lines",
        autoSplit: false,
        mask: "lines",
      });

      // const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        opacity: 0,
        // yPercent: 100,
        ease: "expo.out",
        stagger: {
          amount: staggerAmount,
        },
        delay: delay,
      });
      // });
    });
  }, [delay]);

  return <div ref={textRef}>{children}</div>;
}
