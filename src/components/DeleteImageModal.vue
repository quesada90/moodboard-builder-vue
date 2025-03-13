<template>
  <div class="modal delete-image-modal" :class="{ active: show }">
    <div class="modal-content">
      <h3>Delete Image?</h3>
      <p>
        Are you sure you want to delete this image? This action cannot be
        undone.
      </p>
      <div class="button-row">
        <button class="btn btn-secondary" @click="$emit('cancel')">
          CANCEL
        </button>
        <button class="btn btn-danger" @click="$emit('confirm')">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteImageModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
