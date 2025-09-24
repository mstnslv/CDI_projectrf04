<script setup>

</script>

<template>
  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="/" class="footer__logo-link">
            <img src="/images/logo.png" alt="Логотип Автогольдер" class="footer__logo">
          </a>
          <p class="footer__description">
            Ваш надежный партнер в выборе автомобиля с доставкой из Кореи.
          </p>
        </div>
        <div class="footer__links">
          <h3 class="footer__links-title">Навигация</h3>
          <ul class="footer__links-list">
            <li><a href="#">Главная</a></li>
            <li><a href="#catalog">Каталог авто</a></li>
            <li><a href="#credit">Кредит</a></li>
            <li><a href="#team">Наша команда</a></li>
          </ul>
        </div>
        <div class="footer__contacts">
          <h3 class="footer__contacts-title">Контакты</h3>
          <div class="footer__phone">
            <i class="fas fa-phone"></i>
            <a href="tel:+78125658008">+7 812 565-80-08</a>
          </div>
          <div class="footer__schedule">
            <i class="far fa-calendar-alt"></i>
            Пн - Сб: 10:00 – 21:00 | Вс: 11:00 – 20:00
          </div>
          <address class="footer__address">
            <i class="fas fa-map-marker-alt"></i>
            Санкт-Петербург, ул. Оптиков, 4, корп. 2
          </address>
          <div class="footer__social-icons">
            <a href="https://t.me/autogolder_sale" target="_blank" class="footer__social-icon" aria-label="Telegram">
              <i class="fab fa-telegram"></i>
            </a>
            <a href="https://wa.me/message/C7G2XD6QBLIFK1" target="_blank" class="footer__social-icon" aria-label="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="https://2gis.ru/spb/firm/70000001069603108" target="_blank" class="footer__social-icon" aria-label="2ГИС">
              <i class="fas fa-map-marked-alt"></i>
            </a>
            <a href="https://yandex.ru/maps/org/avtogolder/176711063098" target="_blank" class="footer__social-icon" aria-label="Яндекс Карты">
              <i class="fab fa-yandex"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; 2025 ООО «Автогольдер». Все права защищены.
        </p>
        <div class="footer__legal">
          <a href="privacy.html">Политика конфиденциальности</a>
        </div>

      </div>
      <article class="footerafter">
        <div class="graytext">
          <a href="https://cardataimport.com" target="_blank">
          <span class="footerafter_text">
            Cardataimport
          </span>
          </a>
        </div>
      </article>
    </div>
    <!--Разработка сайта - Степанов Виктор Игоревич-->

  </footer>
</template>

<style scoped>
.footer {
  background-color: #1b1b1b;
  color: #fff;
  padding: 60px 0 30px;
}

.footer__container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 15px 15px;
}

.footer__top {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer__brand,
.footer__links,
.footer__contacts,
.footer__social {
  display: flex;
  flex-direction: column;
}

.footer__logo-link {
  display: inline-block;
  margin-top:5px;
  margin-bottom: 10px;
}

.footer__logo {
  max-width: 200px;
  height: auto;
}

.footer__description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #ccc;
}

.footer__links-title,
.footer__contacts-title,
.footer__social-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #FC4B2A;
}

.footer__links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__links-list li {
  margin-bottom: 10px;
}

.footer__links-list a {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.footer__links-list a:hover {
  color: #FC4B2A;
}

.footer__address,
.footer__phone,
.footer__schedule {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 0.90rem;
  color: #ccc;
}

.footer__address i,
.footer__phone i,
.footer__schedule i {
  color: #FC4B2A;
  min-width: 16px;
  margin-top: 3px;
}

.footer__phone a {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;
}

.footer__phone a:hover {
  color: #FC4B2A;
}

.footer__social-icons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.footer__social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 18px;
}

.footer__social-icon:hover {
  background-color: #FC4B2A;
  transform: translateY(-3px);
}

.footer__bottom {
  border-top: 1px solid #333;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.footer__copyright {
  font-size: 0.9rem;
  color: #aaa;
  text-align: center;
}

.footer__legal {
  display: flex;
  gap: 20px;
}

.footer__legal a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer__legal a:hover {
  color: #FC4B2A;
}

@media (max-width: 767px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer__top {
    gap: 30px;
  }

  .footer__logo {
    max-width: 160px;
  }

  .footer__description {
    font-size: 0.9rem;
  }

  .footer__links-title,
  .footer__contacts-title,
  .footer__social-title {
    font-size: 1rem;
  }

  .footer__address,
  .footer__phone,
  .footer__schedule {
    font-size: 0.9rem;
  }

  .footer__social-icons {
    gap: 10px;
  }

  .footer__social-icon {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .footer__bottom {
    gap: 10px;
  }

  .footer__legal {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
}
</style>