import React from "react";
import styles from "./style.module.scss";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function Cube({ position, index }) {
  const cubeRef = useRef(null);

  useLayoutEffect(() => {
    if (cubeRef.current) {
      gsap.set(cubeRef.current, { x: position + 10 * index });
    }
  }, [position, index]);

  return <div ref={cubeRef} className={styles.cube} />;
}
