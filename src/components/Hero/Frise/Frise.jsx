import React, { useEffect, useState, useRef } from "react";
import styles from "./style.module.scss";
import Lenis from "lenis";

import {
  motion,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { projects } from "../../../data/projects";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import useScroll from "@/hooks/useScroll";
const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

import useMeasure from "react-use-measure";

export default function Frise({ scrollYProgress }) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis = lenis;
  }, []);

  const progress = useTransform(scrollYProgress, [0, 1], [0, -50000]);

  let [ref, { width }] = useMeasure();
  const [currentX, setCurrentX] = useState(0);

  // const smoothProgress = useSpring(progress, {
  //   stiffness: 200,
  //   damping: 30,
  //   mass: 0.5,
  // });

  // const scrollY = useScroll();

  let finalPosition = -width / 2;
  useMotionValueEvent(progress, "change", (latest) => {
    setCurrentX(latest);
    if (currentX <= finalPosition && currentX !== 0) {
      // setCurrentX(0);
      scrollTo(0, 0);
    }
  });
  // let finalPosition = 9400;

  useEffect(() => {
    console.log("width:", width);
    console.log("currentX - lastReset:", currentX);
    // console.log("scrollY:", scrollY);
    console.log("finalPosition:", finalPosition);
    // if (currentX <= finalPosition && currentX !== 0) {
    //   // scrollYProgress.set(0);
    //   // setCurrentX(0);
    //   // scrollTo(0, 0);
    // }
  }, [width, finalPosition, progress, currentX]);

  return (
    <div className={styles.friseContainer}>
      <motion.div ref={ref} className={styles.frise} style={{ x: progress }}>
        <ElementList />
        <ElementList />
      </motion.div>
    </div>
  );
}

function ElementList() {
  return (
    <>
      {projects.map((project) => {
        return (
          <FriseElement
            key={project.id}
            name={project.name}
            src={project.src}
            year={project.year}
            technos={project.technos}
            gif={project.gif}
          />
        );
      })}
    </>
  );
}

function FriseElement({ name, src, year, technos, gif }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.friseElement}>
      <div className={styles.nameContainer}>{name}</div>
      <div
        className={styles.contentContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={src}
          alt={name}
          className={styles.image}
          fill
          sizes="100%"
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
                  alt={name + " gif"}
                  className={styles.gif}
                  fill
                  sizes="100%"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
