"use client";
import { useEffect, useContext, useState, use } from "react";
import { FollowerContext } from "@/context/FollowerContext";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import styles from "./style.module.scss";

const variant = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const appearVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function LerpedFollowPage({ videoPlaying }) {
  const { active } = useContext(FollowerContext);
  const [mousemoved, setMouseMoved] = useState(false);
  // console.log("LerpedFollow active:", active);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [active, mouseX, mouseY]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!mousemoved) {
        setMouseMoved(true);
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {mousemoved && (
        <AnimatePresence>
          {active ? (
            <motion.div
              className={styles.lerpedFollowerActive}
              variants={variant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="active"
              style={{
                x: springX,
                y: springY,
                left: 0,
                top: 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {videoPlaying ? <div>Pause</div> : <div>Play</div>}
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              className={styles.lerpedFollowerNotActive}
              variants={variant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                x: springX,
                y: springY,
                left: 0,
                top: 0,
              }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
