<script setup>
import {default as eventBus} from "../../eventBus.js";
import {useCarStore} from "../../store/carStore.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const carStore = useCarStore();
let {carData} = storeToRefs(carStore);

let autoExpertise = computed(()=>carData?.value?.auto_expertise ?? []);
let autoExpertiseManufacturers = computed(()=>carData?.value?.auto_expertise_manufacturers ?? []);
let autoExpertiseModels = computed(()=>carData?.value?.auto_expertise_models ?? []);
const getYoutubeId = (url) => {
  let id = '';
  if(url){
    let arr = url.split('/');
    id = arr[arr.length-1];
  }
  return id;
}
let autoExpertiseCompiledData = computed(()=> {
  let data = [];
  for(let ap of autoExpertise.value){
    let manufacturer = autoExpertiseManufacturers.value.find((item)=>item.id === ap.manufacturer_id);
    if(manufacturer){
      let model = autoExpertiseModels.value.find((item)=>item.id === ap.model_id);
      if(model){
        data.push({
          manufacturer: manufacturer.name,
          model: model.name,
          year: ap.year,
          text:  ap.text??'',
          youtube: 'https://www.youtube.com/embed/' +getYoutubeId(ap.youtube),
        });
      }
    }
  }

  return data;
});

const showContacts = () => {
  eventBus.$emit("showContacts", 'Заказать осмотр на странице машины');
}
</script>

<template>

  <div class="carreview">

    <div class="carreview_block" v-for="(item, index) in autoExpertiseCompiledData" :key="index">

      <div class="carreview_block__photosblock left">

        <div class="youtubevideo">
          <iframe width="560" height="315" :src="item.youtube" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

        </div>

      </div>

      <div class="carreview_block__details right">

        <h3 class="">
          Осмотр {{item.manufacturer}} {{item.model}} из Кореи
        </h3>

        <div class="" v-html="item.text">

        </div>

        <div class="carShortData2">
          <div class="carShortData2-item">
            <div class="key">
              Дата осмотра:
            </div>
            <div class="data">
              20.01.2022
            </div>
          </div>

        </div>

        <button class="carreview_block__details-btn" @click.prevent="showContacts">
          Заказать осмотр авто из каталога
        </button>

      </div>

    </div>

  </div>

</template>
