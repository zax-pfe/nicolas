import React from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

const buttonVariants = {
  open: { rotate: 90, transition: { duration: 0.3, ease: "easeInOut" } },
  closed: { rotate: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

export default function HeaderPhone() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.headerPhone}>
      <div className={styles.topContainer}>
        <div className={styles.name}>
          <h1>Nicolas Casal</h1>
        </div>
        <div className={styles.info}>
          <div className={styles.button} onClick={() => setIsOpen(!isOpen)}>
            <motion.div
              className={styles.linesContainer}
              animate={isOpen ? "open" : "closed"}
              variants={buttonVariants}
            >
              {}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.line}></div>
              ))}
            </motion.div>
          </div>
          {/* <div className={styles.expertise}>
            <p> Motion design</p>
            <p>graphism</p>
            <p>3D Art</p>
            <p>Animation</p>
          </div> */}

          <div className={styles.contact}>
            <p>Based in Paris</p>
            <p>nicolascasal14@gmail.com</p>
            <p>+33 6 35 24 03 04</p>
          </div>
        </div>
      </div>
    </div>
  );
}
