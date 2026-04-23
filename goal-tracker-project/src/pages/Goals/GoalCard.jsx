import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  IconButton,
  Chip,
  Tooltip,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// const typeColors = {
//   Work: "primary",
//   Personal: "success",
//   Exercise: "error",
// };

// const categoryColors = {
//   study: "primary",
//   work: "success",
//   personal: "warning",
//   exercise: "error",
//   other: "default",
// };

export default function GoalCard({
  goal,
  onEdit,
  onDelete,
  onToggleComplete,
  onToggleStatus,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const status = goal.status || "in-progress";
  const isCompleted = status === "completed";
  const isPaused = status === "paused";

  const { i18n } = useTranslation();

  const title =
    typeof goal.title === "string"
      ? goal.title
      : goal.title?.[i18n.language] || goal.title?.en;

  const description =
    typeof goal.description === "string"
      ? goal.description
      : goal.description?.[i18n.language] || goal.description?.en;

  const category = goal.category || goal.type?.toLowerCase() || "other";

  return (
    <Card
      onClick={() => navigate(`/goals/${goal.id}`)}
      sx={{
        minWidth: 310,
        maxWidth: 410,
        width: "100%",
        boxShadow: 3,
        borderRadius: 2,
        p: 1,
        cursor: "pointer",
        transition: "all 0.25s ease",
        bgcolor: "background.paper",

        "&:hover": {
          transform: "translateY(-4px) scale(1.01)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>

        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            sx={{ flex: 1 }}
            control={
              <Checkbox
                checked={isCompleted}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onToggleComplete(goal)}
              />
            }
            label={
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            }
          />

          {/* Actions */}
          <Box>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit(goal);
              }}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(goal.id);
              }}
              size="small"
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Type */}
        <Chip
          label={t(`sidebar.categories.${category}`)}
          color="primary"
          size="small"
          sx={{ mt: 1.5, mb: 2 }}
        />

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {description || t("goal.noDescription")}
        </Typography>

        {/* Dates */}
        <Typography variant="caption" color="text.secondary">
          📅 {goal.startDate} - {goal.endDate}
        </Typography>

        {/* Progress */}
        <Tooltip title={`${t("goal.progress")}: ${goal.progress || 0}%`}>
          <LinearProgress
            variant="determinate"
            value={goal.progress || 0}
            sx={{ height: 8, borderRadius: 5, mb: 0.5 }}
          />
        </Tooltip>

        <Typography variant="caption" color="text.secondary">
          {goal.progress || 0}% {t("goal.completed")}
        </Typography>

        {/* Status */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            fontWeight: 500,
            color: isCompleted
              ? theme.palette.success.main
              : theme.palette.text.secondary,
          }}
        >
          {isCompleted
            ? `✅ ${t("goal.completed")}`
            : `⏳ ${t("goal.inProgress")}`}
        </Typography>

        {/* NEW ACTION BUTTONS */}
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          {!isCompleted && (
            <Button
              size="small"
              variant="contained"
              color={isPaused ? "success" : "warning"}
              startIcon={isPaused ? <PlayArrowIcon /> : <StopIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(goal);
              }}
            >
              {isPaused ? t("goal.resume") : t("goal.stop")}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}