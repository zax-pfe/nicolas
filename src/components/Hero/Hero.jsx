import { useContext } from "react";
import styles from "./style.module.scss";
import Header from "./Header/Header";
import LerpedFollow from "../LerpedFollow/LerpedFollow";
import TestFrise from "./testFrise/TestFrise";
import { DeviceModeContext } from "@/context/DeviceContext";
import HeaderPhone from "../Phone/Header/HeaderPhone";

export default function Hero({ data, about }) {
  const { deviceMode } = useContext(DeviceModeContext);
  return (
    <>
      <div className={styles.hero}>
        {deviceMode === "phone" ? (
          <HeaderPhone about={about} />
        ) : (
          <Header mainpage={true} about={about} />
        )}
        <div className={styles.friseContainer}>
          <TestFrise data={data} />
        </div>
        {deviceMode !== "phone" && <LerpedFollow />}
      </div>
    </>
  );
}
