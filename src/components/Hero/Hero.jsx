import React from "react";
import styles from "./style.module.scss";
import Header from "./Header/Header";
import LerpedFollow from "../LerpedFollow/LerpedFollow";
import { useState, useEffect, useContext } from "react";
import TestFrise from "./testFrise/TestFrise";
import { DeviceModeContext } from "@/context/DeviceContext";

export default function Hero({ data, about }) {
  const { deviceMode } = useContext(DeviceModeContext);
  return (
    <>
      <div className={styles.hero}>
        <Header mainpage={true} about={about} />
        <div className={styles.friseContainer}>
          <TestFrise data={data} />
        </div>
        {deviceMode !== "phone" && <LerpedFollow />}
      </div>
    </>
  );
}
