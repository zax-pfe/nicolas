import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

export default function ProjectPage({
  projectTitle,
  projectSubTitle,
  placeHolderImage,
  video,
}) {
  return (
    <div className={styles.projectPage}>
      <div className={styles.title}>
        <h1>{projectTitle}</h1>
      </div>

      <div className={styles.subTitle}>
        <h2>{projectSubTitle}</h2>
      </div>

      <div className={styles.mediaContainer}>
        <Image src={placeHolderImage} alt={projectTitle} />
      </div>
    </div>
  );
}
