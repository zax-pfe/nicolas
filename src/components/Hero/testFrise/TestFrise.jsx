import React from "react";
import { useRef, useEffect, useState, useMemo } from "react";
import styles from "./style.module.scss";
import { useLenis } from "lenis/react";
import FriseElement from "./FriseElement";
import { projects } from "../../../data/projects";
import { motion } from "framer-motion";

const gap = 20;
const elementWidth = 500;

const friseVariants = {
  initial: { scale: 0.95, y: 50 },
  enter: {
    scale: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] },
  },
};

const lenghtProjects = 11;
// console.log("lenghtProjects:", lenghtProjects);

// const lenghtProjectsData = data.length;

// console.log("Data in TestFrise:", data);
// console.log("projects in TestFrise:", projects);
// console.log("lenghtProjectsData:", lenghtProjectsData);

const totalWidth = lenghtProjects * gap + lenghtProjects * elementWidth;

function mod(n, m) {
  return ((n % m) + m) % m;
}

let positionsArray = [];
for (let i = 0; i < lenghtProjects; i++) {
  positionsArray.push(i * (elementWidth + gap));
}

export default function TestFrise({ data }) {
  // const positionsArray = useMemo(() => {
  //   let positions = [];
  //   for (let i = 0; i < lenghtProjects; i++) {
  //     positions.push(i * (elementWidth + gap));
  //   }
  //   return positions;
  // }, []);

  const [positions, setPositions] = useState(positionsArray);

  const [changed, setChanged] = useState(false);

  const [indexHovered, setIndexHovered] = useState(null);

  useLenis(({ velocity }) => {
    setChanged(!changed);
    setPositions((prevPositions) =>
      prevPositions.map((pos) => pos - velocity * 0.5)
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
            mod(pos + autoSpeed + totalWidth / 2, totalWidth) - totalWidth / 2
        )
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
            key={project.id}
            name={project.name}
            src={project.cover}
            year={project.year}
            technos={project.technos}
            gif={project.gif}
            position={positions[index]}
            index={index}
            link={project.link}
            setIndexHovered={setIndexHovered}
            width={elementWidth}
          />
        );
      })}
    </motion.div>
  );
}
