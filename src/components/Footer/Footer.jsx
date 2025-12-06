import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { useTransform, motion } from "framer-motion";

export default function Footer({ scrollProgress }) {
  const y = useTransform(scrollProgress, [0, 1], [-700, 0]);

  return (
    <motion.div style={{ y }} className={styles.footer}>
      {/* <Link href="/">Go back home</Link> */}
      <div className={styles.footerEl}>
        <button> Top of the Page</button>
        <h2>© 2025 Nico C. Portfolio</h2>
      </div>
      <div className={styles.footerEl}></div>
      <div className={styles.footerEl}></div>
    </motion.div>
  );
}
