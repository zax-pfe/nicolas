import React from "react";
import { useRouter } from "next/router";
import { projectsDescription } from "../../../data/projectsDescription";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>Loading...</div>;
  } else {
    const projectDescription = projectsDescription[id];
    const projectTitle = projectDescription.projectTitle;
    const projectSubtitle = projectDescription.projectSubtitle;
    return (
      <div>
        <h1>{projectTitle}</h1>
        <h2>{projectSubtitle}</h2>
      </div>
    );
  }
}
