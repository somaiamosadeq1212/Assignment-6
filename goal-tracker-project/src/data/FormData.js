export const initialGoals = [
  {
    id: 1,
    title: "Learn React",
    description: "Study hooks",
    progress: 40,
    status: "in-progress",
    startDate: "2026-03-11",
    endDate: "2026-03-12",
    activityDates: ["2026-04-21", "2026-04-20"]
  },
  {
    id: 2,
    title: "Build Goal Tracker",
    description: "Finish project",
    progress: 70,
    status: "in-progress",
    startDate: "2026-03-10",
    endDate: "2026-03-15",
    activityDates: ["2026-04-21", "2026-04-20"]
  },
  {
    id: 3,
    title: "Test Today",
    description: "Read 30 pages",
    progress: 10,
    status: "paused",
    startDate: "2026-04-04",
    endDate: "2026-04-04",
    activityDates: ["2026-04-21", "2026-04-20"]
  },
];

// Form default values
export const initialFormData = {
  title: { en: "", fa: "" },
  description: { en: "", fa: "" },
  type: "Work",
  startDate: "",
  endDate: "",
  progress: 0,
  status: "in-progress",
};