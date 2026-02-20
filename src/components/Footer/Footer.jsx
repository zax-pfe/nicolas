import Link from "next/link";
import styles from "./style.module.scss";
import { useTransform, motion } from "framer-motion";
import Image from "next/image";
import nicogif from "../../../public/footer/nico.gif";
import HoverEffect from "@/components/AnimatedText/HoverEffect";

export default function Footer({ scrollProgress }) {
  const y = useTransform(scrollProgress, [0, 1], [-700, 0]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <motion.div style={{ y }} className={styles.footer}>
      <div className={styles.footerEl}>
        <button onClick={scrollToTop}>
          <HoverEffect>
            <p>Scroll to top ↑</p>
          </HoverEffect>
        </button>
        <Link href={"/"} scroll={false}>
          <HoverEffect>
            <p>← Go back home</p>
          </HoverEffect>
        </Link>
        <h2>© 2025 Nico C. Portfolio</h2>
      </div>
      <div className={styles.footerEl}>
        <div className={styles.footerImg}>
          <Image src={nicogif} alt="Nico C. Logo" fill objectFit="contain" />
        </div>
      </div>
      <div className={styles.footerEl}>
        <div className={styles.contactContainer}>
          <h3>Nicolas Casal</h3>
          <p>Based in Paris, France</p>
          <p>nicolascasal14@gmail.com</p>
          <p>+33 6 35 24 03 04</p>
          {/* <Link href="https://www.malt.fr/">Malt</Link> */}
        </div>
      </div>
    </motion.div>
  );
}
