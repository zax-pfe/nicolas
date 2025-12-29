import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import SplitWords from "../AnimatedText/SplitWords";
import { motion } from "framer-motion";
import { useScroll, MotionValue, useTransform } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import { useRef } from "react";
import Footer from "../Footer/Footer";
import { useState, useContext } from "react";
import { FollowerContext } from "@/context/FollowerContext";
import LerpedFollowPage from "../LerpedFollow/LerpedFollowPage";
import Instaplay from "player.style/instaplay/react";

import Video from "next-video";
import test from "../../../videos/testvideo.mp4";
import testsmall from "../../../videos/testsmall.mp4";

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
  const [videoPlaying, setVideoPlaying] = useState(false);
  const { setActive } = useContext(FollowerContext);

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const mediaContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mediaContainerRef,
    offset: ["start end", "end end"],
  });

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    console.log("Dimensions de l'image:", naturalWidth, "x", naturalHeight);
  };

  return (
    <>
      <LerpedFollowPage videoPlaying={videoPlaying} />
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
            // className={styles.mediaContainer}
            variants={mediaVariants}
            initial="initial"
            animate="enter"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onClick={() => setVideoPlaying(!videoPlaying)}
          >
            {/* <Image
              src={placeHolderImage}
              alt={projectTitle}
              onLoad={handleImageLoad}
              width={imageDimensions.width}
              height={imageDimensions.height}

              // layout="fill"
              // objectFit="cover"
            /> */}
            <div className={styles.videoContainer}>
              <Video
                src={video}
                poster={placeHolderImage}
                theme={Instaplay}
                height="100%"
                width="100%"
              />
            </div>
          </motion.div>
          <div className={styles.description}>
            {projectsDescription.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </div>
        <Footer scrollProgress={scrollYProgress} />
      </div>
    </>
  );
}
