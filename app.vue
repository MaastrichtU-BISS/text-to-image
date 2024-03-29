<template>
  <div class="container-fluid vh-100 max-vh-100">
    <div class="row h-100">
      <Sidebar @create="create" :creating-image="creatingImage" :link="link" />
      <main
        class="col-9 d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <img :src="link" />
        <span>{{ prompt }}</span>
        <button
          type="button"
          class="btn btn-outline-primary w-50 fs-3 mt-3 bottom-0"
          v-if="dalleImage"
          data-bs-toggle="modal"
          data-bs-target="#qrModal"
        >
          Klik hier om je afbeelding op je telefoon op te slaan<br />Click here
          to save your image to your phone
        </button>

        <div
          class="modal fade"
          id="qrModal"
          tabindex="-1"
          aria-labelledby="qrModal"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <button
                  type="button"
                  class="btn-close position-absolute top-0 end-0 p-3"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <p class="mb-0 mt-5">
                  Om je afbeelding op te slaan, scan je de QR code hieronder met
                  je telefoon en sla je de afbeelding op in je telefoon (binnen
                  10 minuten)
                </p>
                <p class="mb-0 mt-3">
                  To save your image, scan the QR code below with your phone and
                  save the image to your phone (within 10 minutes)
                </p>
                <div class="w-100 d-flex justify-content-center mt-4 mb-3">
                  <qrcode-vue :value="link" :size="250" level="L" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import QrcodeVue from "qrcode.vue";

const defaultImage = "/img/DALL·E 2022-11-11 14.24.43 - Marlon Brando eating soup on the beach in the style of van Gogh.png";

const link = ref(defaultImage);

const prompt = ref(
  "Marlon Brando eating soup on the beach in the style of van Gogh"
);
const creatingImage = ref(false);

const dalleImage = computed(() => {
  return link.value.startsWith("http");
});

async function create(object, action, location, style) {
  if (!object || !action || !location) {
    alert("Please fill in the form");
    return;
  }

  creatingImage.value = true;

  try {

    const newPrompt = createPrompt(object, action, location, style);
  
    const moderationResults = await moderateInput(newPrompt);
    const flagged = Object.values(moderationResults.categories).filter(x => x).length > 0;
  
    if (flagged || moderationResults.flagged) {
      const flaggedCategories = Object.entries(moderationResults.categories)
        .filter(([category, flagged]) => flagged === true)
        .map(([category, flagged]) => category);
  
      alert(
        "This prompt is not allowed because it contains: " +
          flaggedCategories.join(", ")
      );
  
      link.value = defaultImage;
      creatingImage.value = false;
      return;
    }
  
    link.value = "/img/bars.svg";
    prompt.value = "Generating Image";
  
    const imageUrl = await getImageUrl(newPrompt);
    console.log(imageUrl);
  
    prompt.value = newPrompt;
    link.value = imageUrl;
    creatingImage.value = false;
  } catch (e) {
    console.error(e)
    alert("Failed to generate image");
    link.value = defaultImage;
    creatingImage.value = false;
  }
}

function createPrompt(object, action, location, style) {
  return (
    object +
    " " +
    action +
    " " +
    location +
    (style ? " in the style of " + style : "")
  );
}

async function moderateInput(input) {
  return $fetch("/api/moderate", {
    method: "POST",
    body: JSON.stringify({
      input,
    }),
  });
}

async function getImageUrl(prompt) {
  return $fetch("/api/image", {
    method: "POST",
    body: JSON.stringify({
      prompt,
    }),
  });
}
</script>

<style scoped>
img {
  width: 75%;
  max-width: 100%;
  height: auto;
}

@media (min-width: 1920px) {
  img {
    width: 50%;
  }
}

.btn-outline-primary {
  color: #005ca9;
  border-color: #005ca9;
}

.btn-outline-primary:hover,
.btn-outline-primary:active {
  color: #fff;
  background: rgb(0, 158, 227);
  background: -moz-linear-gradient(
    0deg,
    rgba(0, 158, 227, 1) 0%,
    rgba(0, 92, 169, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(0, 158, 227, 1) 0%,
    rgba(0, 92, 169, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(0, 158, 227, 1) 0%,
    rgba(0, 92, 169, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#009ee3",endColorstr="#005ca9",GradientType=1);
}
.btn-outline-primary:active {
  filter: brightness(0.8);
}
</style>
