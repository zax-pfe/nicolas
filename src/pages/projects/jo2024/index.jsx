import React from "react";
import Header from "@/components/Hero/Header/Header";
import Inner from "@/components/Layout/Inner";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import { projectsDescription } from "@/data/projectsDescription";

export default function index() {
  return (
    <Inner>
      <Header mainpage={false} />
      <ProjectPage
        projectTitle={projectsDescription.jo2024.projectTitle}
        projectSubTitle={projectsDescription.jo2024.projectSubtitle}
        placeHolderImage={projectsDescription.jo2024.videoPlaceHolder}
        projectsDescription={projectsDescription.jo2024.projectInfos}
        video={projectsDescription.jo2024.video}
      />
    </Inner>
  );
}
