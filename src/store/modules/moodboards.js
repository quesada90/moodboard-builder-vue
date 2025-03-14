export default {
  namespaced: true,
  state: {
    list: [
      {
        id: "urban-sports",
        title: "Urban Sports",
        coverImage:
          "https://plus.unsplash.com/premium_photo-1681494703620-7bed31293c6a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFzaGlvbiUyMHN0cmVldHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
          {
            id: 1,
            url: "https://plus.unsplash.com/premium_photo-1681494700976-861938fe0513?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc2hpb24lMjBzdHJlZXR8ZW58MHx8MHx8fDA%3D",
            alt: "Yellow outfit",
          },
          {
            id: 2,
            url: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc2hpb24lMjBzdHJlZXR8ZW58MHx8MHx8fDA%3D",
            alt: "Fashion photo",
          },
          // Los demás imágenes del moodboard Urban Sports
        ],
      },
      {
        id: "hip-hop",
        title: "Hip Hop",
        coverImage:
          "https://images.unsplash.com/photo-1532332248682-206cc786359f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb24lMjBzdHJlZXR8ZW58MHx8MHx8fDA%3D",
        images: [],
      },
      {
        id: "casual-style",
        title: "Casual Style",
        coverImage:
          "https://images.unsplash.com/photo-1528120369764-0423708119ae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGZhc2hpb24lMjBzdHJlZXR8ZW58MHx8MHx8fDA%3D",
        images: [],
      },
    ],
  },
  getters: {
    allMoodboards: (state) => state.list,
    moodboardById: (state) => (id) =>
      state.list.find((moodboard) => moodboard.id === id),
    totalMoodboards: (state) => state.list.length,
  },
  mutations: {
    ADD_MOODBOARD(state, moodboard) {
      state.list.push(moodboard);
    },
    DELETE_MOODBOARD(state, id) {
      state.list = state.list.filter((moodboard) => moodboard.id !== id);
    },
    UPDATE_MOODBOARD(state, { id, updates }) {
      console.log("Mutation: actualizando moodboard", id, updates);
      const index = state.list.findIndex((moodboard) => moodboard.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
        console.log("Moodboard actualizado:", state.list[index]);
      }
    },
    ADD_IMAGE(state, { moodboardId, image }) {
      const moodboard = state.list.find((m) => m.id === moodboardId);
      if (moodboard) {
        moodboard.images.push(image);
      }
    },
    DELETE_IMAGE(state, { moodboardId, imageId }) {
      const moodboard = state.list.find((m) => m.id === moodboardId);
      if (moodboard) {
        moodboard.images = moodboard.images.filter((img) => img.id !== imageId);
      }
    },
    REORDER_IMAGES(state, { moodboardId, newOrder }) {
      const moodboard = state.list.find((m) => m.id === moodboardId);
      if (moodboard) {
        moodboard.images = newOrder;
      }
    },
  },
  actions: {
    addMoodboard({ commit }, moodboard) {
      // Generar un ID basado en el título
      const id = moodboard.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      commit("ADD_MOODBOARD", {
        ...moodboard,
        id,
        images: [],
      });

      return id; // Devuelve el ID para redireccionamiento
    },
    deleteMoodboard({ commit }, id) {
      commit("DELETE_MOODBOARD", id);
    },
    updateMoodboard({ commit }, { id, updates }) {
      console.log("Store: actualizando moodboard", id, updates);
      commit("UPDATE_MOODBOARD", { id, updates });
    },
    addImage({ commit }, { moodboardId, image }) {
      // Generamos un ID único para la imagen
      const imageWithId = {
        ...image,
        id: Date.now(),
      };

      commit("ADD_IMAGE", { moodboardId, image: imageWithId });
      return imageWithId.id;
    },
    deleteImage({ commit }, { moodboardId, imageId }) {
      commit("DELETE_IMAGE", { moodboardId, imageId });
    },
    reorderImages({ commit }, { moodboardId, newOrder }) {
      commit("REORDER_IMAGES", { moodboardId, newOrder });
    },
  },
};
