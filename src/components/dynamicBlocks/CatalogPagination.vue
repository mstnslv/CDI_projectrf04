<script setup>
import {useCatalogueStore} from "../../store/catalogueStore.js";
import {storeToRefs} from "pinia";
import {computed, ref, watch} from "vue";
import IconWheel from "../icons/IconWheel.vue";

const catalogueStore = useCatalogueStore();
const {filter,orderCars} = storeToRefs(catalogueStore);
const onClickShowMore = () => {
  catalogueStore.filteredCars({
    filter: {
      ...filter.value,
      order: orderCars.value,
    },
  },true);
};
</script>

<template>

  <div class="pagination">
    <button class="btn_pagination" @click="onClickShowMore">

      <IconWheel/>
      Показать еще варианты
    </button>
  </div>



</template>