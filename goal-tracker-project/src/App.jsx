import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";

import getTheme from "./theme/theme";
import AppRouter from "./router/AppRouter";
import { cacheLtr, cacheRtl } from "./theme/rtl";

export default function App() {
  const { i18n } = useTranslation();

  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const direction = i18n.language === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", direction === "rtl" ? "fa" : "en");
  }, [direction]);

  //  sync mode with localStorage
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(() => {
    return getTheme(mode, direction);
  }, [mode, direction]);

  const cache = useMemo(() => {
    return direction === "rtl" ? cacheRtl : cacheLtr;
  }, [direction]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme} key={direction}>
        <AppRouter
          mode={mode}
          setMode={setMode}
          direction={direction}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}
