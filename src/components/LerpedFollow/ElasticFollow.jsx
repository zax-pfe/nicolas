"use client";
import { useEffect, useRef } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import styles from "./style.module.scss";

const variant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

export default function ElasticFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previousMouse = useRef({ x: 0, y: 0 });

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Créer les valeurs de scale pour le squeeze
  const scaleX = useSpring(1, { stiffness: 300, damping: 20 });
  const scaleY = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMove = (e) => {
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      const velocity = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2) * 4, 150);
      // const scaleValue = (velocity / 150) * 0.2;

      // scaleX.set(1 + scaleValue);
      // scaleY.set(1 - scaleValue);

      // const velocity = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      // Ratio de direction (0 = vertical, 1 = horizontal)
      const directionRatio =
        Math.abs(deltaX) / (Math.abs(deltaX) + Math.abs(deltaY) + 0.001);

      // Normaliser la vélocité entre 0 et 1
      const velocityNormalized = Math.min(velocity * 4, 150) / 150;

      // Si mouvement horizontal → scaleX vers 1.5, scaleY vers 0.5
      // Si mouvement vertical → scaleX vers 0.5, scaleY vers 1.5
      const scaleXValue = 1 + (directionRatio * velocityNormalized - 0.2); // 0.5 à 1.5
      const scaleYValue = 1 + ((1 - directionRatio) * velocityNormalized - 0); // 0.5 à 1.5

      scaleX.set(scaleXValue);
      scaleY.set(scaleYValue);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, scaleX, scaleY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        scaleX: scaleX,
        scaleY: scaleY,
        left: 0,
        top: 0,
      }}
      className={styles.lerpedFollowerNotActive}
    ></motion.div>
  );
}
