<script setup>
import IconShare from "../icons/IconShare.vue";
import IconCopyLink from "../icons/IconCopyLink.vue";
import {isMobile} from "../../utils/otherHelpers.js";

const onShareClick = () => {
  if (navigator.share) {
    navigator.share({
      title: window.document.title,
      text: window.document.title,
      url: window.location.href,
    })
    .then(() => console.log('Удалось поделиться'))
    .catch((error) => console.log('Не удалось поделиться', error));
  }
  //copy url to clipboard
  try {
    navigator.clipboard.writeText(window.location.href);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

let isMob = isMobile();
</script>



<template>

  <div class="btnsharewrap" v-if="isMob">
    <button class="btn_sqr btn_share" @click.prevent="onShareClick">
      <IconShare/>
    </button>

<!--  <button class="btn_sqr btn_copy">-->
<!--      <IconCopyLink/>-->
<!--    </button>-->
  </div>

</template>



<style scoped>

</style>