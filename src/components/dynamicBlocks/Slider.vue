<script setup>

import IconDrop from "../icons/IconDrop.vue";
import IconSearch from "../icons/IconSearch.vue";
import IconZoom from "../icons/IconZoom.vue";
import {computed, ref, watch} from "vue";
import ModalGallery from "./ModalGallery.vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  }
});
let index = ref(0);
const incrementIndex = () => {
  if(index.value < props.options.length - 1){
    index.value++;
  }else{
    index.value = 0;
  }
}
const decrementIndex = () => {
  if(index.value > 0){
    index.value--;
  }else{
    index.value = props.options.length - 1;
  }
}
const setIndex = (i) => {
  index.value = i;
}
let fullScreen = ref(false);
watch(fullScreen, (val) => {
  if(val){
    document.body.style.overflow = 'hidden';
  }else{
    document.body.style.overflow = 'auto';
  }
});
let src = computed(() => {
  if(props.options.length === 0){
    return null;
  }
  return props.options[index.value] ?? null;
});

</script>

<template>

  <div class="slider" style="user-select: none">
      <div class="slider_mainview">

        <img :src="src" :key="index" @click="fullScreen=true" style="cursor: pointer">

        <div class="slider_btn slider_btn-left" @click="decrementIndex">
          <IconDrop/>
        </div>
        <div class="slider_btn slider_btn-right" @click="incrementIndex">
          <IconDrop/>
        </div>
        <div class="slider_btn slider_btn-zoom" @click="fullScreen=true">
          <IconZoom/>
        </div>

      </div>

      <div class="slider_prewlist">

        <div v-for="(item, index) in props.options" :key="index" class="slider_prewlist-item" @click="setIndex(index)">
          <img :src="item">
        </div>

      </div>

    </div>

  <modal-gallery v-if="fullScreen" :options="options" v-model="index" @close="fullScreen=false"/>

</template>