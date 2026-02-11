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
import FooterPhone from "../Phone/Footer/FooterPhone";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { DeviceModeContext } from "@/context/DeviceContext";

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

  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className={styles.carousel}>
                <CarouselItem className={styles.carouselItem}>
                  {/* <div className={styles.videoContainer}></div> */}
                  <VideoPlayer videoSrc={video} posterSrc={placeHolderImage} />
                </CarouselItem>
                <CarouselItem className={styles.carouselItem}>
                  aaaa
                </CarouselItem>
                <CarouselItem className={styles.carouselItem}>
                  aaaa
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>
          <div className={styles.description}>
            {projectsDescription.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </div>

        {deviceMode === "phone" ? (
          <FooterPhone scrollProgress={scrollYProgress} />
        ) : (
          <Footer scrollProgress={scrollYProgress} />
        )}
      </div>
    </>
  );
}

export function VideoPlayerCarousel({ videoSrcList, posterSrcList }) {
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {videoSrcList.map((videoSrc, index) => (
          <CarouselItem key={index}>
            <VideoPlayer videoSrc={videoSrc} posterSrc={posterSrcList[index]} />
            <span className="text-4xl font-semibold">
              dfddsfdsfsd{index + 1}
            </span>
          </CarouselItem>
        ))}
      </CarouselContent>
      {deviceMode !== "phone" && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}

export function VideoPlayer({ videoSrc, posterSrc }) {
  return (
    <div className={styles.videoContainer}>
      <Video
        src={videoSrc}
        poster={posterSrc}
        theme={Instaplay}
        height="100%"
        width="100%"
        muted={true}
      />
    </div>
  );
}
