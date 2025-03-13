<template>
  <div class="upload-section">
    <div
      class="upload-box"
      @click="openFileUpload"
      @dragover.prevent
      @dragenter.prevent="onDragEnter"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <i
        class="fa-solid fa-arrow-up"
        :class="{ 'drag-active': isDragging }"
      ></i>
      <p class="upload-text">
        {{ isDragging ? "Drop images here" : "Drag & upload images" }}
      </p>
      <input
        type="file"
        ref="fileInput"
        multiple
        accept="image/*"
        style="display: none"
        @change="onFileSelected"
      />
    </div>

    <div class="url-upload">
      <div class="url-button" @click="showUrlInput = !showUrlInput">
        <i class="fa-solid fa-link"></i>
        <span>Add URLs</span>
      </div>

      <div v-if="showUrlInput" class="url-input-container">
        <form @submit.prevent="addImageFromUrl">
          <input
            class="url-input-field"
            v-model="imageUrl"
            placeholder="Paste image URL here..."
            required
          />
          <button type="submit" class="url-form-button">Add Image</button>
        </form>
        <div class="url-form-footnote">
          Add one or more URLs, separated by commas
        </div>
        <div class="url-form-message" :class="messageType" v-if="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadSection",
  props: {
    moodboardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDragging: false,
      showUrlInput: false,
      imageUrl: "",
      message: "",
      messageType: "success",
    };
  },
  methods: {
    openFileUpload() {
      this.$refs.fileInput.click();
    },
    onDragEnter() {
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    onDrop(e) {
      this.isDragging = false;

      if (e.dataTransfer.files.length > 0) {
        this.handleFiles(e.dataTransfer.files);
      }
    },
    onFileSelected(e) {
      if (e.target.files.length > 0) {
        this.handleFiles(e.target.files);
      }
    },
    handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const image = {
            id: Date.now() + i,
            url: e.target.result,
            alt: file.name,
          };

          this.$emit("image-added", image);
        };

        reader.readAsDataURL(file);
      }
    },
    addImageFromUrl() {
      const urls = this.imageUrl
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url);

      if (urls.length === 0) {
        this.showMessage("Please enter at least one valid URL", "error");
        return;
      }

      this.showMessage("Validating URLs...", "success");

      let addedCount = 0;

      urls.forEach((url, index) => {
        this.validateImageUrl(url)
          .then((isValid) => {
            if (isValid) {
              const image = {
                id: Date.now() + index,
                url,
                alt: "Image from URL",
              };

              this.$emit("image-added", image);
              addedCount++;

              // Si es la última URL, mostrar mensaje
              if (index === urls.length - 1) {
                if (addedCount === urls.length) {
                  this.showMessage(
                    `Successfully added ${addedCount} image${
                      addedCount > 1 ? "s" : ""
                    }`,
                    "success"
                  );
                } else {
                  this.showMessage(
                    `Added ${addedCount} image${
                      addedCount > 1 ? "s" : ""
                    }, but some URLs were invalid`,
                    "success"
                  );
                }
                this.imageUrl = "";
              }
            } else if (index === urls.length - 1 && addedCount === 0) {
              this.showMessage(
                "None of the provided URLs contain valid images",
                "error"
              );
            }
          })
          .catch(() => {
            if (index === urls.length - 1 && addedCount === 0) {
              this.showMessage(
                "Error validating URLs. Please check your input.",
                "error"
              );
            }
          });
      });
    },
    validateImageUrl(url) {
      return new Promise((resolve) => {
        let validatedUrl = url;

        if (!url.match(/^https?:\/\//i)) {
          // Si no comienza con http:// o https://, añadimos https://
          if (!url.match(/^[a-z]+:\/\//i)) {
            validatedUrl = "https://" + url;
          } else {
            resolve(false);
            return;
          }
        }

        const img = new Image();

        // Establecer un tiempo límite en caso de que la imagen tarde demasiado
        const timeout = setTimeout(() => {
          img.src = "";
          resolve(false);
        }, 5000);

        img.onload = () => {
          clearTimeout(timeout);
          resolve(true);
        };

        img.onerror = () => {
          clearTimeout(timeout);
          resolve(false);
        };

        img.src = validatedUrl;
      });
    },
    showMessage(text, type) {
      this.message = text;
      this.messageType = type;

      if (type === "success" && text !== "Validating URLs...") {
        setTimeout(() => {
          this.message = "";
        }, 5000);
      }
    },
  },
};
</script>
