import Header from "@/components/Hero/Header/Header";
import Inner from "@/components/Layout/Inner";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import { client } from "@/sanity/client";
import { DeviceModeContext } from "@/context/DeviceContext";
import { useEffect, useState, useContext } from "react";
import PageHeaderPhone from "@/components/Phone/PageHeader/PageHeaderPhone";
import { projectsDescription } from "@/data/projectsDescription";

const SODEXO_PROJECT_QUERY = `*[
  _type == "project" &&
  projectID == "sodexo"
][0]{
  projectTitle,
  projectSubtitle,
  projectInfos,
  videoURL,
  thumbnailURL,
  
  }`;

export default function Index() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { deviceMode } = useContext(DeviceModeContext);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await client.fetch(SODEXO_PROJECT_QUERY);
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
  if (!project.videoURL) return <p>Video URL manquante dans Sanity</p>;

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
        placeHolderImage={
          project.thumbnailURL || projectsDescription.sodexo.videoPlaceHolder
        }
        projectsDescription={project.projectInfos}
        video={project.videoURL}
      />
    </Inner>
  );
}
