import React from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { projects } from "../../../data/projects";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export default function Frise({ progress }) {
  return (
    <div className={styles.friseContainer}>
      <motion.div className={styles.frise} style={{ x: progress }}>
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
      </motion.div>
    </div>
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
        <Image src={src} alt={name} className={styles.image} fill />
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
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
