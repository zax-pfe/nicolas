"use client";
import React from "react";
import styles from "./style.module.scss";
import AnimatedText from "@/components/AnimatedText/Animatedtext";
import Link from "next/link";
import SplitWords from "@/components/AnimatedText/SplitWords";
import HoverEffect from "@/components/AnimatedText/HoverEffect";

export default function Header({ mainpage = true, about }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerSection}>
        <AnimatedText delay={0.1} staggerAmount={0.6}>
          <Link href={"/"} scroll={false}>
            <h1>Nicolas Casal</h1>
          </Link>
        </AnimatedText>
      </div>

      {mainpage ? (
        <>
          <div className={styles.headerSection}>
            <div className={styles.infoContainer}>
              <AnimatedText delay={0.2} staggerAmount={0.7}>
                <p>What i do: </p>
              </AnimatedText>

              <p> Motion design</p>

              <p>graphism</p>

              <p>3D Art</p>

              <p>Animation</p>
            </div>
          </div>

          <div className={styles.headerSection}>
            <AnimatedText delay={0.3} staggerAmount={0.7}>
              <div className={styles.aboutContainer}>
                <p>About me:</p>

                {about?.aboutParagraphs.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
                {/* <p>
                  I m Nicolas Casal, a creative motion designer passionate about
                  bringing ideas to life through engaging animations.
                </p>
                <p>
                  From concept to post-production, I craft visuals that
                  communicate clearly and emotionally.
                </p>
                <p>
                  Let s talk if you d like to collaborate on your next project!
                </p> */}
              </div>
            </AnimatedText>
          </div>
        </>
      ) : (
        <>
          <div className={styles.backToHome}>
            <Link href={"/"} scroll={false}>
              <HoverEffect>
                <p>← Back to home</p>
              </HoverEffect>
            </Link>
          </div>
          {/* <div className={styles.headerSection} /> */}
        </>
      )}

      <div className={styles.headerSection} />
      <div className={styles.headerSection}>
        <div className={styles.contactInfo}>
          <AnimatedText delay={0.4} staggerAmount={0.7}>
            <p>Based in Paris</p>
          </AnimatedText>
          <p>nicolascasal14@gmail.com</p>
          <p>+33 6 35 24 03 04</p>
        </div>
      </div>
    </div>
  );
}
