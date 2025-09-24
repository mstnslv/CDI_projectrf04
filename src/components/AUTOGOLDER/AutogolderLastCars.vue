<template>
  <section class="last_cars">
    <div class="last_cars__container">
      <h2 class="last_cars__title">Последние выдачи авто нашим клиентам:</h2>

      <div class="last_cars__carousel-wrapper">
        <!-- Управление -->
        <div class="last_cars__controls--top">
          <button class="last_cars__prev" aria-label="Предыдущий отзыв" @click="prevSlide">
            <i class="fas fa-angle-left"></i>
          </button>
          <button class="last_cars__next" aria-label="Следующий отзыв" @click="nextSlide">
            <i class="fas fa-angle-right"></i>
          </button>
        </div>

        <!-- Карусель -->
        <div
            class="last_cars__carousel"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            @mouseenter="pauseAutoSlide"
            @mouseleave="resetAutoSlide"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
        >
          <div v-for="(car, i) in cars" :key="i" class="last_cars__slide">
            <div class="last_cars__card">
              <div class="last_cars__image">
                <img :src="car.image" :alt="car.alt" />
              </div>
              <div class="last_cars__content">
                <h4 class="last_cars__client-name">{{ car.title }}</h4>
                <p v-for="(p, idx) in normalizedText(car.text)" :key="idx">{{ p }}</p>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- /carousel-wrapper -->
    </div>
  </section>
</template>

<script setup>
// ВАЖНО: положи файлы в public/images/last_cars/1.jpg ... 12.jpg
// тогда пути вида /images/last_cars/1.jpg будут работать и в dev, и в билде.

import { ref, onMounted, onBeforeUnmount } from 'vue'

const cars = [
  {
    image: '/images/last_cars/1.jpg',
    alt: 'Mitsubishi Outlander для Ирины Олеговны',
    title: 'Mitsubishi Outlander для Ирины Олеговны',
    text: `Поздравляем Ирину Олеговну с приобретением нового автомобиля! 🥳🎉. Желаем приятной эксплуатации автомобиля и ровной дороги! Пусть машина радует Вас долгие годы! 🍀 Нашли, подобрали, заказали, привезли, дополнительное оборудование, по запросу клиента, поставили и готовую машину клиенту отдали!🤩`
  },
  {
    image: '/images/last_cars/2.jpg',
    alt: 'Mercedes G-Class для Владимира',
    title: 'Mercedes G-Class для Владимира',
    text: `Поздравляем Владимира с приобретением!🎉Желаем ярких эмоций и приятных впечатлений от автомобиля! 🤩 Такой же и другие автомобили Вы можете заказать у нас! 😎`
  },
  {
    image: '/images/last_cars/3.jpg',
    alt: 'Suzuki Ertiga для Андрея и его супруги',
    title: 'Suzuki Ertiga для Андрея и его супруги',
    text: `Поздравляем Андрея с супругой, с приобретением надёжного семейного автомобиля! 🥳 Автомобиль прибыл под заказ, по этому благодарим наших клиентов за доверие нашей команде "Автогольдер"! 😎
Хорошие автомобили Вы можете приобрести у нас, а если подходящего автомобиля не нашлось - то мы привезём автомобиль специально для Вас! 😌`
  },
  {
    image: '/images/last_cars/4.jpg',
    alt: 'Mercedes GLC для Анатолия и Адольфины',
    title: 'Mercedes GLC для Анатолия и Адольфины',
    text: `Поздравляем Анатолия и его жену Адольфину с приобретением нового, шикарного автомобиля! Пусть он радует Вас долгие годы! 🎉 Желаем меньше пробок и всегда зеленого света светофора!🍀`
  },
  {
    image: '/images/last_cars/5.jpg',
    alt: 'Kia Sorento для Владимира и его семьи',
    title: 'Kia Sorento для Владимира и его семьи',
    text: `Поздравляем Владимира с приобретением прекрасного семейного автомобиля!🎉 Автомобиль приехал под заказ из Кореи и уже радует своего нового владельца!😊 Желаем приятной эксплуатации и удачи на дорогах!🍀🎉`
  },
  {
    image: '/images/last_cars/6.jpg',
    alt: 'Genesis GV70 для Евгении',
    title: 'Genesis GV70 для Евгении',
    text: `Поздравляем Евгению с приобретением люксового внедорожника Genesis GV70! 🥳 Этот автомобиль был выбран по опциям и параметрам нашего клиента и заказан из Кореи. 😎 P.S. Пока Вы думаете о заказе автомобиля, другие забирают самые интересные варианты! 😉`
  },
  {
    image: '/images/last_cars/7.jpg',
    alt: 'Toyota RAV4 для Ын',
    title: 'Toyota RAV4 для Ын',
    text: `Поздравляем Ын с приобретением Toyota RAV4 2024 года! В максимальной комплектации на заказ! 🛞 Желаем счастливого пути и приятного исследования неизведанных дорог! 🎉`
  },
  {
    image: '/images/last_cars/8.jpg',
    alt: 'Porsche Macan S для Елены',
    title: 'Porsche Macan S для Елены',
    text: `Поздравляем Елену с отличным приобретением эксклюзивного Porsche Macan S 2024 г.в. серого цвета, в матовой броне плёнке. 😎 Свободных и только прямых дорог!
P.S. А мы напоминаем, что если у нас в наличии нет того автомобиля, который Вы хотите - мы можем привезти под заказ из Европы, Азии и Кореи! 😊`
  },
  {
    image: '/images/last_cars/9.jpg',
    alt: 'Mitsubishi ASX для Татьяны',
    title: 'Mitsubishi ASX для Татьяны',
    text: `Поздравляем Татьяну с покупкой нового надёжного автомобиля! 🥳🚗👍 Mitsubishi ASX не обычного цвета отправляется в Выборг! 🛷 Желаем всегда лёгкой дороги и благоприятных условий на пути! 🎉😊`
  },
  {
    image: '/images/last_cars/10.jpg',
    alt: 'Mitsubishi ASX для Натальи',
    title: 'Mitsubishi ASX для Натальи',
    text: `Поздравляем Наталью, с приобретением автомобиля мечты! 🥳 Кстати, этот потрясающий Mitsubishi ASX с полным приводом, в максимальной комплектацие, мы везли под заказ. Пусть автомобиль радует Вас каждый день! 😊Спасибо Вам за доверие! ❤️`
  },
  {
    image: '/images/last_cars/11.jpg',
    alt: 'Mercedes-Benz GLE Coupe 350 de для Николая',
    title: 'Mercedes-Benz GLE Coupe 350 de для Николая',
    text: `Поздравляем Николая из Казани с приобретением шикарного Mercedes-Benz GLE Coupe 350 de! 🛞🎉 Желаем получить максимум эмоций от автомобиля, а так же ровных и быстрых дорог!😎 Мы напоминаем, что мы можем привезти для Вас любой автомобиль!😊`
  },
  {
    image: '/images/last_cars/12.jpg',
    alt: 'LiXiang L6 Ultra для Романа',
    title: 'LiXiang L6 Ultra для Романа',
    text: `Поздравляем Романа с приобретением прекрасного гибридного автомобиля LiXiang L6 Ultra! 🎉 Желаем, чтобы каждый ваш путь был безопасным и приятным! Благодарим за доверие!🎉`
  }
]

