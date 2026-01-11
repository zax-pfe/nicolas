"use client";
import { useEffect, useContext, useRef } from "react";
import { FollowerContext } from "@/context/FollowerContext";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import styles from "./style.module.scss";

const variant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

export default function LerpedFollow() {
  const { active } = useContext(FollowerContext);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const currentMouse = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Option 1: Throttle simple (16ms)
    const handleMove = (e) => {
      const now = Date.now();

      if (now - lastUpdateTime.current < 16) {
        return;
      }
      currentMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      mouseX.set(currentMouse.current.x);
      mouseY.set(currentMouse.current.y);

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className={styles.lerpedFollowerActive}
          variants={variant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          key="active"
          style={{
            x: springX,
            y: springY,

            left: 0,
            top: 0,
          }}
          transition={{ duration: 0.2 }}
        >
          Discover
        </motion.div>
      ) : (
        <motion.div
          key="inaactive"
          className={styles.lerpedFollowerNotActive}
          variants={variant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            x: springX,
            y: springY,

            left: 0,
            top: 0,
          }}
          transition={{ duration: 0.2 }}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
