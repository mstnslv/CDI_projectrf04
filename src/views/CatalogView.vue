<script setup>
import Menu from "../components/staticBlocks/Menu.vue";
import CatalogFilter from "../components/dynamicBlocks/CatalogFilter.vue";
import CatalogGrid from "../components/staticBlocks/CatalogGrid.vue";

import Loader from "../components/staticBlocks/Loader.vue";
import DropDown from "../components/components/DropDown.vue";
import {computed, ref, watch, onMounted} from "vue";
import {useCatalogueStore} from "../store/catalogueStore.js";
import {storeToRefs} from "pinia";
import CatalogPagination from "../components/DynamicBlocks/CatalogPagination.vue";
import CatalogNoData from "../components/DynamicBlocks/CatalogNoData.vue";
import {fromQueryObject} from "../utils/otherHelpers.js";
import router from "../router/index.js";
import {default as eventBus} from "../eventBus.js";
import AutogolderMenu from "@/components/AUTOGOLDER/AutogolderMenu.vue";
import AutogolderHero from "@/components/AUTOGOLDER/AutogolderHero.vue";
import AutogolderCatalog from "@/components/AUTOGOLDER/AutogolderCatalog.vue";
import AutogolderCredit from "@/components/AUTOGOLDER/AutogolderCredit.vue";
import AutogolderLastCars from "@/components/AUTOGOLDER/AutogolderLastCars.vue";
import AutogolderFooter from "../components/AUTOGOLDER/AutogolderFooter.vue";
import AutogolderTeamBoss from "@/components/AUTOGOLDER/AutogolderTeamBoss.vue";
import AutogolderFeedback from "@/components/AUTOGOLDER/AutogolderFeedback.vue";
import AutogolderFeatures from "@/components/AUTOGOLDER/AutogolderFeatures.vue";
import AutogolderContact from "@/components/AUTOGOLDER/AutogolderContact.vue";
import AutogolderModalContacts from "@/components/AUTOGOLDER/AutogolderModalContacts.vue";

// 👇 новые импорты для маппинга slug → id
import { useRoute } from "vue-router";
import { useMainStore } from "@/store/baseStore.js";
import { fuelTypes } from "@/store/catalogueStore.js";

let isMobFilterActive = ref(false);
const toggleMobFilter = () => {
  isMobFilterActive.value = !isMobFilterActive.value;
}

const catalogueStore = useCatalogueStore();
const refCatalogueStore = storeToRefs(catalogueStore);

const lastRoute = computed(() => {
  const backUrl = router.options.history.state.forward;
  const route = router.resolve({ path: `${backUrl}` })
  return route;
});

const showContacts = (type) => {
  eventBus.$emit("showContacts", type);
};

// 👇 обработка ЧПУ route → filter
const route = useRoute();
const mainStore = useMainStore();

onMounted(() => {
  if (route.name === "catalog-filter") {
    const manufacturer = route.params.manufacturerSlug
        ? mainStore.manufacturersSlugMap.get(route.params.manufacturerSlug)
        : null;

    const model = route.params.modelSlug
        ? mainStore.modelsSlugMap.get(route.params.modelSlug)
        : null;

    const fuel = route.params.fuelSlug
        ? fuelTypes.find(f => f.slug === route.params.fuelSlug)
        : null;

    catalogueStore.setFilter({
      ...catalogueStore.filter,
      manufacturer: manufacturer ? manufacturer.id : null,
      model: model ? model.id : null,
      fuelType: fuel ? fuel.value : null,
      ...route.query
    });

    catalogueStore.filteredCars({ filter: catalogueStore.filter });
  } else if (lastRoute.value && lastRoute.value.name === 'car' &&
      refCatalogueStore.carsData && refCatalogueStore.carsData.value.length !== 0) {
    document.getElementsByTagName('html')[0].scrollTop = 0;
  } else {
    catalogueStore.filteredCars({
      filter: {
        order: "newest",
        ...fromQueryObject(router.currentRoute.value.query)
      }
    });
  }
});

const sortOptions = [
  { value: "popular", label: "Популярные" },
  { value: "priceAsc", label: "Цена - Дешевле" },
  { value: "priceDesc", label: "Цена - Дороже" },
  { value: "newest", label: "Самые новые" },
  { value: "mileageDesc", label: "Пробег - больше" },
  { value: "mileageAsc", label: "Пробег - меньше" },
];
let sortItem = ref(sortOptions[3]);

let objFromQuery = fromQueryObject(router.currentRoute.value.query);
sortItem.value = sortOptions.find((item) => item.value === objFromQuery.order) || sortOptions[3];

watch(sortItem, (val) => {
  refCatalogueStore.orderCars.value = val.value;
  catalogueStore.filteredCars({
    filter: {
      ...refCatalogueStore.filter.value,
      order: refCatalogueStore.orderCars.value,
    }
  });
});

let hasCars = ref(true);
watch(refCatalogueStore.carsData, (val) => {
  hasCars.value = val.length !== 0;
}, { immediate: true });

let { isCarsLoading, isCarsUpdating, isCarsCanHasMore } = storeToRefs(catalogueStore);
</script>

<template>
  <AutogolderMenu/>

  <AutogolderHero/>

  <AutogolderCatalog/>



  <article class="catalogview" id="catalogue">
    <section class="catalogviewwrap">
      <div class="contentwrap">
        <div class="catalogview_top" :class="{ active: isMobFilterActive }">
          <CatalogFilter/>
          <div class="filter_mobile-btnswrap">
            <button class="filter_mobile-btn" @click="toggleMobFilter">
              Показать
            </button>
          </div>
        </div>
        <div class="catalogview_bottom">
          <div class="catalogview_sortblock">
            <div class="catalogview_sortblock-totalfound">
              <span>Список вариантов: </span>
            </div>
            <!--          <div class="catalogview_sortblock-sortwrap">
                        <drop-down :options="sortOptions" v-model="sortItem" class="catalog-sort"/>
                      </div>-->
            <div class="linearsort">

              <div class="linearsort_item" :class="{'linearsort_item--active' : sortItem.value === 'priceAsc'}"
                @click.prevent="sortItem = sortOptions[1]">
                Цена
              </div>
              <div class="linearsort_item" :class="{'linearsort_item--active' : sortItem.value === 'mileageAsc'}"
                 @click.prevent="sortItem = sortOptions[5]">
                Пробег
              </div>
              <div class="linearsort_item" :class="{'linearsort_item--active' : sortItem.value === 'newest'}"
                 @click.prevent="sortItem = sortOptions[3]">
                Новые
              </div>
              <div class="linearsort_item" :class="{'linearsort_item--active' : sortItem.value === 'popular'}"
                 @click.prevent="sortItem = sortOptions[0]">
                Популярные
              </div>

            </div>

          </div>
          <CatalogGrid v-if="!isCarsLoading"/>
          <CatalogNoData v-if="!hasCars && !isCarsLoading && !isCarsUpdating"/>
          <CatalogPagination v-if="isCarsCanHasMore && !(isCarsLoading || isCarsUpdating)"/>
          <Loader v-if="isCarsLoading || isCarsUpdating"/>
        </div>
        <div class="catalog_mob-btnswrap">
          <button class="catalog_mob-btnfilter" @click="toggleMobFilter">
            Фильтры
          </button>
        </div>
      </div>
    </section>
  </article>

  <AutogolderCredit/>

  <AutogolderLastCars/>

  <AutogolderTeamBoss/>

  <AutogolderFeedback/>

  <AutogolderFeatures/>

  <AutogolderContact/>






  <AutogolderFooter/>

  <AutogolderModalContacts/>

</template>