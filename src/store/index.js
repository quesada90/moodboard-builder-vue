import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Importamos el módulo moodboards
import moodboards from "./modules/moodboards";

export default createStore({
  modules: {
    moodboards,
  },
  plugins: [
    createPersistedState({
      key: "moodboard-builder",
      paths: ["moodboards.list"],
    }),
  ],
});
