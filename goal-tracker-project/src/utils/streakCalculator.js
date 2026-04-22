export function calculateStreak(goals) {
  const today = new Date();

  const formatDate = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  const activeDates = goals
    .filter((g) => g.progress > 0)
    .map((g) => g.startDate);

  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);

    const dateString = formatDate(checkDate);

    if (activeDates.includes(dateString)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}