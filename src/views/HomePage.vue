<template>
  <div class="container">
    <notification-banner
      :message="notification.message"
      :type="notification.type"
      :show="notification.show"
      @close="closeNotification"
    />

    <main class="home-page">
      <h1 class="title-h1">Moodboard Builder</h1>

      <div class="top-nav">
        <span class="moodboard-count"
          ><span>{{ totalMoodboards }}</span> moodboards</span
        >
        <div class="alt-button share-button" @click="copyLink">
          <i class="fa-solid fa-link"></i>
          <span class="tooltip">copy link</span>
          <span class="tooltip copied-tooltip">link copied!</span>
        </div>
      </div>

      <div class="moodboard-grid">
        <moodboard-card
          v-for="moodboard in moodboards"
          :key="moodboard.id"
          :moodboard="moodboard"
        />

        <moodboard-card
          :is-empty-card="true"
          @add-moodboard="openAddMoodboardModal"
        />
      </div>
    </main>

    <edit-modal
      :show="showEditModal"
      :is-new="true"
      @close="showEditModal = false"
      @save="createMoodboard"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MoodboardCard from "@/components/MoodboardCard.vue";
import NotificationBanner from "@/components/NotificationBanner.vue";
import EditModal from "@/components/EditModal.vue";

export default {
  name: "HomePage",
  components: {
    MoodboardCard,
    NotificationBanner,
    EditModal,
  },
  data() {
    return {
      showEditModal: false,
      notification: {
        message: "",
        type: "success",
        show: false,
      },
    };
  },
  computed: {
    ...mapGetters("moodboards", ["allMoodboards", "totalMoodboards"]),
    moodboards() {
      return this.allMoodboards;
    },
  },
  mounted() {
    // Comprobar si hay un parámetro 'deleted' en la URL
    if (this.$route.query.deleted === "true") {
      this.showNotification("Moodboard deleted", "error");

      // Eliminar el parámetro de la URL
      this.$router.replace({ query: null });
    }
  },
  methods: {
    ...mapActions("moodboards", ["addMoodboard"]),
    openAddMoodboardModal() {
      this.showEditModal = true;
    },
    async createMoodboard(moodboardData) {
      try {
        const id = await this.addMoodboard(moodboardData);
        this.showEditModal = false;
        this.$router.push({ name: "Moodboard", params: { id } });
      } catch (error) {
        console.error("Error creating moodboard:", error);
        this.showNotification("Error creating moodboard", "error");
      }
    },
    copyLink() {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          const shareButton = document.querySelector(".share-button");
          if (shareButton) {
            shareButton.classList.add("active");

            setTimeout(() => {
              shareButton.classList.remove("active");
            }, 3000);
          }
        })
        .catch(() => {
          this.showNotification("Failed to copy link", "error");
        });
    },
    showNotification(message, type = "success") {
      this.notification = {
        message,
        type,
        show: true,
      };

      setTimeout(() => {
        this.closeNotification();
      }, 5000);
    },
    closeNotification() {
      this.notification.show = false;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos de la página, importamos los estilos globales en main.js */
.home-page {
  padding: 80px 0;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 40px;
}
</style>
