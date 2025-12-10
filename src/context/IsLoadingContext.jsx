import { createContext, useState } from "react";

const IsLoadingContext = createContext({});

const IsLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </IsLoadingContext.Provider>
  );
};

export { IsLoadingContext, IsLoadingProvider };
