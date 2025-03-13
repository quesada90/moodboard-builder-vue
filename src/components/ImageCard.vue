<template>
  <div
    class="image-card"
    :draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <img :src="image.url" :alt="image.alt" />
    <div class="image-overlay">
      <button class="image-action-btn zoom-btn" @click="openLightbox">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <button class="image-action-btn delete-btn" @click="confirmDelete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageCard",
  props: {
    image: {
      type: Object,
      required: true,
    },
    moodboardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDragging: false,
    };
  },
  methods: {
    openLightbox() {
      this.$emit("open-lightbox", this.image);
    },
    confirmDelete() {
      this.$emit("confirm-delete", this.image);
    },
    onDragStart(e) {
      this.isDragging = true;
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          imageId: this.image.id,
          moodboardId: this.moodboardId,
        })
      );

      // Añadir clase y estilo al elemento arrastrado
      setTimeout(() => {
        this.$el.classList.add("dragging");
        this.$el.style.opacity = "0.9";
        this.$el.style.transform = "scale(0.95)";
      }, 0);
    },
    onDragEnd() {
      this.isDragging = false;
      this.$el.classList.remove("dragging");
      this.$el.style.opacity = "";
      this.$el.style.transform = "";
    },
  },
};
</script>
