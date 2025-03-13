<template>
  <div
    class="notification-banner"
    :class="{
      active: show,
      'success-banner': type === 'success',
      'error-banner': type === 'error',
    }"
  >
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "NotificationBanner",
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "success",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$emit("close");
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 0;
  background-color: var(--red);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  text-align: center;
  font-weight: bold;
}

.notification-banner p {
  margin: 0;
  padding: 0;
}

.notification-banner.active {
  transform: translateY(0);
}

.notification-banner.success-banner {
  background-color: var(--green);
  color: var(--grey-1000);
}

.notification-banner.error-banner {
  background-color: var(--red);
}
</style>
