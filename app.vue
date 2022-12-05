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
        class="col d-flex flex-column align-items-center justify-content-center"
      >
        <img :src="link" />
        <span>{{ prompt }}</span>
        <button type="button" class="btn btn-primary w-50 fs-1 mt-3" v-if="!firstImage">
          Save
        </button>
      </main>
    </div>
  </div>
</template>

<script setup>
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

  link.value = "/img/bars.svg";

  const imageUrl = await getImageUrl(newPrompt);
  console.log(imageUrl);

  link.value = imageUrl;
  prompt.value = newPrompt;
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

button {
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
button:hover {
  filter: brightness(0.9);
}
button:active {
  filter: brightness(0.75);
}
</style>
