import { createContext, useState } from "react";

const FollowerContext = createContext({});

const FollowerProvider = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <FollowerContext.Provider value={{ active, setActive }}>
      {children}
    </FollowerContext.Provider>
  );
};

export { FollowerContext, FollowerProvider };
