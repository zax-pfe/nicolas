import React, { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

export default function SplitWords({
  children,
  delay = 0.2,
  duration = 1,
  staggerAmount = 0.3,
}) {
  const textRef = useRef(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(SplitText);

      const split = new SplitText(textRef.current, {
        type: "chars, lines, words",
        autoSplit: true,
        mask: "lines",
      });

      const timeline = gsap.timeline({ defaults: { duration: duration } });

      timeline.to({}, { duration: delay }).from(split.words, {
        yPercent: 100,
        stagger: {
          amount: staggerAmount,
        },
      });

      gsap.to(timeline, {
        progress: 1,
        duration: timeline.duration(),
        ease: "power1.Out",
      });
    }, [delay]);
  });

  return <div ref={textRef}>{children}</div>;
}
