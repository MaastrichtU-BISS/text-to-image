<template>
  <div class="container-fluid vh-100 max-vh-100">
    <div class="row h-100">
      <Sidebar @create="create" />
      <main
        class="col d-flex flex-column align-items-center justify-content-center"
      >
        <img :src="link" />
        <span>{{ prompt }}</span>
      </main>
    </div>
  </div>
</template>

<script setup>
const link = ref(
  "/img/DALL·E 2022-11-11 14.24.43 - Marlon Brando eating soup on the beach in the style of van Gogh.png"
);

const prompt = ref(
  "Marlon Brando eating soup on the beach in the style of van Gogh"
);

async function create(object, action, location, style) {
  if (!object || !action || !location) {
    alert("Please fill in the form");
    return;
  }

  const newPrompt = createPrompt(object, action, location, style);

  const moderationResults = await moderateInput(newPrompt);

  const imageUrl = await getImageUrl(newPrompt);

  console.log(imageUrl);

  prompt.value = newPrompt;
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
  height: 75vh;
}
</style>
