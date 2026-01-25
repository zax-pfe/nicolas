import React from "react";
import styles from "./style.module.scss";

export default function HeaderPhone() {
  return (
    <div className={styles.headerPhone}>
      <div className={styles.topContainer}>
        <div className={styles.name}>
          <h1>Nicolas Casal</h1>
        </div>
        <div className={styles.info}>
          <div className={styles.button}>
            <div className={styles.linesContainer}>njdksljkfslfjkd</div>
          </div>
          {/* <div className={styles.expertise}>
            <p> Motion design</p>
            <p>graphism</p>
            <p>3D Art</p>
            <p>Animation</p>
          </div> */}

          <div className={styles.contact}>
            <p>Based in Paris</p>
            <p>nicolascasal14@gmail.com</p>
            <p>+33 6 35 24 03 04</p>
          </div>
        </div>
      </div>
    </div>
  );
}
