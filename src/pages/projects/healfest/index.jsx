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
        projectTitle={projectsDescription.healfest.projectTitle}
        projectSubTitle={projectsDescription.healfest.projectSubtitle}
        placeHolderImage={projectsDescription.healfest.videoPlaceHolder}
        projectsDescription={projectsDescription.healfest.projectInfos}
        video={projectsDescription.healfest.video}
      />
    </Inner>
  );
}
