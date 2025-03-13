<template>
  <div class="lightbox" :class="{ active: show }">
    <div class="lightbox-content">
      <div class="lightbox-close" @click="$emit('close')">
        <i class="fa-solid fa-close"></i>
      </div>
      <img
        :src="image && image.url"
        :alt="image && image.alt"
        id="lightbox-image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageLightbox",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Object,
      default: null,
    },
  },
  watch: {
    show(val) {
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
};
</script>
