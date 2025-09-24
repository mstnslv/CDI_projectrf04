<script setup>

</script>

<template>
  <section class="catalog" id="catalog">
    <div class="catalog__container">
      <h2 class="catalog__title">Каталог автомобилей из Кореи</h2>
    </div>
  </section>

</template>

<style scoped>
.catalog {
  padding: 40px 20px;
  padding-top: 120px;
  //background-color: #f8f8f8;
  color: #1b1b1b;
  //margin-top: 80px;
}
.catalog__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}
.catalog__title {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: #1b1b1b;
  //margin-bottom: 2rem;
}
@media (max-width: 767px) {
  .catalog {
    padding: 40px 15px;
    margin-top: 60px;
  }
  .catalog__title {
    font-size: 1.5rem;
    //margin-bottom: 1.5rem;
  }
}
</style>