import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { useState, useLayoutEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { FollowerContext } from "@/context/FollowerContext";

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export default function FriseElement({
  name,
  src,
  year,
  technos,
  gif,
  position,
  index,
  link,
  setIndexHovered,
  width,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { setActive } = useContext(FollowerContext);

  const elementRef = useRef(null);

  function handleMouseEnter() {
    setIsHovered(true);
    setIndexHovered(index);
    setActive(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setIndexHovered(null);
    setActive(false);
  }

  useLayoutEffect(() => {
    if (elementRef.current) {
      gsap.set(elementRef.current, { x: position });
    }
  }, [position, index]);

  return (
    <Link
      className={styles.friseElement}
      ref={elementRef}
      href={link}
      style={{ width: width }}
    >
      <div className="relative">
        <div className={styles.nameContainer}>{name}</div>
        <div
          className={styles.contentContainer}
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
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
                <div />
                <div className={styles.gifContainer}>
                  <Image
                    src={gif}
                    alt={name + " gif"}
                    className={styles.gif}
                    fill
                    sizes="100%"
                  />
                </div>
                <div className={styles.descriptionContainer}>
                  <p>{year}</p>
                  {technos.map((techno, idx) => (
                    <span key={idx} className={styles.techno}>
                      {techno}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
}
