import React from "react";
import Header from "@/components/Hero/Header/Header";
import Inner from "@/components/Layout/Inner";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import nitendo from "../../../../public/projects/miniatures/nitendo.png";
import { projectsDescription } from "@/data/projectsDescription";
import Footer from "@/components/Footer/Footer";

export default function index() {
  return (
    <Inner>
      <Header mainpage={false} />
      <ProjectPage
        projectTitle="Nintendo Switch. Motion design"
        projectSubTitle="Motion design for Nintendo 30 Years of DK promotional video."
        placeHolderImage={nitendo}
        projectsDescription={projectsDescription.nintendo.projectInfos}
      />
      {/* <div className="h-[200vh]"></div> */}
      {/* <Footer /> */}
    </Inner>
  );
}
