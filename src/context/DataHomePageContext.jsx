import { createContext, useState, useEffect } from "react";
import { client } from "@/sanity/client";

const PROJECTS_HOME_QUERY = `*[_type == "projectHomePage"]  {
  _id,
  name,
  year,
  technos,
  link,
  "cover": src.asset->url,
  "gif": gif.asset->url
}`;

const ABOUT_QUERY = `*[_type == "about" && aboutID == "about"][0]  {
  aboutParagraphs
}`;

const DataHomePageContext = createContext({});

const DataHomePageProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (projects.length === 0 || about === null) {
        try {
          const data = await client.fetch(PROJECTS_HOME_QUERY);
          const aboutData = await client.fetch(ABOUT_QUERY);
          setAbout(aboutData);
          setProjects(data);
        } catch (error) {
          console.error("Erreur Sanity :", error);
        } finally {
          // setDeviceMode(device);
          // setIsLoading(false);
          // console.log("Projects data fetched:", projects);
          // console.log("About data fetched:", about);
          console.log("Projects data fetched:", projects);
          console.log("About data fetched:", about);
        }
      }
    };

    fetchProjects();
  }, [about, projects]);

  return (
    <DataHomePageContext.Provider
      value={{ projects, setProjects, about, setAbout }}
    >
      {children}
    </DataHomePageContext.Provider>
  );
};

export { DataHomePageContext, DataHomePageProvider };
