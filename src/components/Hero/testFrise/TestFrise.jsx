import React from "react";
import { useRef, useEffect, useState, useMemo } from "react";
import styles from "./style.module.scss";
import Cube from "./Cube";
import useScroll from "@/hooks/useScroll";
import { ReactLenis, useLenis } from "lenis/react";
import FriseElement from "./FriseElement";
import { projects } from "../../../data/projects";

const gap = 20;
const elementWidth = 500;

const lenghtProjects = projects.length;

const totalWidth = lenghtProjects * gap + lenghtProjects * elementWidth;
export default function TestFrise() {
  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  const positionsArray = useMemo(() => {
    let positions = [];
    for (let i = 0; i < lenghtProjects; i++) {
      positions.push(i * (elementWidth + gap));
    }
    return positions;
  }, []);

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
    console.log("Index hovered:", indexHovered);

    const animate = () => {
      const autoSpeed = indexHoveredRef.current !== null ? 0.1 : 0.6;
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
    <div className={styles.pageContainer}>
      {projects.map((project, index) => {
        return (
          <FriseElement
            key={project.id}
            name={project.name}
            src={project.src}
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
    </div>
  );
}
