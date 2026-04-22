import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

const typeColors = {
  Work: "primary",
  Personal: "success",
  Exercise: "error",
};

const getStatusDisplay = (status, t) => {
  const normalized = normalizeStatus(status);

  if (normalized === "completed") return `✅ ${t("goal.completed")}`;
  if (normalized === "in-progress") return `⏳ ${t("goal.inProgress")}`;
  if (normalized === "paused") return `⏸ ${t("goal.paused")}`;

  return `❓ ${t("goal.unknown")}`;
};

const normalizeStatus = (status) => {
  if (!status) return "unknown";

  const normalized = status.toLowerCase().trim();

  if (normalized === "active") return "in-progress";
  if (normalized === "progress") return "in-progress";
  if (normalized === "in progress") return "in-progress";

  if (normalized === "complete" || normalized === "done")
    return "completed";

  return normalized;
};

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals") || "[]");

    const fixedGoals = storedGoals.map((g) => ({
      ...g,
      status: normalizeStatus(g.status),
    }));

    localStorage.setItem("goals", JSON.stringify(fixedGoals));

    // Find the goal
    const foundGoal = fixedGoals.find((g) => String(g.id) === id);

    if (!foundGoal) {
      navigate("/goals");
    } else {
      setGoal(foundGoal);
    }
  }, [id, navigate]);

  // prevention of white page
  if (!goal) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>{t("common.loading")}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: "auto" }}>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        {t("goal.backToDashboard")}
      </Button>

      {/* Card */}
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>

          {/* Title + Type */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h5" fontWeight="bold">
              {goal.title?.[i18n.language]}
            </Typography>

            <Chip
              label={goal.type}
              color={typeColors[goal.type] || "default"}
            />
          </Stack>

          {/* Description */}
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {goal.description?.[i18n.language]}
          </Typography>

          {/* Dates */}
          <Typography sx={{ mb: 1 }}>
            📅 {t("goal.dates")}: {goal.startDate} → {goal.endDate}
          </Typography>

          {/* Status */}
          <Typography sx={{ mb: 2 }}>
            🔥 {t("goal.status")}:
            <strong>{getStatusDisplay(goal.status, t)}</strong>
          </Typography>

          {/* Progress */}
          <Typography sx={{ mb: 1 }}>
            {t("goal.progress")}: {goal.progress || 0}%
          </Typography>

          <LinearProgress
            variant="determinate"
            value={goal.progress || 0}
            sx={{
              height: 12,
              borderRadius: 6,
              mb: 2,
            }}
          />

        </CardContent>
      </Card>
    </Box>
  );
}