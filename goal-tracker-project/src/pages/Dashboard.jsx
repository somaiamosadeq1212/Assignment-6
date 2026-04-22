import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import GoalCard from "../pages/Goals/GoalCard";
import GoalForm from "../pages/Goals/GoalForm";
import NotFound from "../pages/NotFound";
import SummarySection from "../components/layout/SummaryCards";
import { initialGoals, initialFormData } from "../data/FormData";
import { calculateXP } from "../utils/xpCalculator";
import { calculateStreak } from "../utils/streakCalculator";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function Dashboard() {

  const { t, i18n } = useTranslation();
  const { goals, setGoals, search, categoryFilter } = useOutletContext();
  const [formOpen, setFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const filteredGoals = goals.filter((goal) => {
    const title =
      typeof goal.title === "string"
        ? goal.title
        : goal.title?.[i18n.language] || goal.title?.en || "";

    const description =
      typeof goal.description === "string"
        ? goal.description
        : goal.description?.[i18n.language] || goal.description?.en || "";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase());

    if (categoryFilter === "Archived") {
      return matchesSearch && goal.status === "completed";
    }

    if (categoryFilter === "All") {
      return matchesSearch;
    }

    return matchesSearch && goal.type === categoryFilter;
  });

  // Stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const pendingGoals = totalGoals - completedGoals;
  const streak = calculateStreak(goals);
  const totalXP = calculateXP(goals, streak);

  // Handlers
  const handleAddGoal = () => {
    setEditingGoal(null);
    setFormData(initialFormData);
    setFormOpen(true);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData(goal);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleToggleComplete = (goal) => {
    const today = new Date().toISOString().split("T")[0];

    const updatedGoals = goals.map((g) =>
      String(g.id) === String(goal.id)
        ? {
          ...g,
          status: g.status === "completed" ? "in-progress" : "completed",
          progress: g.status === "completed" ? 0 : 100,
          activityDates: [
            ...(g.activityDates || []),
            today,
          ],
        }
        : g
    );

    setGoals(updatedGoals);
  };

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];

    if (editingGoal) {
      setGoals(
        goals.map((g) =>
          g.id === editingGoal.id
            ? {
              ...g,
              ...formData,
              status: formData.progress === 100 ? "completed" : "in-progress",
              activityDates: [
                ...(g.activityDates || []),
                today,
              ],
            }
            : g
        )
      );
    } else {
      setGoals([
        ...goals,
        {
          ...formData,
          id: Date.now(),
          status: formData.progress === 100 ? "completed" : "in-progress",
          activityDates: [today],
        },
      ]);
    }

    setFormOpen(false);
    setEditingGoal(null);
    setFormData(initialFormData);
  };

  const handleToggleStatus = (goal) => {
    const today = new Date().toISOString().split("T")[0];

    setGoals((prevGoals) =>
      prevGoals.map((g) =>
        g.id === goal.id
          ? {
            ...g,
            status: g.status === "paused" ? "in-progress" : "paused",
            activityDates: [
              ...(g.activityDates || []),
              today,
            ],
          }
          : g
      )
    );
  };

  useEffect(() => {
    const migratedGoals = goals.map((g) => {
      if (typeof g.title === "object") return g;

      return {
        ...g,
        title: {
          en: g.title || "",
          fa: g.title || "",
        },
        description: {
          en: g.description || "",
          fa: g.description || "",
        },
        status: g.status || "in-progress",
      };
    });

    setGoals(migratedGoals);
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>


      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("dashboard.title")}

          <Typography variant="body2" color="text.secondary">
            {t("dashboard.overview")}
          </Typography>
        </Typography>
        <SummarySection
          totalGoals={totalGoals}
          completedGoals={completedGoals}
          pendingGoals={pendingGoals}
          onAddGoal={handleAddGoal}
          xp={totalXP}
          streak={streak}
        />

        {/* Goals Grid */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            mt: 2,
          }}
        >
          {filteredGoals.length === 0 ? (
            <Typography sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}>
              {t("dashboard.noGoals")}
            </Typography>
          )
            : (
              filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            )}
        </Box>

        {/* Goal Form */}
        <GoalForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSave={handleSave}
          editingGoal={editingGoal}
          formData={formData}
          setFormData={setFormData}
        />
      </Box>
    </Box>
  );
}