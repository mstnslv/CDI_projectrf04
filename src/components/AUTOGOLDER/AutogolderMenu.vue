<template>
  <header class="header">
    <div class="header__container">
      <div class="header__top-bar">
        <div class="header__info">
          <i class="fas fa-map-marker-alt"></i>
          <span>Санкт-Петербург, ул. Оптиков, 4, корп. 2</span>
        </div>
        <div class="header__info">
          <i class="far fa-calendar-alt"></i>
          <span>Пн - Сб 10:00 – 21:00 | Вс 11:00 – 20:00</span>
        </div>
      </div>

      <div class="header__bottom-bar">
        <!-- Логотип -->
        <div class="header__logo">
          <RouterLink to="/">
            <img src="/images/logo.png" alt="Логотип" id="logo_img" />
          </RouterLink>
        </div>

        <!-- Контакты (desktop) -->
        <div class="header__contact-desktop">
          <div class="header__icon-circle">
            <i class="fas fa-phone"></i>
          </div>
          <div class="header__contact-text">
            <div class="header__label">Связаться с нами</div>
            <a href="tel:+78125658008" class="header__phone">+7 812 565-80-08</a>
          </div>
        </div>

        <!-- Соцсети и кнопки -->
        <div class="header__buttons">
          <a href="https://t.me/autogolder_sale" target="_blank" class="social-telegram" aria-label="Написать в Telegram">
            <i class="fab fa-telegram"></i>
          </a>
          <a href="https://wa.me/message/C7G2XD6QBLIFK1" target="_blank" class="social-whatsapp" aria-label="Написать в WhatsApp">
            <i class="fab fa-whatsapp"></i>
          </a>

          <!-- Выпадашка телефона -->
          <div class="header__phone-trigger">
            <button class="header__phone-button" @click="togglePhone">
              <i class="fas fa-phone" v-show="!isPhoneOpen"></i>
              <i class="fas fa-times" v-show="isPhoneOpen"></i>
            </button>
            <div class="header__dropdown" :class="{ show: isPhoneOpen }">
              <div class="header__dropdown-content">
                <a href="tel:+78125658008" class="header__dropdown-phone">+7 812 565-80-08</a>
                <p class="header__dropdown-text">Пн - Сб 10:00 – 21:00</p>
                <p class="header__dropdown-text">Вс 11:00 – 20:00</p>
                <p class="header__dropdown-text">Санкт-Петербург, ул. Оптиков, 4, корп. 2</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Бургер меню (mobile) -->
        <div class="header__mobile-section">
          <div class="header__burger-container">
            <button class="header__burger-button" @click="toggleMenu" aria-label="Открыть меню">
              <i class="fas fa-bars"></i>
            </button>
            <nav class="header__mobile-menu" :class="{ show: isMenuOpen }">
              <ul>
                <li><RouterLink to="/">Главная</RouterLink></li>
                <li><a href="#catalog">Каталог авто</a></li>
                <li><a href="#credit">Кредит</a></li>
                <li><a href="#team">Наша команда</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Десктоп меню -->
    <div class="header__menu-container">
      <nav class="header__desktop-menu">
        <ul>
          <li><RouterLink to="/">Главная</RouterLink></li>
          <li><a href="#catalog">Каталог авто</a></li>
          <li><a href="#credit">Кредит</a></li>
          <li><a href="#team">Наша команда</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isPhoneOpen = ref(false)
const isMenuOpen = ref(false)

function togglePhone() {
  isPhoneOpen.value = !isPhoneOpen.value
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  width: 100%;
  overflow-x: clip;
  font-family: 'Montserrat', sans-serif;
  color: #1b1b1b;
  line-height: 1.6;
  background-color: #F8F8F8;
}

body {
  font-family: 'Montserrat', sans-serif;
}

.header {
  background-color: var(--header-background-color);
  width: 100%;
  position: relative;
  z-index: 10;
}

.header__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}

.header__top-bar {
  display: flex;
  justify-content: flex-start;
  color: var(--header__top-bar-font-color);
  font-size: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #333;
  flex-wrap: wrap;
  gap: 10px;
}

.header__top-bar .header__info {
  margin-left: 20px;
}

.header__top-bar .header__info i {
  color: var(--header-font-color);
  margin-right: 5px;
}

