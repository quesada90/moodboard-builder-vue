<template>
  <div class="modal delete-confirm-modal" :class="{ active: show }">
    <div class="modal-content delete-confirm-content">
      <h3>Are you sure?</h3>
      <p>
        Are you sure you want to delete this moodboard? This action cannot be
        undone.
      </p>
      <div class="button-row">
        <button class="btn btn-secondary" @click="$emit('cancel')">
          GO BACK
        </button>
        <button class="btn btn-danger" @click="$emit('confirm')">
          YES, DELETE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
