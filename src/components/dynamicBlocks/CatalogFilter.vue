<script setup>
import DropDownPlus from "../components/DropDownPlus.vue";
import DropDown from "../components/DropDown.vue";
import {useMainStore} from "../../store/baseStore";
import {computed, reactive, ref, watch, onMounted} from "vue";
import { storeToRefs } from 'pinia'
import { watchDebounced } from '@vueuse/core'
import {useCatalogueStore} from "../../store/catalogueStore.js";
import {fuelTypes,transmissionTypes, inspectionTypes, historyTypes} from "../../store/catalogueStore.js";
import eventBus from "../../eventBus.js";
import {fromQueryObject} from "../../utils/otherHelpers.js";
import router from "../../router/index.js";
import { useRoute } from "vue-router";
import IconClose3 from "../icons/IconClose3.vue";
import DropDownCheckBoxes from "../components/DropDownCheckBoxes.vue";

const store  = useMainStore();
const catalogueStore = useCatalogueStore();
const route = useRoute();

store.getManufacturers();
const refStore = storeToRefs(store);
const refCatalogueStore = storeToRefs(catalogueStore);

const optionsManufacturers = computed(() => {
  let manufacrurers = [{value: null, label: 'Любой'}];
  const arr = refStore.manufacturers?.value || [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    manufacrurers.push({
      value: item.id,
      label: item.name,
      isTop: item.is_top,
      count: item.count,
    });
  }
  return manufacrurers;
});

let modelFiler = ref('');
let modelChecked = ref([]);
const optionsModels = computed(() => {
  let models = [{value: null, label: 'Любая'}];
  const all = refStore.models?.value || [];
  const manId = filter.manufacturer;
  for (let i = 0; i < all.length; i++) {
    const item = all[i];
    if (item.manufacturer_id === manId && item.name.toLowerCase().includes((modelFiler.value||'').toLowerCase())) {
      models.push({
        value: item.id,
        label: item.name,
        count: item.count,
      });
    }
  }
  return models;
});
watch(modelChecked, (val) => {
  filter.model = val;
});

let clearTime = ref(0);
let objFromQuery = fromQueryObject(router.currentRoute.value.query);

const isOpened = reactive({
  filterResetBtn: true,
  filterCarBrand: true,
  filterCarModel: true,
  filterCarYear: true,
  filterOdometer: true,
  filterPrice: true,
  filterEngineType: true,
  filterIsCrashed: true,
  filterGearboxType: true,
  filterWheelDrive: true,
  filterCarBodyType: true,
  filterCarAvailability: true,
  filterVinCode: true
});

// локальная ссылка на стор-фильтр
const filter = reactive(refCatalogueStore.filter.value);

// инициализация из query (обратная совместимость)
filter.manufacturer = objFromQuery.manufacturer || null;
filter.model = objFromQuery.model || null;
filter.yearFrom = objFromQuery.yearFrom || null;
filter.yearTo = objFromQuery.yearTo || null;
filter.mileageFrom = objFromQuery.mileageFrom || null;
filter.mileageTo = objFromQuery.mileageTo || null;
filter.priceFrom = objFromQuery.priceFrom || null;
filter.priceTo = objFromQuery.priceTo || null;
filter.fuelType = objFromQuery.fuelType || null;
filter.transmission = objFromQuery.transmission || null;
filter.inspection = objFromQuery.inspection || null;
filter.history = objFromQuery.history || null;

// ЧПУ → id при заходе по slug’ам
onMounted(() => {
  if (route.name === 'catalog-filter') {
    // manufacturer
    if (route.params.manufacturerSlug && refStore.manufacturersSlugMap?.value) {
      const man = refStore.manufacturersSlugMap.value.get(route.params.manufacturerSlug);
      filter.manufacturer = man ? man.id : null;
    }
    // model
    if (route.params.modelSlug && refStore.modelsSlugMap?.value) {
      const md = refStore.modelsSlugMap.value.get(route.params.modelSlug);
      filter.model = md ? md.id : null;
    }
    // fuel (в фильтре — мультивыбор; делаем массив из одного значения)
    if (route.params.fuelSlug) {
      const f = fuelTypes.find(x => x.slug === route.params.fuelSlug);
      filter.fuelType = f ? [f.value] : null;
      selectedFuelTypes.value = f ? [f.value] : [];
    }
  }
});

watchDebounced(filter, (val) => {
  // (по клику "Показать" будем вызывать submit();
  // авто-дебаунс можно включить позже, если нужно)
}, { debounce: 1000, maxWait: 3000 });

const years = computed(() => {
  let years = [{value: null, label: 'Любой'}];
  let currentYear = new Date().getFullYear();
  for (let i = currentYear; i > 1900; i--) {
    years.push({ value: i, label: String(i) });
  }
  return years;
});

