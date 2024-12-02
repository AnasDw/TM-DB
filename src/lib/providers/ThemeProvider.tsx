import { createContext, useContext, useState } from "react";

import { ConfigProvider, ThemeConfig } from "antd";

import { antTheme } from "../theme/ant-theme";

interface Props {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: antTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(antTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