.header__bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  flex-wrap: wrap;
  gap: 15px;
}

.header__mobile-section {
  display: flex;
  gap: 15px;
}

.header__logo {
  max-width: 336px;
  flex-shrink: 1;
}

@media (max-width: 767px) {
  .header__logo {
    width: 42%;
  }
  .header__bottom-bar {
    padding: 15px 0;
  }
}

@media (max-width: 400px) {
  .header__logo {
    width: 42%;
  }
}

.header__logo img {
  max-width: 100%;
  height: auto;
  display: block;
}

.header__contact-desktop {
  display: flex;
  gap: 15px;
  align-items: center;
  color: var(--header__top-bar-font-color);
}

.header__icon-circle {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 2px solid #FC4B2A;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__icon-circle i {
  color: #FC4B2A;
  font-size: 16px;
}

.header__contact-text {
  text-align: left;
}

.header__label {
  color: #FC4B2A;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
}

.header__phone {
  color: var(--header-font-color);
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
}

.header__buttons {
  display: flex;
  gap: 25px;
  align-items: center;
}

.header__buttons a {
  font-size: 40px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  border-radius: 50%;
}

.header__phone-trigger {
  position: relative;
}

.header__phone-button {
  background: transparent;
  border: none;
  padding: 10px 0;
  min-width: 22px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.header__phone-button:hover,
.header__phone-button:focus {
  transform: scale(1.15);
}

.header__phone-button i {
  color: #FC4B2A;
  font-size: 21px;
  transition: transform 0.2s ease;
}

#closeIcon {
  display: none;
}

.header__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background: #2F3234;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  padding: 20px;
  min-width: 280px;
  max-width: calc(100vw - 30px);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 99999;
  color: #fff;
}

.header__dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.header__dropdown-content {
  text-align: center;
}

.header__dropdown-phone {
  display: block;
  font-size: 18px !important;
  font-weight: 600;
  color: var(--header-dropdown-font-color);
  text-decoration: underline;
  margin-bottom: 8px;
}

.header__dropdown-text {
  font-size: 13px;
  color: #fff;
  margin: 5px 0;
}

.header__buttons a.social-telegram i {
  color: #0088cc;
  transition: color 0.2s ease, transform 0.2s ease;
}

.header__buttons a.social-telegram:hover i {
  color: #0088cc;
  transform: scale(1.15);
}

.header__buttons a.social-whatsapp i {
  color: #25D366;
  transition: color 0.2s ease, transform 0.2s ease;
}

.header__buttons a.social-whatsapp:hover i {
  color: #25D366;
  transform: scale(1.15);
}

@media (max-width: 991px) {
  .header__top-bar,
  .header__contact-desktop {
    display: none !important;
  }
  .header__phone-trigger {
    display: flex;
  }
  .header__buttons a {
    font-size: 30px;
  }
}

@media (max-width: 767px) {
  .header__buttons {
    gap: 15px;
  }
}

@media (min-width: 992px) {
  .header__phone-trigger {
    display: none !important;
  }
}

.header__menu-container {
  max-width: 100%;
  margin: 0 auto;
}

.header__desktop-menu {
  display: flex;
  justify-content: center;
  background-color: var(--header__desktop-menu-background-color);
  padding: 12px 0;
}

.header__desktop-menu ul {
  list-style: none;
  display: flex;
  gap: 40px;
}

.header__desktop-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

.header__desktop-menu a:hover {
  color: #FC4B2A;
}

.header__burger-container {
  display: none;
  position: relative;
}

.header__burger-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__burger-button i {
  color: #FC4B2A;
  font-size: 24px;
}

.header__mobile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #2F3234;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  padding: 20px;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 10000;
}

.header__mobile-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.header__mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.header__mobile-menu a {
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-bottom: 1px solid #444;
}

.header__mobile-menu a:hover {
  color: #FC4B2A;
}

@media (max-width: 991px) {
  .header__desktop-menu {
    display: none;
  }
  .header__burger-container {
    display: flex;
  }
  .header__contact-desktop {
    display: none !important;
  }
  .header__phone-trigger {
    display: flex;
  }
}

@media (min-width: 992px) {
  .header__burger-container,
  .header__mobile-menu {
    display: none !important;
  }
}
</style>
