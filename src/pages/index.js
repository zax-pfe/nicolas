"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import styles from "./page.module.scss";
import useLenisScroll from "@/hooks/useLenisScroll";
import Inner from "@/components/Layout/Inner";

export default function Home() {
  // const { scrollYProgress } = useLenisScroll();

  return (
    <Inner>
      <Hero />
    </Inner>
  );
}
