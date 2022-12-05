<template>
  <div class="container-fluid vh-100 max-vh-100">
    <div class="row h-100">
      <Sidebar
        @create="create"
        :first-image="firstImage"
        :creating-image="creatingImage"
        :link="link"
      />
      <main
        class="col-9 d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <img :src="link" />
        <span>{{ prompt }}</span>
        <button
          type="button"
          class="btn btn-secondary w-50 fs-1 mt-3 position-absolute bottom-0"
          data-bs-toggle="modal"
          data-bs-target="#qrModal"
        >
          Save
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
                  Om je afbeelding op te slaan, scan je de QR code hieronder met je
                  telefoon en sla je de afbeelding op in je telefoon (binnen 10
                  minuten)
                </p>
                <p class="mb-0 mt-3">
                  To save your image, scan the QR code below with your phone and
                  save the image to your phone (within 10 minutes)
                </p>
                <div class="w-100 d-flex justify-content-center mt-4 mb-3">
                  <qrcode-vue :value="link" size="250" level="L" />
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

const ORIGINAL_IMAGE =
  "/img/DALL·E 2022-11-11 14.24.43 - Marlon Brando eating soup on the beach in the style of van Gogh.png";
const link = ref(ORIGINAL_IMAGE);

const prompt = ref(
  "Marlon Brando eating soup on the beach in the style of van Gogh"
);
const creatingImage = ref(false);

const firstImage = computed(() => {
  return link.value === ORIGINAL_IMAGE;
});

async function create(object, action, location, style) {
  if (!object || !action || !location) {
    alert("Please fill in the form");
    return;
  }

  creatingImage.value = true;

  const newPrompt = createPrompt(object, action, location, style);

  const moderationResults = await moderateInput(newPrompt);

  if (moderationResults.flagged) {
    const flaggedCategories = Object.entries(moderationResults.categories)
      .filter(([category, flagged]) => flagged === true)
      .map(([category, flagged]) => category);

    alert(
      "This prompt is not allowed because it contains: " +
        flaggedCategories.join(", ")
    );

    creatingImage.value = false;
    return;
  }

  link.value = "/img/bars.svg"
  prompt.value = "Generating Image";

  const imageUrl = await getImageUrl(newPrompt);
  console.log(imageUrl);

  prompt.value = newPrompt;
  link.value = imageUrl;
  creatingImage.value = false;
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

.btn-secondary {
  border: none;
  background: rgb(182, 205, 0);
  background: -moz-linear-gradient(
    0deg,
    rgba(182, 205, 0, 1) 0%,
    rgba(0, 152, 129, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(182, 205, 0, 1) 0%,
    rgba(0, 152, 129, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(182, 205, 0, 1) 0%,
    rgba(0, 152, 129, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#b6cd00",endColorstr="#009881",GradientType=1);
}
.btn-secondary:hover {
  filter: brightness(0.9);
}
.btn-secondary:active {
  filter: brightness(0.75);
}
</style>
