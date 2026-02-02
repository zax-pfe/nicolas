import React, { useEffect } from "react";
import styles from "./style.module.scss";
import SplitWords from "../AnimatedText/SplitWords";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Footer from "../Footer/Footer";
import { useState, useContext } from "react";
import { FollowerContext } from "@/context/FollowerContext";
import LerpedFollowPage from "../LerpedFollow/LerpedFollowPage";
import Instaplay from "player.style/instaplay/react";
import { DeviceModeContext } from "@/context/DeviceContext";
import { projectsDescription } from "@/data/projectsDescription";
import jo2024 from "../../../public/projects/videoPlaceHolders/jo2024.jpg";

import Video from "next-video";

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
  const { deviceMode } = useContext(DeviceModeContext);

  // const [imageDimensions, setImageDimensions] = useState({
  //   width: 0,
  //   height: 0,
  // });

  const mediaContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mediaContainerRef,
    offset: ["start end", "end end"],
  });

  // const handleImageLoad = (event) => {
  //   const { naturalWidth, naturalHeight } = event.target;
  //   setImageDimensions({ width: naturalWidth, height: naturalHeight });
  //   console.log("Dimensions de l'image:", naturalWidth, "x", naturalHeight);
  // };

  useEffect(() => {
    console.log("VIDEO URL:", video);
  }, [video]);

  return (
    <>
      {deviceMode !== "phone" && (
        <LerpedFollowPage videoPlaying={videoPlaying} />
      )}

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
            variants={mediaVariants}
            initial="initial"
            animate="enter"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onClick={() => setVideoPlaying(!videoPlaying)}
          >
            <div className={styles.videoContainer}>
              <Video
                src={video}
                poster={placeHolderImage}
                // poster={jo2024}
                // blurDataURL={placeHolderImage}
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
