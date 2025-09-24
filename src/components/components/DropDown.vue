<script setup>
  import IconDrop from "../icons/IconDrop.vue";
  import {computed, ref, watch} from "vue";

  let props = defineProps({
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Object,
      default: ()=>{ return{label: '',value: ''}},
    },
  });
  let emits = defineEmits(['update:modelValue']);

  let showDrop = ref(false);
  const onItemClick = (item) => {
    showDrop.value = false;
    emits('update:modelValue', item);
    //console.log(item);
  };
  const onClickOutside = () => {
    showDrop.value = false;
  }

</script>

<template>

  <div class="ninput" v-click-outside-v2="onClickOutside" >

    <div class="dropactiveline" @click="showDrop=true">
      <div class="dropactiveline-name">
        {{ modelValue.label }}
      </div>

      <IconDrop/>
    </div>

    <div v-if="showDrop" class="ninput_drop">
      <div v-for="(item, index) in options" :key="index" class="ninput_drop__line" @click.prevent="onItemClick(item)">{{ item.label }}</div>
    </div>

  </div>

</template>
