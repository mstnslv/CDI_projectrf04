<script setup>

  import YouTubePlay from "../icons/YouTubePlay.vue";
  import IconEngine from "../icons/IconEngine.vue";
  import IconGearBox from "../icons/IconGearBox.vue";
  import IconCar from "../icons/IconCar.vue";
  import IconSearch from "../icons/IconSearch.vue";

</script>


<template>

  <div class="carblockhorizontal">

    <div class="carblockhorizontal_left">
      <img src="/src/assets/data/carspreview/CarPreview_PorscheTaycan01.jpg"/>
    </div>

    <div class="carblockhorizontal_center">
      <h3 class="headname">
        PORSCHE TAYCAN BASE, 2021
      </h3>

      <div class="flex-between">
        <div class="label">
          <IconEngine/>
          Тип двигателя:
        </div>
        <div class="data">
          Электрический
        </div>
      </div>
      <div class="flex-between">
        <div class="label">
          <IconEngine/>
          Мощность:
        </div>
        <div class="data">
          530 л.с.
        </div>
      </div>
      <div class="flex-between">
        <div class="label">
          <IconGearBox/>
          Коробка передач:
        </div>
        <div class="data">
          Автомат
        </div>
      </div>
      <div class="flex-between">
        <div class="label">
          <IconCar/>
          Тип кузова:
        </div>
        <div class="data">
          Седан
        </div>
      </div>

      <button class="block-btn">
         Показать варианты
      </button>
    </div>

    <div class="carblockhorizontal_right">

      <div class="wrapper">

        <iframe width="378" height="671" src="https://www.youtube.com/embed/uRYQY3QlPuA" title="노마스크 안타!안타! #이다혜 #치어리더 #shorts #LeeDaHye" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <!--<img src="/src/assets/data/carsreviews/CarReview_PorscheTaycan01.png"/>-->



      </div>
      <a class="textsublink">
        наш осмотр Porsche Taycan
      </a>
    </div>

  </div>

</template>
