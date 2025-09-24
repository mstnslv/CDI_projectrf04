<template>

  <div class="carShortData">

    <h2 class="h-2">
      <span>
        Краткое
      </span>
      <span>
        описание
      </span>
    </h2>

    <div class="carShortData_top">
      <div class="carShortData_top-item">
        <div class="key">
          VIN код авто:
        </div>
        <div class="data">
          WBACV6101L9B24195
        </div>
      </div>
      <div class="carShortData_top-item">
        <div class="key">
          Дата первой регистрации:
        </div>
        <div class="data">
          20.01.2022
        </div>
      </div>
    </div>

    <div class="carShortData_bottom">

      <div class="carShortData_block">
        <div class="carShortData_block-top">
          <div class="carShortData_block-icon">
            <IconEngine/>
          </div>
          <div class="carShortData_block-num">
            01
          </div>
        </div>

        <div class="carShortData_block-bottom">
          <div class="key">
            Тип двигателя:
          </div>
          <div class="data">
            Бензиновый
          </div>
        </div>
      </div>
      <div class="carShortData_block">
        <div class="carShortData_block-top">
          <div class="carShortData_block-icon">
            <IconEngine/>
          </div>
          <div class="carShortData_block-num">
            02
          </div>
        </div>

        <div class="carShortData_block-bottom">
          <div class="key">
            Мощность двигателя:
          </div>
          <div class="data">
            <span>240</span>
            <span>л.с.</span>
          </div>
        </div>
      </div>
      <div class="carShortData_block">
        <div class="carShortData_block-top">
          <div class="carShortData_block-icon">
            <IconEngine/>
          </div>
          <div class="carShortData_block-num">
            03
          </div>
        </div>

        <div class="carShortData_block-bottom">
          <div class="key">
            Модель двигателя:
          </div>
          <div class="data">
            CPMB
          </div>
        </div>
      </div>
      <div class="carShortData_block">
        <div class="carShortData_block-top">
          <div class="carShortData_block-icon">
            <IconGearBox/>
          </div>
          <div class="carShortData_block-num">
            04
          </div>
        </div>

        <div class="carShortData_block-bottom">
          <div class="key">
            Коробка передач:
          </div>
          <div class="data">
            Автомат
          </div>
        </div>
      </div>
      <div class="carShortData_block">
        <div class="carShortData_block-top">
          <div class="carShortData_block-icon">
            <IconOdometr/>
          </div>
          <div class="carShortData_block-num">
            05
          </div>
        </div>

        <div class="carShortData_block-bottom">
          <div class="key">
            Пробег:
          </div>
          <div class="data">
            <span>15 000</span><span> км</span>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import IconEngine from "../icons/IconEngine.vue";
import IconOdometr from "../icons/IconOdometr.vue";
import IconGearBox from "../icons/IconGearBox.vue";
export default {
  name: "CatalogOneCarShortData",
  components: {IconGearBox, IconOdometr, IconEngine}
}
</script>

