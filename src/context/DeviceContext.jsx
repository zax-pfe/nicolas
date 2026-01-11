import { createContext, useState } from "react";

const DeviceModeContext = createContext({});

const DeviceModeProvider = ({ children }) => {
  const [deviceMode, setDeviceMode] = useState(false);

  return (
    <DeviceModeContext.Provider value={{ deviceMode, setDeviceMode }}>
      {children}
    </DeviceModeContext.Provider>
  );
};

export { DeviceModeContext, DeviceModeProvider };
