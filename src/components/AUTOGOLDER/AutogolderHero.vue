<script setup>
  import {default as eventBus} from "@/eventBus.js";
  const showContacts = (type) => {
    eventBus.$emit("showContacts",type);
  }
</script>

<template>
<!-- HERO SECTION -->
<section class="hero">
<div class="hero__container">
  <div class="hero__content">
    <h1 class="hero__title">Автомобили <span class="hero__red-accent">из Кореи</span> со скидкой до 37% на доставку в СПб</h1>
    <ul class="hero__features">
      <li><i class="fas fa-shipping-fast"></i> Доставим за 30 рабочих дней</li>
      <li><i class="fas fa-credit-card"></i> Возможность покупки в кредит</li>
      <li><i class="fas fa-camera"></i> Фото и видео отчеты на всех этапах</li>
      <li><i class="fas fa-money-bill-wave"></i> Гарантируем возвратный депозит</li>
      <li><i class="fas fa-shield-alt"></i> Все риски застрахованы на 100%</li>
      <li><i class="fas fa-passport"></i> Растаможим и оформим ЭПТС</li>
      <li><i class="fas fa-dollar-sign"></i> Фиксированная комиссия за работу без накруток</li>
      <li><i class="fas fa-users"></i> Работаем с физическими и юридическими лицами</li>
    </ul>
    <a href="/services" class="hero__button">Каталог автомобилей</a>
<!--    <button type="button" class="hero__button&#45;&#45;callback request-btn" >Получить расчет цены</button>-->
    <button type="button" class="hero__button--callback request-btn" @click="showContacts">Получить расчет цены</button>
    <a href="https://t.me/autogolder_sale" class="hero__button--tg">Написать в Telegram</a>
    <a href="https://wa.me/message/C7G2XD6QBLIFK1" class="hero__button--wa">Написать в WhatsApp</a>
  </div>
</div>
</section>
</template>


<style scoped>
.hero {
  background: var(--hero_banner) center top no-repeat;
  background-size: cover;
  padding: 100px 20px;
  text-align: left;
}

.hero__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
  min-height: 400px;
}

.hero__content {
  width: 55%;
}

.hero__title {
  font-size: 2.0rem;
  font-weight: 700;
  color: var(--hero-font-color);
  margin-bottom: 20px;
}

.hero__red-accent {
  color: #FC4B2A;
}

.hero__features {
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
}

.hero__features li {
  color: var(--hero-font-color);
  margin-bottom: 12px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero__features i {
  color: #FC4B2A;
  font-size: 1.1rem;
  min-width: 20px;
  text-align: center;
}

.hero__button--callback,
.hero__button--callback:link,
.hero__button--callback:visited {
  /* твои стили */
  display: inline-block;
  min-width: 260px;
  margin: 0.5rem;
  background-color: #FC4B2A;
  color: white;
  padding: 1.1rem 2rem;
  border: none; /* ← важно! */
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hero__button--callback:hover {
  background-color: #e04225;
}

.hero__button {
  display: inline-block;
  min-width: 260px;
  margin: 0.5rem;
  background-color: var(--hero__button-call-back-color);
  color: var(--hero__button-call-back-font-color);
  padding: 14px 30px;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.hero__button:hover {
  background-color: #bbbbbb;
}

.hero__button--tg {
  display: inline-block;
  min-width: 260px;
  margin: 0.5rem;
  background-color: #00A8E7;
  color: #FFF;
  padding: 14px 30px;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.hero__button--tg:hover {
  background-color: #0096cc;
}

.hero__button--wa {
  display: inline-block;
  min-width: 260px;
  margin: 0.5rem;
  background-color: #25D366;
  color: #FFF;
  padding: 14px 30px;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.hero__button--wa:hover {
  background-color: #20b85c;
}

@media (max-width: 1024px) {
  .hero {
    background: none;
    background-color: var(--hero-background-color);
    padding: 80px 20px 0;
  }
  .hero__content {
    width: 80%;
  }
  .hero__title {
    font-size: 2.0rem;
  }
}

@media (max-width: 767px) {
  .hero {
    padding: 60px 0;
  }
  .hero__container {
    padding: 0 15px;
  }
  .hero__content {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
  }
  .hero__title {
    font-size: 1.7rem;
  }
  .hero__features li {
    font-size: 0.9rem;
    gap: 8px;
  }
  .hero__features i {
    min-width: 18px;
    font-size: 1rem;
  }
}
</style>