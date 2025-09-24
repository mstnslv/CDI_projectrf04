<script setup>
  import {useCarStore} from "../../store/carStore.js";
  import {storeToRefs} from "pinia";
  import {computed} from "vue";
  import {getNameOfPart, getTypeName} from "../../utils/inspectionDetailsTransform.js";
  import {getPhotoUrl} from "../../utils/photoHelper.js";

  const carStore = useCarStore();
  let {carData, carOptionsSet} = storeToRefs(carStore);

  let inspectionVersion = computed(()=> carData.value?.car?.inspectionVersion ?? null);
  let inspectionDetails = computed(()=> (inspectionVersion.value === 1 ? JSON.parse(carData.value?.car?.inspectionDetails) ?? null : null) || {});
  let inspectionDetailsArr = computed(()=> (Object.entries(inspectionDetails.value) ?? [])
      .filter((el) => el[1] !== null)
      .map((el) => {
        let newVal = el[1].map((item)=>{
          switch (item){
            case 'CHANGE': return 'replace';
            case 'METAL': return 'repair';
            case 'CORROSION': return 'corrosion';
            case 'SCRATCH': return 'scratches';
            case 'HILLS': return 'defection';
            case 'DAMAGE': return 'damage';
          }
          return item;
        });
        return [el[0], newVal];
      })
  );
  let far1 = ["frontFenderLeft", "frontFenderRight", "quarterPanelLeft", "quarterPanelRight", "trunkLead", "frontDoorLeft", "frontDoorRight", "rearDoorLeft", "rearDoorRight", "radiatorSupport", "hood", "dashPanel", "sideSillPanelLeft", "sideSillPanelRight"];
  let inspectionDetailsArr1 = computed(()=> inspectionDetailsArr.value.filter((el) => far1.includes(el[0])));
  let inspectionDetailsArr2 = computed(()=> inspectionDetailsArr.value.filter((el) => !far1.includes(el[0])));

  let inspectionPhotos = computed(()=>
      ((carData.value?.car?.inspectionPhotos? JSON.parse(carData.value?.car?.inspectionPhotos) : null) || [])
          ?.filter((el) => el.indexOf('-x-') < 0)
          ?.map((el) => getPhotoUrl(el,null,'static2'))
  );
  let inspectionPhotosV2 = computed(()=>
      ((carData.value?.car?.inspectionPhotos? JSON.parse(carData.value?.car?.inspectionPhotos) : null) || [])
          ?.filter((el) => el.indexOf('-x-') >= 0)
          ?.map((el) => getPhotoUrl(el,null,'static2'))
  );
</script>
<template>

  <div class="catalogcardamage">



    <div class="catalogcardamageimgwrap" v-if="inspectionVersion === 1">
      <div class="catalogcardamageimg catalogcardamageimg--external">
        <div v-for="(item, index) in inspectionDetailsArr1" :key="index"
             class="catalogcardamage__mark"
             :class="`catalogcardamage__mark--${item[1][0]} catalogcardamage__mark--${item[0]}`"></div>
<!--        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontFenderLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontFenderRight"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;quarterPanelLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;quarterPanelRight"></div>

        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;trunkLead"></div>

        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontDoorLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontDoorRight"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;rearDoorLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;rearDoorRight"></div>


        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;radiatorSupport"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;hood"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;dashPanel"></div>


        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;sideSillPanelLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;sideSillPanelRight"></div>-->


      </div>

      <div class="catalogcardamageimg catalogcardamageimg--internal">
        <div v-for="(item, index) in inspectionDetailsArr2" :key="index"
             class="catalogcardamage__mark"
             :class="`catalogcardamage__mark--${item[1][0]} catalogcardamage__mark--${item[0]}`"></div>

<!--        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontPanel"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;insidePanelLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;insidePanelRight"></div>

        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontSideMemberLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontSideMemberRight"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;rearSideMemberLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;rearSideMemberRight"></div>

        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontWheelHouseLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;frontWheelHouseRight"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;rearWheelHouseLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;rearWheelHouseRight"></div>

        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;crossMember"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;dashPanel"></div>

        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;floorPanel"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;packageTray"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;trunkFloor"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;rearPanel"></div>


        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;pillarPanelFrontLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;pillarPanelMiddleLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;pillarPanelRearLeft"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;pillarPanelFrontRight"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;pillarPanelMiddleRight"></div>
        <div class="mdm_cardamage__mark mdm_cardamage__mark&#45;&#45;replace mdm_cardamage__mark&#45;&#45;pillarPanelRearRight"></div>-->



      </div>
    </div>

    <div class="catalogcardamagelegend"  v-if="inspectionVersion === 1">

      <div class="catalogcardamage__legendline">
        <div class="catalogcardamage__mark catalogcardamage__mark--replace">

        </div>
        <div>
          Замена
        </div>
      </div>
      <div class="catalogcardamage__legendline">
        <div class="catalogcardamage__mark catalogcardamage__mark--repair">

        </div>
        <div>
          Ремонт
        </div>
      </div>
      <div class="catalogcardamage__legendline">
        <div class="catalogcardamage__mark catalogcardamage__mark--corrosion">

        </div>
        <div>
          Коррозия
        </div>
      </div>
      <div class="catalogcardamage__legendline">
        <div class="catalogcardamage__mark catalogcardamage__mark--scratches">

        </div>
        <div>
          Царапины
        </div>
      </div>
      <div class="catalogcardamage__legendline">
        <div class="catalogcardamage__mark catalogcardamage__mark--defection">

        </div>
        <div>
          Нарушения
        </div>
      </div>
      <div class="catalogcardamage__legendline">
        <div class="catalogcardamage__mark catalogcardamage__mark--damage">

        </div>
        <div>
          Повреждение
        </div>
      </div>

    </div>

    <div class="catalogcardamagesummary" v-if="inspectionVersion === 1">

      <div class="catalogcardamage__summaryblock">
        <div v-for="(item, index) in inspectionDetailsArr1" :key="index"
            class="catalogcardamage__summaryline">
          <div class="catalogcardamage__mark"
               :class="`catalogcardamage__mark--${item[1][0]}`"></div>
          <div>
            {{getTypeName(item[1][0])}}: {{getNameOfPart(item[0])}}
          </div>
        </div>
      </div>

      <div class="catalogcardamage__summaryblock">
        <div v-for="(item, index) in inspectionDetailsArr2" :key="index"
             class="catalogcardamage__summaryline">
          <div class="catalogcardamage__mark"
               :class="`catalogcardamage__mark--${item[1][0]}`"></div>
          <div>
            {{getTypeName(item[1][0])}}: {{getNameOfPart(item[0])}}
          </div>
        </div>
      </div>

    </div>

    <div class="catalogcardamagephotos" v-if="inspectionPhotos.length > 0">
        <img v-for="(item, index) in inspectionPhotos" :key="index"
           class="catalogcardamage__photo"
           :src="item">
    </div>

    <div class="catalogcardamageimgdocuments" v-if="inspectionPhotosV2.length > 0">
      <img v-for="(item, index) in inspectionPhotosV2" :key="index"
          class="catalogcardamage__imgdocument"
                :src="item">
    </div>


  </div>

</template>



<style scoped>

</style>