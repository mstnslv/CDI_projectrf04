<script setup>
import {default as eventBus} from "../../eventBus.js";

const showContacts = () => {
  eventBus.$emit("showContacts", 'Заказать осмотр на странице машины');
}
</script>

<template>

  <div class="carreview">

    <div class="carreview_block">

      <div class="carreview_block__photosblock left">

        <div class="youtubevideo">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/sNvKhBltx6c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

        </div>

      </div>

      <div class="carreview_block__details right">

        <h3 class="">
          Осмотр Genesis GV80 2020 года из Кореи
        </h3>

        <div class="">

          <p>
            Наш клиент сделал запрос на осмотр премиального внедорожника Genesis GV80 2020 перед тем, как совершить покупку весной 2023 года. Наш
            специалист провел осмотр автомобиля на месте, тщательно проверив кузов на наличие ремонтов и механических повреждений.</p>
          <p>
            Дополнительно была проведена проверка всех основных систем автомобиля, включая двигатель, электронику, тормоза и другие компоненты. Клиенту были предоставлены детальные фото и видео осмотра, что позволило ему убедиться в отличном состоянии автомобиля перед покупкой.
          </p>
          <p>
            Наша команда гарантирует надежность и профессионализм в каждом шаге процесса, и мы гордимся тем, что помогли клиенту принять осознанное решение перед приобретением автомобиля.</p>


        </div>

        <div class="carShortData2">
          <div class="carShortData2-item">
            <div class="key">
              Дата осмотра:
            </div>
            <div class="data">
              20.01.2022
            </div>
          </div>

        </div>

        <button class="carreview_block__details-btn" @click.prevent="showContacts">
          Кнопка
        </button>

      </div>

    </div>

    <div class="carreview_block">

      <div class="carreview_block__photosblock left">

        <div class="youtubevideo">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/u6q_LrsJd2Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

        </div>

      </div>

      <div class="carreview_block__details right">

        <h3 class="">
          Осмотр Hyundai Palisade в Корее
        </h3>

        <div class="">

          <p>
            Наш осмотр Hyundai Palisade перед покупкой. Наши профессионалы ответили на все
            интересующие клиента вопросы по салону,
            кузову и состоянию двигателя, сняли подробный видео и фото отчет.
          </p>


        </div>

        <div class="carShortData2">
          <div class="carShortData2-item">
            <div class="key">
              Дата осмотра:
            </div>
            <div class="data">
              22.03.2023
            </div>
          </div>

        </div>

        <button class="carreview_block__details-btn" @click.prevent="showContacts">
          Кнопка
        </button>

      </div>

    </div>

    <div class="carreview_block">

      <div class="carreview_block__photosblock left">

        <div class="youtubevideo">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/21544O8szvc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

        </div>

      </div>

      <div class="carreview_block__details right">

        <h3 class="">
          Осмотр BMW X5 в Корее
        </h3>

        <div class="">

          <p>
            Наш осмотр BMW X5 перед покупкой. Наши профессионалы ответили на все
            интересующие клиента вопросы по салону,
            кузову и состоянию двигателя, сняли подробный видео и фото отчет.
          </p>


        </div>

        <div class="carShortData2">
          <div class="carShortData2-item">
            <div class="key">
              Дата осмотра:
            </div>
            <div class="data">
              11.02.2023
            </div>
          </div>

        </div>

        <button class="carreview_block__details-btn" @click.prevent="showContacts">
          Заказать осмотр авто из каталога
        </button>

      </div>

    </div>

  </div>

</template>
