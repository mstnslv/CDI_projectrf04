<script setup>
import {default as eventBus} from "@/eventBus.js";
const showContacts = (type) => {
  eventBus.$emit("showContacts",type);
}
</script>

<template>
  <section class="credit" id="credit">
    <div class="credit__container">
      <div class="credit__wrapper">
        <div class="credit__content">
          <h2 class="credit__title">Автомобиль на заказ можно купить <span class="credit__red-accent">в кредит:</span></h2>
          <div class="credit__offer">
            <ul class="credit__highlight__list">
              <li><i class="fas fa-percent"></i> Первоначальный взнос — от 0%</li>
              <li><i class="fas fa-calendar-alt"></i> Срок кредита — до 8 лет</li>
            </ul>
            <p class="credit__text">
              В тело кредита можно включить все сопутствующие расходы:
            </p>
            <ul class="credit__list">
              <li><i class="fas fa-car"></i>Стоимость автомобиля за границей</li>
              <li><i class="fas fa-truck"></i>Оплата доставки до границы РФ</li>
              <li><i class="fas fa-handshake"></i>Брокерские услуги по подбору и оформлению</li>
            </ul>
            <p class="credit__note">
              Наши партнёры — ведущие банки России. Подберём для вас индивидуальные условия и поможем с оформлением.
            </p>
            <p class="credit__button">
              <button type="button" @click="showContacts" class="credit__button--callback request-btn">Получить расчет цены</button>
            </p>
          </div>
        </div>
        <div class="credit__image-wrapper">
          <img src="/images/credit.jpg" alt="Покупка автомобиля в кредит в Автогольдер" class="credit__image">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

  .credit {
    background-color: #474747;
    color: #fff;
    padding: 80px 20px;
    margin-top: 80px;
  }

  .credit__container {
    max-width: 1140px;
    margin: 0 auto;
  }

  .credit__wrapper {
    display: flex;
    align-items: center;
    gap: 5%;
  }

  .credit__content {
    flex: 1 1 60%;
  }

  .credit__title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  .credit__highlight__list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
  }

  .credit__highlight__list li {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .credit__highlight__list i {
    color: #FC4B2A;
    min-width: 20px;
    margin-top: 3px;
  }

  .credit__text {
    font-size: 1.0rem;
    color: #fff;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .credit__list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
  }

  .credit__list li {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .credit__list i {
    color: #FC4B2A;
    min-width: 20px;
    margin-top: 3px;
  }

  .credit__note {
    font-size: 0.95rem;
    color: #fff;
    font-style: italic;
    margin-top: 1.5rem;
    line-height: 1.6;
  }

  .credit__image-wrapper {
    flex: 1 1 40%;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .credit__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .credit__red-accent {
    color: #FC4B2A;
  }

  .credit__button {
    margin: 2rem 0 0 0;
  }

  .credit__button--callback,
  .credit__button--callback:link,
  .credit__button--callback:visited {
    /* твои стили */
    display: inline-block;
    min-width: 260px;
    margin: 0;
    background-color: #FC4B2A;
    color: white;
    padding: 1rem 2rem;
    border: none; /* ← важно! */
    border-radius: 6px;
    text-align: center;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .credit__button--callback:hover {
    background-color: #e04225;
  }

  @media (max-width: 767px) {
    .credit {
      margin-top: 60px;
      padding: 15px 15px;
    }

    .credit__wrapper {
      flex-direction: column;
    }

    .credit__content {
      width: 100%;
      margin-bottom: 2rem;
    }

    .credit__image-wrapper {
      width: 100%;
    }

    .credit__title {
      font-size: 1.4rem;
      text-align: center;
    }

    .credit__text {
      margin-top: 3rem;
      text-align: center;
    }

    .credit__note {
      margin-top: 3rem;
      text-align: center;
    }

    .credit__highlight__list {
      font-size: 0.90rem;
    }

    .credit__list li {
      font-size: 0.90rem;
    }

    .credit__button {
      margin: 1rem 0 0 0;
      text-align: center;
    }
  }
</style>