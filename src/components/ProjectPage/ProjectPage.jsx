import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import SplitWords from "../AnimatedText/SplitWords";
import { motion } from "framer-motion";
import { useScroll, MotionValue, useTransform } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import { useRef } from "react";
import Footer from "../Footer/Footer";

const mediaVariants = {
  initial: { scale: 0.85 },
  enter: { scale: 1, transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] } },
};

export default function ProjectPage({
  projectTitle,
  projectSubTitle,
  placeHolderImage,
  projectsDescription,
  video,
}) {
  // useLenis(({ scroll }) => {
  //   console.log("Scroll amount:", scroll);
  // });

  const mediaContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mediaContainerRef,
    offset: ["start end", "end end"],
  });

  return (
    <div ref={mediaContainerRef}>
      <div className={styles.content}>
        <div className={styles.title}>
          <SplitWords delay={0.5} duration={0.7}>
            <h1>{projectTitle}</h1>
          </SplitWords>
        </div>
        <div className={styles.subTitle}>
          <SplitWords delay={0.7} duration={1} staggerAmount={0.4}>
            <h2>{projectSubTitle}</h2>
          </SplitWords>
        </div>
        <motion.div
          className={styles.mediaContainer}
          variants={mediaVariants}
          initial="initial"
          animate="enter"
        >
          <Image
            src={placeHolderImage}
            alt={projectTitle}
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <div className={styles.description}>
          {projectsDescription.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
        </div>
      </div>
      <Footer scrollProgress={scrollYProgress} />
    </div>
  );
}
