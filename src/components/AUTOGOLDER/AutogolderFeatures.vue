<template>
  <section class="features">
    <div class="features__container">
      <h2 class="features__title">
        Почему покупка автомобиля в Южной Корее — это выгодно?
      </h2>
      <div class="features__grid">
        <div
            v-for="(item, i) in features"
            :key="i"
            class="features__card"
        >
          <h3 class="features__card-title">{{ item.title }}</h3>
          <img
              :src="item.image"
              :alt="item.alt"
              class="features__card-image"
          />
          <p class="features__card-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Широкий выбор автомобилей',
    image: '/images/advantages/1.jpg',
    alt: 'Большой выбор автомобилей',
    text: 'На площадках и аукционах Кореи можно подобрать автомобиль как от локальных производителей (Hyundai – Kia), так и авто европейских и американских марок.'
  },
  {
    title: 'Строгое законодательство',
    image: '/images/advantages/2.jpg',
    alt: 'Юридическая надежность',
    text: 'В Южной Корее сокрытие фактов участия автомобиля в ДТП и корректировка пробега являются уголовно-наказуемыми деяниями, что делает покупку авто на порядок более прозрачной процедурой чем в России.'
  },
  {
    title: 'Дешевле чем в РФ и Европе',
    image: '/images/advantages/3.jpg',
    alt: 'Доступная цена',
    text: 'Автомобиль с доставкой из Кореи обойдется дешевле в сравнении как с покупкой его в России так и привозом из Европы. Экономия может достигать до 30% рыночной стоимости.'
  }
]
</script>

<style scoped>
.features {
  padding: 80px 20px 0;
  background-color: #f8f8f8;
  color: #1b1b1b;
}
.features__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0;
}
.features__title {
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--header-background-color, #1b1b1b);
}
.features__grid {
  display: flex;
  justify-content: space-between;
  gap: 3%;
  flex-wrap: wrap;
}
.features__card {
  flex: 1 1;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.features__card:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}
.features__card-title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 30px 20px 20px 20px;
  color: #1b1b1b;
}
.features__card-image {
  width: 100%;
  object-fit: cover;
  display: block;
}
.features__card-text {
  font-size: 1rem;
  color: #555;
  margin: 20px;
}
@media (max-width: 767px) {
  .features {
    padding: 60px 15px 0;
  }
  .features__title {
    font-size: 1.4rem;
  }
  .features__grid {
    gap: 15px;
  }
  .features__card {
    flex: 1 1 100%;
  }
}
</style>
