<template>
  <section class="feedback">
    <div class="feedback__container">
      <h2 class="feedback__title">Отзывы о нас</h2>

      <p class="feedback__intro">
        Мы представлены на автомобильном рынке Санкт-Петербурга уже более 10 лет,
        за которые заработали репутацию надежной компании. С отзывами о нас Вы можете
        ознакомиться на страницах таких интернет-ресурсов, как:
      </p>

      <p class="feedback__links">
        <a href="https://yandex.ru/maps/org/avtogolder/176711063098/reviews/?ll=30.249177%2C59.995471&z=17" target="_blank">Яндекс</a> |
        <a href="https://www.avito.ru/brands/autogolder888/all?ysclid=m9eb3mk7to94322668&sellerId=376d972e50bbebd1f33a99784a1e1a4c" target="_blank">Авито</a> |
        <a href="https://2gis.ru/spb/firm/70000001069603108/tab/reviews" target="_blank">2ГИС</a> |
        <a href="https://zoon.ru/spb/autoservice/avtosalon_avtogolder/?ysclid=m9eblmuw3i488204859" target="_blank">ZOON</a>
      </p>

      <p class="ya__label">
        <iframe
            src="https://yandex.ru/sprav/widget/rating-badge/176711063098?type=rating"
            width="150" height="50" frameborder="0">
        </iframe>
      </p>

      <!-- Карусель -->
      <div class="feedback__carousel-wrapper">
        <!-- Кнопки управления -->
        <div class="feedback__controls--top">
          <button class="feedback__prev" @click="prevSlide" aria-label="Предыдущий отзыв">
            <i class="fas fa-angle-left"></i>
          </button>
          <button class="feedback__next" @click="nextSlide" aria-label="Следующий отзыв">
            <i class="fas fa-angle-right"></i>
          </button>
        </div>

        <!-- Слайды -->
        <div
            class="feedback__carousel"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            @mouseenter="pauseAutoSlide"
            @mouseleave="resetAutoSlide"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
        >
          <div v-for="(review, i) in reviews" :key="i" class="feedback__slide">
            <div class="feedback__card">
              <div class="feedback__image">
                <img :src="review.image" :alt="review.alt" />
              </div>
              <div class="feedback__content">
                <h4 class="feedback__client-name">{{ review.title }}</h4>
                <p>{{ review.text }}</p>
                <p class="feedback__source">
                  <a :href="review.link" target="_blank">Оригинал отзыва</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- /carousel-wrapper -->
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ⚡️ Положи картинки в public/images/feedback/*.jpg
const reviews = [
  {
    image: '/images/feedback/feedback-1.jpg',
    alt: 'Фотография Андрея Шириханова',
    title: 'Андрей Шириханов (купил Toyota Corolla)',
    text: 'Покупал здесь Corolla. Работа менеджера Александра и команды по страхованию на высоте. Всегда на связи, даже в свой выходной позвонят, напишут и не оставят без внимания. Клиентоориентированность — однозначно большой плюс автосалона. Вас всегда встретят с улыбкой и проконсультируют по всем вопросам.',
    link: 'https://yandex.ru/maps/org/176711063098/reviews?reviews%5BpublicId%5D=a8de837hu91mmp89eywxavn2g0'
  },
  {
    image: '/images/feedback/feedback-2.jpg',
    alt: 'Фотография Алексея Архарова',
    title: 'Алексей Архаров (купил Mitsubishi Outlander)',
    text: 'Приобрели Outlander в Автогольдер! Я не ожидал такого подхода к клиенту. Отдельное спасибо хотел бы сказать менеджеру Александру — выслушал все пожелания и решил их за 24 часа. За тонировали и поставили GSM сигнализацию последнего поколения (бонусом за trade-in). Дружный, слаженный коллектив. Только положительные эмоции. Никаких навязанных услуг. Вчера зашел спросить — сегодня на новой машине уехал. В салоне чистота, порядок, чай, кофе. Спасибо всему коллективу «Автогольдер», вы делаете людей счастливыми без заморочек.',
    link: 'https://yandex.ru/maps/org/176711063098/reviews?reviews%5BpublicId%5D=94yy5fb03rqgkm2g5td7dm6gkg'
  },
  {
    image: '/images/feedback/feedback-4.jpg',
    alt: 'Фотография Михаила Волкова',
    title: 'Михаил Волков (купил Skoda Kodiaq)',
    text: 'Отличный автосалон. Персонал предлагает отличные машины за хороший прайс. Никаких навязанных услуг. На все сложные вопросы по поводу автомобиля были даны честные ответы. Остались только положительные впечатления от покупки нового автомобиля.',
    link: 'https://yandex.ru/maps/org/176711063098/reviews?reviews%5BpublicId%5D=f12wyykgydxcfu8zxbttgj15ec'
  }
]

const currentIndex = ref(0)
const timer = ref(null)
let touchStartX = 0
const slideCount = reviews.length

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slideCount
  resetAutoSlide()
}
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slideCount) % slideCount
  resetAutoSlide()
}

const resetAutoSlide = () => {
  clearInterval(timer.value)
  timer.value = setInterval(nextSlide, 8000)
}
const pauseAutoSlide = () => clearInterval(timer.value)

const onTouchStart = (e) => { touchStartX = e.touches[0].clientX }
const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide()
}

onMounted(() => resetAutoSlide())
onBeforeUnmount(() => clearInterval(timer.value))
</script>

<style scoped>
/* === FEEDBACK SECTION === */
.feedback {
  padding: 80px 20px 0;
  background-color: #f8f8f8;
  color: #1b1b1b;
}
.feedback__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0;
}
.feedback__title {
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--header-background-color, #1b1b1b);
}
.feedback__intro {
  font-size: 1rem;
  color: #555;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 1rem;
  line-height: 1.6;
}
.feedback__links {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.ya__label {
  text-align: center;
  padding-left: 20px;
  margin-bottom: 2rem;
}
.feedback__links a {
  color: #FC4B2A;
  text-decoration: none;
  margin: 0 0.5em;
}
.feedback__links a:hover {
  text-decoration: underline;
}

/* === КАРУСЕЛЬ И УПРАВЛЕНИЕ === */
.feedback__carousel-wrapper {
  position: relative;
  min-height: 0px;
  overflow: hidden;
  width: 100%;
}
.feedback__controls--top {
  position: absolute;
  top: 50%;
  left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  transform: translateY(-50%);
  z-index: 10;
  pointer-events: none;
}
.feedback__prev,
.feedback__next {
  pointer-events: auto;
  background-color: rgba(252, 75, 42, 0.2);
  color: white;
  border: none;
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.feedback__prev:hover,
.feedback__next:hover { background-color: rgba(252,75,42,1); }

/* === КАРУСЕЛЬ === */
.feedback__carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%; height: 100%;
}
.feedback__slide {
  min-width: 100%;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items:flex-start;
}

/* === КАРТОЧКА === */
.feedback__card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5em;
  align-items: flex-start;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  max-width: 1140px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.feedback__image {
  flex: 1 1 40%;
  border-radius: 8px;
  overflow: hidden;
}
.feedback__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.feedback__content {
  flex: 1 1 60%;
}
.feedback__client-name {
  font-size: 1.1em;
  font-weight: 600;
  color: #1b1b1b;
  margin: 0 0 0.5em 0;
}
.feedback__content p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin: 0 0 0.5em 0;
}
.feedback__source {
  text-align: right;
  font-size: 0.9rem;
  margin: 0;
}
.feedback__source a {
  color: #FC4B2A;
  text-decoration: none;
  font-style: italic;
}
.feedback__source a:hover { text-decoration: underline; }

/* === АДАПТИВ === */
@media (max-width: 767px) {
  .feedback { padding: 60px 15px 0; }
  .feedback__title { font-size: 1.4rem; margin-bottom: 1rem; }
  .feedback__intro, .feedback__links { font-size: 0.95rem; }
  .feedback__card { flex-direction: column; align-items: center; text-align: center; }
  .feedback__image { width: 100%; }
  .feedback__content { margin-top: 1rem; }
  .feedback__source { text-align: center; }
  .feedback__controls--top { padding: 0 10px; justify-content: space-between; }
}
</style>
