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
        projectTitle={projectsDescription.sodexo.projectTitle}
        projectSubTitle={projectsDescription.sodexo.projectSubtitle}
        placeHolderImage={projectsDescription.sodexo.videoPlaceHolder}
        projectsDescription={projectsDescription.sodexo.projectInfos}
        video={projectsDescription.sodexo.video}
      />
    </Inner>
  );
}
