// import React from "react";
// import {
//   Box,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   TextField,
//   InputAdornment,
//   Tooltip,
//   IconButton,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
// import { useTranslation } from "react-i18next";
// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import WorkIcon from "@mui/icons-material/Work";
// import PersonIcon from "@mui/icons-material/Person";
// import FlagIcon from "@mui/icons-material/Flag";
// import FolderIcon from "@mui/icons-material/Folder";
// import SettingsIcon from "@mui/icons-material/Settings";

// const categoryIcons = {
//   Exercise: <FitnessCenterIcon />,
//   Study: <MenuBookIcon />,
//   Work: <WorkIcon />,
//   Personal: <PersonIcon />,
//   Other: <FlagIcon />,
// };

// const ALL_CATEGORIES = ["Exercise", "Study", "Work", "Personal", "Other"];

// export default function Sidebar({
//   collapsed = false,
//   goals = [],
//   search,
//   setSearch,
//   categoryFilter,
//   setCategoryFilter,
// }) {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const { t } = useTranslation();

//   const totalGoals = goals.length;

//   const categoryCount = ALL_CATEGORIES.map((cat) => {
//     const count = goals.filter((g) => g.type === cat).length;
//     return { name: cat, count };
//   });

//   const archivedGoals = goals.filter((g) => g.status === "completed");

//   const getItemStyle = (active) => ({
//     borderRadius: 2,
//     justifyContent: collapsed ? "center" : "flex-start",
//     position: "relative",
//     backgroundColor: active ? "#2f435f" : "transparent",
//     color: active ? "#fff" : "inherit",
//     transition: "all 0.25s ease",

//     "&:hover": {
//       backgroundColor: "#486288",
//     },

//     "&::before": active
//       ? {
//         content: '""',
//         position: "absolute",
//         insetInlineStart: 0,
//         top: 6,
//         bottom: 6,
//         width: 4,
//         borderRadius: 2,
//         backgroundColor: "#e5e9ed",
//       }
//       : {},
//   });

//   return (
//     <Box sx={{ p: 2, borderInlineEnd: "1px solid", borderColor: "divider" }}>

//       {/* SEARCH */}
//       {!collapsed && (
//         <TextField
//           fullWidth
//           size="small"
//           placeholder={t("sidebar.searchPlaceholder")}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//             endAdornment: search && (
//               <InputAdornment position="end">
//                 <IconButton size="small" onClick={() => setSearch("")}>
//                   <ClearIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       )}

//       <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>

//         {/* ALL GOALS */}
//         <Tooltip title={t("sidebar.allGoals")} placement="right">
//           <ListItemButton
//             sx={getItemStyle(categoryFilter === "All")}
//             onClick={() => {
//               setCategoryFilter("All");
//               navigate("/dashboard");
//             }}
//           >
//             <ListItemIcon sx={{ minWidth: 0 }}>
//               <FlagIcon />
//             </ListItemIcon>

//             {!collapsed && (
//               <ListItemText primary={t("sidebar.allGoals")} sx={{ mx: 2 }} />
//             )}

//             {!collapsed && (
//               <Box sx={{ marginInlineStart: "auto", bgcolor: "#1976d2", color: "#fff", px: 1.2, borderRadius: 2 }}>
//                 {totalGoals}
//               </Box>
//             )}
//           </ListItemButton>
//         </Tooltip>

//         {/* CATEGORIES */}
//         {categoryCount.map((cat) => (
//           <Tooltip key={cat.name} title={t(`sidebar.categories.${cat.name}`)}>
//             <ListItemButton
//               sx={getItemStyle(categoryFilter === cat.name)}
//               onClick={() => {
//                 setCategoryFilter(cat.name);
//                 navigate("/dashboard");
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: 0 }}>
//                 {categoryIcons[cat.name]}
//               </ListItemIcon>

//               {!collapsed && (
//                 <ListItemText
//                   primary={t(`sidebar.categories.${cat.name}`)}
//                   sx={{ mx: 2 }}
//                 />
//               )}

//               {!collapsed && (
//                 <Box sx={{ marginInlineStart: "auto", bgcolor: "grey.700", color: "#fff", px: 1.2, borderRadius: 2 }}>
//                   {cat.count}
//                 </Box>
//               )}
//             </ListItemButton>
//           </Tooltip>
//         ))}

//         <Divider sx={{ my: 2 }} />

//         {/* ARCHIVED */}
//         <ListItemButton
//           sx={getItemStyle(categoryFilter === "Archived")}
//           onClick={() => {
//             setCategoryFilter("Archived");
//             navigate("/dashboard");
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 0 }}>
//             <FolderIcon />
//           </ListItemIcon>

//           {!collapsed && (
//             <ListItemText primary={t("sidebar.archivedGoals")} sx={{ mx: 2 }} />
//           )}

