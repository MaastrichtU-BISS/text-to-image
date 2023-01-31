<template>
  <section id="sidebar" class="col-3 h-100 shadow-lg overflow-hidden">
    <div class="row">
      <div class="col-6" style="margin-top: -1rem">
        <img
          id="biss-logo"
          src="../assets/images/biss_um_logo_black.png"
          alt="BISS logo"
          class="w-100"
        />
      </div>
      <p class="col-12 text-danger mb-0">
        <strong>De afbeeldingen werken alleen met Engelse antwoorden</strong>
      </p>
      <p class="col-12 text-danger">
        <strong>The images only work with English answers</strong>
      </p>
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
          placeholder="For example: Marlon Brando"
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
          placeholder="For example: eating soup"
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
          placeholder="For example: on the beach"
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
          placeholder="For example: Van Gogh"
          v-model="style"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary w-100 fs-1 mt-3"
        :disabled="creatingImage"
      >
        Create
      </button>
    </form>
  </section>
</template>

<script setup>
defineEmits(["create"]);
defineProps(["creatingImage", "link"]);

const object = ref("");
const action = ref("");
const location = ref("");
const style = ref("");
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
::placeholder {
  color: #b9b9b9;
  opacity: 1; /* Firefox */
}
/* Internet Explorer 10-11 */
:-ms-input-placeholder {
  color: #b9b9b9;
}
/* Microsoft Edge */
::-ms-input-placeholder {
  color: #b9b9b9;
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
