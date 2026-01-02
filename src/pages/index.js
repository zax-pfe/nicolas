"use client";
import { useEffect, useContext, useState } from "react";
import Hero from "@/components/Hero/Hero";
import Inner from "@/components/Layout/Inner";
import { IsLoadingContext } from "@/context/IsLoadingContext";
import Loader from "@/components/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

import { client } from "@/sanity/client";

const PROJECTS_HOME_QUERY = `*[_type == "projectHomePage"]  {
  _id,
  name,
  year,
  technos,
  link,
  "cover": src.asset->url,
  "gif": gif.asset->url
}`;

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 1 },
  },
};

const MIN_LOADING_TIME = 2000; // 2 secondes

export default function Home() {
  // const { scrollYProgress } = useLenisScroll();

  const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  // useEffect(() => {
  //   if (isLoading) {
  //     document.body.style.cursor = "wait";
  //   } else {
  //     document.body.style.cursor = "default";
  //     console.log("Projects fetched for home page:", projects);
  //   }
  //   // Simulate loading process
  //   // const timer = setTimeout(() => {
  //   //   setIsLoading(false);
  //   // }, 2100);
  //   // return () => clearTimeout(timer);
  // }, [isLoading]);

  useEffect(() => {
    const fetchProjects = async () => {
      const startTime = Date.now();
      try {
        const data = await client.fetch(PROJECTS_HOME_QUERY);
        setProjects(data);
      } catch (error) {
        console.error("Erreur Sanity :", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsedTime;
        if (remainingTime > 0) {
          setTimeout(() => {
            setIsLoading(false);
          }, remainingTime);
        } else {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      <Inner>
        <Hero data={projects} />
      </Inner>
    </>
  );
}
