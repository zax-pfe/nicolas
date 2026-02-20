import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import {
  useState,
  useLayoutEffect,
  useRef,
  useContext,
  useCallback,
  memo,
  useMemo,
} from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { FollowerContext } from "@/context/FollowerContext";
import { DeviceModeContext } from "@/context/DeviceContext";

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

function FriseElement({
  name,
  src,
  year,
  technos,
  gif,
  position,
  index,
  link,
  setIndexHovered,
  width,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { setActive } = useContext(FollowerContext);
  const { deviceMode } = useContext(DeviceModeContext);

  const elementRef = useRef(null);

  // Calculer si l'élément est visible en mode phone
  const isInViewPhone = useMemo(() => {
    if (deviceMode === "phone") {
      return position > -50 && position < 200;
    }
    return false;
  }, [deviceMode, position]);

  // Utiliser isInViewPhone pour déterminer l'état hover final
  const shouldShowHover = deviceMode === "phone" ? isInViewPhone : isHovered;

  const handleMouseEnter = useCallback(() => {
    if (deviceMode !== "phone") {
      setIsHovered(true);
      setIndexHovered(index);
      setActive(true);
    }
  }, [deviceMode, index, setIndexHovered, setActive]);

  const handleMouseLeave = useCallback(() => {
    if (deviceMode !== "phone") {
      setIsHovered(false);
      setIndexHovered(null);
      setActive(false);
    }
  }, [deviceMode, setIndexHovered, setActive]);

  useLayoutEffect(() => {
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        x: position,
        duration: 0,
        overwrite: true,
      });
    }
  }, [position]);

  useLayoutEffect(() => {
    if (deviceMode === "phone" && isInViewPhone) {
      setIndexHovered(index);
      setActive(true);
    } else if (deviceMode === "phone" && !isInViewPhone) {
      setIndexHovered(null);
      setActive(false);
    }
  }, [isInViewPhone, index, deviceMode, setIndexHovered, setActive]);

  return (
    <Link
      className={styles.friseElement}
      ref={elementRef}
      href={link}
      style={{ width: width }}
    >
      <div className="relative">
        <div className={styles.nameContainer}>{name}</div>
        <div
          className={styles.contentContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={src}
            alt={name}
            className={styles.image}
            fill
            sizes="100%"
          />
          <AnimatePresence>
            {shouldShowHover && (
              <motion.div
                className={styles.overlay}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlayVariants}
              >
                <div key={"gifContainer"} className={styles.gifContainer}>
                  <Image
                    src={gif}
                    alt={name + " gif"}
                    className={styles.gif}
                    fill
                    sizes="100%"
                  />
                </div>
                <div
                  key={"descriptionContainer"}
                  className={styles.descriptionContainer}
                >
                  <p>{year}</p>
                  {technos.map((techno, idx) => (
                    <span key={idx} className={styles.techno}>
                      {techno}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
}

export default memo(FriseElement);
