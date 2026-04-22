export function calculateXP(goals, streak) {
  let xp = 0;

  goals.forEach((goal) => {
    // progress
    xp += goal.progress;

    // completion bonus
    if (goal.completed) {
      xp += 20;
    }
  });

  // streak bonus
  xp += streak * 10;

  return xp;
}