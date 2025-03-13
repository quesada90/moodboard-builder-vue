<template>
  <div class="container">
    <notification-banner
      :message="notification.message"
      :type="notification.type"
      :show="notification.show"
      @close="closeNotification"
    />

    <main class="moodboard-page">
      <div class="page-header">
        <router-link to="/" class="back-button">
          <i class="fa-solid fa-arrow-left"></i>
        </router-link>
        <h1 class="title-h1">New moodboard</h1>
      </div>

      <div class="moodboard-info">
        <div class="image-counter">
          <span class="moodboard-count"><span>0</span> images</span>
        </div>
        <div class="header-actions">
          <div class="alt-button edit-button" @click="openEditModal">
            <i class="fa-solid fa-pencil"></i>
            <span class="tooltip">edit moodboard</span>
          </div>
        </div>
      </div>

      <div class="empty-state-message" style="display: block">
        <p>
          This moodboard doesn't have any images yet. Add some to get started!
        </p>
      </div>

      <upload-section
        :moodboard-id="tempMoodboardId"
        @image-added="onImageAdded"
      />
    </main>

    <edit-modal
      :show="showEditModal"
      :initial-name="moodboardName"
      :initial-cover-image="coverImage"
      :is-new="true"
      @close="showEditModal = false"
      @save="createMoodboard"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NotificationBanner from "@/components/NotificationBanner.vue";
import UploadSection from "@/components/UploadSection.vue";
import EditModal from "@/components/EditModal.vue";

export default {
  name: "NewMoodboardPage",
  components: {
    NotificationBanner,
    UploadSection,
    EditModal,
  },
  data() {
    return {
      showEditModal: false,
      moodboardName: "New Moodboard",
      coverImage: "",
      tempMoodboardId: "temp-" + Date.now(),
      tempImages: [],
      notification: {
        message: "",
        type: "success",
        show: false,
      },
    };
  },
  methods: {
    ...mapActions("moodboards", ["addMoodboard", "addImage"]),
    openEditModal() {
      this.showEditModal = true;
    },
    async createMoodboard(moodboardData) {
      try {
        const id = await this.addMoodboard({
          ...moodboardData,
          images: this.tempImages,
        });
        this.showEditModal = false;
        this.$router.push({ name: "Moodboard", params: { id } });
      } catch (error) {
        console.error("Error creating moodboard:", error);
        this.showNotification("Error creating moodboard", "error");
      }
    },
    onImageAdded(image) {
      // Guardamos temporalmente las imágenes
      this.tempImages.push(image);
      this.showNotification("Image added successfully");
    },
    showNotification(message, type = "success") {
      this.notification = {
        message,
        type,
        show: true,
      };
    },
    closeNotification() {
      this.notification.show = false;
    },
  },
};
</script>
