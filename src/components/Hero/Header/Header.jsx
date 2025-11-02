import React from "react";
import styles from "./style.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerSection}>
        <h1>Nicolas Casal</h1>
      </div>
      <div className={styles.headerSection}>
        <div className={styles.infoContainer}>
          <p>What i do: </p>
          <p> Motion design</p>
          <p>graphism</p>
          <p>3D Art</p>
          <p>Animation</p>
        </div>
      </div>

      <div className={styles.headerSection}>
        <div className={styles.aboutContainer}>
          <p>About me:</p>
          <p>
            I m Nicolas Casal, a creative motion designer passionate about
            bringing ideas to life through engaging animations.
          </p>
          <p>
            From concept to post-production, I craft visuals that communicate
            clearly and emotionally.
          </p>
          <p>Let s talk if you d like to collaborate on your next project!</p>
        </div>
      </div>
      <div className={styles.headerSection} />

      <div className={styles.headerSection}>
        <div className={styles.contactInfo}>
          <p>Based in Paris</p>
          <p>nicolascasal14@gmail.com</p>
          <p>+33 6 35 24 03 04</p>
        </div>
      </div>
    </div>
  );
}
