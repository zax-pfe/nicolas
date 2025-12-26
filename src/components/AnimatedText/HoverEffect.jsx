import React, { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

gsap.registerPlugin(SplitText);
export default function HoverEffect({ children, staggerAmount = 0.15 }) {
  const topText = useRef(null);
  const botText = useRef(null);
  const timeline = useRef(null);

  useGSAP(() => {
    // document.fonts.ready.then(() => {

    const splitTop = new SplitText(topText.current, {
      type: "chars, lines",
      autoSplit: false,
      mask: "lines",
    });
    const splitBot = new SplitText(botText.current, {
      type: "chars, lines",
      autoSplit: false,
      mask: "lines",
    });
    gsap.set(splitBot.chars, { yPercent: 100 });

    timeline.current = gsap
      .timeline({ paused: true })
      .to(splitTop.chars, {
        yPercent: -100,
        // stagger: staggerAmount,
        ease: "power1.inOut",
        // duration: 0.3,
        stagger: {
          amount: staggerAmount,
        },
      })
      .to(
        splitBot.chars,
        {
          yPercent: 0,
          // stagger: staggerAmount,
          ease: "power1.inOut",
          // duration: 0.3,
          stagger: {
            amount: staggerAmount,
          },
        },
        "<"
      );
  }, []);

  const hoverIn = () => timeline.current.play();
  const hoverOut = () => timeline.current.reverse();

  return (
    <div
      className={styles.hoverEffect}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      <div className={styles.topText} ref={topText}>
        {children}
      </div>
      <div className={styles.botText} ref={botText}>
        {children}
      </div>
    </div>
  );
}
