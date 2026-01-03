import React from "react";

const SODEXO_PROJECT_QUERY = `*[
  _type == "project" &&
  projectID == "sodexo"
][0]{
  projectTitle,
  projectSubtitle,
  projectInfos,
  "videoPlaceHolder": videoPlaceHolder.asset->url

}`;

export default function FecthPageProject({ page }) {
  return <div>FecthPageProject</div>;
}
