import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { filterCars } from "../api/main";
import { useMainStore } from "./baseStore.js";
import router from "../router/index.js";
import { toQueryObject } from "../utils/otherHelpers.js";

/** Справочник топлива со slug */
export const fuelTypes = [
    { label: "Бензин", value: 1, slug: "petrol" },
    { label: "Дизель", value: 2, slug: "diesel" },
    { label: "Газ", value: 3, slug: "gas" },
    { label: "Гибрид", value: 4, slug: "hybrid" },
    { label: "Электро", value: 5, slug: "electric" },
];

export const useCatalogueStore = defineStore("catalogueStore", () => {
    const mainStore = useMainStore();
    const refMainStore = storeToRefs(mainStore);

    if (refMainStore.manufacturers.value.length === 0) {
        mainStore.getManufacturers();
    }

    var course = ref(refMainStore.rate);
    var page = ref(1);
    var isCarsCanHasMore = ref(true);
    var isCarsLoading = ref(false);
    var isCarsUpdating = ref(false);
    var cars = ref([]);

    /** Главный метод получения списка */
    const filteredCars = async function (payload, paged) {
        if (paged) {
            page.value = page.value + 1;
            isCarsUpdating.value = true;
        } else {
            page.value = 1;
            isCarsLoading.value = true;
            isCarsCanHasMore.value = true;
        }

        // id -> slug для ЧПУ
        var manufacturer = null;
        var model = null;
        var fuel = null;

        if (refMainStore.manufacturersMap.value) {
            manufacturer = refMainStore.manufacturersMap.value.get(payload.filter.manufacturer);
        }
        if (refMainStore.modelsMap.value) {
            model = refMainStore.modelsMap.value.get(payload.filter.model);
        }
        // ищем fuel по value
        for (var i = 0; i < fuelTypes.length; i++) {
            if (fuelTypes[i].value === payload.filter.fuelType) {
                fuel = fuelTypes[i];
                break;
            }
        }

        // Формируем params и query БЕЗ spread
        var params = {};
        if (manufacturer && manufacturer.slug) params.manufacturerSlug = manufacturer.slug;
        if (model && model.slug) params.modelSlug = model.slug;
        if (fuel && fuel.slug) params.fuelSlug = fuel.slug;

        var q = toQueryObject(payload.filter) || {};
        // если используем slugs — убираем id из query
        if (params.manufacturerSlug) delete q.manufacturer;
        if (params.modelSlug) delete q.model;
        if (params.fuelSlug) delete q.fuelType;

        if (params.manufacturerSlug || params.modelSlug || params.fuelSlug) {
            await router.push({ name: "catalog-filter", params: params, query: q });
        } else {
            await router.push({ query: q });
        }

        // Приведение цены (как было)
        if (payload.filter.priceTo) {
            payload.filter.priceTo = (payload.filter.priceTo * course.value) / 10000;
        } else {
            payload.filter.priceTo = null;
        }
        if (payload.filter.priceTo) {
            payload.filter.priceFrom = (payload.filter.priceFrom * course.value) / 10000;
        } else {
            payload.filter.priceFrom = null;
        }

        // Тело запроса БЕЗ spread
        var body = {};
        for (var k in payload) body[k] = payload[k];
        body.page = page.value;

        var res = await filterCars(body);

        if (res && res.data && res.data.data) {
            var list = (res.data.data.cars && Array.isArray(res.data.data.cars)) ? res.data.data.cars : [];

            if (paged) {
                // cars.value.push(...list)  // не используем spread
                cars.value = cars.value.concat(list);
            } else {
                cars.value = list;
            }

            isCarsCanHasMore.value = !(list.length < 21);

            if (typeof res.data.data.rate !== "undefined") {
                mainStore.setRate(res.data.data.rate);
            }
        }

        isCarsLoading.value = false;
        isCarsUpdating.value = false;
    };

    /** Обогащение карточек производителем/моделью */
    var carsData = computed(function () {
        var res = [];
        var manufacturersArr = refMainStore.manufacturers.value || [];
        if (manufacturersArr.length === 0) return res;

        var i, item, manufacturer, model;
        for (i = 0; i < cars.value.length; i++) {
            item = cars.value[i];
            manufacturer = refMainStore.manufacturersMap.value
                ? refMainStore.manufacturersMap.value.get(item.manufacturer_id)
                : null;
            model = refMainStore.modelsMap.value
                ? refMainStore.modelsMap.value.get(item.model_id)
                : null;

            var merged = {};
            // копия item без spread
            for (var k in item) merged[k] = item[k];
            merged.manufacturer = manufacturer;
            merged.model = model;
            res.push(merged);
        }
        return res;
    });

    var orderCars = ref("newest");
    var filter = ref({
        manufacturer: null,
        model: null,
        yearFrom: null,
        yearTo: null,
        mileageFrom: null,
        mileageTo: null,
        priceFrom: null,
        priceTo: null,
        fuelType: null,
        transmission: null,
        availability: null,
    });

    const setFilter = function (payload) {
        filter.value = payload;
    };

    return {
        filteredCars,
        cars,
        carsData,
        orderCars,
        filter,
        setFilter,
        isCarsLoading,
        isCarsUpdating,
        isCarsCanHasMore,
        page,
    };
});

/** Остальные справочники — как у тебя были */
export const transmissionTypes = [
    { label: 'Автомат', value: 1 },
    { label: 'Механика', value: 2 },
    { label: 'Робот', value: 3 },
    { label: 'Вариатор', value: 4 },
];

export const inspectionTypes = [
    { label: 'Без записей', value: 1 },
    { label: 'Есть записи', value: 2 },
    { label: 'Нет информации', value: 3 },
];

export const historyTypes = [
    { label: 'Без записей', value: 1 },
    { label: 'Есть записи', value: 2 },
    { label: 'Нет информации', value: 3 },
];
