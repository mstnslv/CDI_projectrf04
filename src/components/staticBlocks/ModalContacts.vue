<script setup>
  import IconClose from "../icons/IconClose.vue";
  import IconTelephone from "../icons/IconTelephone.vue";
  import IconClose2 from "../icons/IconClose2.vue";
  import {default as eventBus} from "../../eventBus.js";
  import axios from "../../api/axios.js";
  import {contactMe} from "../../api/main.js";
  import {ref} from "vue";
  import IconTelegram from "@/components/icons/IconTelegram.vue";

  let phone = ref('');
  let name = ref('');
  let success = ref(false);
  const props = defineProps({type: {default: ''}});

  const hideContacts = () => {
    eventBus.$emit("hideContacts");
    success.value = false;
  }
  const sendContactForm = () => {
    contactMe({
      phone: phone.value,
      name: name.value,
      link: window.location.href,
      type: props.type
    });
    phone.value = '';
    name.value = '';
    success.value = true;
  }
  const goToFooter = () => {
    hideContacts();
    document.querySelector('.footer').scrollIntoView({behavior: 'smooth'});
  };


</script>

<template>

  <div class="cdi-modal cdi-modalrequest">

    <div class="cdi-modal_overlay" @click="hideContacts"></div>

    <div class="cdi-modal_window">

      <div class="cdi-modal_close" @click="hideContacts">
        <IconClose2/>
      </div>

      <!--Тоглим - форма/спасибо-->

      <form class="cdi-modal_form" v-show="!success">

        <div class="cdi-modal_form__top">
          <h2 class="cdi-modal_h2">
            Подобрать авто
          </h2>

          <p class="cdi-modal_subheadtext">
            Оставьте заявку по этому автомобилю
<!--            , мы свяжемся с вами в ближайшее время.-->
          </p>
        </div>

        <div class="cdi-modal_form__mid">
          <div class="cdi-modal_inptwrap">
            <div class="ninput cdi-moda_inpt1">
              <label class="ninput_label">Ваше имя:</label>
              <div class="ninput_line">
                <input type="text" placeholder="Введите имя" class="input" v-model="name">
              </div>
            </div>

            <div class="ninput cdi-moda_inpt2">
              <label class="ninput_label">Ваш телефон:</label>
              <div class="ninput_line">
                <input
                    type="tel"
                    class="input"
                    v-model="phone"
                    @input="formatPhone"
                    placeholder="+7 (___) ___-__-__"
                    minlength="18"
                    maxlength="18"
                    required
                />
              </div>
            </div>
          </div>

          <div class="cdi-modal_btnwrap">
            <a type="submit" class="cdi-modal_btn1" @click.prevent="sendContactForm">
              Отправить заявку
            </a>
          </div>
        </div>

        <div class="cdi-modal_form__bottom">
          <div class="cdi-modal_graytext">
            Нажимая кнопку "Отправить заявку", вы даете свое согласие на обработку персональных данных<!-- в соответствии с <a href="/agreement" target="_blank">пользовательским соглашением</a>-->
          </div>
        </div>

      </form>
      <div class="cdi-modal_form" v-show="success">
        <div class="cdi-modal_form__top">
          <h2 class="cdi-modal_h2">
            Спасибо!<br>Ваша заявка принята
          </h2>
          <p class="cdi-modal_subheadtext">
            В ближайшее время, наш менеджер<br> с Вами свяжется
          </p>
        </div>

        <div class="cdi-modal_form__mid">

          <div class="cdi-modal_btnwrap">
            <button class="cdi-modal_btn3" @click="hideContacts">
              Закрыть и вернуться
            </button>

            <a href="https://t.me/zakazizeu" target="_blank" class="cdi_btn  cdi-modal_btn4 cdi_btn--telegram">
                Открыть телеграм
            </a>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>
