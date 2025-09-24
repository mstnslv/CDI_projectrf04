<script setup>
  import Menu from "../components/staticBlocks/Menu.vue";
  import Footer from "../components/staticBlocks/Footer.vue";

  import Loader from "../components/staticBlocks/Loader.vue"
  import IconEngine from "../components/icons/IconEngine.vue";
  import IconOdometr from "../components/icons/IconOdometr.vue";
  import IconGearBox from "../components/icons/IconGearBox.vue";
  import ShareButton from "../components/dynamicBlocks/ShareButton.vue";
  import CatalogCarSpecs from "../components/CatalogCar/CatalogCarSpecs.vue";

  import {useCarStore} from "../store/carStore.js";
  import router from "../router/index.js";
  import {storeToRefs} from "pinia";
  import {computed} from "vue";
  import {fuelTransform} from "../utils/fuelTransform.js";
  import {transmissionTransform} from "../utils/transmissionTransform.js";
  import {formatDateTimeToDMYHM, formatPrice} from "../utils/otherHelpers.js";
  import {getPhotoUrl} from "../utils/photoHelper.js";
  import {default as eventBus} from "../eventBus.js";
  import CatalogCarInspect from "../components/CatalogCar/CatalogCarInspect.vue";
  import {useMainStore} from "../store/baseStore.js";
  import CatalogSlider from "../components/CatalogCar/CatalogSlider.vue";


  const carStore = useCarStore();
  let {carData, isCarLoading} = storeToRefs(carStore);

  const mainStore = useMainStore();
  let {rate} = storeToRefs(mainStore);

  carStore.getCar({id:router.currentRoute.value.params.id});
  const carName = computed(() =>{
    return carData?.value? `${carData?.value?.manufacturer?.name} ${carData?.value?.model?.name}${carData?.value?.car?.badge?(carData?.value?.car?.badge_detail?(' '+ carData?.value?.car?.badge+' '+carData?.value?.car?.badge_detail):' '+carData?.value?.car?.badge):''??''}, ${carData?.value?.car?.year??''}` : '';
  });
  const fuel = computed(() =>{
    let ff = fuelTransform(carData?.value?.car?.fuel_type) ?? '';
    ff = ff + ((carData?.value?.car?.engine && carData?.value?.car?.engine > 200 )? ` (${carData?.value?.car?.engine} куб. см.)` : '');
    return ff;
  });
  const mileage = computed(() =>{
    return formatPrice(carData?.value?.car?.mileage) ?? '';
  });
  const transmission = computed(() =>{
    return transmissionTransform(carData?.value?.car?.transmission) ?? '';
  });
  const price = computed(() =>{
    return formatPrice(Math.ceil(carData?.value?.car?.price * 10_000 / rate.value));
  });
  const carVin = computed(() =>{
    return carData?.value?.car?.vin ?? 'не указан';
  });
  const dateCreate = computed(() =>{
    return `${carData?.value?.car?.month? (carData?.value?.car?.month< 10 ? ('0'+carData?.value?.car?.month):(carData?.value?.car?.month)) +'.'+carData?.value?.car?.year : ''}` || 'не указан';
  });
  const carPhotos = computed(() =>{
    let data = (carData?.value?.car?.photos || []);
    if(data?.length>0){
      //console.log(carData?.value.car?.value)
      return data.split(',')?.map((item)=>getPhotoUrl(item,carData?.value.car?.main_photo)) ?? [];
    }
    return [];
  });
  const datePublished = computed(() =>{
    return carData?.value?.car?.date_created? formatDateTimeToDMYHM(carData?.value?.car?.date_created) : 'не указано';
  });


  const showContacts = (type) => {
    eventBus.$emit("showContacts",type);
  }

</script>

<template>

  <Menu/>

  <article class="pageonecar pageonecar--deleted">

    <template v-if="isCarLoading">
      <div style="margin-top: 40vh; margin-bottom: 50vh">
        <Loader/>
      </div>
    </template>
    <template v-else>


      <section class="pageonecar-s1">

        <div class="contentwrap">
          <div class="deletedbanner">
            <div class="infotext">
              Объявление устарело и недоступно
            </div>
          </div>
        </div>

        <div class="contentwrap">
          <div class="carmaininfo">
            <div class="catalogpage_photosblock">
              <CatalogSlider :options="carPhotos"/>
            </div>
            <div class="catalogpage_infoblock">
              <div class="carblock_info-headline">
                <h1 class="car_name">
                  {{ carName }}
                </h1>
              </div>
              <div class="carblock_info-headline">
                <div class="car_price">
                  ${{ price }}
                </div>

              </div>
              <div class="carblock_info-specline">
                <!--              <div class="data">
                  <div class="data_icon" >
                    <IconYear/>
                  </div>
                  <div class="data_specs">
                    <span> Дата производства </span>
                    <span>/</span>
                    <span class="data">{{dateCreate}}</span>
                  </div>


                </div>-->
                <div class="data">
                  <div class="data_icon">
                    <IconOdometr/>
                  </div>
                  <div class="data_specs">
                    <span>Пробег </span>
                    <span>/ </span>
                    <span class="data_value">{{ mileage }} км</span>
                  </div>
                </div>
                <div class="data">
                  <div class="data_icon">
                    <IconGearBox/>
                  </div>
                  <div class="data_specs">
                    <span>Коробка передач </span>
                    <span>/ </span>
                    <span class="data_value">{{transmission}}</span>
                  </div>
                </div>
                <div class="data">
                  <div class="data_icon">
                    <IconEngine/>
                  </div>
                  <div class="data_specs">
                    <span>Топливо </span>
                    <span>/ </span>
                    <span class="data_value">{{ fuel }}</span>
                  </div>
                </div>
              </div>
              <div class="onecar_btnwrap">
                <button class="onecar_btn onecar_btn--accent"
                        @click.prevent="showContacts('Заказ осмотра')">
                  Связаться
                </button>
                <button class="onecar_btn "
                        @click.prevent="showContacts('Рассчитать доставку и расстаможку')">
                  Похожие авто
                </button>
                <ShareButton/>
              </div>
            </div>
          </div>

          <div class="datewrap">
            <div class="carShortData2-item">
              <div class="key">
                Дата публикации:
              </div>
              <div class="data">
                {{datePublished}}
              </div>
            </div>
          </div>
        </div>

      </section>

      <section class="pageonecar-s2">

        <div class="contentwrap">
          <CatalogCarSpecs/>
        </div>

        <div class="contentwrap">
          <div class="deletedbanner">
            <div class="infotext">
              Объявление устарело и недоступно
            </div>
          </div>
        </div>
      </section>


    </template>

  </article>

  <Footer/>

</template>