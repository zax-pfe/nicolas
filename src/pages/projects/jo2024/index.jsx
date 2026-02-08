import React from "react";
import Header from "@/components/Hero/Header/Header";
import Inner from "@/components/Layout/Inner";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import { projectsDescription } from "@/data/projectsDescription";
import { client } from "@/sanity/client";

import { DeviceModeContext } from "@/context/DeviceContext";
import { useEffect, useState, useContext } from "react";
import PageHeaderPhone from "@/components/Phone/PageHeader/PageHeaderPhone";
const JO2024_PROJECT_QUERY = `*[
  _type == "project" &&
  projectID == "jo2024"
][0]{
  projectTitle,
  projectSubtitle,
  projectInfos,
  videoURL,
  
  }`;

export default function Index() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { deviceMode } = useContext(DeviceModeContext);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await client.fetch(JO2024_PROJECT_QUERY);
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
      {deviceMode === "phone" ? (
        <PageHeaderPhone />
      ) : (
        <Header mainpage={false} />
      )}
      <ProjectPage
        projectTitle={project.projectTitle}
        projectSubTitle={project.projectSubtitle}
        // placeHolderImage={project.thumbnailURL}
        placeHolderImage={projectsDescription.jo2024.videoPlaceHolder}
        projectsDescription={project.projectInfos}
        video={project.videoURL}
      />
    </Inner>
  );
}
