<script setup>
  import IconEngine from "../icons/IconEngine.vue";
  import IconGearBox from "../icons/IconGearBox.vue";
  import IconOdometr from "../icons/IconOdometr.vue";
  import { computed, ref } from "vue";
  import { useCatalogueStore } from "../../store/catalogueStore.js";
  import {storeToRefs} from "pinia";
  import {transmissionTransform} from "../../utils/transmissionTransform.js";
  import {fuelTransform} from "../../utils/fuelTransform.js";
  import {getPhotoUrl} from "../../utils/photoHelper.js";
  import {formatPrice} from "../../utils/otherHelpers.js";
  import {useMainStore} from "../../store/baseStore.js";
  import {
    formatDateTimeToDMY,
    formatDateTimeToDMYHM,
    formatDateTimeToHM,
  } from "../../utils/otherHelpers.js";

  const mainStore = useMainStore();
  let {rate} = storeToRefs(mainStore);
  const catalogueStore = useCatalogueStore();
  const refCatalogueStore = storeToRefs(catalogueStore);
  const {filter} = storeToRefs(catalogueStore);

  const carlotCards = computed(()=>{
    let res = [];
    res = refCatalogueStore.carsData?.value.map( (value, index, array)=>{
      return {
        id: value.id,
        badge: value?.badge?(value.badge_detail?(value.badge+' '+value.badge_detail):value.badge):''??'',
        fuel: fuelTransform(value.fuel_type),
        availability: value.availability,
        manufacturer: value.manufacturer?.name ?? '',
        manufacturer_id: value.manufacturer?.id ?? null,
        model: value.model?.name ?? '',
        model_id: value.model?.id ?? null,
        mileage: value.mileage,
        price: formatPrice(Math.ceil(value.price * 10_000 / rate.value)),
        transmission: transmissionTransform(value.transmission),
        year: value.year,
        photo: getPhotoUrl(value?.main_photo),
        date_pub: value?.date_created? formatDateTimeToDMY(value?.date_created): '',
        time_pub: value?.date_created? formatDateTimeToHM(value?.date_created): '',
      }
    });
    return res;
  });
  /*const onClickMoreCarLikeThis = (carlotCard) => {
    /!*router.push({
      name: 'catalog',
      query: {
        manufacturer: carlotCard.manufacturer_id ?? null,
        model: carlotCard.model_id ?? null,
      },
      replace: true,
    });*!/
    catalogueStore.setFilter({
      ...(filter.value),
      manufacturer: carlotCard.manufacturer_id ?? null,
      model: carlotCard.model_id ?? null,
    });
    catalogueStore.filteredCars({
      filter: {
        ...(filter.value),
        order: refCatalogueStore.orderCars.value
      }
    });
  }*/

</script>

<template>

  <div v-for="(carlotCard, index) in carlotCards" :key="index" class="card">

    <router-link :to="`/car/${carlotCard.id}`" target="_blank">
      <div class="carblock_img">
        <img :src="carlotCard.photo">
      </div>
    </router-link>

    <div class="carblock_info">

      <div class="carblock_info-headline">
        <router-link :to="`/car/${carlotCard.id}`" target="_blank">
        <h3 class="car_name">
        {{ carlotCard.manufacturer }} {{ carlotCard.model }} {{ carlotCard.badge }}, {{ carlotCard.year }}
        </h3>
        </router-link>
        <div class="car_price">
          ${{ carlotCard.price }}
        </div>
      </div>

      <div class="carblock_info-specline">

        <div class="carblock_info-specline__specs">
          <div class="data">
            <IconOdometr/>
            <span>Пробег</span>
            <span>/</span>
            <span class="data_value">{{ formatPrice(carlotCard.mileage) }} км</span>
          </div>
          <div class="data">
            <IconGearBox/>
            <span>Коробка передач</span>
            <span>/</span>
            <span class="data_value"> {{ carlotCard.transmission }}</span>
          </div>
          <div class="data">
            <IconEngine/>
            <span>Топливо</span>
            <span>/</span>
            <span class="data_value">{{ carlotCard.fuel }}</span>
          </div>
        </div>


        <div class="carblock_info-specline__wrap">
          <div class="carblock_postdate" v-show="carlotCard.date_pub && carlotCard.time_pub">
            <span>{{carlotCard.date_pub}}</span><span> - </span><span>{{ carlotCard.time_pub }}</span>
          </div>
          <div class="carblock_info-specline__btns">


            <router-link v-if="filter.model===null"
                         :to="`/?manufacturer=${carlotCard.manufacturer_id}&model=${carlotCard.model_id}`"
                         class="carblock_more-btn button"
                         target="_blank" @click.stop>
              Похожие
            </router-link>
            <router-link :to="`/car/${carlotCard.id}`"
                         class="carblock_go-btn button"
                         target="_blank">
              Подробнее
            </router-link>
            <!--        <ShareButton/>-->
          </div>
        </div>

      </div>

    </div>

  </div>


</template>