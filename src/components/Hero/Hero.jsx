import React from "react";
import styles from "./style.module.scss";
import Header from "./Header/Header";
import Frise from "./Frise/Frise";
import { useRef } from "react";

import {
  motion,
  useScroll,
  MotionValue,
  useTransform,
  AnimatePresence,
  useVelocity,
} from "framer-motion";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, -3000]);

  return (
    <>
      <div className={styles.hero}>
        <Header />
        <Frise progress={progress} />
      </div>
      <div className={styles.scroller} ref={ref} />
    </>
  );
}
