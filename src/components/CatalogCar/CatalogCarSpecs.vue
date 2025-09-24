<script setup>
import IconDrop from "../icons/IconDrop.vue";
import MdmCarDamage from "../components/MdmCarDamage.vue";
import {computed, reactive} from "vue";
import {useCarStore} from "../../store/carStore.js";
import {storeToRefs} from "pinia";
import {formatPrice} from "../../utils/otherHelpers.js";
import {useMainStore} from "../../store/baseStore.js";
import {carOptions} from "../../store/carStore.js";
import {isMobile} from "../../utils/otherHelpers.js";
import IconTick2 from "../icons/IconTick2.vue";
import IconClose4 from "../icons/IconClose4.vue";

let isOpened = reactive({
  carInspectList1: true,
  carInspectList2: true,
  carInspectList3: true,
  carInspectList4: true,
  carInspectList5: true,
});
const getCarOptionsCount = (options) => {
  let count = 0;
  options.forEach((item)=>{
    if(isCarHasOption(item.id)){
      count++;
    }
  });
  return count;
}

const isCarHasOption = (option) => {
  return carOptionsSet?.value?.has(option) ?? false;
}

const carStore = useCarStore();
let {carData, carOptionsSet} = storeToRefs(carStore);
const mainStore = useMainStore();
let {rate} = storeToRefs(mainStore);


let inspectionVersion = computed(()=> carData.value?.car?.inspectionVersion ?? null);
let inspectionData = computed(()=> inspectionVersion.value === 1 ? JSON.parse(carData.value?.car?.inspectionData) ?? null : null);
let inspectionInfo = computed(()=>{ return {
  notHasInsuredEvents: (carData.value?.car?.notHasInsuredEvents ?? null)? (!(carData.value?.car?.totalAccidentsCount > 0) ?? null) : (carData.value?.car?.notHasInsuredEvents ?? null),
  notHasRepairEvents: carData.value?.car?.notHasRepairEvents ?? null,
}
});

let carHistory = computed(()=> {
  if(carData.value?.car?.history){
    try {
      return JSON.parse(carData.value?.car?.history);
    } catch(e){
      return null;
    }
  } else return null;
});

let carHistoryChanges = computed(()=> {
  //"ownerChanges": ["2023-06-19", "2020-02-21", "2019-08-08", "2017-07-11", "2017-06-29"],
  /* "notJoinDate1": "201508~201509",
    "notJoinDate2": "201706~201807",
    "notJoinDate3": "201908~201911",
    "notJoinDate4": null,
    "notJoinDate5": null,

    "carInfoChanges": [{
        "date": "2012-09-12",
        "carNo": "69더XXXX"
    }, {
        "date": "2015-08-06",
        "carNo": "15주XXXX"
    }],
  */
  let allChanges = [];

  function prapareDate1(change) {
    let year = change.substring(0,4);
    let month = change.substring(5,7);
    let day = change.substring(8);
    return `${day}.${month}.${year}`;
  }
  function prepareDate2(change) {
    let yearFrom = change.substring(0,4);
    let monthFrom = change.substring(4,6);
    let yearTo = change.substring(7,11);
    let monthTo = change.substring(11,13);
    return `${monthFrom}.${yearFrom} - ${monthTo}.${yearTo}`;
  }
  function prepareDate3(change) {
    let year = change.substring(0,4);
    let month = change.substring(4,6);
    return `01.${month}.${year}`;
  }

  if(carHistory.value?.ownerChanges){
    for(let change of carHistory.value?.ownerChanges){
      allChanges.push({
        date: prapareDate1(change),
        type: 'owner'
      });
    }
  }
  if(carHistory.value?.carInfoChanges){
    for(let change of carHistory.value?.carInfoChanges){
      allChanges.push({
        date: prapareDate1(change.date),
        type: 'carInfo',
        carNo: change.carNo
      });
    }
  }
  if(carHistory.value?.notJoinDate1){
    allChanges.push({
      date: prepareDate3(carHistory.value?.notJoinDate1),
      type: 'notJoinDate',
      dates: prepareDate2(carHistory.value?.notJoinDate1),
    });
  }
  if(carHistory.value?.notJoinDate2){
    allChanges.push({
      date: prepareDate3(carHistory.value?.notJoinDate2),
      type: 'notJoinDate',
      dates: prepareDate2(carHistory.value?.notJoinDate2),
    });
  }
  if(carHistory.value?.notJoinDate3){
    allChanges.push({
      date: prepareDate3(carHistory.value?.notJoinDate3),
      type: 'notJoinDate',
      dates: prepareDate2(carHistory.value?.notJoinDate3),
    });
  }
  if(carHistory.value?.notJoinDate4){
    allChanges.push({
      date: prepareDate3(carHistory.value?.notJoinDate4),
      type: 'notJoinDate',
      dates: prepareDate2(carHistory.value?.notJoinDate4),
    });
  }
  if(carHistory.value?.notJoinDate5){
    allChanges.push({
      date: prepareDate3(carHistory.value?.notJoinDate5),
      type: 'notJoinDate',
      dates: prepareDate2(carHistory.value?.notJoinDate5),
    });
  }
  let sortedChanges = allChanges.sort((a,b) => {
    let aDate = a.date.split('.');
    let bDate = b.date.split('.');
    let aDateObj = new Date(aDate[2],aDate[1],aDate[0]);
    let bDateObj = new Date(bDate[2],bDate[1],bDate[0]);
    return aDateObj - bDateObj;
  });

  sortedChanges.find((item,index) => {
    if(item.type === 'carInfo'){
      sortedChanges[index].type = 'firstCarInfo';
      return true;
    }
  });

  return sortedChanges ?? null;
});

