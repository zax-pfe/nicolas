"use client";
import { useEffect, useContext, useState } from "react";
import Hero from "@/components/Hero/Hero";
import Inner from "@/components/Layout/Inner";
import { IsLoadingContext } from "@/context/IsLoadingContext";
import Loader from "@/components/Loader/Loader";
import { DataHomePageContext } from "@/context/DataHomePageContext";

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

const ABOUT_QUERY = `*[_type == "about" && aboutID == "about"][0]  {
  aboutParagraphs
}`;

const MIN_LOADING_TIME = 2000; // 2 secondes

export default function Home() {
  const { projects, setProjects, about, setAbout } =
    useContext(DataHomePageContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = "wait";
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
    }, 2100);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // useEffect(() => {
  //   console.log("Projects data fetched:", projects);
  //   console.log("About data fetched:", about);
  // }, [projects, about]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const data = await client.fetch(PROJECTS_HOME_QUERY);
  //       const aboutData = await client.fetch(ABOUT_QUERY);
  //       setAbout(aboutData);
  //       setProjects(data);
  //     } catch (error) {
  //       console.error("Erreur Sanity :", error);
  //     } finally {
  //       // setDeviceMode(device);
  //       // setIsLoading(false);
  //       // console.log("Projects data fetched:", projects);
  //       // console.log("About data fetched:", about);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Inner>
          <Hero data={projects} about={about} />
        </Inner>
      )}
    </>
  );
}
