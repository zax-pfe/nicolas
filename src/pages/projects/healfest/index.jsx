import React from "react";
import Header from "@/components/Hero/Header/Header";
import Inner from "@/components/Layout/Inner";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
// import { projectsDescription } from "@/data/projectsDescription";
import { useEffect, useState, useContext } from "react";
import { client } from "@/sanity/client";
import { DeviceModeContext } from "@/context/DeviceContext";
import PageHeaderPhone from "@/components/Phone/PageHeader/PageHeaderPhone";

const HEALFEST_PROJECT_QUERY = `*[
  _type == "project" &&
  projectID == "healfest"
][0]{
  projectTitle,
  projectSubtitle,
  projectInfos,
  videoURL,
  thumbnailURL
  
  }`;

// "videoPlaceHolder": videoPlaceHolder.asset->url
export default function Index() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const { deviceMode } = useContext(DeviceModeContext);

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

  useEffect(() => {
    console.log("VIDEO URL:", project?.videoURL);
  }, [project]);

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
        // placeHolderImage={projectsDescription.healfest.videoPlaceHolder}
        placeHolderImage={project.thumbnailURL}
        projectsDescription={project.projectInfos}
        // video={projectsDescription.healfest.video}
        video={project.videoURL}
      />
    </Inner>
  );
}
