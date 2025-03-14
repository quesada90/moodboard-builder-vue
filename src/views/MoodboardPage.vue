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
        <h1 class="title-h1">{{ moodboard.title || "Moodboard" }}</h1>
      </div>

      <div class="moodboard-info">
        <div class="image-counter">
          <span class="moodboard-count">
            <span>{{ moodboard.images ? moodboard.images.length : 0 }}</span>
            images
          </span>
        </div>
        <div class="header-actions">
          <div class="alt-button edit-button" @click="openEditModal">
            <i class="fa-solid fa-pencil"></i>
            <span class="tooltip">edit moodboard</span>
          </div>
          <div class="alt-button download-button" @click="downloadImages">
            <i class="fa-solid fa-arrow-down"></i>
            <span class="tooltip">download images</span>
          </div>
          <div class="alt-button share-button" @click="copyLink">
            <i class="fa-solid fa-link"></i>
            <span class="tooltip">copy link</span>
            <span class="tooltip copied-tooltip">link copied!</span>
          </div>
        </div>
      </div>

      <div
        class="empty-state-message"
        v-if="!moodboard.images || moodboard.images.length === 0"
      >
        <p>
          This moodboard doesn't have any images yet. Add some to get started!
        </p>
      </div>

      <image-grid
        v-if="moodboard.images && moodboard.images.length > 0"
        :images="moodboard.images"
        :moodboard-id="moodboardId"
        @update-images="updateImages"
        @open-lightbox="openLightbox"
        @confirm-delete="confirmDeleteImage"
      />

      <image-lightbox
        :show="showLightbox"
        :image="selectedImage"
        @close="closeLightbox"
      />

      <delete-image-modal
        :show="showDeleteImageModal"
        @cancel="cancelDeleteImage"
        @confirm="deleteImageFromMoodboard"
      />

      <upload-section :moodboard-id="moodboardId" @image-added="onImageAdded" />
    </main>

    <edit-modal
      :show="showEditModal"
      :initial-name="moodboard.title"
      :initial-cover-image="moodboard.coverImage"
      :is-new="false"
      @close="showEditModal = false"
      @save="saveMoodboardChanges"
      @delete="confirmDeleteMoodboard"
    />

    <delete-modal
      :show="showDeleteModal"
      @cancel="showDeleteModal = false"
      @confirm="deleteMoodboardConfirm"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ImageGrid from "@/components/ImageGrid.vue";
import UploadSection from "@/components/UploadSection.vue";
import NotificationBanner from "@/components/NotificationBanner.vue";
import EditModal from "@/components/EditModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import ImageLightbox from "@/components/Lightbox.vue";
import DeleteImageModal from "@/components/DeleteImageModal.vue";

export default {
  name: "MoodboardPage",
  components: {
    ImageGrid,
    UploadSection,
    NotificationBanner,
    EditModal,
    DeleteModal,
    ImageLightbox,
    DeleteImageModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showEditModal: false,
      showDeleteModal: false,
      showLightbox: false,
      showDeleteImageModal: false,
      selectedImage: null,
      imageToDelete: null,
      notification: {
        message: "",
        type: "success",
        show: false,
      },
    };
  },
  computed: {
    ...mapGetters("moodboards", ["moodboardById"]),
    moodboardId() {
      return this.id;
    },
    moodboard() {
      const moodboard = this.moodboardById(this.moodboardId);
      return moodboard || { title: "Not Found", images: [] };
    },
  },
  methods: {
    ...mapActions("moodboards", {
      updateMoodboardAction: "updateMoodboard", // Usa object mapping para renombrar
      deleteMoodboard: "deleteMoodboard",
      addImage: "addImage",
      deleteImage: "deleteImage",
      reorderImages: "reorderImages",
    }),
    openEditModal() {
      this.showEditModal = true;
    },
    confirmDeleteMoodboard() {
      this.showEditModal = false;
      this.showDeleteModal = true;
    },
    async deleteMoodboardConfirm() {
      try {
        await this.deleteMoodboard(this.moodboardId);
        this.showDeleteModal = false;
        this.$router.push({ path: "/", query: { deleted: "true" } });
      } catch (error) {
        console.error("Error deleting moodboard:", error);
        this.showNotification("Error deleting moodboard", "error");
      }
    },
    updateImages(newImages) {
      this.reorderImages({
        moodboardId: this.moodboardId,
        newOrder: newImages,
      });
    },
    onImageAdded(image) {
      this.addImage({
        moodboardId: this.moodboardId,
        image,
      });
      this.showNotification("Image added successfully");
    },
    openLightbox(image) {
      this.selectedImage = image;
      this.showLightbox = true;
    },
    closeLightbox() {
      this.showLightbox = false;
      this.selectedImage = null;
    },
    confirmDeleteImage(image) {
      this.imageToDelete = image;
      this.showDeleteImageModal = true;
    },
    cancelDeleteImage() {
      this.showDeleteImageModal = false;
      this.imageToDelete = null;
    },
    deleteImageFromMoodboard() {
      if (this.imageToDelete) {
        this.deleteImage({
          moodboardId: this.moodboardId,
          imageId: this.imageToDelete.id,
        });
        this.showDeleteImageModal = false;
        this.imageToDelete = null;
        this.showNotification("Image deleted", "error");
      }
    },
    async saveMoodboardChanges(moodboardData) {
      try {
        console.log("Guardando cambios:", moodboardData);

        // Usa el nuevo nombre de la acción
        await this.updateMoodboardAction({
          id: this.moodboardId,
          updates: {
            title: moodboardData.title,
            coverImage: moodboardData.coverImage,
          },
        });

        this.showEditModal = false;
        this.showNotification("Changes saved successfully");
      } catch (error) {
        console.error("Error updating moodboard:", error);
        this.showNotification("Error saving changes", "error");
      }
    },
    downloadImages() {
      // Esta es una implementación básica que podría extenderse con JSZip
      if (!this.moodboard.images || this.moodboard.images.length === 0) {
        this.showNotification("No images to download", "error");
        return;
      }

      // En una implementación real, descargaríamos un ZIP
      // Pero para simplificar, solo descargamos la primera imagen
      const link = document.createElement("a");
      link.href = this.moodboard.images[0].url;
      link.download = `${this.moodboard.title}-image.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.showNotification("Download started");
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
    },
    closeNotification() {
      this.notification.show = false;
    },
  },
};
</script>
