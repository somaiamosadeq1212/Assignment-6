import { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Container,
  Drawer,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { initialGoals } from "../../data/FormData";
import i18n from "i18next";

export default function Layout({
  mode,
  setMode,
  direction,
}) {
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerWidth = collapsed ? 72 : 240;
  const NAVBAR_HEIGHT = 64;

  // normalize function
  const normalizeGoal = (g) => ({
    ...g,
    title:
      typeof g.title === "string"
        ? { en: g.title, fa: g.title }
        : g.title,

    description:
      typeof g.description === "string"
        ? { en: g.description, fa: g.description }
        : g.description,

    category: g.category || g.type?.toLowerCase() || "other",
    status: g.status || "in-progress",
    activityDates: g.activityDates || [],
  });

  // goals state
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");

    if (saved) {
      return JSON.parse(saved).map(normalizeGoal);
    }

    return initialGoals.map(normalizeGoal);
  });

  // sync with localStorage
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    setMobileOpen(false);
  }, [theme.direction]);

  const handleMobileToggle = () => setMobileOpen((p) => !p);
  const handleCollapseToggle = () => setCollapsed((p) => !p);

  const anchor = theme.direction === "rtl" ? "right" : "left";

  useEffect(() => {
    document.body.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* NAVBAR */}
        <Navbar
          onMenuClick={handleMobileToggle}
          onCollapse={handleCollapseToggle}
          mode={mode}
          onToggleMode={() =>
            setMode((prev) => (prev === "light" ? "dark" : "light"))
          }
          collapsed={collapsed}
        />

        {/* MOBILE */}
        <Drawer
          key={theme.direction}
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileToggle}
          anchor={anchor}
          disablePortal
          ModalProps={{ keepMounted: false }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              backgroundColor: theme.palette.background.paper,
              direction: theme.direction,
            },
          }}
        >
          <Sidebar
            collapsed={false}
            goals={goals}
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </Drawer>

        {/* DESKTOP */}
        {!isMobile && (
          <Box
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              borderInlineEnd: "1px solid",
              borderColor: "divider",
              height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
              position: "relative",
              top: `${NAVBAR_HEIGHT}px`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Sidebar
              collapsed={collapsed}
              goals={goals}
              search={search}
              setSearch={setSearch}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </Box>
        )}

        {/* CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg">
            <Outlet
              context={{
                goals,
                setGoals,
                search,
                categoryFilter,
                mode,
                setMode,
              }}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}