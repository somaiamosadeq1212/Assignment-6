import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const XPLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 14,
  borderRadius: 10,
  backgroundColor: "#e0e0e0",
  "& .MuiLinearProgress-bar": {
    borderRadius: 10,
    background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
    transition: "width 1s ease-in-out",
  },
}));

const CompletionProgress = styled(LinearProgress)(({ value }) => {
  let barColor = "#a5d6a7";

  if (value <= 50) {
    barColor = "#a5d6a7";
  } else if (value <= 75) {
    barColor = "#66bb6a";
  } else {
    barColor = "#388e3c";
  }

  return {
    height: 14,
    borderRadius: 7,
    backgroundColor: "#e0e0e0",
    "& .MuiLinearProgress-bar": {
      borderRadius: 7,
      backgroundColor: barColor,
      transition: "width 1s ease-in-out",
    },
  };
});

const AddGoalButton = styled(Button)(() => ({
  background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  borderRadius: "12px",
  height: 48,
  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)",
    boxShadow: "0px 6px 16px rgba(0,0,0,0.3)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
  },
}));

export default function SummarySection({
  totalGoals,
  completedGoals,
  onAddGoal,
  xp,
  streak,
}) {

  const maxXP = 500;
  const progress = (xp / maxXP) * 100;

  const completionRate =
    totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4 }}>

      {/* Cards */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

        {/* Completion */}
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography color="text.secondary">{t("summary.completion")}</Typography>
            <Typography variant="h5">{completionRate}%</Typography>
            <Box sx={{ mt: 1 }}>
              <CompletionProgress variant="determinate" value={completionRate} />
            </Box>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography color="text.secondary">🔥 {t("summary.streak")}</Typography>
            <Typography variant="h5">{streak} days</Typography>
          </CardContent>
        </Card>

        {/* XP */}
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography color="text.secondary">⭐ {t("summary.xp")}</Typography>
            <Typography variant="h5">{xp}</Typography>

            {/* XP Bar */}
            <Box sx={{ mt: 1 }}>
              <XPLinearProgress
                variant="determinate"
                value={progress > 100 ? 100 : progress}
              />
              <Typography variant="caption">
                {xp} / {maxXP} XP
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Add Goal */}
        <Card sx={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 120 }}>
          <CardContent sx={{ width: "100%", textAlign: "center" }}>
            <AddGoalButton fullWidth onClick={onAddGoal}>
              + {t("summary.newGoal")}
            </AddGoalButton>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}