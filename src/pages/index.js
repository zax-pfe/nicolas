"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import styles from "./page.module.scss";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
}
