import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import MoodboardPage from "../views/MoodboardPage.vue";
import NewMoodboardPage from "../views/NewMoodboardPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/moodboard/:id",
    name: "Moodboard",
    component: MoodboardPage,
    props: true,
  },
  {
    path: "/new-moodboard",
    name: "NewMoodboard",
    component: NewMoodboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