let accidentsType = (type)=>{
  function prapareDate1(change) {
    let year = change.substring(0,4);
    let month = change.substring(5,7);
    let day = change.substring(8);
    return `${day}.${month}.${year}`;
  }

  let accidents = [];

  if(carHistory.value?.accidents && carHistory.value?.accidents?.length>0){
    for(let item of carHistory.value.accidents){
      if(item.type === type){
        item.date = prapareDate1(item.date);
        item.totalCost = formatPrice(Math.ceil(((item?.partCost??0) + (item?.laborCost??0) + (item?.paintingCost??0))/rate.value));
        accidents.push(item);
      }
    }
  }
  return accidents.sort((a,b) => {
    let aDate = a.date.split('.');
    let bDate = b.date.split('.');
    let aDateObj = new Date(aDate[2],aDate[1],aDate[0]);
    let bDateObj = new Date(bDate[2],bDate[1],bDate[0]);
    return aDateObj - bDateObj;
  });
};

let accidentsType1 = computed(()=>{
  return accidentsType('1');
});
let accidentsType2 = computed(()=>{
  return accidentsType('2');
});
let accidentsType3 = computed(()=>{
  return accidentsType('3');
});

</script>
<template>



  <div class="catalogcarinspect">

    <h2>
      Страховая история
    </h2>

    <div class="catalogcarinspect_list">

      <div class="dropzone" v-if="carHistory">

        <!--Tab one mini-->
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstorysummary">
            <thead class="none">
            <tr>
              <!--              <th colspan="1">

                            </th>-->
              <th colspan="4">
                Статус
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  История страховых случаев
                </th>
                <td class="tablecol-status tablecol-status--good" :class="{active:inspectionInfo?.notHasInsuredEvents === true}">
                  <span>Нет</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionInfo?.notHasInsuredEvents === false}">
                  <span>Есть</span>
                </td>
                <td class="tablecol-status tablecol-status--no" :class="{active:inspectionInfo?.notHasInsuredEvents === null}">
                  <span>Не указано</span>
                </td>
              </tr>
              <tr >
                <th>
                  Ремонт не по страховке
                </th>
                <td class="tablecol-status tablecol-status--good" :class="{active:inspectionInfo?.notHasRepairEvents === true}">
                  <span>Нет</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionInfo?.notHasRepairEvents === false}">
                  <span>Есть</span>
                </td>

                <td class="tablecol-status tablecol-status--no" :class="{active:inspectionInfo?.notHasRepairEvents === null}">
                  <span>Не указано</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>
          Записи о страховых случаях
        </h3>
        <!--Общая история-->
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstoryall">
            <thead class="none">
            <tr>
              <th colspan="2">
                Общая история
              </th>
            </tr>
            </thead>
            <tbody>

            <!--Смена номера-->
            <tr>
              <th>
                Смена номера
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{' active': carHistory?.carNoChangeCnt > 0}">
                <span>{{`${carHistory?.carNoChangeCnt ? carHistory?.carNoChangeCnt + ' раз' : 'Нет'}`}}</span>
              </td>
            </tr>

            <!--Смена владельца-->
            <tr >
              <th>
                Смена владельца
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.ownerChangeCnt > 0}">
                <span>{{`${carHistory?.ownerChangeCnt ? carHistory?.ownerChangeCnt + ' раз' : 'Нет'}`}}</span>
              </td>
            </tr>

            <!--Потеря-->
            <tr >
              <th>
                Потеря
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.totalLossCnt > 0}">
                <span>{{`${carHistory?.totalLossCnt ? carHistory?.totalLossCnt + ' раз' : 'Нет'}`}}</span>
              </td>
            </tr>

            <!--Затопление-->
            <tr >
              <th>
                Затопление
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.floodTotalLossCnt > 0}">
                <span>{{`${carHistory?.floodTotalLossCnt ? carHistory?.floodTotalLossCnt + ' раз' : 'Нет'}`}}</span>
              </td>
            </tr>

            <!--Кража-->
            <tr >
              <th>
                Кража
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.robberCnt > 0}">
                <span>{{`${carHistory?.robberCnt ? carHistory?.robberCnt + ' раз' : 'Нет'}`}}</span>
              </td>
            </tr>

            <!--ДТП без участников дорожного движения-->
            <tr >
              <th>
                ДТП без участников дорожного движения
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{' active': carHistory?.myAccidentCnt > 0}">
                {{`${carHistory?.myAccidentCnt ? carHistory?.myAccidentCnt + ' раз / ' + formatPrice(Math.ceil((carHistory?.myAccidentCost??0) / rate)) + ' USD': 'Нет'}`}}
              </td>
            </tr>

            <!--ДТП с другими участниками дорожного движения-->
            <tr >
              <th>
                ДТП с другими участниками дорожного движения
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.otherAccidentCnt > 0}">
                {{`${carHistory?.otherAccidentCnt ? carHistory?.otherAccidentCnt + ' раз / ' + formatPrice(Math.ceil((carHistory?.otherAccidentCost??0) / rate)) + ' USD': 'Нет'}`}}

              </td>
            </tr>

            <!--Принадлежала компании-->
            <tr >
              <th>
                Принадлежала компании
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.business > 0}">
                {{ carHistory?.business ? 'Да' : 'Нет' }}
              </td>
            </tr>

            <!--Использовался в такси-->
            <tr >
              <th>
                Сдавалась в аренду
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.loan > 0}">
                {{ carHistory?.loan ? 'Да' : 'Нет' }}
              </td>
            </tr>

            <!--Принадлежала правительству-->
            <tr >
              <th>
                Принадлежала правительству
              </th>
              <td class="tablecol-status tablecol-status--yes" :class="{'active': carHistory?.government > 0}">
                {{ carHistory?.government ? 'Да' : 'Нет' }}
              </td>
            </tr>

            </tbody>
          </table>
        </div>

        <!--История смены номера автомобиля / владельца-->
        <h3>
          Смена автомобильного номера
        </h3>
        <!--Общая история-->
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstoryowners">
            <thead class="none">
              <tr>
              <th colspan="4">
                История смены номера автомобиля / владельца
              </th>
            </tr>
            </thead>

            <!--если нет данных, то показать эту-->
            <tbody v-if="!carHistoryChanges">
            <tr>
              <td colspan="3" class="tablecol ">
                Нет информации
              </td>
            </tr>
            </tbody>

            <!--если есть данные, то показать эту-->
            <tbody v-else>
              <tr v-for="(carChange, index) in carHistoryChanges" :key="index">
                <th>
                  {{ `${carChange.type === 'notJoinDate' ? carChange.dates : carChange.date}` }}
                </th>
                <!-- -->
                <td class="tablecol " v-if="carChange.type === 'firstCarInfo'">
                  Первая регистрация номера - {{ carChange?.carNo ?? ''}}
                </td>
                <td class="tablecol " v-if="carChange.type === 'carInfo'">
                  Смена номера ТС
                </td>
                <td class="tablecol " v-if="carChange.type === 'notJoinDate'">
                  Страховая информация про период недоступна
                </td>
                <td class="tablecol " v-if="carChange.type === 'owner'">
                  Смена владельца ТС
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--Страховая выплата по вине другого участника дорожного движения-->
        <h3>
          Страховая выплата по вине другого участника дорожного движения
        </h3>
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstorypayments">
            <!--если нет данных, то показать эту-->
            <thead class="none" v-if="accidentsType2.length === 0">
            <tr>
              <th colspan="2">
                Страховая выплата по вине другого участника дорожного движения
              </th>
            </tr>
            </thead>
            <tbody v-if="accidentsType2.length === 0">
              <tr>
              <td colspan="2" class="tablecol ">
                ДТП и выплат не было
              </td>
            </tr>
            </tbody>

            <!--если есть данные, то показать эту-->
            <thead class="none" v-if="accidentsType2.length > 0">
            <tr>
              <th colspan="2">
                Страховая выплата по вине другого участника дорожного движения
              </th>
            </tr>
            <tr>
              <th>
                Дата аварии
              </th>
              <th>
                Стоимость ремонта
              </th>
            </tr>
            </thead>
            <tbody v-if="accidentsType2.length > 0">
              <tr v-for="(accident, index) in accidentsType2" :key="index">
              <th>
                {{accident.date}}
              </th>
              <td class="tablecol-info">
                {{accident.totalCost}} USD
              </td>
            </tr>
            </tbody>
          </table>
        </div>

          <!--Страховая выплата собственнику без участия других авто (въехал в люк, столб и т.д.)-->
        <h3>
          Страховая выплата собственнику без участия других авто
        </h3>
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstorypayments">
            <!--если нет данных, то показать эту-->
            <thead class="none" v-if="accidentsType1.length === 0">
            <tr>
              <th colspan="2">
                Страховая выплата собственнику без участия других авто (въехал в люк, столб и т.д.)
              </th>
            </tr>
            </thead>
            <tbody v-if="accidentsType1.length === 0">
              <tr>
                <td colspan="2" class="tablecol ">
                  ДТП и выплат не было
                </td>
              </tr>
            </tbody>

            <!--если есть данные, то показать эту-->
            <thead class="none" v-if="accidentsType1.length > 0">
              <tr>
                <th colspan="2">
                  Страховая выплата собственнику без участия других авто (въехал в люк, столб и т.д.)
                </th>
              </tr>
              <tr>
                <th>
                  Дата аварии
                </th>
                <th>
                  Стоимость ремонта
                </th>
              </tr>
            </thead>

            <tbody v-if="accidentsType1.length > 0">
              <tr v-for="(accident, index) in accidentsType1" :key="index">
                <th>
                  {{accident.date}}
                </th>
                <td class="tablecol-info">
                  {{accident.totalCost}} USD
                </td>
              </tr>
            </tbody>
          </table>
        </div>

          <!--Страховая выплата другим участникам ДТП по вине собственника-->
        <h3>
          Страховая выплата другим участникам ДТП по вине собственника
        </h3>
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstorypayments">
            <!--если нет данных, то показать эту-->
            <thead class="none" v-if="accidentsType3.length === 0">
            <tr>
              <th colspan="2">
                Страховая выплата другим участникам ДТП по вине собственника
              </th>
            </tr>
            </thead>
            <tbody v-if="accidentsType3.length === 0">
            <tr>
              <td colspan="2" class="tablecol ">
                ДТП и выплат не было
              </td>
            </tr>
            </tbody>

            <!--если есть данные, то показать эту-->
            <thead class="none" v-if="accidentsType3.length > 0">
            <tr>
              <th colspan="2">
                Страховая выплата другим участникам ДТП по вине собственника
              </th>
            </tr>
            <tr>
              <th>
                Дата аварии
              </th>
              <th>
                Стоимость ремонта
              </th>
            </tr>
            </thead>
            <tbody v-if="accidentsType3.length > 0">
              <tr v-for="(accident, index) in accidentsType3" :key="index">
                <th>
                  {{accident.date}}
                </th>
                <td class="tablecol-info">
                  {{accident.totalCost}} USD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="dropzone" v-if="inspectionVersion === 1">
        <div class="dropname">
          <h2>
            Инспекция авто
          </h2>
        </div>
        <div class="tablewrap">
          <table class="table table--summary">
            <thead class="none">
            <tr>
              <!--                <th>

                              </th>-->
              <th colspan="4">
                Состояние
              </th>
            </tr>
            </thead>
            <tbody>
            <tr >
              <th>
                Пробег
              </th>
              <td class="tablecol-odometr" colspan="3">
                <span>{{formatPrice(inspectionData?.odometr)}} км</span>
              </td>

            </tr>
            <tr>
              <th>
                Одометр
              </th>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.odometrState === 1}">
                <span>Хорошее</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.odometrState !== 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad ">

              </td>
            </tr>
            <tr >
              <th>
                VIN код
              </th>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.vinCodeState === 0}">
                <span>Хорошо читаем</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.vinCodeState === 1}">
                <span>Повреждения (загрязнения)</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:(inspectionData?.vinCodeState !== 0 && inspectionData?.vinCodeState !== 1)}">
                <span>Плохо читаем</span>
              </td>
            </tr>
            <tr>
              <th>
                Тюнинг
              </th>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.tuning === 0}">
                <span>Нет</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.tuning !== 0}">
                <span>Есть</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr>
              <th>
                Особая история
              </th>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.specialHistory === 0}">
                <span>Нет</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.specialHistory !== 0}">
                <span>Есть</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--Схема повреждений-->
      <div class="dropzone" v-if="inspectionVersion === 1 || inspectionVersion === 2">
        <div class="droplist">
          <h3>
            Схема и список повреждений
          </h3>

          <MdmCarDamage/>
        </div>
      </div>


      <!--Tech report-->
      <div class="dropzone" v-if="inspectionVersion === 1">
        <div class="dropname">
          <h2>
            Технический отчет
          </h2>
        </div>
        <div class="tablewrap tablewrap--techreport">
          <table class="table table--techreport">
            <thead>
              <tr>
              <th>

              </th>
              <th colspan="2">
                Узел авто
              </th>
              <th colspan="3">
                Статус
              </th>
            </tr>
            </thead>
            <tbody>

            <!--Диагностика-->
            <tr>
              <th rowspan="2">
                Диагностика
              </th>
              <td colspan="2">
                Двигатель
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.diagnosticsEngine === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.diagnosticsEngine === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad"  :class="{active:inspectionData?.diagnosticsEngine === 2}">
                <span>Катастрофа</span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Коробка передач
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.diagnosticsGearBox === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.diagnosticsGearBox === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.diagnosticsGearBox === 2}">
                <span></span>
              </td>
            </tr>

            <!--Двигатель-->
            <tr>
              <th rowspan="9">
                Двигатель
              </th>
              <td colspan="2">
                Холостой ход
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineIdleStroke === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineIdleStroke === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td rowspan="3">
                Утечка масла
              </td>
              <td>
                Клапанная крышка
              </td>
              <td class="tablecol-status tablecol-status--good"  :class="{active:inspectionData?.engineOilLeakageValveCover === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineOilLeakageValveCover === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.engineOilLeakageValveCover === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td>
                Прокладка головки блока цилиндров
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineOilLeakageCylinderHeadGasket === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineOilLeakageCylinderHeadGasket === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.engineOilLeakageCylinderHeadGasket === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td>
                Блок цилиндров/масляный поддон
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineOilLeakageCylinderBlockOilPan === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineOilLeakageCylinderBlockOilPan === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.engineOilLeakageCylinderBlockOilPan === 2}">
                <span>Утечка</span>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                Давление масла
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineOilPressure === 0}">
                <span>Норма</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineOilPressure === 1}">
                <span>Недостаток</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>

            <tr>
              <td rowspan="4">
                Утечка охлаждающей жидкости
              </td>
              <td>
                Прокладка головки блока цилиндров
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineCoolantLeakageCylinderHeadGasket === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineCoolantLeakageCylinderHeadGasket === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.engineCoolantLeakageCylinderHeadGasket === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td>
                Помпа
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineCoolantLeakagePump === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineCoolantLeakagePump === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.engineCoolantLeakagePump === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td>
                Радиатор
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineCoolantLeakageRadiator === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineCoolantLeakageRadiator === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.engineCoolantLeakageRadiator === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td>
                Количество охлаждающей жидкости
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.engineCoolantLeakageQuantityOfCoolant === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.engineCoolantLeakageQuantityOfCoolant === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>

            <!--Коробка передач-->
            <tr>
              <th rowspan="3">
                Коробка передач
              </th>
              <td rowspan="3">
                {{ carData?.car?.transmission === 1 ? 'Автоматическая коробка передач (А/Т)' : 'Коробка передач' }}
              </td>
              <td>
                Утечка масла
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.transmissionATOilLeakage === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.transmissionATOilLeakage === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>

            </tr>
            <tr >

              <td>
                Поток масла
              </td>

              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.transmissionATOilFlow === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.transmissionATOilFlow === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.transmissionATOilFlow === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td>
                Общее состояние
              </td>

              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.transmissionATOilGeneralCondition === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.transmissionATOilGeneralCondition === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>



            <!--Передача энергии-->
            <tr>
              <th rowspan="4">
                Передача энергии
              </th>
              <td colspan="2">
                Сцепление в сборе
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.energyTransferClutchAssembly === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.energyTransferClutchAssembly === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Шарнир равных угловых скоростей
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.energyTransferConstantVelocityJoint === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.energyTransferConstantVelocityJoint === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Приводной вал и подшипник
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.energyTransferDriveShaftAndBearing === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.energyTransferDriveShaftAndBearing === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Дифференциал
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.energyTransferDifferential === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.energyTransferDifferential === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>


            <!--Рулевое управление-->
            <tr>
              <th rowspan="6">
                Рулевое управление
              </th>
              <td colspan="2">
                Течь жидкости гидроусилителя руля
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.steeringSystemPowerSteeringOilLeakage === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.steeringSystemPowerSteeringOilLeakage === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.steeringSystemPowerSteeringOilLeakage === 2}">
                <span>Утечка</span>
              </td>

            </tr>
            <tr >

              <td rowspan="5">
                Состояние
              </td>
              <td>
                Насос гидроусилителя
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.steeringSystemBoosterPump === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.steeringSystemBoosterPump === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td>
                Рулевой механизм
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.steeringSystemSteeringMechanism === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.steeringSystemSteeringMechanism === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td>
                Рулевой шарнир
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.steeringSystemSteeringJoint === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.steeringSystemSteeringJoint === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td>
                Силовой шланг высокого давления
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.steeringSystemHighPressurePowerHose === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.steeringSystemHighPressurePowerHose === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td>
                Наконечники рулевой тяги и шаровые шарниры
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.steeringSystemTieRodEndsAndBallJoints === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.steeringSystemTieRodEndsAndBallJoints === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>


            <!--Тормозная система-->
            <tr>
              <th rowspan="3">
                Тормозная система
              </th>
              <td colspan="2">
                Утечка масла в главном тормозном цилиндре
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.breakingOilLeakInTheMainBrakeCylinder === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.breakingOilLeakInTheMainBrakeCylinder === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.breakingOilLeakInTheMainBrakeCylinder === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Утечка тормозной жидкости
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.breakingBrakeFluidLeakage === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.breakingBrakeFluidLeakage === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad" :class="{active:inspectionData?.breakingBrakeFluidLeakage === 2}">
                <span>Утечка</span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Состояние источника питания
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.breakingPowerStatus === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.breakingPowerStatus === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>


            <!--Электрика-->
            <tr>
              <th rowspan="6">
                Электрика
              </th>
              <td colspan="2">
                Генератор
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.electricityGeneratorOutput === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.electricityGeneratorOutput === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Стартер
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.electricityStartingMotor === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.electricityStartingMotor === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Работа мотора стеклоочистителя
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.electricityWiperMotorFunction === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.electricityWiperMotorFunction === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Вентилятор печки салона
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.electricityInternalFanMotor === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.electricityInternalFanMotor === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Вентилятор радиатора
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.electricityRadiatorFanMotor === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.electricityRadiatorFanMotor === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>
            <tr >

              <td colspan="2">
                Стеклоподъёмник
              </td>
              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.electricityWindowElevator === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.electricityWindowElevator === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>


            <!--Топливо-->
            <tr>
              <th rowspan="2">
                Топливо
              </th>
              <td colspan="2">
                Утечка топлива
              </td>

              <td class="tablecol-status tablecol-status--good" :class="{active:inspectionData?.fuelFuelLeakage === 0}">
                <span>Хорошо</span>
              </td>
              <td class="tablecol-status tablecol-status--notgood" :class="{active:inspectionData?.fuelFuelLeakage === 1}">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad">
                <span></span>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>

  <div class="catalogcarspecs">


    <h2>Комплектация</h2>
    <div class="catalogcarspecs_list">

      <div class="dropzone">
        <div class="dropname">
          <h3>
            Комфорт
          </h3>
        </div>
        <div class="droplist">
          <div v-for="(item, index) in carOptions.interior" class="droplist_item" :key="index"
               :class="{'active':isCarHasOption(item.id)}">
            <IconTick2 class="available"/>
            <IconClose4 class="unavailable"/>
            <div class="group_item-text">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="dropzone">
        <div class="dropname">
          <h3>
            Салон
          </h3>
        </div>
        <div class="droplist">
          <div v-for="(item, index) in carOptions.salon" class="droplist_item" :key="index"
               :class="{'active':isCarHasOption(item.id)}">
            <IconTick2 class="available"/>
            <IconClose4 class="unavailable"/>
            <div class="group_item-text">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="dropzone">
        <div class="dropname">
          <h3>
            Мультимедиа
          </h3>
        </div>
        <div class="droplist">
          <div v-for="(item, index) in carOptions.comfort" class="droplist_item" :key="index"
               :class="{'active':isCarHasOption(item.id)}">
            <IconTick2 class="available"/>
            <IconClose4 class="unavailable"/>
            <div class="group_item-text">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="dropzone">
        <div class="dropname">
          <h3>
            Безопасность
          </h3>
        </div>
        <div class="droplist">
          <div v-for="(item, index) in carOptions.security" class="droplist_item" :key="index"
               :class="{'active':isCarHasOption(item.id)}">
            <IconTick2 class="available"/>
            <IconClose4 class="unavailable"/>
            <div class="group_item-text">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>