const currentIndex = ref(0)
const timer = ref(null)
let touchStartX = 0

const slideCount = cars.length

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
const pauseAutoSlide = () => {
  clearInterval(timer.value)
}

const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
}
const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide()
}

const normalizedText = (txt) => String(txt).split('\n').map(s => s.trim()).filter(Boolean)

onMounted(() => resetAutoSlide())
onBeforeUnmount(() => clearInterval(timer.value))
</script>

<style scoped>
/* === LAST_CARS SECTION === */
.last_cars {
  padding: 80px 20px 0;
  background-color: #f8f8f8;
  color: #1b1b1b;
}
.last_cars__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0;
}
.last_cars__title {
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--header-background-color, #1b1b1b);
}
.last_cars__intro {
  font-size: 1rem;
  color: #555;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 1rem;
  line-height: 1.6;
}
.last_cars__links a {
  color: #FC4B2A;
  text-decoration: none;
  margin: 0 0.5em;
}
.last_cars__links a:hover { text-decoration: underline; }

/* === КАРУСЕЛЬ И УПРАВЛЕНИЕ === */
.last_cars__carousel-wrapper {
  position: relative;
  min-height: 0px;
  overflow: hidden;
  width: 100%;
}
.last_cars__controls--top {
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
.last_cars__prev,
.last_cars__next {
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
.last_cars__prev:hover,
.last_cars__next:hover { background-color: rgba(252,75,42,1); }

/* === КАРУСЕЛЬ === */
.last_cars__carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%; height: 100%;
}
.last_cars__slide {
  min-width: 100%;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items:flex-start;
}

/* === КАРТОЧКА === */
.last_cars__card {
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
.last_cars__image { flex: 1 1 40%; border-radius: 8px; overflow: hidden; }
.last_cars__image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.last_cars__content { flex: 1 1 60%; }
.last_cars__client-name {
  font-size: 1.1em; font-weight: 600; color: #1b1b1b; margin: 0 0 0.5rem 0;
}
.last_cars__content p { font-size: 1rem; color: #555; line-height: 1.6; margin: 0 0 0.5rem 0; }

/* === АДАПТИВ === */
@media (max-width: 767px) {
  .last_cars { padding: 60px 15px 0px; }
  .last_cars__carousel-wrapper { min-height: 0px; }
  .last_cars__carousel { min-height: 0px; }
  .last_cars__title { font-size: 1.4rem; margin-bottom: 1rem; }
  .last_cars__intro, .last_cars__links { font-size: 0.95rem; }
  .last_cars__card { flex-direction: column; align-items: center; text-align: center; }
  .last_cars__image { width: 100%; }
  .last_cars__content { margin-top: 1rem; }
  .last_cars__controls--top {
    padding: 0 10px;
    top: 50%;
    transform: translateY(-50%);
    justify-content: space-between;
  }
}
</style>
