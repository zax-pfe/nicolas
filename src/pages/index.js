"use client";
import { useEffect, useContext } from "react";
import Hero from "@/components/Hero/Hero";
import Inner from "@/components/Layout/Inner";
import { IsLoadingContext } from "@/context/IsLoadingContext";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  // const { scrollYProgress } = useLenisScroll();
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = "wait";
    }
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
    }, 2100);
    return () => clearTimeout(timer);
  }, [setIsLoading, isLoading]);
  return (
    <>
      {isLoading && <Loader />}
      <Inner>
        <Hero />
      </Inner>
    </>
  );
}
