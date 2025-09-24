<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ModalContacts from "./components/staticBlocks/ModalContacts.vue";
import {ref} from "vue";
import {default as eventBus} from "./eventBus.js";

let showContactsModal = ref(false);
let type = ref('');
const showContacts = (typeIn) => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '8px';
  type.value = typeIn;
  showContactsModal.value = true;
}
const hideContacts = () => {
  showContactsModal.value = false;
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = 0+'px';
}
eventBus.$on("showContacts", showContacts);
eventBus.$on("hideContacts", hideContacts);
</script>

<template>
  <RouterView />
  <modal-contacts v-show="showContactsModal" :type="type"/>



</template>

<style scoped>

</style>
