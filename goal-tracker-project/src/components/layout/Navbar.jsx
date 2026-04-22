import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Navbar({ onMenuClick, onCollapse, mode, onToggleMode, collapsed }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up("sm"));

    const NAVBAR_HEIGHT = 64;

    const { t } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "fa" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <AppBar position="fixed" sx={{ height: NAVBAR_HEIGHT }}>
            <Toolbar sx={{ gap: 1 }}>
                {/* Menu: Mobile */}
                {isMobile && (
                    <IconButton color="inherit" edge="start" onClick={onMenuClick}>
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Collapse: تبلت و tablet and desktop */}
                {isTabletOrDesktop && (
                    <IconButton color="inherit" edge="start" onClick={onCollapse}>
                        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                )}

                <Box sx={{ flexGrow: 1, minWidth: 0, textAlign: "start" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                    >
                        {t("navbar.dashboard")}
                    </Typography>
                </Box>

                {/* Dark/Light Mode */}
                <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
                    <IconButton color="inherit" onClick={onToggleMode}>
                        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Tooltip>

                <Tooltip title="Change Language">
                    <IconButton color="inherit" onClick={toggleLanguage}>
                        🌐 {i18n.language === "en" ? "FA" : "EN"}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}