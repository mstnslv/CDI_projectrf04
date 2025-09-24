<script setup>
import SearchTags from "./SearchTags.vue";
import {inject} from "vue";
import eventBus from "../../eventBus.js";

const onClickReset = () => {
  eventBus.$emit("resetFilter");
}
</script>

<template>

  <div class="catalog_nodata">

    <div class="catalog_nodata_main">
      <h2 class="catalog_nodata__message">
        По заданным фильтрам, авто не найдены
      </h2>
      <button class="btn_catalog_nodata" @click="onClickReset">
        Сбросить фильтр
      </button>
    </div>


    <div class="catalog_nodata_sub">
      <div class="catalog_nodata_subtext">Возможно Вам будут интересны:</div>

      <SearchTags/>
    </div>


  </div>

</template>
