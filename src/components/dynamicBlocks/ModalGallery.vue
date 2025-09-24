<script setup>
  import IconClose from "../icons/IconClose.vue";
  import IconTelephone from "../icons/IconTelephone.vue";
  import IconEngine from "../icons/IconEngine.vue";
  import IconGearBox from "../icons/IconGearBox.vue";
  import IconCar from "../icons/IconCar.vue";
  import IconOdometr from "../icons/IconOdometr.vue";
  import {nextTick, ref} from "vue";
  import IconClose2 from "../icons/IconClose.vue";
  import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";

  const props = defineProps({
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Number
    },
  });
  const emits = defineEmits(['update:modelValue', 'close']);
  let options = ref(props.options);

  const setIndex = (i) => {
    emits('update:modelValue', i);
  }
  const onClose = () => {
    emits('close', null);
  }

  const isActive = (i) => {
    return props.modelValue === i;
  }

  const img = ref(null);
  const onMiniClick = (i,animated) => {
    setIndex(i);
    if(animated === false){
      img.value[i]?.scrollIntoView({behavior: "auto", block: "center"});
    } else {
      img.value[i]?.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }

  const onLoad = (index) => {
    if(index === props.modelValue){
      onMiniClick(index, false);
    }
  }
  onBeforeRouteLeave((to, from, next) => {
    onClose();
    next(false);
  });

</script>


<template>

  <div class="modal modal--gallery">

    <div class="modal_window">

      <div class="modal_close" @click="onClose">
        <IconClose/>
      </div>
    
      <div class="modal_window__content">
        <img v-for="(item, index) in options" :key="index" :src="item" ref="img" @load="onLoad(index)">
      </div>

      <div class="modal_window__itemlist">
        <img v-for="(item, index) in options" :key="index" :src="item" :class="{'active':isActive(index)}"  @click="onMiniClick(index)">
      </div>

      <div class="modal_window__aboutcar">
        <div class="carblock">


          <div class="carblock_info">
            <div class="carblock_info-headline">
              <h3 class="car_name">
               Порш
              </h3>
              <div class="car_price">
                $ 100к
              </div>
            </div>
            <div class="carblock_info-specline">

              <div class="data">
                <IconEngine/>
                <span>бенз</span><span> - </span><span>500 л.с.</span>
              </div>

              <div class="data">
                <IconGearBox/>
                автомат
              </div>

            </div>
            <div class="carblock_info-specline">

              <div class="data">
                <IconOdometr/>
                триллион
              </div>

              <div class="data">
                <IconCar/>
                корыто
              </div>

            </div>
            <router-link to="/catalogpage" class="carblock_info-btn button">
              Смотреть авто
            </router-link>

            <router-link to="/catalog" class="carblock_more-btn button">
              больше вариантов
            </router-link>
          </div>


        </div>
      </div>
    </div>

  </div>

</template>