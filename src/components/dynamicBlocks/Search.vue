<script setup>
import IconCar from "../icons/IconCar.vue";
import IconYear from "../icons/IconYear.vue";
import IconDrop from "../icons/IconDrop.vue";
import IconSearch from "../icons/IconSearch.vue";
import SearchTags from "./SearchTags.vue";
import DropDownPlus from "../components/DropDownPlus.vue";
import IconClear from "../icons/IconClear.vue";
import {useMainStore} from "../../store/baseStore";
import {computed, ref, toRef, watch} from "vue";
import { storeToRefs } from 'pinia'
import router from "../../router/index.js";
const store  = useMainStore();

store.getManufacturers();
const refStore = storeToRefs(store);
const optionsManufacturers = computed(() => {
  return refStore.manufacturers?.value?.map((item) => {
    return {
      value: item.id,
      label: item.name,
      isTop: item.is_top,
      count: item.count,
    };
  }) ?? [];
});
let manufacturer = ref(null);
let model = ref(null);
let year = ref(null);
const onSelectManufacturer = (item) => {
  manufacturer.value = item;
};
watch(manufacturer, (val) => {

});
const years = computed(() => {
  let years = [];
  let currentYear = new Date().getFullYear();
  for (let i = currentYear; i > 1900; i--) {
    years.push({
      value: `${i}`,
      label: `${i}`,
    });
  }
  return years;
});
const optionsModels = computed(() => {
  return refStore.models?.value?.filter(
    (item) => item.manufacturer_id === manufacturer.value
  ).map((item) => {
    return {
      value: item.id,
      label: item.name,
      count: item.count,
    };
  }) ?? [];
});

const onClickSearch = () => {
  router.push({
    name: 'catalog',
    query: {
      manufacturer: manufacturer.value ?? null,
      model: model.value ?? null,
      yearFrom: year.value ?? null,
    },
  });
};

</script>

<template>

  <div class="search">

    <DropDownPlus class="ninput--search_carbrand" :options="optionsManufacturers" placeholder="Бренд авто" v-model="manufacturer">
      <template #icon><IconCar class="icn icn_inpt"/></template>
    </DropDownPlus>
    <DropDownPlus class="ninput--search_carmodel" :options="optionsModels" placeholder="Модель авто" :disabled="!manufacturer" v-model="model">
      <template #icon><IconCar class="icn icn_inpt"/></template>
    </DropDownPlus>
    <DropDownPlus class="ninput--search_year" :options="years" placeholder="Год выпуска" v-model="year">
      <template #icon><IconYear class="icn icn_inpt"/></template>
    </DropDownPlus>

    <button class="btn btn_search" @click.prevent="onClickSearch">
      <IconSearch/>
      Поиск
    </button>

  </div>

</template>