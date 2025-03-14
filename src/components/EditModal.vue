<template>
  <div class="modal edit-modal" :class="{ active: show }">
    <div class="modal-content">
      <div class="modal-top">
        <i class="fa-solid fa-close modal-close" @click="$emit('close')"></i>
      </div>

      <div class="modal-body">
        <div class="board-cover-section">
          <div class="section-title">BOARD COVER</div>
          <div
            class="cards-empty"
            :class="{ 'has-cover': coverImage }"
            @click="selectCoverImage"
          >
            <span v-if="!coverImage" class="plus-icon">+</span>
            <img v-else :src="coverImage" alt="Board cover" />
          </div>
          <input
            type="file"
            ref="coverImageInput"
            accept="image/*"
            class="hidden"
            @change="onCoverImageSelected"
          />
        </div>

        <div class="input-section">
          <div class="section-title">MOODBOARD NAME</div>
          <div class="input-frame" :class="{ editing: isEditing }">
            <span
              class="moodboard-name"
              ref="nameInput"
              :contenteditable="isEditing"
              @blur="finishEditing"
              @keydown.enter.prevent="finishEditing"
              @keydown.esc.prevent="cancelEditing"
              >{{ moodboardName }}</span
            >
            <i
              class="fa-solid"
              :class="isEditing ? 'fa-close' : 'fa-pen'"
              @click="toggleEditing"
            ></i>
          </div>
          <div class="error-message" v-if="errorMessage">
            {{ errorMessage }}
          </div>
        </div>
      </div>

      <div class="button-row" v-if="!isNew">
        <button class="btn btn-danger" @click="$emit('delete')">
          <span>DELETE MOODBOARD</span>
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn btn-success" @click="save">
          <span>SAVE CHANGES</span>
          <i class="fa-solid fa-floppy-disk"></i>
        </button>
      </div>

      <div class="button-row button-row-create" v-else>
        <button class="btn btn-success" @click="save">
          <span>CREATE MOODBOARD</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    initialName: {
      type: String,
      default: "Moodboard Title",
    },
    initialCoverImage: {
      type: String,
      default: "",
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      moodboardName: this.initialName,
      coverImage: this.initialCoverImage,
      isEditing: false,
      errorMessage: "",
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.moodboardName = this.initialName;
        this.coverImage = this.initialCoverImage;
        this.errorMessage = "";
      }
    },
  },
  methods: {
    selectCoverImage() {
      this.$refs.coverImageInput.click();
    },
    onCoverImageSelected(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    toggleEditing() {
      if (this.isEditing) {
        this.cancelEditing();
      } else {
        this.startEditing();
      }
    },
    startEditing() {
      this.isEditing = true;
      this.$nextTick(() => {
        const nameElement = this.$refs.nameInput;
        nameElement.focus();

        // Select all text
        const range = document.createRange();
        range.selectNodeContents(nameElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      });
    },
    cancelEditing() {
      this.isEditing = false;
      this.$refs.nameInput.textContent = this.moodboardName;
      this.errorMessage = "";
    },
    finishEditing() {
      const newName = this.$refs.nameInput.textContent.trim();

      if (this.validateMoodboardName(newName)) {
        this.moodboardName = newName;
        this.isEditing = false;
        this.errorMessage = "";
      } else {
        this.errorMessage =
          "INVALID NAME! Must be longer than 2 characters and contain no special characters.";
        this.$refs.nameInput.textContent = this.moodboardName;
        this.isEditing = false;
      }
    },
    validateMoodboardName(name) {
      // Verificar longitud mínima
      if (name.length < 3) {
        return false;
      }

      // Verificar caracteres especiales
      const specialCharsRegex = /[.,:"?&*()_+@#$%^]/;
      if (specialCharsRegex.test(name)) {
        return false;
      }

      return true;
    },
    save() {
      if (!this.validateMoodboardName(this.moodboardName)) {
        this.errorMessage =
          "INVALID NAME! Must be longer than 2 characters and contain no special characters.";
        return;
      }

      const updatedData = {
        title: this.moodboardName,
        coverImage: this.coverImage || this.initialCoverImage,
      };

      console.log("EditModal emitiendo evento save con datos:", updatedData);
      this.$emit("save", updatedData);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos ya incluidos en tu hoja de estilos principal */
</style>
