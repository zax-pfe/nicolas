import React from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function Inner({ children }) {
  const anim = (variants) => {
    return {
      initial: "inital",
      animate: "enter",
      exit: "exit",
      variants: variants,
    };
  };

  const opacity = {
    inital: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 1 },
  };

  const slide = {
    inital: { top: "100vh" },
    enter: { top: "100vh" },
    exit: { top: "0", transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const perspective = {
    inital: { y: 0, opacity: 1 },
    enter: { y: 0, opacity: 1 },
    exit: {
      y: -100,
      opacity: 0.5,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div className={styles.inner}>
      <motion.div {...anim(slide)} className={styles.slide} />
      <motion.div {...anim(perspective)}>
        <motion.div {...anim(opacity)} className={styles.page}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
