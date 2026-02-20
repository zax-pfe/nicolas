"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./style.module.scss";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Barillet() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(null);

  const cumulativeRotation = useMotionValue(0);
  const lastScrollY = useRef(0);

  const radius = screenSize.height / 1.5;
  const baseX = 0;
  const baseY = screenSize.height / 2;
  const angleStep = 15;
  const snapTimeout = useRef(null);
  const isSnapping = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Annule le snap si on scrolle à nouveau
      if (snapTimeout.current) {
        clearTimeout(snapTimeout.current);
        isSnapping.current = false;
      }

      // Rotation normale
      cumulativeRotation.set(cumulativeRotation.get() + delta * 0.08);

      // Après 150ms sans scroll, on snap
      snapTimeout.current = setTimeout(() => {
        snapToNearestHorizontal();
      }, 50);
    };

    const snapToNearestHorizontal = () => {
      if (isSnapping.current) return;
      isSnapping.current = true;

      const currentRotation = cumulativeRotation.get();

      // Trouve l'angle le plus proche qui met un élément à l'horizontal
      // Les positions horizontales sont à chaque multiple de angleStep
      const normalizedAngle = currentRotation % 360;
      const snapPositions = [];

      // Génère toutes les positions de snap possibles (0°, 15°, 30°, etc.)
      for (let i = 0; i < 360 / angleStep; i++) {
        snapPositions.push(i * angleStep);
      }

      // Trouve la position la plus proche
      let nearestSnapIndex = 0;
      let nearestSnap = snapPositions.reduce((prev, curr, index) => {
        const isPrevCloser =
          Math.abs(curr - normalizedAngle) < Math.abs(prev - normalizedAngle);
        if (isPrevCloser) {
          nearestSnapIndex = index;
          return curr;
        }
        return prev;
      });

      // Calcule la différence en gardant le sens de rotation
      let diff = nearestSnap - normalizedAngle;

      // Gère le cas où on est proche de 360°/0°
      if (Math.abs(diff) > 180) {
        diff = diff > 0 ? diff - 360 : diff + 360;
      }

      const targetRotation = currentRotation + diff;

      setActiveIndex(nearestSnapIndex);

      // Anime vers la position de snap
      animate(cumulativeRotation, targetRotation, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => {
          isSnapping.current = false;
        },
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (snapTimeout.current) {
        clearTimeout(snapTimeout.current);
      }
    };
  }, [cumulativeRotation, angleStep]);

  return (
    <div className={styles.barillet}>
      <div className={styles.content}>
        <div className={styles.circle} />
        {Array.from({ length: 24 }, (_, i) => (
          <AngleBlock
            key={i}
            indice={i}
            angleStep={angleStep}
            radius={radius}
            baseX={baseX}
            baseY={baseY}
            rotation={cumulativeRotation}
          />
        ))}
      </div>
    </div>
  );
}

function AngleBlock({ indice, angleStep, radius, baseX, baseY, rotation }) {
  const baseAngle = angleStep * indice;

  const animatedAngle = useTransform(rotation, (r) => baseAngle - r);

  const x = useTransform(animatedAngle, (a) => {
    const radians = (a * Math.PI) / 180;
    return baseX + radius * Math.cos(radians);
  });

  const y = useTransform(animatedAngle, (a) => {
    const radians = (a * Math.PI) / 180;
    return baseY + radius * Math.sin(radians);
  });

  return (
    <motion.div
      className={styles.container}
      style={{ y: y, x: x, rotate: animatedAngle }}
    >
      {indice}
    </motion.div>
  );
}