const kilometrs = [
  {value: null, label: 'Любой'},
  {value: 1000, label: '1000'},
  {value: 5000, label: '5000'},
  {value: 10000, label: '10000'},
  {value: 20000, label: '20000'},
  {value: 30000, label: '30000'},
  {value: 40000, label: '40000'},
  {value: 50000, label: '50000'},
  {value: 60000, label: '60000'},
  {value: 80000, label: '80000'},
  {value: 100000, label: '100000'},
  {value: 120000, label: '120000'},
  {value: 150000, label: '150000'},
  {value: 200000, label: '200000'},
  {value: 250000, label: '250000'},
  {value: 300000, label: '300000'},
];

let mileageFrom = ref(null);
let mileageTo = ref(null);
mileageFrom.value = filter.mileageFrom ? (filter.mileageFrom/1000) : null;
mileageTo.value = filter.mileageTo ? (filter.mileageTo/1000) : null;

watch([mileageFrom, mileageTo], () => {
  filter.mileageFrom = mileageFrom.value ? (mileageFrom.value * 1000) : null;
  filter.mileageTo   = mileageTo.value   ? (mileageTo.value   * 1000) : null;
});

let priceFrom = ref(null);
let priceTo = ref(null);
priceFrom.value = filter.priceFrom ? filter.priceFrom : null;
priceTo.value = filter.priceTo ? filter.priceTo: null;

watch([priceFrom, priceTo], () => {
  filter.priceFrom = priceFrom.value;
  filter.priceTo = priceTo.value;
});

let selectedFuelTypes = ref([]);
selectedFuelTypes.value = filter.fuelType ? filter.fuelType : [];
watch(selectedFuelTypes, (val) => {
  filter.fuelType = (val && val.length>0) ? val : null;
});

let selectedTransmissionTypes = ref([]);
selectedTransmissionTypes.value = filter.transmission ? filter.transmission : [];
watch(selectedTransmissionTypes, (val) => {
  filter.transmission = (val && val.length>0) ? val : null;
});

let selectedInspectionTypes = ref([]);
selectedInspectionTypes.value = filter.inspection ? filter.inspection : [];
watch(selectedInspectionTypes, (val) => {
  filter.inspection = (val && val.length>0) ? val : null;
});

let selectedHistoryTypes = ref([]);
selectedHistoryTypes.value = filter.history ? filter.history : [];
watch(selectedHistoryTypes, (val) => {
  filter.history = (val && val.length>0) ? val : null;
});

let selectedAvailability = ref([]);
selectedAvailability.value = filter.availability ? filter.availability : [];
watch(selectedAvailability, (val) => {
  filter.availability = (val && val.length>0) ? val : null;
});

const resetFilter = async () => {
  filter.manufacturer = null;
  filter.model = null;
  filter.yearFrom = null;
  filter.yearTo = null;
  filter.mileageFrom = null;
  filter.kilometrsFrom = null;
  filter.mileageTo = null;
  filter.kilometrsTo = null;
  filter.priceFrom = null;
  filter.priceTo = null;
  filter.fuelType = null;
  filter.transmission = null;
  filter.inspection = null;
  filter.history = null;
  filter.availability = null;

  priceFrom.value = null;
  priceTo.value = null;
  mileageFrom.value = null;
  mileageTo.value = null;
  selectedFuelTypes.value = [];
  selectedAvailability.value = [];
  selectedTransmissionTypes.value = [];
  selectedInspectionTypes.value = [];
  selectedHistoryTypes.value = [];
  clearTime.value = Date.now();

  // сбрасываем URL (важно!) и перезагружаем список
  await router.replace({ path: '/', query: {} });

  // обновляем стор и грузим заново
  catalogueStore.setFilter(filter);
  const payloadFilter = JSON.parse(JSON.stringify(filter));
  payloadFilter.order = refCatalogueStore.orderCars.value || 'newest';
  catalogueStore.filteredCars({ filter: payloadFilter });
};

const countActiveFilters = computed(() => {
  let count = 0;
  if (filter.manufacturer) count++;
  if (filter.model) count++;
  if (filter.yearFrom || filter.yearTo) count++;
  if (filter.mileageFrom || filter.mileageTo) count++;
  if (filter.priceFrom || filter.priceTo) count++;
  if (filter.fuelType) count++;
  if (filter.transmission) count++;
  if (filter.availability) count++;
  if (filter.history) count++;
  if (filter.inspection) count++;
  return count;
});

watch(()=>filter.manufacturer, () =>{
  filter.model = null;
});

eventBus.$on('resetFilter', () => {
  resetFilter();
});

