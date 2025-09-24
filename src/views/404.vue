<script setup>
  import Menu from "../components/StaticBlocks/Menu.vue";
  import IconTelephone from "../components/icons/IconTelephone.vue";
  import Footer from "../components/StaticBlocks/Footer.vue";
  import ModalContacts from "../components/StaticBlocks/ModalContacts.vue";
  import Loader from "../components/StaticBlocks/Loader.vue";
  import IconWheel from "../components/icons/IconWheel.vue";
  import {default as eventBus} from "../eventBus.js";


  const showContacts = (type) => {
    eventBus.$emit("showContacts",type);
  }
</script>

<template>
  <Menu/>

  <article class="page_404">



    <section class="p404s1">

      <div class="contentwrap">
        <div class="banner404">
          <div class="text404">
            <span>4</span>
            <IconWheel/>
            <span>4</span>
          </div>
        </div>
        <div class="banner404">
          <div class="infotext">
            Страница не найдена, или устарела
          </div>
        </div>
      </div>

    </section>



    <section class="p404s2">
      <div class="onecar_btnwrap">
        <a @click="showContacts" class="onecar_btn onecar_btn--accent">
          Контакты
        </a>
        <router-link to="/">
          <a class="onecar_btn">
            На главную
          </a>
        </router-link>
      </div>
    </section>

  </article>

  <Footer/>

</template>
