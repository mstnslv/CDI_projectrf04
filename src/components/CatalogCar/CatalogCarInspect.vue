<template>

  <div class="catalogcarinspect">

    <h2>
      Страховая история
    </h2>

    <div class="catalogcarinspect_list">

      <div class="dropzone">

        <div class="tablewrap">
          <table class="table table--repairstory table--repairstorysummary">
            <thead class="none">
              <tr>

              <th colspan="4">
                Статус
              </th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  История страховых случаев
                </th>
                <td class="tablecol-status tablecol-status--notgood active">
                  <span>
                      Есть
                    </span>
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>
                      Нет
                    </span>
                </td>
                <td class="tablecol-status tablecol-status--no">
                  <span>
                    не указано
                  </span>
                </td>
              </tr>
              <tr >
                <th>
                  Ремонт не по страховке
                </th>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>
                    Есть
                  </span>
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Нет</span>
                </td>
                <td class="tablecol-status tablecol-status--no active">
                  <span>не указано</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>
          Записи о страховых случаях
        </h3>
        <!--Общая история-->
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstoryall">
            <thead class="none">
              <tr>
                <th colspan="2">
                  Общая история
                </th>
              </tr>
            </thead>
            <tbody>

              <!--Смена номера-->
              <tr>
                <th>
                  Смена номера
                </th>
                <td class="tablecol-status tablecol-status--yes active">
                  <span>
                    Есть
                  </span>

                </td>
              </tr>

              <!--Смена владельца-->
              <tr >
                <th>
                  Смена владельца
                </th>
                <td class=" ">
                  <span>
                    Нет
                  </span>

                </td>
              </tr>

              <!--Потеря-->
              <tr >
                <th>
                  Потеря
                </th>
                <td class=" ">
                  Нет
                </td>
              </tr>

              <!--Затопление-->
              <tr >
                <th>
                  Затопление
                </th>
                <td>
                  <span>
                    Нет
                  </span>
                </td>
              </tr>

              <!--Кража-->
              <tr >
                <th>
                  Кража
                </th>
                <td>
                  <span>
                    Нет
                  </span>
                </td>
              </tr>

              <!--ДТП без участников дорожного движения-->
              <tr >
                <th>
                  ДТП без участников дорожного движения
                </th>
                <td>
                  <span>
                    Нет
                  </span>
                </td>
              </tr>

              <!--ДТП с другими участниками дорожного движения-->
              <tr >
                <th>
                  ДТП с другими участниками дорожного движения
                </th>
                <td>
                  <span>
                    Нет
                  </span>
                </td>
              </tr>

              <!--Принадлежала компании-->
              <tr >
                <th>
                  Принадлежала компании
                </th>
                <td>
                  <span>
                    Нет
                  </span>
                </td>
              </tr>

              <!--Использовался в такси-->
              <tr >
                <th>
                  Использовался в такси
                </th>
                <td>
                  <span>
                    Нет
                  </span>
                </td>
              </tr>

              <!--Принадлежала правительству-->
              <tr >
                <th>
                  Принадлежала правительству
                </th>
                <td class="tablecol-status tablecol-status--yes active">
                  <span>
                    Да, президенту
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <!--История смены номера автомобиля / владельца-->
        <h3>
          Смена автомобильного номера
        </h3>
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstoryowners">
          <thead class="none">
            <tr>
              <th colspan="4">
                История смены номера автомобиля / владельца
              </th>
            </tr>
          </thead>

          <!--если нет данных, то показать эту-->
          <tbody>
            <tr>
              <td colspan="4" class="tablecol tablecol--placeholdergood">
                <span>
                  ДТП и выплат не было
                </span>
              </td>
            </tr>
          </tbody>

          <!--если есть данные, то показать эту-->
          <tbody>
            <tr>
              <th>
                12.12.2018
              </th>
              <td class="tablecol ">
                Первая регистрация номера
              </td>
              <td class="tablecol ">
                68-TXXXX
              </td>
              <td class="tablecol ">
                Личный автомобиль
              </td>

            </tr>
          </tbody>
        </table>
        </div>


        <!--Страховая выплата по вине другого участника дорожного движения-->
        <h3>
            Страховая выплата по вине другого участника дорожного движения
          </h3>
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstorypayments">
            <!--если нет данных, то показать эту-->
            <thead class="none">
              <tr>
                <th colspan="2">
                  Страховая выплата по вине другого участника дорожного движения
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2" class="tablecol tablecol--placeholdergood">
                  <span>
                    ДТП и выплат не было
                  </span>
                </td>
              </tr>
            </tbody>

            <!--если есть данные, то показать эту-->
            <thead class="none">
              <tr>
              <th colspan="2">
                Страховая выплата по вине другого участника дорожного движения
              </th>
            </tr>
              <tr>
                <th>
                  Дата аварии
                </th>
                <th>
                  Стоимость ремонта
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  20.01.2023
                </th>
                <td class="tablecol-info">
                  332.369 KRW (249 USD)
                </td>
              </tr>
              <tr>
                <th>
                  20.01.2023
                </th>
                <td class="tablecol-info">
                  332.369 KRW (249 USD)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--Страховая выплата собственнику без участия других авто (въехал в люк, столб и т.д.)-->
        <h3>
          Страховая выплата собственнику без участия других авто
        </h3>
        <div class="tablewrap">

          <table class="table table--repairstory table--repairstorypayments">
            <!--если нет данных, то показать эту-->
            <thead class="none">
            <tr>
              <th colspan="2">
                Страховая выплата собственнику без участия других авто (въехал в люк, столб и т.д.)
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="2" class="tablecol tablecol--placeholdergood">
                <span>
                  ДТП и выплат не было
                </span>
              </td>
            </tr>
            </tbody>

            <!--если есть данные, то показать эту-->
            <thead class="none">
            <tr>
              <th colspan="2">
                Страховая выплата собственнику без участия других авто (въехал в люк, столб и т.д.)
              </th>
            </tr>
            <tr>
              <th>
                Дата аварии
              </th>
              <th>
                Стоимость ремонта
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                20.01.2023
              </th>
              <td class="tablecol-info">
                332.369 KRW (249 USD)
              </td>
            </tr>
            <tr>
              <th>
                20.01.2023
              </th>
              <td class="tablecol-info">
                332.369 KRW (249 USD)
              </td>
            </tr>
            </tbody>
          </table>

        </div>

        <!--Страховая выплата другим участникам ДТП по вине собственника-->
        <h3>
          Страховая выплата другим участникам ДТП по вине собственника
        </h3>
        <div class="tablewrap">
          <table class="table table--repairstory table--repairstorypayments">
            <!--если нет данных, то показать эту-->
            <thead class="none">
            <tr>
              <th colspan="2">
                Страховая выплата другим участникам ДТП по вине собственника
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="2" class="tablecol tablecol--placeholdergood">
                <span>
                  ДТП и выплат не было
                </span>
              </td>
            </tr>
            </tbody>

            <!--если есть данные, то показать эту-->
            <thead class="none">
            <tr>
              <th colspan="2">
                Страховая выплата другим участникам ДТП по вине собственника
              </th>
            </tr>
            <tr>
              <th>
                Дата аварии
              </th>
              <th>
                Стоимость ремонта
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                20.01.2023
              </th>
              <td class="tablecol-info">
                332.369 KRW (249 USD)
              </td>
            </tr>
            <tr>
              <th>
                20.01.2023
              </th>
              <td class="tablecol-info">
                332.369 KRW (249 USD)
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>




      <div class="dropzone">
        <div class="dropname">
          <h2>
            Инспекция авто
          </h2>
        </div>
        <div class="tablewrap">
          <table class="table table--summary">
            <thead class="none">
            <tr>
              <th>

              </th>
              <th colspan="3">
                Состояние
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>
                Одометр
              </th>
              <td class="tablecol-status tablecol-status--good">
                  <span>
                    Хорошее
                  </span>
              </td>
              <td class="tablecol-status tablecol-status--notgood">
                <span>Дефект</span>
              </td>
              <td class="tablecol-status tablecol-status--bad active">
                <span>Проблема</span>
              </td>
            </tr>
            <tr >
              <th>
                Пробег
              </th>
              <td class="tablecol-odometr" colspan="3">
                5 000 км
              </td>

            </tr>
            <tr >
              <th>
                VIN код
              </th>
              <td class="tablecol-status tablecol-status--good">
                  <span>
                    Хорошо читаем
                  </span>
              </td>
              <td class="tablecol-status tablecol-status--notgood">
                  <span>
                    Повреждения (загрязнения)
                  </span>
              </td>
              <td class="tablecol-status tablecol-status--bad active">
                  <span>
                    Плохо читаем
                  </span>

              </td>
            </tr>
            <tr>
              <th>
                Тюнинг
              </th>
              <td class="tablecol-status tablecol-status--good">
                  <span>
                    Нет
                  </span>
              </td>
              <td class="tablecol-status tablecol-status--notgood">
                  <span>
                    Есть
                  </span>

              </td>
              <td class="tablecol-status tablecol-status--bad active">
                  <span>
                    Нет данных
                  </span>
              </td>
            </tr>
            <tr>
              <th>
                Особая история
              </th>
              <td class="tablecol-status tablecol-status--good">
                  <span>
                    Нет
                  </span>
              </td>
              <td class="tablecol-status tablecol-status--notgood">
                  <span>
                    Есть
                  </span>
              </td>
              <td class="tablecol-status tablecol-status--bad active">
                <span>Нет данных</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="droplist">
          <h3>
            Схема и список повреждений
          </h3>

          <CatalogCarDamage/>
        </div>

      </div>


      <!--old tech report-->
      <div class="dropzone">
        <div class="dropname">
          <h2>
            Технический отчет
          </h2>
        </div>
        <div class="tablewrap tablewrap--techreport">
          <table class="table table--techreport">
            <thead>
              <tr>
                <th>

                </th>
                <th colspan="2">
                  Узел авто
                </th>
                <th colspan="3">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>

              <!--Диагностика-->
              <tr>
                <th rowspan="2">
                  Диагностика
                </th>
                <td colspan="2">
                  Двигатель
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                  </td>
                <td class="tablecol-status tablecol-status--notgood">
                    <span>Дефект</span>
                  </td>
                  <td class="tablecol-status tablecol-status--bad active">
                    <span>Проблема</span>
                  </td>
                </tr>
              <tr >

                <td colspan="2">
                  Коробка передач
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>

              <!--Двигатель-->
              <tr>
                <th rowspan="10">
                  Двигатель
                </th>
                <td colspan="2">
                  Холостой ход
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood active">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td rowspan="3">
                  Утечка масла
                </td>
                <td>
                    Клапанная крышка
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Утечка</span>
                </td>
              </tr>
              <tr >

                <td>
                    Прокладка головки блока цилиндров
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Утечка</span>
                </td>
              </tr>
              <tr >

                <td>
                  Блок цилиндров/масляный поддон
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood active">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Утечка</span>
                </td>
              </tr>

              <tr>
                <td colspan="2">
                  Давление масла
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>
                    Норма
                  </span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>
                    Недостаток
                  </span>
                </td>
                <td class="tablecol-status tablecol-status--bad active">
                  <span>
                    Проблема
                  </span>
                </td>
              </tr>

              <tr >

                <td rowspan="4">
                  Утечка охлаждающей жидкости
                </td>
                <td>
                  Прокладка головки блока цилиндров
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >
                <td>
                  Помпа
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td>
                  Радиатор
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td>
                  Количество охлаждающей жидкости
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood active">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>

              <tr>
                <td colspan="2">
                  Топливная система
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood active">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>

              <!--Коробка передач-->
              <tr>
                <th rowspan="2">
                  Коробка передач
                </th>
                <td rowspan="2">

                  Автоматическая Коробка передач (А/Т)
                </td>
                <td>

                  Утечка масла
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">

                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>

              </tr>
              <tr >

                <td>
                  <span>

                  </span>
                  Общее состояние
                </td>

                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>



              <!--Передача энергии-->
              <tr>
                <th rowspan="2">
                  Передача энергии
                </th>
                <td colspan="2">
                  Шарнир равных угловых скоростей
                  <span>

                  </span>
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad active">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td colspan="2">
                  Коробка передач
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad active">
                  <span>Проблема</span>
                </td>
              </tr>


              <!--Рулевое управление-->
              <tr>
                <th rowspan="3">
                  Рулевое управление
                </th>
                <td colspan="2">
                  Течь жидкости гидроусилителя руля
                  <span>

                  </span>
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad active">
                  <span>Проблема</span>
                </td>

              </tr>
              <tr >

                <td rowspan="2">
                  Состояние
                </td>
                <td>
                  Рулевой механизм
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood active">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td>
                  Наконечники рулевой тяги и шаровые шарниры
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>


              <!--Тормозная система-->
              <tr>
                <th rowspan="2">
                  Тормозная система
                </th>
                <td colspan="2">
                  Утечка тормозной жидкости
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td colspan="2">
                  Тормозная система
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood active">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>


              <!--Электрика-->
              <tr>
                <th rowspan="6">
                  Электрика
                </th>
                <td colspan="2">
                  Генератор
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td colspan="2">
                  Стартер
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td colspan="2">
                  Работа мотора стеклоочистителя
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td colspan="2">
                  Вентилятор печки салона
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td colspan="2">
                  Вентилятор радиатора
                </td>
                <td class="tablecol-status tablecol-status--good">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad active">
                  <span>Проблема</span>
                </td>
              </tr>
              <tr >

                <td colspan="2">
                  Стеклоподъёмник
                </td>
                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>


              <!--Топливо-->
              <tr>
                <th rowspan="2">
                  Топливо
                </th>
                <td colspan="2">
                  Утечка топлива
                </td>

                <td class="tablecol-status tablecol-status--good active">
                  <span>Хорошо</span>
                </td>
                <td class="tablecol-status tablecol-status--notgood">
                  <span>Дефект</span>
                </td>
                <td class="tablecol-status tablecol-status--bad">
                  <span>Проблема</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import IconEngine from "../icons/IconEngine.vue";
import IconOdometr from "../icons/IconOdometr.vue";
import IconGearBox from "../icons/IconGearBox.vue";
import IconSearch from "../icons/IconSearch.vue";
import IconTick from "../icons/IconTick.vue";
import IconDrop from "../icons/IconDrop.vue";
import CatalogCarDamage from "./CatalogCarDamage.vue";
export default {
  name: "CatalogCarInspect",
  components: { CatalogCarDamage, IconDrop, IconTick, IconSearch, IconGearBox, IconOdometr, IconEngine},
  data() {
    return {
      isOpened: {
        carInspectList1: false,
        carInspectList2: false,
        carInspectList3: false,
        carInspectList4: false
      }
    }
  }
}
</script>
