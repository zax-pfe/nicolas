"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import styles from "./page.module.scss";
import useLenisScroll from "@/hooks/useLenisScroll";

export default function Home() {
  // const { scrollYProgress } = useLenisScroll();

  return (
    <div>
      <Hero />
    </div>
  );
}
