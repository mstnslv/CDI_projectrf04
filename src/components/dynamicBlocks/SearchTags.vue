<script setup>
  import {useMainStore} from "../../store/baseStore";
  import {computed, ref, toRef, watch} from "vue";
  import { storeToRefs } from 'pinia'
  import {fromQueryObject, fromStringToQueryObject} from "../../utils/otherHelpers.js";
  import router from "../../router/index.js";

  const store  = useMainStore();
  const refStore = storeToRefs(store);
  const tags = computed(() => {
    return refStore.tags?.value?.map((item) => {
      return {
        value: item.link,
        label: item.name,
      };
    }) ?? [];
  });
  const onClickTag = async (item) => {
    await router.push({
      name: 'catalog',
      query: {
        ...fromStringToQueryObject(item?.value)
      },
    });
  };
</script>

<template>
  <div class="searchtags">
    <router-link to="catalog">
      <div class="btn_morefilters searchtag">
        больше фильтров
      </div>
    </router-link>
    <div v-for="(item, index) in tags" :key="index" class="searchtag" @click.prevent="onClickTag(item)">
      {{ item.label }}
    </div>
  </div>
</template>

