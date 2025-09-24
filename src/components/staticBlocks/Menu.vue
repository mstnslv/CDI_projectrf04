<script setup>
import IconTelephone from "../icons/IconTelephone.vue";
import {default as eventBus} from "../../eventBus.js";
import {ref} from "vue";
import IconWheel from "../icons/IconWheel.vue";
import IconTelegram from "../icons/IconTelegram.vue";
import IconWhatsapp from "../icons/IconWhatsapp.vue";
import IconMail from "../icons/IconMail.vue";
import IconWheel2 from "../icons/IconWheel2.vue";

const showContacts = () => {
  eventBus.$emit("showContacts", 'Меню');
}

let isMenuActive = ref(false);
let isListItemActive = ref(false);


const  toggleMenuActive = () => {
      isMenuActive.value = !isMenuActive.value;
    };
const toggleListItemActive = () => {
      isListItemActive.value = !isListItemActive.value;
    };
</script>

<template>
  <article class="menubar">

    <nav id="menu2" class="avtomenu" :class="{ activemob: isMenuActive }">

      <a href="https://autogolder.ru" class="avtomenu-logo">
<!--        <IconWheel/>-->
        <div class="avtomenu-logo_text">
          autogolder.ru
        </div>
      </a>

      <router-link to="/" class="avtomenu-menuitem" target="_blank">
        <h1 class="avtomenu-menuitem_text">
          Авто из Кореи под ключ
        </h1>
      </router-link>

      <div class="avtomenu-contacts">
        <a href="tel:+375445179547" class="avtomenu-contacts_tel">
          <div class="avtomenu-contacts_text">
            +375 (44) 517-95-47
          </div>
        </a>
<!--        <a href="https://wa.me/375445179547" target="_blank" class="avtomenu-contacts_whatsapp">
          <div class="avtomenu-contacts_icon">
            <IconWhatsapp/>
          </div>
        </a>-->
        <a href="https://t.me/zakazizeu" target="_blank" class="avtomenu-contacts_telegram">
          <div class="avtomenu-contacts_icon">
            <IconTelegram/>
          </div>
        </a>
      </div>

    </nav>

  </article>

</template>
