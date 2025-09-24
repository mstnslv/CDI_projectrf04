<script setup>
  import Menu from "../components/staticBlocks/Menu.vue";
  import KoreaFlag from "../components/icons/KoreaFlag.vue";
  import Search from "../components/dynamicBlocks/Search.vue";
  import SearchTags from "../components/dynamicBlocks/SearchTags.vue";
  import Footer from "../components/staticBlocks/Footer.vue";
  import router from "../router/index.js";
  import {fromStringToQueryObject} from "../utils/otherHelpers.js";
  import {default as eventBus} from "../eventBus.js";

  const showContacts = () => {
    eventBus.$emit("showContacts", 'Главная');
  }
  const onClickBtnShow = async (text) => {
    await router.push({
      name: 'catalog',
      query: {
        ...fromStringToQueryObject(text)
      },
    });
  };

</script>

<template>

  <article class="page_home">

    <Menu/>



    <Footer/>

  </article>

</template>