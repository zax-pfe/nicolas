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
        projectTitle={projectsDescription.nintendo.projectTitle}
        projectSubTitle={projectsDescription.nintendo.projectSubtitle}
        placeHolderImage={projectsDescription.nintendo.videoPlaceHolder}
        projectsDescription={projectsDescription.nintendo.projectInfos}
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
