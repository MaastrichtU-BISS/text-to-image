<template>
  <section id="sidebar" class="col-3 h-100 shadow-lg">
    <div class="row">
      <div class="col-6">
        <img
          id="biss-logo"
          src="../assets/images/biss_um_logo_black.png"
          alt="BISS logo"
          class="w-100"
        />
      </div>
    </div>

    <form @submit.prevent="$emit('create', object, action, location, style)">
      <div>
        <label for="inputObject" class="form-label"
          >Object / person / animal</label
        >
        <input
          type="text"
          class="form-control"
          id="inputObject"
          aria-describedby="inputObject"
          placeholder="Marlon Brando"
          v-model="object"
          required
        />
      </div>
      <div>
        <label for="inputAction" class="form-label">Action / activity</label>
        <input
          type="text"
          class="form-control"
          id="inputAction"
          aria-describedby="inputAction"
          placeholder="eating soup"
          v-model="action"
          required
        />
      </div>
      <div>
        <label for="inputLocation" class="form-label"
          >Location / environment</label
        >
        <input
          type="text"
          class="form-control"
          id="inputLocation"
          aria-describedby="inputLocation"
          placeholder="on the beach"
          v-model="location"
          required
        />
      </div>
      <div>
        <label for="inputStyle" class="form-label"
          >Art style <span style="font-weight: 200">(Optional)</span></label
        >
        <input
          type="text"
          class="form-control"
          id="inputStyle"
          aria-describedby="inputStyle"
          placeholder="Van Gogh"
          v-model="style"
        />
      </div>

      <button type="submit" class="btn btn-primary w-100 fs-1 mt-3" :disabled="creatingImage">
        Create
      </button>
    </form>
    <div v-if="!firstImage">
      <p class="mb-0 mt-3">
        If you want to save your image, scan the QR code below with your phone
        and save it to your phone (within 10 minutes)
      </p>
      <div class="w-100 d-flex justify-content-center">
        <img
          :src="`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${link}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(["create"]);
const props = defineProps(["creatingImage", "link"]);

const object = ref("");
const action = ref("");
const location = ref("");
const style = ref("");

const firstImage = computed(() => {
  return (
    props.link ===
    "/img/DALL·E 2022-11-11 14.24.43 - Marlon Brando eating soup on the beach in the style of van Gogh.png"
  );
});
</script>

<style scoped>
#biss-logo {
  margin-left: -1rem;
}

form > div {
  margin-bottom: 1rem;
}
label {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
}
.form-control {
  font-weight: 300;
}

button {
  border: none;
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
button:hover {
  filter: brightness(0.9);
}
button:active {
  filter: brightness(0.75);
}
</style>
