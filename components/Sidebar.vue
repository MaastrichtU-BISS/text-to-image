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

    <form
      autocomplete="off"
      @submit.prevent="$emit('create', object, action, location, style)"
    >
      <div>
        <label for="inputObject" class="form-label"
          >Object / person / animal</label
        >
        <input
          type="text"
          autocomplete="off"
          class="form-control userObject"
          id="inputObject"
          aria-describedby="inputObject"
          placeholder="For example: Marlon Brando"
          v-model="object"
          @focus="hide_all_rows_except(0)"
          required
        />
      </div>
      <div>
        <label for="inputAction" class="form-label">Action / activity</label>
        <input
          type="text"
          autocomplete="off"
          class="form-control userAction"
          id="inputAction"
          aria-describedby="inputAction"
          placeholder="For example: eating soup"
          v-model="action"
          @focus="hide_all_rows_except(1)"
          required
        />
      </div>
      <div>
        <label for="inputLocation" class="form-label"
          >Location / environment</label
        >
        <input
          type="text"
          autocomplete="off"
          class="form-control userLocation"
          id="inputLocation"
          aria-describedby="inputLocation"
          placeholder="For example: on the beach"
          v-model="location"
          @focus="hide_all_rows_except(2)"
          required
        />
      </div>
      <div>
        <label for="inputStyle" class="form-label"
          >Art style <span style="font-weight: 200">(Optional)</span></label
        >
        <input
          type="text"
          autocomplete="off"
          class="form-control userStyle"
          id="inputStyle"
          aria-describedby="inputStyle"
          placeholder="For example: Van Gogh"
          @focus="hide_all_rows_except(3)"
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
    <div class="simple-keyboard"></div>
  </section>
</template>
<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
defineEmits(["create"]);
defineProps(["creatingImage", "link"]);

const object = ref("");
const action = ref("");
const location = ref("");
const style = ref("");

let layout = {
  default: [
    "{tab} q w e r t y u i o p {bksp}",
    "a s d f g h j k l {enter}",
    "z x c v b n m",
    "{space}",
  ],
  shift: [
    "{tab} Q W E R T Y U I O P {bksp}",
    "{lock} A S D F G H J K L {enter}",
    "{shift} Z X C V B N M {shift}",
    "{space}",
  ],
};

let keyboard1 = null;
let keyboard2 = null;
let keyboard3 = null;
let keyboard4 = null;

function hide_all_rows_except(i) {
  var rows = document.querySelectorAll(".hg-rows");
  rows.forEach((r, index) => {
    if (index != i) {
      r.classList.add("d-none");
    } else {
      r.classList.remove("d-none");
    }
  });
  // console.log(rows);
}

onMounted(() => {
  keyboard1 = new Keyboard({
    onChange: (userObject) => {
      document.querySelector(".userObject").value = userObject;
      object.value = userObject;
    },

    layout: layout,
    // onKeyPress: (char) => {
    //   // console.log(char)
    //   if (char === "{shift}" || char === "{lock}") {
    //     handleShift(0);
    //   }
    // },
  });
  keyboard2 = new Keyboard({
    onChange: (userAction) => {
      document.querySelector(".userAction").value = userAction;
      console.log("userAction", userAction);
      action.value = userAction;
    },
    // onKeyPress: (char) => {
    //   console.log(21);
    //   if (char === "{shift}" || char === "{lock}") {
    //     handleShift(1);
    //   }
    // },
    layout: layout,
  });
  keyboard3 = new Keyboard({
    onChange: (userLocation) => {
      document.querySelector(".userLocation").value = userLocation;
      location.value = userLocation;
    },
    // onKeyPress: (char) => {
    //   // console.log(char)
    //   if (char === "{shift}" || char === "{lock}") {
    //     handleShift(2);
    //   }
    // },
    layout: layout,
  });
  keyboard4 = new Keyboard({
    onChange: (userStyle) => {
      document.querySelector(".userStyle").value = userStyle;
      style.value = userStyle;
    },
    // onKeyPress: (char) => {
    //   console.log(char);
    //   if (char === "{shift}" || char === "{lock}") {
    //     handleShift(3);
    //   }
    // },
    layout: layout,
  });
  setTimeout(() => {
    hide_all_rows_except(-1);
  }, 0);
});

// function handleShift(i) {
//   var currentLayout;

//   switch (i) {
//     case 0:
//       currentLayout = keyboard1.options.layoutName;
//       keyboard1.setOptions({
//         layoutName: currentLayout === "default" ? "shift" : "default",
//       });
//       hide_all_rows_except(0);
//       break;
//     case 1:
//       currentLayout = keyboard2.options.layoutName;
//       keyboard2.setOptions({
//         layoutName: currentLayout === "default" ? "shift" : "default",
//       });
//       break;
//     case 2:
//       currentLayout = keyboard3.options.layoutName;
//       keyboard3.setOptions({
//         layoutName: currentLayout === "default" ? "shift" : "default",
//       });
//       break;
//     case 3:
//       currentLayout = keyboard4.options.layoutName;
//       console.log(currentLayout);
//       keyboard4.setOptions({
//         layoutName: currentLayout === "default" ? "shift" : "default",
//       });
//       console.log(keyboard4.options.layoutName);
//       break;
//     default:
//       break;
//   }
//   console.log("i =", i);
// }
</script>

<style scoped>
#biss-logo {
  margin-left: -1rem;
}
.simple-keyboard {
  width: 100%;
  margin-top: 10%;
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
