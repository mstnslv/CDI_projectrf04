<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const success = ref(false);

const carModel = ref("");
const phone = ref("");

// Маска телефона (+7 (___) ___-__-__)
const formatPhone = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (!value.startsWith("7")) {
    value = "7" + value;
  }
  value = "+" + value;
  if (value.length > 2) value = value.slice(0, 2) + " (" + value.slice(2);
  if (value.length > 7) value = value.slice(0, 7) + ") " + value.slice(7);
  if (value.length > 12) value = value.slice(0, 12) + "-" + value.slice(12);
  if (value.length > 15) value = value.slice(0, 15) + "-" + value.slice(15, 17);
  phone.value = value.slice(0, 18);
};

// Управление скроллом (без «прыжка»)
let scrollbarWidth = 0;
const disableScroll = () => {
  const body = document.body;
  scrollbarWidth = window.innerWidth - body.clientWidth;
  body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
};
const enableScroll = () => {
  const body = document.body;
  body.style.overflow = "";
  body.style.paddingRight = "";
};

const openModal = () => {
  isOpen.value = true;
  disableScroll();
};
const closeModal = () => {
  isOpen.value = false;
  success.value = false;
  enableScroll();
};

const submitForm = () => {
  if (!carModel.value || !phone.value || phone.value.length < 18) return;

  // отправка данных
  console.log("Отправка:", {
    carModel: carModel.value,
    phone: phone.value,
  });

  success.value = true;
  carModel.value = "";
  phone.value = "";
};
</script>

<template>
  <div>
    <!-- Кнопка открытия -->
    <button class="request-btn" @click="openModal">Открыть форму</button>

    <!-- Модалка -->
    <div class="modal" :class="{ active: isOpen }">
      <div class="modal__overlay" @click="closeModal"></div>
      <div class="modal__content">
        <button class="modal__close" @click="closeModal" aria-label="Закрыть форму">
          ✕
        </button>

        <!-- Форма -->
        <form v-if="!success" class="modal__form" @submit.prevent="submitForm">
          <h3 class="modal__title">Получить расчет стоимости автомобиля</h3>

          <div class="modal__form-group">
            <label class="modal__label">Желаемый автомобиль</label>
            <input
                type="text"
                class="modal__input"
                placeholder="Например: Kia Sorento 2.0 AT 2023"
                v-model="carModel"
                required
            />
          </div>

          <div class="modal__form-group">
            <label class="modal__label">Ваш телефон</label>
            <input
                type="tel"
                class="modal__input"
                placeholder="+7 (___) ___-__-__"
                v-model="phone"
                @input="formatPhone"
                minlength="18"
                maxlength="18"
                required
            />
          </div>

          <button type="submit" class="modal__submit">Получить расчет</button>
          <p class="modal__note">
            Нажимая кнопку, вы соглашаетесь с
            <a href="privacy.html">политикой конфиденциальности</a>.
          </p>
        </form>

        <!-- Сообщение об успехе -->
        <div v-else class="modal__form">
          <h3 class="modal__title">Спасибо! Ваша заявка принята</h3>
          <p class="modal__note">Наш менеджер свяжется с вами в ближайшее время.</p>
          <button class="modal__submit" @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* MODAL STYLES */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  padding: 20px;
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

.modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.modal__content {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 100%;
  max-width: 500px;
  transform: translateY(20px);
  transition: transform 0.3s ease;
  z-index: 1;
}

.modal.active .modal__content {
  transform: translateY(0);
}

.modal__close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s;
}

.modal__close:hover {
  color: #FC4B2A;
  background: #f5f5f5;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1b1b1b;
  margin-bottom: 25px;
  text-align: center;
}

.modal__form-group {
  margin-bottom: 20px;
}

.modal__label {
  display: block;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

.modal__input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.modal__input:focus {
  outline: none;
  border-color: #FC4B2A;
}

.modal__input::placeholder {
  color: #aaa;
}

.modal__submit {
  width: 100%;
  padding: 14px;
  background-color: #FC4B2A;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.modal__submit:hover {
  background-color: #e04225;
}

.modal__note {
  font-size: 0.85rem;
  color: #777;
  text-align: center;
  margin-top: 20px;
}

.modal__note a {
  color: #FC4B2A;
  text-decoration: none;
}

.modal__note a:hover {
  text-decoration: underline;
}
</style>
