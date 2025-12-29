import "@/styles/globals.css";
import { ReactLenis } from "lenis/react";
import { StrictMode } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.scss";
import Link from "next/link";
import { useState } from "react";
import { IsLoadingProvider } from "@/context/IsLoadingContext";
import { FollowerProvider } from "@/context/FollowerContext";

export default function App({ Component, pageProps, router }) {
  // const [enableLenis, setEnableLenis] = useState(true);
  // if (router?.route?.startsWith("/projects")) {
  //   setEnableLenis(false);
  // }
  const enableLenis = !router?.route?.startsWith("/projects"); // désactiver sur /projects

  return (
    <>
      {enableLenis ? (
        <IsLoadingProvider>
          <FollowerProvider>
            <ReactLenis root options={{ infinite: true, syncTouch: true }}>
              <AnimatePresence mode="wait">
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </ReactLenis>
          </FollowerProvider>
        </IsLoadingProvider>
      ) : (
        <IsLoadingProvider>
          <FollowerProvider>
            <ReactLenis root options={{ infinite: false, syncTouch: true }}>
              <AnimatePresence mode="wait">
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </ReactLenis>
          </FollowerProvider>
        </IsLoadingProvider>
      )}
    </>
  );
}
