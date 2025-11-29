"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { projects } from "../../../data/projects";

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export default function Frise() {
  const menuRef = useRef(null);
  const itemsRef = useRef([]);

  // Variables utilisées pour le scroll et l’animation
  const scrollY = useRef(0);
  const y = useRef(0);
  const oldScrollY = useRef(0);
  const scrollSpeed = useRef(0);

  // Dimensions
  const menuWidth = useRef(0);
  const itemWidth = useRef(0);
  const wrapWidth = useRef(0);

  useEffect(() => {
    const $menu = menuRef.current;
    const $items = itemsRef.current;

    // Initialisation des largeurs
    const updateSizes = () => {
      menuWidth.current = $menu.clientWidth;
      itemWidth.current = 10;
      wrapWidth.current = $items.length * itemWidth.current;
    };
    updateSizes();

    window.addEventListener("resize", updateSizes);

    /*--------------------
    Fonction de positionnement (équivalent à dispose)
    --------------------*/
    const dispose = (scroll) => {
      gsap.set($items, {
        x: (i) => i * itemWidth.current + scroll,
        modifiers: {
          x: (x) => {
            const s = gsap.utils.wrap(
              -itemWidth.current,
              wrapWidth.current - itemWidth.current,
              parseInt(x)
            );
            return `${s}px`;
          },
        },
      });
    };

    /*--------------------
    Lerp (interpolation douce)
    --------------------*/
    const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

    /*--------------------
    Événements de défilement (souris + drag/touch)
    --------------------*/
    const handleMouseWheel = (e) => {
      scrollY.current -= e.deltaY * 0.9;
    };

    let touchStart = 0;
    let touchX = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      touchStart = e.clientX || e.touches[0].clientX;
      isDragging = true;
      $menu.classList.add(styles.dragging);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      touchX = e.clientX || e.touches[0].clientX;
      scrollY.current += (touchX - touchStart) * 2.5;
      touchStart = touchX;
    };

    const handleTouchEnd = () => {
      isDragging = false;
      $menu.classList.remove(styles.dragging);
    };

    // Ajout des écouteurs
    $menu.addEventListener("wheel", handleMouseWheel);
    $menu.addEventListener("touchstart", handleTouchStart);
    $menu.addEventListener("touchmove", handleTouchMove);
    $menu.addEventListener("touchend", handleTouchEnd);
    $menu.addEventListener("mousedown", handleTouchStart);
    $menu.addEventListener("mousemove", handleTouchMove);
    $menu.addEventListener("mouseup", handleTouchEnd);
    $menu.addEventListener("mouseleave", handleTouchEnd);

    /*--------------------
    Boucle d’animation
    --------------------*/
    const render = () => {
      requestAnimationFrame(render);

      // Interpolation fluide (effet inertiel)
      y.current = lerp(y.current, scrollY.current, 0.1);

      // Positionnement infini
      dispose(y.current);

      // Calcul de la vitesse de défilement
      scrollSpeed.current = y.current - oldScrollY.current;
      oldScrollY.current = y.current;

      // Application du skew / rotation / scale selon la vitesse
      gsap.to($items, {
        skewX: -scrollSpeed.current * 0.2,
        rotate: scrollSpeed.current * 0.01,
        scale: 1 - Math.min(100, Math.abs(scrollSpeed.current)) * 0.003,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    render();

    return () => {
      window.removeEventListener("resize", updateSizes);
      $menu.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  return (
    <div className={styles.friseContainer} ref={menuRef}>
      {projects.map((project, i) => (
        <FriseElement
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          name={project.name}
          src={project.src}
          year={project.year}
          technos={project.technos}
          gif={project.gif}
        />
      ))}
    </div>
  );
}

/*--------------------
Composant d’un élément du carousel
--------------------*/
const FriseElement = React.forwardRef(function FriseElement(
  { name, src, year, technos, gif },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.friseElement}
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.nameContainer}>{name}</div>
      <div className={styles.contentContainer}>
        <Image
          src={src}
          alt={name}
          className={styles.image}
          fill
          sizes="100%"
          loading="lazy"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
            >
              <div className={styles.gifContainer}>
                <Image
                  src={gif}
                  alt={`${name} gif`}
                  className={styles.gif}
                  fill
                  sizes="100%"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
