import "@/styles/globals.css";
import { ReactLenis } from "lenis/react";
import { StrictMode } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.scss";
import Link from "next/link";

export default function App({ Component, pageProps, router }) {
  return (
    <ReactLenis root options={{ infinite: true, syncTouch: true }}>
      <Link className={styles.link} href="/test">
        test
      </Link>
      <Link className={styles.link} href="/">
        Home
      </Link>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ReactLenis>
  );
}
