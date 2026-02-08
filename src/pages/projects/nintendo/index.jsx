import React from "react";
import Header from "@/components/Hero/Header/Header";
import Inner from "@/components/Layout/Inner";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import { client } from "@/sanity/client";
import { DeviceModeContext } from "@/context/DeviceContext";
import { useEffect, useState, useContext } from "react";
import PageHeaderPhone from "@/components/Phone/PageHeader/PageHeaderPhone";

const NINTENDO_PROJECT_QUERY = `*[
  _type == "project" &&
  projectID == "nintendo"
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
        const data = await client.fetch(NINTENDO_PROJECT_QUERY);
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
        placeHolderImage={project.thumbnailURL}
        projectsDescription={project.projectInfos}
        video={project.videoURL}
      />
    </Inner>
  );
}

// import React from "react";
// import { useRouter, useState } from "next/router";
// import { projectsDescription } from "../../../data/projectsDescription";
// import ProjectPage from "@/components/ProjectPage/ProjectPage";
// import Inner from "@/components/Layout/Inner";
// import Header from "@/components/Hero/Header/Header";

// export default function Index() {
//   const router = useRouter();
//   const { id } = router.query;
//   if (!id) {
//     return <Inner></Inner>;
//   } else {
//     const projectDescription = projectsDescription[id];
//     const projectTitle = projectDescription.projectTitle;
//     const projectSubtitle = projectDescription.projectSubtitle;
//     const videoPlaceHolder = projectDescription.videoPlaceHolder;
//     return (
//       <Inner>
//         <Header mainpage={false} />
//         <ProjectPage
//           projectTitle={projectTitle}
//           projectSubTitle={projectSubtitle}
//           placeHolderImage={videoPlaceHolder}
//           projectsDescription={projectDescription.projectInfos}
//         />
//       </Inner>
//     );
//   }
// }
