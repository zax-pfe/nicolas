import Link from "next/link";
import styles from "./style.module.scss";
import { useTransform, motion } from "framer-motion";
import Image from "next/image";
import nico from "../../../../public/images/image 5.png";
import nicogif from "../../../../public/footer/nico.gif";
import HoverEffect from "@/components/AnimatedText/HoverEffect";

export default function FooterPhone({ scrollProgress }) {
  const y = useTransform(scrollProgress, [0, 1], [-700, 0]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <motion.div style={{ y }} className={styles.footer}>
      <div className={styles.footerText}>
        <div className={styles.contact}>
          <h3>Nicolas Casal</h3>
          <p>Contact me</p>
          <p>Based in Paris, France</p>
          <p>nicolascasal14@gmail.com</p>
          <p>+33 6 35 24 03 04</p>
        </div>
        <Link href={"/"} scroll={false}>
          <p className={styles.goBackButton}>← Go back home</p>
        </Link>
      </div>

      <div className={styles.footerImg}>
        <Image src={nicogif} alt="Nico C. Logo" fill objectFit="contain" />
      </div>
    </motion.div>
  );
}
