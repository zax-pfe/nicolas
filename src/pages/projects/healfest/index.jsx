import React from "react";
import Header from "@/components/Hero/Header/Header";
import Inner from "@/components/Layout/Inner";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import { projectsDescription } from "@/data/projectsDescription";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";

const HEALFEST_PROJECT_QUERY = `*[
  _type == "project" &&
  projectID == "healfest"
][0]{
  projectTitle,
  projectSubtitle,
  projectInfos,
  
  }`;

// "videoPlaceHolder": videoPlaceHolder.asset->url
export default function index() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await client.fetch(HEALFEST_PROJECT_QUERY);
        setProject(data);
      } catch (error) {
        console.error("Erreur Sanity :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) return <p>...</p>;
  if (!project) return <p>Project Not Found</p>;
  return (
    <Inner>
      <Header mainpage={false} />
      <ProjectPage
        projectTitle={project.projectTitle}
        projectSubTitle={project.projectSubtitle}
        placeHolderImage={projectsDescription.healfest.videoPlaceHolder}
        projectsDescription={project.projectInfos}
        video={projectsDescription.healfest.video}
      />
    </Inner>
  );
}
