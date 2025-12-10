"use client";
import React from "react";
import styles from "./style.module.scss";
import AnimatedText from "@/components/AnimatedText/Animatedtext";
import Link from "next/link";
import SplitWords from "@/components/AnimatedText/SplitWords";

export default function Header({ mainpage = true }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerSection}>
        <AnimatedText delay={0}>
          <Link href={"/"} scroll={false}>
            <h1>Nicolas Casal</h1>
          </Link>
        </AnimatedText>
      </div>

      {mainpage ? (
        <>
          <div className={styles.headerSection}>
            <AnimatedText delay={0.2}>
              <div className={styles.infoContainer}>
                <p>What i do: </p>
                <p> Motion design</p>
                <p>graphism</p>
                <p>3D Art</p>
                <p>Animation</p>
              </div>
            </AnimatedText>
          </div>

          <div className={styles.headerSection}>
            <AnimatedText delay={0.3}>
              <div className={styles.aboutContainer}>
                <p>About me:</p>
                <p>
                  I m Nicolas Casal, a creative motion designer passionate about
                  bringing ideas to life through engaging animations.
                </p>
                <p>
                  From concept to post-production, I craft visuals that
                  communicate clearly and emotionally.
                </p>
                <p>
                  Let s talk if you d like to collaborate on your next project!
                </p>
              </div>
            </AnimatedText>
          </div>
        </>
      ) : (
        <>
          <div className={styles.backToHome}>
            <Link href={"/"} scroll={false}>
              <p>← Back to home</p>
            </Link>
          </div>
          {/* <div className={styles.headerSection} /> */}
        </>
      )}

      <div className={styles.headerSection} />
      <div className={styles.headerSection}>
        <AnimatedText delay={0.4}>
          <div className={styles.contactInfo}>
            <p>Based in Paris</p>
            <p>nicolascasal14@gmail.com</p>
            <p>+33 6 35 24 03 04</p>
          </div>
        </AnimatedText>
      </div>
    </div>
  );
}
