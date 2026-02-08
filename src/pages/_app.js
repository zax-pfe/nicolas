import "@/styles/globals.css";
import { ReactLenis } from "lenis/react";
import Head from "next/head";
import { StrictMode } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.scss";
import Link from "next/link";
import { useState } from "react";
import { IsLoadingProvider } from "@/context/IsLoadingContext";
import { FollowerProvider } from "@/context/FollowerContext";
import { DeviceModeProvider } from "@/context/DeviceContext";

export default function App({ Component, pageProps, router }) {
  // const [enableLenis, setEnableLenis] = useState(true);
  // if (router?.route?.startsWith("/projects")) {
  //   setEnableLenis(false);
  // }
  const enableLenis = !router?.route?.startsWith("/projects"); // désactiver sur /projects

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <IsLoadingProvider>
        <DeviceModeProvider>
          <FollowerProvider>
            {enableLenis ? (
              <ReactLenis root                
              options={{
                  infinite: true,
                  syncTouch: true,
                  lerp: 0.1,
                  duration: 1.2,

                  
                  smoothWheel: true,
                }}>
                <AnimatePresence mode="wait">
                  <Component {...pageProps} key={router.route} />
                </AnimatePresence>
              </ReactLenis>
            ) : (
              <ReactLenis root 
              options={{
                  infinite: false,
                  syncTouch: true,
                  lerp: 0.1,
                  duration: 1.2,
                  smoothWheel: true,
                  smoothTouch: false,
                }}>
                <AnimatePresence mode="wait">
                  <Component {...pageProps} key={router.route} />
                </AnimatePresence>
              </ReactLenis>
            )}
          </FollowerProvider>
        </DeviceModeProvider>
      </IsLoadingProvider>
    </>
  );
}
