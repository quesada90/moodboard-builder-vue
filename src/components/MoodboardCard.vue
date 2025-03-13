<template>
  <router-link
    :to="{ name: 'Moodboard', params: { id: moodboard.id } }"
    class="moodboard-card"
    v-if="!isEmptyCard"
  >
    <div class="card-image">
      <img :src="moodboard.coverImage" :alt="moodboard.title" />
    </div>
    <div class="card-title">
      <h4 class="title-h4">{{ moodboard.title }}</h4>
      <i class="fa-solid fa-arrow-right"></i>
    </div>
    <div class="card-line"></div>
  </router-link>

  <div
    v-else
    class="moodboard-card moodboard-card-empty"
    @click="$emit('add-moodboard')"
  >
    <div class="card-image card-image-empty">
      <span class="plus-icon">+</span>
    </div>
    <div class="card-title">
      <h4 class="title-h4">Add moodboard</h4>
      <i class="fa-solid fa-arrow-right"></i>
    </div>
    <div class="card-line"></div>
  </div>
</template>

<script>
export default {
  name: "MoodboardCard",
  props: {
    moodboard: {
      type: Object,
      default: null,
    },
    isEmptyCard: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Los estilos se mantienen iguales que en tu CSS original */
</style>
