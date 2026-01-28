import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import styles from "./style.module.scss";
import { useLenis } from "lenis/react";
import FriseElement from "./FriseElement";
import { motion } from "framer-motion";
import { DeviceModeContext } from "@/context/DeviceContext";

const friseVariants = {
  initial: { scale: 0.95, y: 50 },
  enter: {
    scale: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] },
  },
};

// Configuration des dimensions
const CONFIG = {
  ELEMENT_WIDTH_DESKTOP: 500,
  ELEMENT_WIDTH_MOBILE: 300,
  GAP: 20,
  AUTO_SPEED_NORMAL: -0.6,
  AUTO_SPEED_HOVERED: -0.1,
  DRAG_MULTIPLIER: 1.2,
  FRICTION: 0.95,
  SCROLL_MULTIPLIER: 0.5,
};

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function TestFrise({ data }) {
  const { deviceMode } = useContext(DeviceModeContext);

  // États pour les dimensions
  const isPhone = deviceMode === "phone";
  const elementWidth = isPhone
    ? CONFIG.ELEMENT_WIDTH_MOBILE
    : CONFIG.ELEMENT_WIDTH_DESKTOP;
  const totalWidth = data.length * (elementWidth + CONFIG.GAP);

  // État pour le hover
  const [indexHovered, setIndexHovered] = useState(null);

  // Initialisation des positions
  const initialPositions = useMemo(() => {
    const itemWidth = elementWidth + CONFIG.GAP;
    const start = -totalWidth / 2;
    return Array.from({ length: data.length }, (_, i) => start + i * itemWidth);
  }, [data.length, elementWidth, totalWidth]);

  const [positions, setPositions] = useState(initialPositions);

  // Réinitialiser les positions quand les dimensions changent
  useEffect(() => {
    setPositions(initialPositions);
  }, [initialPositions]);

  // Refs pour le drag sur mobile
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const dragVelocityRef = useRef(0);

  // Gestion du scroll Lenis (desktop uniquement)
  useLenis(({ velocity }) => {
    if (isPhone) return;

    setPositions((prevPositions) =>
      prevPositions.map((pos) => pos - velocity * CONFIG.SCROLL_MULTIPLIER),
    );
  });

  // Animation automatique (desktop) ou par drag (mobile)
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setPositions((prevPositions) => {
        let speed = 0;

        if (isPhone) {
          // Mobile : utilise la vélocité du drag
          speed = dragVelocityRef.current * CONFIG.DRAG_MULTIPLIER;
          dragVelocityRef.current *= CONFIG.FRICTION;
        } else {
          // Desktop : défilement automatique (plus lent si hover)
          speed =
            indexHovered !== null
              ? CONFIG.AUTO_SPEED_HOVERED
              : CONFIG.AUTO_SPEED_NORMAL;
        }

        // Déplacer tous les éléments ensemble avec le même speed
        return prevPositions.map((pos) => {
          // Boucle infinie
          return mod(pos + speed + totalWidth / 2, totalWidth) - totalWidth / 2;
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPhone, indexHovered, totalWidth]);

  // Gestion du drag sur mobile
  useEffect(() => {
    if (!isPhone) return;

    const handleTouchStart = (e) => {
      isDraggingRef.current = true;
      lastXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current) return;

      const currentX = e.touches[0].clientX;
      const deltaX = currentX - lastXRef.current;

      dragVelocityRef.current = deltaX;
      lastXRef.current = currentX;
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPhone]);

  return (
    <motion.div
      variants={friseVariants}
      initial="initial"
      animate="enter"
      className={styles.pageContainer}
    >
      {data.map((project, index) => (
        <FriseElement
          key={project._id}
          name={project.name}
          src={project.cover}
          year={project.year}
          technos={project.technos}
          gif={project.gif}
          position={positions[index]}
          index={index}
          link={project.link}
          setIndexHovered={setIndexHovered}
          width={elementWidth}
        />
      ))}
    </motion.div>
  );
}
