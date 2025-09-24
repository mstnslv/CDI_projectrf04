import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { getMainData } from '../api/main';

/** Простой slugify */
function slugify(text) {
    if (!text) return '';
    return String(text)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export const useMainStore = defineStore('mainStore', () => {
    // --- state ---
    var manufacturers = ref([]);   // [{ id, name, slug, ... }]
    var countManufacturers = reactive({});
    var countModels = reactive({});
    var models = ref([]);          // [{ id, name, slug, ... }]
    var tags = ref([]);
    var rate = ref(1290);

    // --- maps (id -> объект) ---
    const manufacturersMap = computed(function () {
        var arr = manufacturers.value || [];
        var map = new Map();
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            map.set(item.id, item);
        }
        return map;
    });

    const modelsMap = computed(function () {
        var arr = models.value || [];
        var map = new Map();
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            map.set(item.id, item);
        }
        return map;
    });

    // --- maps (slug -> объект) ---
    const manufacturersSlugMap = computed(function () {
        var arr = manufacturers.value || [];
        var map = new Map();
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.slug) map.set(item.slug, item);
        }
        return map;
    });

    const modelsSlugMap = computed(function () {
        var arr = models.value || [];
        var map = new Map();
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.slug) map.set(item.slug, item);
        }
        return map;
    });

    // --- списки с добавленным count (для фильтров) ---
    const manufacturersComputed = computed(function () {
        var arr = manufacturers.value || [];
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var obj = {};
            // Object.assign вместо spread
            for (var k in item) obj[k] = item[k];
            obj.count = (typeof countManufacturers[item.id] !== 'undefined')
                ? countManufacturers[item.id]
                : 0;
            if (obj.count > 0) res.push(obj);
        }
        return res;
    });

    const modelsComputed = computed(function () {
        var arr = models.value || [];
        var res = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var obj = {};
            for (var k in item) obj[k] = item[k];
            obj.count = (typeof countModels[item.id] !== 'undefined')
                ? countModels[item.id]
                : 0;
            if (obj.count > 0) res.push(obj);
        }
        return res;
    });

    // --- actions ---
    const getManufacturersAction = async function () {
        var res = await getMainData();
        if (res && res.data) {
            var incomingMan = Array.isArray(res.data.manufacturers) ? res.data.manufacturers : [];
            var incomingModels = Array.isArray(res.data.models) ? res.data.models : [];

            // добавляем slug без spread
            var manWithSlug = [];
            for (var i = 0; i < incomingMan.length; i++) {
                var m = incomingMan[i];
                var m2 = {};
                for (var k in m) m2[k] = m[k];
                m2.slug = slugify(m.name);
                manWithSlug.push(m2);
            }

            var modelsWithSlug = [];
            for (var j = 0; j < incomingModels.length; j++) {
                var md = incomingModels[j];
                var md2 = {};
                for (var k2 in md) md2[k2] = md[k2];
                md2.slug = slugify(md.name);
                modelsWithSlug.push(md2);
            }

            manufacturers.value = manWithSlug;
            models.value = modelsWithSlug;

            tags.value = Array.isArray(res.data.tags) ? res.data.tags : [];

            // пересобираем reactive объекты количеств
            countManufacturers = (res.data.countManufacturers && typeof res.data.countManufacturers === 'object')
                ? res.data.countManufacturers
                : {};
            countModels = (res.data.countModels && typeof res.data.countModels === 'object')
                ? res.data.countModels
                : {};

            await setRateAction(res.data.rate);
        }
    };

    const setRateAction = async function (payload) {
        console.log('setRate', payload);
        rate.value = (typeof payload !== 'undefined' && payload !== null) ? payload : rate.value;
    };

    // --- return из стора ---
    return {
        // actions
        getManufacturers: getManufacturersAction,
        setRate: setRateAction,

        // state-like (computed где нужно)
        manufacturers: manufacturersComputed,
        models: modelsComputed,
        tags,
        rate,

        // maps
        manufacturersMap,
        modelsMap,
        manufacturersSlugMap,
        modelsSlugMap,
    };
});
