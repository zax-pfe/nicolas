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
  // console.log("LerpedFollow active:", active);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const previousMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Créer les valeurs de scale pour le squeeze
  const scaleX = useSpring(1, { stiffness: 300, damping: 20 });
  const scaleY = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    // Option 1: Throttle simple (16ms)
    const handleMove = (e) => {
      const now = Date.now();

      // Limiter à 60fps max (16ms entre chaque update)
      if (now - lastUpdateTime.current < 16) {
        return;
      }

      // Stocker la position actuelle
      currentMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    // Option 2: RequestAnimationFrame pour synchroniser avec le rendu
    const animate = () => {
      const deltaX = currentMouse.current.x - previousMouse.current.x;
      const deltaY = currentMouse.current.y - previousMouse.current.y;

      // Option 3: Vérifier delta minimal (> 2 pixels)
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance > 50) {
        // Annuler le timer précédent
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        const velocity = Math.min(distance * 3, 150);

        const directionRatio =
          Math.abs(deltaX) / (Math.abs(deltaX) + Math.abs(deltaY) + 0.001);

        const velocityNormalized = Math.min(velocity * 4, 150) / 150;

        const scaleXValue = 1 + (directionRatio * velocityNormalized - 0.3);
        const scaleYValue =
          1 + ((1 - directionRatio) * velocityNormalized - 0.3);

        scaleX.set(scaleXValue);
        scaleY.set(scaleYValue);

        // Mettre à jour la position du curseur
        mouseX.set(currentMouse.current.x);
        mouseY.set(currentMouse.current.y);

        // Mettre à jour la dernière position
        previousMouse.current = { ...currentMouse.current };
        lastUpdateTime.current = Date.now();

        // Créer un timer pour réinitialiser les scales après l'arrêt
        timeoutRef.current = setTimeout(() => {
          scaleX.set(1);
          scaleY.set(1);
        }, 100);
      } else {
        // Même pour de petits mouvements, mettre à jour la position
        mouseX.set(currentMouse.current.x);
        mouseY.set(currentMouse.current.y);
      }

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
  }, [mouseX, mouseY, scaleX, scaleY]);

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
            scaleX: scaleX,
            scaleY: scaleY,
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
            scaleX: scaleX,
            scaleY: scaleY,
            left: 0,
            top: 0,
          }}
          transition={{ duration: 0.2 }}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
