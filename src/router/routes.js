export const routes = [
  /**
   * schedule
   */
  {
    path: "/schedule",
    name: "Schedule",
    component: () => import("../views/Schedule.vue"),
  },

  /**
   * leaderboard
   */
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: () => import("../views/Leaderboard.vue"),
  },

  /**
   * redirect to schedule
   */
  
  {
    path: "/",
    redirect: { name: "Schedule" },
  },

  /**
   * 404
   */
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  }
];
