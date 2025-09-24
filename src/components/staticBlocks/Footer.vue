<script setup>
  import {default as eventBus} from "../../eventBus.js";

  const showContacts = () => {
    eventBus.$emit("showContacts", 'Футер');
  }

  //Мигание футера
  import { ref, watch } from 'vue';
  const props = defineProps({
    isFlashing: Boolean,
  });

  const isFlashing = ref(props.isFlashing);

  watch(() => props.isFlashing, (newIsFlashing) => {
    isFlashing.value = newIsFlashing;
  });
</script>

<template>

  <footer id="footer" class="footer">

    <article class="footerafter">
      <div class="graytext">
        <a href="https://cardataimport.com" target="_blank">
          <span class="footerafter_text">
            Создано Cardataimport
          </span>
        </a>
        <span> / </span>
        <a href="https://qbtob.com" target="_blank">
          <span class="footerafter_text">
             Qbtob.com
          </span>
        </a>

      </div>

      <div class="graytext">
        для
      </div>
      <div class="graytext">
        <a href="https://autogolder.ru" target="_blank">


          <span class="footerafter_text">
            autogolder.ru (2025)
          </span>
        </a>
      </div>
<!--      <a href="https://qbtob.com" target="_blank"  class="footer_qbtob">
        <img src="@/assets/decor/qbtobcom.png" alt="qbtob.com" class="footer_line">
      </a>-->
    </article>

  </footer>

</template>