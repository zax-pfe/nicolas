import React from "react";
import { useRef, useEffect, useState, useMemo } from "react";
import styles from "./style.module.scss";
import { useLenis } from "lenis/react";
import FriseElement from "./FriseElement";
import { projects } from "../../../data/projects";
import { motion } from "framer-motion";
import { useContext } from "react";
import { DeviceModeContext } from "@/context/DeviceContext";

const friseVariants = {
  initial: { scale: 0.95, y: 50 },
  enter: {
    scale: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] },
  },
};

// const lenghtProjects = 12;
const lenghtProjects = projects.length;
// console.log("lenghtProjects:", lenghtProjects);

// const lenghtProjectsData = data.length;

// console.log("Data in TestFrise:", data);
// console.log("projects in TestFrise:", projects);
// console.log("lenghtProjectsData:", lenghtProjectsData);

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function TestFrise({ data }) {
  const { deviceMode } = useContext(DeviceModeContext);
  // const [elementWidth, setElementWidth] = useState(300);
  const widthRef = useRef(300);
  const totalWidthRef = useRef(0);
  const gapRef = useRef(20);
  const positionArrayRef = useRef([]);

  const [gap, setGap] = useState(20);

  useEffect(() => {
    widthRef.current = deviceMode === "phone" ? 300 : 500;
    totalWidthRef.current =
      lenghtProjects * gap + lenghtProjects * widthRef.current;
    for (let i = 0; i < lenghtProjects; i++) {
      positionArrayRef.current.push(i * (widthRef.current + gapRef.current));
    }
  }, [deviceMode]);

  const positionsArray = useMemo(() => {
    const itemWidth = widthRef.current + gap;
    const start = -totalWidthRef.current / 2;

    return Array.from(
      { length: lenghtProjects },
      (_, i) => start + i * itemWidth,
    );
  }, [lenghtProjects, widthRef.current, gap, totalWidthRef.current]);

  useEffect(() => {
    setPositions(positionsArray);
  }, [positionsArray]);

  const [positions, setPositions] = useState(positionsArray);

  const [indexHovered, setIndexHovered] = useState(null);

  useLenis(({ velocity }) => {
    // setChanged(!changed);

    setPositions((prevPositions) =>
      prevPositions.map((pos) => pos - velocity * 0.5),
    );
  });

  const indexHoveredRef = useRef(null);

  useEffect(() => {
    indexHoveredRef.current = indexHovered;
  }, [indexHovered]);

  useEffect(() => {
    // console.log("Index hovered:", indexHovered);

    const animate = () => {
      const autoSpeed = indexHoveredRef.current !== null ? -0.1 : -0.6;
      setPositions((prevPositions) =>
        prevPositions.map(
          (pos) =>
            mod(
              pos + autoSpeed + totalWidthRef.current / 2,
              totalWidthRef.current,
            ) -
            totalWidthRef.current / 2,
        ),
      );

      requestAnimationFrame(animate);
    };
    animate();

    return () => {};
  }, []);

  return (
    <motion.div
      variants={friseVariants}
      initial="initial"
      animate="enter"
      className={styles.pageContainer}
    >
      {data.map((project, index) => {
        return (
          // <FriseElement
          //   key={project.id}
          //   name={project.name}
          //   src={project.src}
          //   year={project.year}
          //   technos={project.technos}
          //   gif={project.gif}
          //   position={positions[index]}
          //   index={index}
          //   link={project.link}
          //   setIndexHovered={setIndexHovered}
          //   width={elementWidth}
          // />
          <FriseElement
            key={project._id}
            name={project.name}
            src={project.cover}
            year={project.year}
            technos={project.technos}
            gif={project.gif}
            position={positions[index]}
            index={index}
            link={project.link}
            setIndexHovered={setIndexHovered}
            width={widthRef.current}
          />
        );
      })}
    </motion.div>
  );
}