const submit = async () => {
  catalogueStore.setFilter(filter);
  const payloadFilter = JSON.parse(JSON.stringify(filter));
  payloadFilter.order = refCatalogueStore.orderCars.value || 'newest';
  await catalogueStore.filteredCars({ filter: payloadFilter });
};

const priceArr = [
  {value: null, label: 'Любая'},
  {value: 2000, label: '2000'},
  {value: 3000, label: '3000'},
  {value: 5000, label: '5000'},
  {value: 8000, label: '8000'},
  {value: 10000, label: '10000'},
  {value: 12000, label: '12000'},
  {value: 15000, label: '15000'},
  {value: 20000, label: '20000'},
  {value: 25000, label: '25000'},
  {value: 30000, label: '30000'},
  {value: 40000, label: '40000'},
  {value: 50000, label: '50000'},
  {value: 60000, label: '60000'},
  {value: 70000, label: '70000'},
  {value: 80000, label: '80000'},
  {value: 90000, label: '90000'},
  {value: 100000, label: '100000'}
];

let isFilterVisible = ref(false);
const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value;
};

let gearboxItems = ["Автомат", "Вариатор", "Робот", "Механика"];
let engineItems = ["Бензиновый", "Дизельный", "Газ", "Гибрид", "Электрический"];
let insuranceItems = ["Есть страховая история", "Нет страховой истории", "Нет информации по страховой"];
let inspectionItems = ["Есть инспекция", "Инспекции не было", "Нет информации об инспекции"];
</script>


<template>

  <form id="filtercarcatalogue" class="filter filter--desktop">

    <div class="filtergrid">

      <!--CarBrand-->
      <fieldset class="fieldset-row">
        <DropDownPlus
            :options="optionsManufacturers"
            placeholder="Бренд авто"
            v-model="filter.manufacturer">
        </DropDownPlus>
      </fieldset>

      <!--CarModel-->
      <fieldset class="fieldset-row">
        <DropDownPlus
            :options="optionsModels"
            placeholder="Модель авто"
            v-model="filter.model"
            :disabled="!filter.manufacturer">
        </DropDownPlus>
      </fieldset>

      <!--Year-->
      <fieldset class="fieldset-row fieldset-double">
        <DropDownPlus class="dd--year" inputmode="numeric" :options="years" placeholder="Год от" v-model="filter.yearFrom">
        </DropDownPlus>
        <DropDownPlus class="dd--year" inputmode="numeric" :options="years" placeholder="До" v-model="filter.yearTo">
        </DropDownPlus>
      </fieldset>

      <!--Price-->
      <fieldset class="fieldset-row fieldset-double">
        <DropDownPlus class="dd--price" inputmode="numeric" :options="priceArr" placeholder="Цена от" v-model="filter.priceFrom">
        </DropDownPlus>
        <DropDownPlus class="dd--price" inputmode="numeric" :options="priceArr" placeholder="До (usd)" v-model="filter.priceTo">
        </DropDownPlus>
      </fieldset>


      <!--Mileage-->
      <fieldset class="fieldset-row fieldset-double">
        <DropDownPlus
            inputmode="numeric"
            class="dd--mileage" :options="kilometrs" placeholder="Пробег от" v-model="filter.mileageFrom">
        </DropDownPlus>
        <DropDownPlus
            inputmode="numeric"
            class="dd--mileage" :options="kilometrs" placeholder="До (км)" v-model="filter.mileageTo">
        </DropDownPlus>
      </fieldset>


      <!--FuelType-->
      <fieldset class="fieldset-row">
        <DropDownCheckBoxes
            v-model="selectedFuelTypes"
            :items="fuelTypes"
            :clear-time="clearTime"
            defaultText="Топливо"/>
      </fieldset>

      <!--GearBoxType-->
      <fieldset class="fieldset-row">
        <DropDownCheckBoxes
            v-model="selectedTransmissionTypes"
            :items="transmissionTypes"
            :clear-time="clearTime"
            defaultText="КПП"/>
      </fieldset>

      <!--CheckHealth-->
      <fieldset class="fieldset-row">
        <DropDownCheckBoxes
            :items="inspectionTypes"
            v-model="selectedTransmissionTypes"
            defaultText="Страховая история"
            :clear-time="clearTime"
        />
      </fieldset>

      <!--StoryInsurance-->
      <fieldset class="fieldset-row">
        <DropDownCheckBoxes
            :items="historyTypes"
            v-model="selectedHistoryTypes"
            defaultText="Инспекция авто"
            :clear-time="clearTime"
        />
      </fieldset>

      <fieldset class="filter_btnwrap">
        <button class="filter_reset-btn"
                type="reset"
                @click.prevent="resetFilter"
                v-show="countActiveFilters">
          <IconClose3/>
          <span>
          Очистить
        </span>
          <span>
            <span v-if="countActiveFilters">
              ({{countActiveFilters}})
            </span>
          </span>

        </button>
      </fieldset>

      <fieldset class="filter_btnwrap">
