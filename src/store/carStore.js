import {defineStore, storeToRefs} from "pinia";
import {useMainStore} from "./baseStore.js";
import * as api from "../api/main";
import {computed, ref} from "vue";
import router from "../router/index.js";

export const useCarStore = defineStore('carStore', () => {
    const mainStore = useMainStore();
    const refMainStore = storeToRefs(mainStore);
    //const manufacturers = ref(mainStore.manufacturers);
    if(refMainStore.manufacturers.value.length === 0) {
        mainStore.getManufacturers();
    }

    let lastCar = ref(null);
    let isCarLoading = ref(false);
    const getCar = async (payload) => {
        isCarLoading.value = true;
        try {
            let res = await api.getCar(payload);
            if (res?.data) {
                lastCar.value = res.data;
                mainStore.setRate(res.data.rate);
            }
        } catch (e){
            console.log(e);
        }
        isCarLoading.value = false;
    }

    const carData = computed(() =>{
        if(router?.currentRoute?.value && router.currentRoute?.value?.name === "car" && Number(router?.currentRoute?.value?.params?.id ?? -1) === lastCar?.value?.car?.id) {
            return lastCar.value;
        } else {
            return null;
        }
    });
    const carOptionsSet = computed(() => {
        const set = new Set();
        if(carData?.value?.car?.options) {
             carData?.value?.car?.options?.split(',').forEach((item) => {
                 set.add(item);
             });
        }
        return set;
    });



    return {getCar, carData, isCarLoading,carOptionsSet};
});

export const carOptions = {
    interior: [
        {id: '010', name: 'Люк'},
        {id: '001_g', name: 'Фара лед'},
        {id: '059', name: 'Электро багажник'},
        {id: '080', name: 'Доводчик дверей'},
        {id: '024', name: 'Боковые зеркала со стеклоподъемником'},
        {id: '017', name: 'Алюминиевые колесные диски'},
        {id: '082', name: 'Подогрев руля'},
        {id: '083', name: 'Электро руль'},
        {id: '084', name: 'Рычаг переключения передач на руле'},
        {id: '031', name: 'Мультифункциональное рулевое колесо'},
        {id: '030', name: 'Зеркало ECM'},
        {id: '074', name: 'Hi-Pass кнопка открытия шлакбаума'},
        {id: '007', name: 'Электро стеклоподъемники'},
        {id: '006', name: 'Блокировка дверей'},
        {id: '008', name: 'Усилитель руля'},
    ],
    security: [
        {id: '002_g', name: 'Подушка безопасности водителя и переднего пассажира'},
        {id: '020', name: 'Подушка безопасности боковая'},
        {id: '056', name: 'Подушка безопасности шторка'},
        {id: '033', name: 'TPMS система контроля давления в шинах'},
        {id: '001', name: 'ABS'},
        {id: '019', name: 'TCS'},
        {id: '003_g', name: 'Датчики парковки сзади'},
        {id: '088', name: 'LDWS система контроля полосы движения'},
        {id: '055', name: 'ESС система управления устойчивостью'},
        {id: '086', name: 'Система предупреждения о слепых зонах'},
        {id: '002', name: 'ECS подвеска с электронным управлением'},
        {id: '058', name: 'Задняя камера'},
        {id: '087', name: '360 градусная камера'},
    ],
    comfort: [
        {id: '004_g', name: 'Круиз контроль'},
        {id: '023', name: 'Автоматический кондиционер'},
        {id: '081', name: 'Датчик дождя'},
        {id: '005', name: 'GPS навигация'},
        {id: '096', name: 'Bluetooth'},
        {id: '071', name: 'AUX вход'},
        {id: '095', name: 'Проецирующий дисплей HUD'},
        {id: '057', name: 'Умный ключ'},
        {id: '097', name: 'Автоматический свет'},
        {id: '004', name: 'AV-монитор на переднем сиденье'},
        {id: '003', name: 'CD-проигрыватель'},
        {id: '094', name: 'Электронный стояночный тормоз EPB'},
        {id: '015', name: 'Беспроводной дверной замок'},
        {id: '005_g', name: 'Шторы/жалюзи'},
        {id: '054', name: 'AV-монитор на заднем сиденье'},
        {id: '075', name: 'USB вход'},
    ],
    salon: [
        {id: '014', name: 'Кожаный салон'},
        {id: '008_g', name: 'Сиденья с памятью'},
        {id: '006_g', name: 'Электро сиденья'},
        {id: '009_g', name: 'Вентилируемые сиденья'},
        {id: '089', name: 'Сиденья с электроприводом задние'},
        {id: '007_g', name: 'Подогрев сидений'},
        {id: '090', name: 'Вентиляция сидений задних'},
        {id: '091', name: 'Массаж сидений'},
    ],
}