//           {!collapsed && (
//             <Box sx={{ marginInlineStart: "auto", bgcolor: "grey.700", color: "#fff", px: 1.2, borderRadius: 2 }}>
//               {archivedGoals.length}
//             </Box>
//           )}
//         </ListItemButton>

//         <Divider sx={{ my: 2 }} />

//         {/* SETTINGS */}
//         <ListItemButton onClick={() => navigate("/settings")}>
//           <ListItemIcon sx={{ minWidth: 0 }}>
//             <SettingsIcon />
//           </ListItemIcon>

//           {!collapsed && (
//             <ListItemText primary={t("sidebar.settings")} sx={{ mx: 2 }} />
//           )}
//         </ListItemButton>

//       </List>
//     </Box>
//   );
// }



import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";

const categoryIcons = {
  exercise: <FitnessCenterIcon />,
  study: <MenuBookIcon />,
  work: <WorkIcon />,
  personal: <PersonIcon />,
  other: <FlagIcon />,
};

const ALL_CATEGORIES = ["exercise", "study", "work", "personal", "other"];

export default function Sidebar({
  collapsed = false,
  goals = [],
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const getCategory = (g) =>
    g.category || g.type?.toLowerCase() || "other";

  const totalGoals = goals.length;

  const categoryCount = ALL_CATEGORIES.map((cat) => {
    const count = goals.filter((g) => getCategory(g) === cat).length;
    return { name: cat, count };
  });

  const archivedGoals = goals.filter((g) => g.status === "completed");

  const getItemStyle = (active) => ({
    borderRadius: 2,
    justifyContent: collapsed ? "center" : "flex-start",
    position: "relative",
    backgroundColor: active ? "#2f435f" : "transparent",
    color: active ? "#fff" : "inherit",
    transition: "all 0.25s ease",

    "&:hover": {
      backgroundColor: "#486288",
    },

    "&::before": active
      ? {
          content: '""',
          position: "absolute",
          insetInlineStart: 0,
          top: 6,
          bottom: 6,
          width: 4,
          borderRadius: 2,
          backgroundColor: "#e5e9ed",
        }
      : {},
  });

  return (
    <Box sx={{ p: 2, borderInlineEnd: "1px solid", borderColor: "divider" }}>

      {/* SEARCH */}
      {!collapsed && (
        <TextField
          fullWidth
          size="small"
          placeholder={t("sidebar.searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch("")}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>

        {/* ALL */}
        <Tooltip title={t("sidebar.allGoals")} placement="right">
          <ListItemButton
            sx={getItemStyle(categoryFilter === "All")}
            onClick={() => {
              setCategoryFilter("All");
              navigate("/dashboard");
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <FlagIcon />
            </ListItemIcon>

            {!collapsed && (
              <ListItemText primary={t("sidebar.allGoals")} sx={{ mx: 2 }} />
            )}

            {!collapsed && (
              <Box sx={{ marginInlineStart: "auto", bgcolor: "#1976d2", color: "#fff", px: 1.2, borderRadius: 2 }}>
                {totalGoals}
              </Box>
            )}
          </ListItemButton>
        </Tooltip>

        {/* CATEGORIES */}
        {categoryCount.map((cat) => (
          <Tooltip key={cat.name} title={t(`sidebar.categories.${cat.name}`)}>
            <ListItemButton
              sx={getItemStyle(categoryFilter === cat.name)}
              onClick={() => {
                setCategoryFilter(cat.name);
                navigate("/dashboard");
              }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                {categoryIcons[cat.name]}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={t(`sidebar.categories.${cat.name}`)}
                  sx={{ mx: 2 }}
                />
              )}

              {!collapsed && (
                <Box sx={{ marginInlineStart: "auto", bgcolor: "grey.700", color: "#fff", px: 1.2, borderRadius: 2 }}>
                  {cat.count}
                </Box>
              )}
            </ListItemButton>
          </Tooltip>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* ARCHIVED */}
        <ListItemButton
          sx={getItemStyle(categoryFilter === "Archived")}
          onClick={() => {
            setCategoryFilter("Archived");
            navigate("/dashboard");
          }}
        >
          <ListItemIcon sx={{ minWidth: 0 }}>
            <FolderIcon />
          </ListItemIcon>

          {!collapsed && (
            <ListItemText primary={t("sidebar.archivedGoals")} sx={{ mx: 2 }} />
          )}

          {!collapsed && (
            <Box sx={{ marginInlineStart: "auto", bgcolor: "grey.700", color: "#fff", px: 1.2, borderRadius: 2 }}>
              {archivedGoals.length}
            </Box>
          )}
        </ListItemButton>

        <Divider sx={{ my: 2 }} />

        {/* SETTINGS */}
        <ListItemButton onClick={() => navigate("/settings")}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <SettingsIcon />
          </ListItemIcon>

          {!collapsed && (
            <ListItemText primary={t("sidebar.settings")} sx={{ mx: 2 }} />
          )}
        </ListItemButton>

      </List>
    </Box>
  );
}