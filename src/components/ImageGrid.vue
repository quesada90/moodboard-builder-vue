<template>
  <div class="image-grid">
    <image-card
      v-for="image in images"
      :key="image.id"
      :image="image"
      :moodboard-id="moodboardId"
      @open-lightbox="openLightbox"
      @confirm-delete="confirmDelete"
    />
  </div>
</template>

<script>
import ImageCard from "./ImageCard.vue";

export default {
  name: "ImageGrid",
  components: {
    ImageCard,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
    moodboardId: {
      type: String,
      required: true,
    },
  },
  methods: {
    openLightbox(image) {
      this.$emit("open-lightbox", image);
    },
    confirmDelete(image) {
      this.$emit("confirm-delete", image);
    },
  },
};
</script>
