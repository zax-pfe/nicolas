"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Barillet from "@/components/Barillet/Barillet";
import Lenis from "lenis";
import { use, useEffect } from "react";

import { useVirtualScroll } from "@/hooks/useScrollDetect";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const scroll = useVirtualScroll();
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
      <p>Scroll Delta: {scroll}</p>
      <Barillet />
    </div>
  );
}