<!--        <label>
          <input type="checkbox"/>
          <span>
            Скрыть без фото
          </span>
        </label>-->
      </fieldset>



      <fieldset class="filter_btnwrap">
        <button class="filter_show-btn"
                @click.prevent="submit">
          Показать
        </button>
      </fieldset>

    </div>

  </form>

  <form id="filtercarcatalogue_mobile" class="filter filter--mobile">

    <div class="filter-mobiletop">

      <!--CarBrand-->
      <fieldset class="fieldset-row">
        <DropDownPlus
            :options="optionsManufacturers"
            placeholder="Бренд авто"
            v-model="filter.manufacturer">
        </DropDownPlus>
      </fieldset>

      <!--CarModel-->
      <fieldset class="fieldset-row">
        <DropDownPlus
            :options="optionsModels"
            placeholder="Модель авто"
            v-model="filter.model"
            :disabled="!filter.manufacturer">
        </DropDownPlus>
      </fieldset>

      <!--Year-->
      <fieldset class="fieldset-row fieldset-double">
        <DropDownPlus class="dd--year" inputmode="numeric" :options="years" placeholder="Год от" v-model="filter.yearFrom">
        </DropDownPlus>
        <DropDownPlus class="dd--year" inputmode="numeric" :options="years" placeholder="До" v-model="filter.yearTo">
        </DropDownPlus>
      </fieldset>

      <!--Price-->
      <fieldset class="fieldset-row fieldset-double">
        <DropDownPlus class="dd--price" inputmode="numeric" :options="priceArr" placeholder="Цена от" v-model="filter.priceFrom">
        </DropDownPlus>
        <DropDownPlus class="dd--price" inputmode="numeric" :options="priceArr" placeholder="До (usd)" v-model="filter.priceTo">
        </DropDownPlus>
      </fieldset>

    </div>

    <transition name="filter-slide">
      <div class="filter-mobilemid " v-if="isFilterVisible">
        <!--Mileage-->
        <fieldset class="fieldset-row fieldset-double">
          <DropDownPlus
              inputmode="numeric"
              class="dd--mileage" :options="kilometrs" placeholder="Пробег от" v-model="filter.mileageFrom">
          </DropDownPlus>
          <DropDownPlus
              inputmode="numeric"
              class="dd--mileage" :options="kilometrs" placeholder="До (км)" v-model="filter.mileageTo">
          </DropDownPlus>
        </fieldset>


        <!--FuelType-->
        <fieldset class="fieldset-row">
          <DropDownCheckBoxes
              v-model="selectedFuelTypes"
              :items="fuelTypes"
              :clear-time="clearTime"
              defaultText="Топливо"/>
        </fieldset>

        <!--GearBoxType-->
        <fieldset class="fieldset-row">
          <DropDownCheckBoxes
              v-model="selectedTransmissionTypes"
              :items="transmissionTypes"
              :clear-time="clearTime"
              defaultText="КПП"/>
        </fieldset>

        <!--CheckHealth-->
        <fieldset class="fieldset-row">
          <DropDownCheckBoxes
              :items="inspectionTypes"
              v-model="selectedTransmissionTypes"
              defaultText="Страховая история"
              :clear-time="clearTime"
          />
        </fieldset>

        <!--StoryInsurance-->
        <fieldset class="fieldset-row">
          <DropDownCheckBoxes
              :items="historyTypes"
              v-model="selectedHistoryTypes"
              defaultText="Инспекция авто"
              :clear-time="clearTime"
          />
        </fieldset>

<!--        <fieldset class="filter_btnwrap">
          <label>
            <input type="checkbox"/>
            <span>
            Скрыть без фото
          </span>
          </label>
        </fieldset>-->

      </div>
    </transition>

    <div class="filter-mobilebottom">

      <fieldset class="filter_btnwrap">
        <button class="filter_mobilemegafilter-btn" @click.prevent="toggleFilter">
          {{ isFilterVisible ? 'Свернуть' : 'Расширенный фильтр' }}
        </button>
      </fieldset>

      <fieldset class="filter_btnwrap">
        <button class="filter_reset-btn"
                type="reset"
                @click.prevent="resetFilter"
                v-show="countActiveFilters">
          <IconClose3/>
          <span>
          Очистить
        </span>
          <span>
          <span v-if="countActiveFilters">
            ({{countActiveFilters}})
          </span>
        </span>

        </button>
        <button class="filter_show-btn" @click.prevent="submit">
          Показать
        </button>
      </fieldset>


    </div>

  </form>

</template>
