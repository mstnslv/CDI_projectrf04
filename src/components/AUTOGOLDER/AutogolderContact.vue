<template>
  <section class="contact">
    <div class="contact__container">
      <div class="contact__wrapper">
        <div class="contact__content">
          <h2 class="contact__title">Остались вопросы?</h2>
          <p class="contact__subtitle">Звоните:</p>
          <p class="contact__phone-centered">
            <i class="fas fa-phone"></i>
            <a href="tel:+78125658008">+7 812 565-80-08</a>
          </p>
          <p class="contact__subtitle">
            или заполните форму — мы свяжемся с вами в течение 5 минут.
          </p>
          <form class="contact__form" @submit.prevent="submitForm">
            <div class="contact__form-group">
              <label for="desiredCar" class="contact__label">Желаемый автомобиль</label>
              <input
                  v-model="desiredCar"
                  type="text"
                  id="desiredCar"
                  class="contact__input"
                  placeholder="Например: Kia Sorento 2.0 AT 2023"
                  required
              />
            </div>
            <div class="contact__form-group">
              <label for="userPhone" class="contact__label">Ваш телефон</label>
              <input
                  v-model="userPhone"
                  type="tel"
                  id="userPhone"
                  class="contact__input"
                  placeholder="+7 (___) ___-__-__"
                  required
              />
            </div>
            <button type="submit" class="contact__submit">Получить расчет</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const desiredCar = ref('')
const userPhone = ref('')

const submitForm = () => {
  if (!desiredCar.value || !userPhone.value) {
    alert('Пожалуйста, заполните все поля.')
    return
  }
  console.log('Отправка данных:', { car: desiredCar.value, phone: userPhone.value })
  alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
  desiredCar.value = ''
  userPhone.value = ''
}
</script>

<style scoped>
.contact {
  background-color: #474747;
  color: #fff;
  padding: 80px 20px;
  margin-top: 80px;
}
.contact__container {
  max-width: 1140px;
  margin: 0 auto;
}
.contact__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.contact__content {
  flex: 0 1 100%;
  max-width: 500px;
}
.contact__title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}
.contact__subtitle {
  font-size: 1.1rem;
  margin: 1.5rem 0 1rem 0;
  text-align: center;
}
.contact__phone-centered {
  text-align: center;
  font-size: 1.6rem;
  margin: 0.5rem 0 1.5rem 0;
}
.contact__phone-centered i {
  color: #FC4B2A;
  margin-right: 8px;
}
.contact__phone-centered a {
  color: #FC4B2A;
  text-decoration: none;
  font-weight: 600;
}
.contact__form {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  margin-top: 1.5rem;
}
.contact__label {
  display: block;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 8px;
}
.contact__input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 20px;
}
.contact__input:focus {
  border-color: #FC4B2A;
  outline: none;
}
.contact__submit {
  width: 100%;
  padding: 14px;
  background-color: #FC4B2A;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}
.contact__submit:hover {
  background-color: #e04225;
}
@media (max-width: 767px) {
  .contact {
    margin-top: 60px;
    padding: 40px 15px;
  }
  .contact__wrapper {
    flex-direction: column;
  }
  .contact__form {
    padding: 20px;
  }
}
</style>
