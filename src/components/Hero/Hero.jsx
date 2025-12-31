import React from "react";
import styles from "./style.module.scss";
import Header from "./Header/Header";
import LerpedFollow from "../LerpedFollow/LerpedFollow";
import { useState } from "react";
import TestFrise from "./testFrise/TestFrise";

export default function Hero() {
  return (
    <>
      <div className={styles.hero}>
        <Header mainpage={true} />
        <div className={styles.friseContainer}>
          <TestFrise />
        </div>
        <LerpedFollow />
      </div>
    </>
  );
}
