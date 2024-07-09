document.addEventListener("DOMContentLoaded", function () {
  
  async function fetchJsonData() {
    try {
      const response = await fetch("/report.json"); // Замените 'report.json' на путь к вашему JSON файлу
      const data = await response.json();
      updateHTML(data);
    } catch (error) {
      console.error("Ошибка при загрузке или парсинге JSON:", error);
    }
  }

  // Функция для проверки наличия данных и вставки их в HTML
  function updateHTML(data) {
    function createElement(tag, classNames, innerHTML = "") {
      const element = document.createElement(tag);
      if (classNames) {
          const classes = classNames.split(" ");
          element.classList.add(...classes);
      }
      if (innerHTML) element.innerHTML = innerHTML;
      return element;
  }

    function getDifferenceInYearsAndMonths(startDate, finishDate) {
      const start = new Date(startDate);
      const finish = finishDate && finishDate !== 0 && finishDate !== 'null' && finishDate !== '' 
                     ? new Date(finishDate) 
                     : new Date();
                     
      let years = finish.getFullYear() - start.getFullYear();
      let months = finish.getMonth() - start.getMonth();
    
      if (months < 0) {
        years--;
        months += 12;
      }
    
      let result = '';
      if (years > 0) {
        result += `${years} год${years > 1 ? 'a' : ''} `;
      }
      if (months > 0) {
        result += `${months} месяц${months > 1 ? 'a' : ''}`;
      }
    
      return result.trim();
    }

    function isEmpty(value) {
      if (typeof value === 'string') {
        if (value.trim() !== '') {
          return value;
        } else {
          return "";
        }
      } else if (value !== null && value !== undefined) {
        return value;
      } else {
        return "";
      }
    }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('ru-RU', options);

    const options2 = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formatter2 = new Intl.DateTimeFormat('ru-RU', options2);

// Первый экран

if (data.ReportTime) {
  const dataWrapper = document.querySelector(".header__content-info-date");

  dataWrapper.style.display = "block";

  dataWrapper.innerHTML =  `Отчет от ${formatter2.format(new Date(data.ReportTime))} года`

}

if (data.Vin) {
  const dataWrapper = document.querySelector(".header__content-info-vin");

  dataWrapper.style.display = "block";

  dataWrapper.innerHTML =  `${data.Vin}`

}

if (data.Model) {
  const dataWrapper = document.querySelector(".header__content-info-car-name");

  dataWrapper.style.display = "block";

  dataWrapper.innerHTML =  `${data.Model}`

}

if (data.VrpList && data.VrpList.length > 0) {
  const dataWrapper = document.querySelector(".header__content-info-list");
  
  dataWrapper.style.display = "block";

  let itemContent = ``

  data.VrpList.forEach(item => {

    if(item.Value && item.Value > 0){
      itemContent = `
     (СТС: ${item.Value})
      `;
    }else{
      itemContent = `
      
      `;
    }
    
    dataWrapper.appendChild(
    createElement(
      "li",
      "header__content-info-item",
      `
      ${item.Key} ${itemContent}

      `
    )
  );

  });

  

}


    // Недостатки
    if (data.Resume && data.Resume.length) {
      const dataDisadvantages = document.querySelector(".disadvantages");
      dataDisadvantages.style.display = "block";
      const list = document.querySelector(".disadvantages__content-list");

      list.innerHTML = ""; // Очистка списка перед добавлением новых элементов

      data.Resume.forEach(resume => {
        const listItem = document.createElement("li");
        listItem.classList.add("disadvantages__content-item");
        listItem.innerHTML = `
                <img class="disadvantages__content-item-status" src="img/exclamation-red.svg" alt="status">
                ${resume.Caption}
            `;
        list.appendChild(listItem);
      });
    }

    // Основная информация

    if (data.VehicleInfo && data.VehicleInfo.length > 0) {
      const dataWrapper = document.querySelector(".main-information");
      const list = document.querySelector(".main-information__list");
      const fragment = document.createDocumentFragment();

      dataWrapper.style.display = "block";

      list.innerHTML = "";

      data.VehicleInfo.forEach(item => {
        console.log(item.Model);

        let itemContent = '';


        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Марка (модель):</span><span class="main-information__item-desk desk-span">${item.Model}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Цвет:</span><span class="main-information__item-desk desk-span">${item.BodyColor}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Мощность:</span><span class="main-information__item-desk desk-span">${item.EnginePower} л.с.</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Год выпуска:</span><span class="main-information__item-desk desk-span">${item.ReleaseYear}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Номер двигателя:</span><span class="main-information__item-desk desk-span">${item.EngineNumber}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Категория</span><span class="main-information__item-desk desk-span">${item.Category}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">VIN:</span><span class="main-information__item-desk desk-span">${item.FrameNumber}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Привод:</span><span class="main-information__item-desk desk-span">${item.WheelDriveType}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Разрешённая максимальная масса:</span><span class="main-information__item-desk desk-span">${item.MaxWeight} кг</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Номер кузова:</span><span class="main-information__item-desk desk-span">${item.FrameNumber}</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Рабочий объём:</span><span class="main-information__item-desk desk-span">${item.EngineVolume} см3</span></div>`
            )
          );
        }

        if (item.Model) {
          list.appendChild(
            createElement(
              "li",
              "main-information__item",
              `<div class="main-information__item-text"><span class="main-information__item-name name-span">Масса без нагрузки:</span><span class="main-information__item-desk desk-span">${item.UnloadedWeight} кг</span></div>`
            )
          );
        }
        
      });
    }

    // История регистрации в ГИБДД

    if (data.OwnershipPeriods && data.OwnershipPeriods.length > 0) {

      document.querySelector('.registration-history__upper-owners-count').innerHTML = data.OwnershipPeriods.length

      function countDays(date1, date2) {
        // Преобразование строк в объекты Date
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        
        if(!d2){
          d2 = new Date()
        }
        // Вычисление разницы во времени в миллисекундах
        const timeDifference = Math.abs(d2 - d1);
        
        // Преобразование разницы в днях
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        
        return dayDifference;
    }

      document.querySelector('.registration-history__upper-time-of-use-count ').innerHTML = countDays(data.OwnershipPeriods[0].StartDate, data.OwnershipPeriods.at(-1).FinishDate) + " дней"

      const dataWrapper = document.querySelector(".registration-history");
      const list = document.querySelector(".registration-history__list");

      dataWrapper.style.display = "block";

      list.innerHTML = "";

      data.OwnershipPeriods.forEach(item => {

        let line = '<div class="registration-history__item-line individual"><div class="registration-history__item-line-upper individual-upper"></div><div class="registration-history__item-line-down individual-down"></div></div>'
        let startDate = item.StartDate
        let finishDate = item.FinishDate

        if(item.PersonType === "Юридическое лицо"){
          line = '<div class="registration-history__item-line legal-entity"><div class="registration-history__item-line-upper legal-entity-upper"></div><div class="registration-history__item-line-down legal-entity-down"></div></div>'
        }

        if(!item.FinishDate){
          finishDate = new Date()
        }
        
        let itemContent = '';

        if (item.StartDate || item.FinishDate) {
          itemContent += `
          <div class="registration-history__item-info-content-text details-text">
          <span class="registration-history__item-info-content-text-name name-span">Период владения:</span>
          <span class="registration-history__item-info-content-text-desk desk-span">${formatter.format(new Date(startDate))} – ${formatter.format(new Date(finishDate))} (${getDifferenceInYearsAndMonths(startDate, finishDate)})</span>
        </div>  
          `;
        }

        if (item.LastOperation) {
          itemContent += `
          <div class="registration-history__item-info-content-text details-text">
          <span class="registration-history__item-info-content-text-name name-span">Последнее действие:</span>
          <span class="registration-history__item-info-content-text-desk desk-span">${item.LastOperation}</span>
        </div>  
          `;
        }

        if (item.Region) {
          itemContent += `
          <div class="registration-history__item-info-content-text details-text">
          <span class="registration-history__item-info-content-text-name name-span">Регион:</span>
          <span class="registration-history__item-info-content-text-desk desk-span">${item.Region}</span>
        </div>  
          `;
        }

        if (item.Vrp) {
          itemContent += `
          <div class="registration-history__item-info-content-text details-text">
          <span class="registration-history__item-info-content-text-name name-span">Госномер:</span>
          <span class="registration-history__item-info-content-text-desk desk-span">${item.Vrp}</span>
        </div>  
          `;
        }

        if (item.AccidentsCount) {
          itemContent += `
          <div class="registration-history__item-info-content-text details-text">
          <span class="registration-history__item-info-content-text-name name-span">Кроичество ДТП:</span>
          <span class="registration-history__item-info-content-text-desk desk-span">${item.AccidentsCount}</span>
        </div>  
          `;
        }

          list.appendChild(
            createElement(
              "li",
              "registration-history__item",
              `<span class="registration-history__item-date">${formatter.format(new Date(item.StartDate))}</span>
              ${line}

              <div class="registration-history__item-info">
              <h4 class="registration-history__item-info-title title-h4">${item.PersonType}</h4>
              <div class="registration-history__item-info-content">
        
              ${itemContent}
               
              </div>
            </div>

              `
            )
          );
        
      });
    }

    //Данные об участии в ДТП

     if (data.Accidents && data.Accidents.length > 0) {
      const dataWrapper = document.querySelector(".accident-history");
      const list = document.querySelector(".accident-history__list");

      dataWrapper.style.display = "block";

      list.innerHTML = "";

      data.Accidents.forEach(item => {

        let accidentsTitle = '' 

        if(item.AccidentRegion && item.AccidentTime){
          accidentsTitle += `${item.AccidentRegion}, ${formatter.format(new Date(item.AccidentTime))}`
        }else if(item.AccidentRegion){
          accidentsTitle += `${item.AccidentRegion}`
        }else if(item.AccidentTime){
          accidentsTitle += `${item.AccidentTime}`
        }

        let itemContent = '';

        if (item.AccidentNumber) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">Номер происшествия:
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.AccidentNumber}</span>
                </div>
          `;
        }

        if (item.VehicleYear) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">Год выпуска:
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.VehicleYear}</span>
                </div>
          `;
        }

        if (item.DamageState) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">Состояние ТС: 
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.DamageState}</span>
                </div>
          `;
        }

        if (item.VehicleSort) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">Номер ТС/Всего ТС в ДТП: 
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.VehicleSort}/${item.VehicleAmount}</span>
                </div>
          `;
        }

        if (item.AccidentType) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">Тип происшествия: 
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.AccidentType}</span>
                </div>
          `;
        }

        if (item.AccidentPlace) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">Место происшествия: 
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.AccidentPlace}</span>
                </div>
          `;
        }

        if (item.Model) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">Марка (модель): 
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.Brand} ${item.Model}</span>
                </div>
          `;
        }

        if (item.OwnerOkopf) {
          itemContent += `
          <div class="accident-history__item-info-item-text details-text">
                  <span class="accident-history__item-info-item-name name-span">ОПФ собственника: 
                  </span>
                  <span class="accident-history__item-info-item-desk desk-span">${item.OwnerOkopf}</span>
                </div>
          `;
        }

        let damageDestription = '' 

        if (Array.isArray(item.DamageDestription)) {
          damageDestription += `
          <div class="accident-history__middle-line"></div>
          <div class="accident-history__item-info-damage">
              <h4 class="accident-history__item-info-damage-title title-h4">
                Карта повреждений
              </h4>
      
              <div class="accident-history__item-info-damage-content">
                <div class="accident-history__item-info-damage-content-text">
                  <span class="accident-history__item-info-damage-label">Описание повреждений:
                  </span>
                  <ul class="accident-history__item-info-damage-list list-reset">
                    ${item.DamageDestription.map(description => `
                      <li class="accident-history__item-info-damage-item">
                        <span class="accident-history__item-info-damage-item-desk">${description}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
                <img src="/img/damage-img.png" alt="">
              </div>
            </div>
          `;
        } else if (item.DamageDestription) {
          damageDestription += `
          <div class="accident-history__middle-line"></div>
          <div class="accident-history__item-info-damage">
              <h4 class="accident-history__item-info-damage-title title-h4">
                Карта повреждений
              </h4>
      
              <div class="accident-history__item-info-damage-content">
                <div class="accident-history__item-info-damage-content-text">
                  <span class="accident-history__item-info-damage-label">Описание повреждений:
                  </span>
                  <ul class="accident-history__item-info-damage-list list-reset">
                    <li class="accident-history__item-info-damage-item">
                      <span class="accident-history__item-info-damage-item-desk">${item.DamageDestription.split(' ').join('<br>')}</span>
                    </li>
                  </ul>
                </div>
                <img src="/img/damage-img.png" alt="">
              </div>
            </div>
          `;
        }

          list.appendChild(
            createElement(
              "li",
              "accident-history__item background-gray",
              ` <h4 class="accident-history__item-title title-h4">№<span class="accident-history__item-title-number"></span>
              ${accidentsTitle}
            </h4>
            <div class="accident-history__item-content details-list">${itemContent}</div>
            ${damageDestription}`
            )
          );
        
      });
    }

     //Пробег автомобиля

     if (data.MileageHistory && data.MileageHistory.length > 0) {
      const dataWrapper = document.querySelector(".car-mileage");
      const list = document.querySelector(".car-mileage__table-list");

      dataWrapper.style.display = "block";

      list.innerHTML = "";

      data.MileageHistory.forEach(item => {

        let itemContent = '';

        
          itemContent += `
          <div class="car-mileage__table-content-info">
              <span class="car-mileage__table-content-info-date name-span">${formatter2.format(new Date(isEmpty(item.Date)))} </span>
              <span class="car-mileage__table-content-info-source name-span">${isEmpty(item.Source)}</span>
              <span class="car-mileage__table-content-info-count name-span">${isEmpty(item.Value)} км</span>
            </div>
          `;
      

          list.appendChild(
            createElement(
              "div",
              "car-mileage__table-content",
              ` 
                ${itemContent}
              `
            )
          );
        
      });
    }

    // Пройденные Техосмотры (ЕАИСТО)

    if (data.TechnicalInspections && data.TechnicalInspections.length > 0) {
      const dataWrapper = document.querySelector(".inspection-history");
      const list = document.querySelector(".inspection-history__list");

      dataWrapper.style.display = "block";

      list.innerHTML = "";

      data.TechnicalInspections.forEach(item => {

        let itemContent = '';

        if (item.DocNumber) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Номер диагностической карты:</span>
          <span class="inspection-history__item-content-item-name desk-span">${item.DocNumber}</span>
        </div>
          `;
        }

        if (item.Model) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Марка (модель):
          </span>
          <span class="inspection-history__item-content-item-name desk-span">${item.Model}</span>
        </div>
          `;
        }

        if (item.Mileage) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Пробег:</span>
          <span class="inspection-history__item-content-item-name desk-span">${item.Mileage}</span>
        </div>
          `;
        }

        if (item.Vin) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">VIN:</span>
          <span class="inspection-history__item-content-item-name desk-span">${item.Vin}</span>
        </div>
          `;
        }

        if (item.Vrp) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Госномер:</span>
          <span class="inspection-history__item-content-item-name desk-span">${item.Vrp}</span>
        </div>
          `;
        }

        if (item.ReleaseYear) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Год выпуска:</span>
          <span class="inspection-history__item-content-item-name desk-span">${item.ReleaseYear}</span>
        </div>
          `;
        }

        if (item.FrameNumber) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Номер кузова:</span>
          <span class="inspection-history__item-content-item-name desk-span">${item.FrameNumber}</span>
        </div>
          `;
        }

        if (item.StartDate) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Дата начала действия ТО:</span>
          <span class="inspection-history__item-content-item-name desk-span">${formatter2.format(new Date(item.StartDate))}</span>
        </div>
          `;
        }

        if (item.FinishDate) {
          itemContent += `
          <div class="inspection-history__item-content-item-text details-text">
          <span class="inspection-history__item-content-item-name name-span">Дата окончания действия ТО:</span>
          <span class="inspection-history__item-content-item-name desk-span">${formatter2.format(new Date(item.FinishDate))}</span>
        </div>
          `;
        }

          list.appendChild(
            createElement(
              "li",
              "inspection-history__item",
              ` <div class="inspection-history__item-wrapper background-gray">
              <h4 class="inspection-history__item-title title-h4">
                ДК №${item.DocNumber} (${formatter2.format(new Date(item.StartDate))} – ${formatter2.format(new Date(item.FinishDate))})
              </h4>
              <div class="inspection-history__item-content-list list-reset details-list">
               ${itemContent}
              </div>
            </div>`
            )
          );
        
      });
    }

    // Сервисное обслуживание

    if (data.StosData && data.StosData.length > 0) {
      const dataWrapper = document.querySelector(".service-maintenance");
      const list = document.querySelector(".service-maintenance__list");

      dataWrapper.style.display = "block";

      list.innerHTML = "";

      data.StosData.forEach(item => {

        let itemContent = '';

        if (item.Description) {
          itemContent += `
          <div class="service-maintenance__item-details-item-text details-text">
                   <span class="service-maintenance__item-details-item-name name-span">Описание:</span>
                  <span class="service-maintenance__item-details-item-name desk-span">${item.Description}</span>
                </div>
          `;
        }

        if (item.StoName) {
          itemContent += `
          <div class="service-maintenance__item-details-item-text details-text">
                   <span class="service-maintenance__item-details-item-name name-span">Адрес:</span>
                  <span class="service-maintenance__item-details-item-name desk-span">${item.StoName}</span>
                </div>
          `;
        }

        if (item.ServicesCount) {
          itemContent += `
          <div class="service-maintenance__item-details-item-text details-text">
                   <span class="service-maintenance__item-details-item-name name-span">Количество услуг заказ-наряда:</span>
                  <span class="service-maintenance__item-details-item-name desk-span">${item.ServicesCount}</span>
                </div>
          `;
        }

        if (item.GoodsCount) {
          itemContent += `
          <div class="service-maintenance__item-details-item-text details-text">
                   <span class="service-maintenance__item-details-item-name name-span">Количество товаров заказ-наряда:</span>
                  <span class="service-maintenance__item-details-item-name desk-span">${item.GoodsCount}</span>
                </div>
          `;
        }

        if (item.Mileage) {
          itemContent += `
          <div class="service-maintenance__item-details-item-text details-text">
                   <span class="service-maintenance__item-details-item-name name-span">Пробег:</span>
                  <span class="service-maintenance__item-details-item-name desk-span">${item.Mileage} км</span>
                </div>
          `;
        }

          list.appendChild(
            createElement(
              "li",
              "service-maintenance__item",
              `<div class="service-maintenance__item-wrapper wrapper-item background-gray">
              <h4 class="service-maintenance__item-title title-h4">
                ${isEmpty(item.Type)} ${isEmpty(formatter2.format(new Date(item.Date)))}
              </h4>
              <div class="service-maintenance__item-details item-details list-reset">
                ${itemContent}
              </div>
            </div>`
            )
          );
        
      });
    }

    // Информация о нахождении в залоге

    if (data.Pledges && data.Pledges.length > 0) {
      const dataWrapper = document.querySelector(".deposit");
      const list = document.querySelector(".deposit__list");

      dataWrapper.style.display = "block";

      list.innerHTML = "";

      data.Pledges.forEach(item => {

        let itemContent = '';

        if (item.Date) {
          itemContent += `
          <div class="deposit__content-text details-text">
              <span class="deposit__content-text-name name-span">Дата регистрации:
              </span>
              <span class="deposit__content-text-name desk-span">${formatter2.format(new Date(item.Date))}</span>
            </div>
          `;
        }

        if (item.Number) {
          itemContent += `
          <div class="deposit__content-text details-text">
              <span class="deposit__content-text-name name-span">Регистрационный номер:
              </span>
              <span class="deposit__content-text-name desk-span">${item.Number}</span>
            </div>
          `;
        }

        if (item.Pledgor.FullName) {
          itemContent += `
          <div class="deposit__content-text details-text">
              <span class="deposit__content-text-name name-span">Залогодатель:
              </span>
              <span class="deposit__content-text-name desk-span">${item.Pledgor.FullName}</span>
            </div>
          `;
        }

        if (item.Pledgee.FullName) {
          itemContent += `
          <div class="deposit__content-text details-text">
              <span class="deposit__content-text-name name-span">Залогодержатель:
              </span>
              <span class="deposit__content-text-name desk-span">${item.Number}</span>
            </div>
          `;
        }

        if (item.Vin) {
          itemContent += `
          <div class="deposit__content-text details-text">
              <span class="deposit__content-text-name name-span">Залогодержатель:
              </span>
              <span class="deposit__content-text-name desk-span">${item.Vin}</span>
            </div>
          `;
        }

          list.appendChild(
            createElement(
              "div",
              "background-gray",
              `<div class="deposit__content">
                ${itemContent}
              </div>`
            )
          );
        
      });
    }

      // Нахождении в розыске

      if (data.WantedRecords && data.WantedRecords.length > 0) {
        const dataWrapper = document.querySelector(".wanted");
        const list = document.querySelector(".wanted__list");
  
        dataWrapper.style.display = "block";
  
        list.innerHTML = "";
  
        data.WantedRecords.forEach(item => {
  
          let itemContent = '';
  
          if (item.RegistrationDate) {
            itemContent += `
            <div class="wanted__content-text details-text">
              <span class="wanted__content-text-name name-span">Дата постановки на учёт в розыске:
              </span>
              <span class="wanted__content-text-name desk-span">${formatter2.format(new Date(item.RegistrationDate))}</span>
            </div>
            `;
          }

          if (item.InitiatorRegion) {
            itemContent += `
            <div class="wanted__content-text details-text">
              <span class="wanted__content-text-name name-span">Регион инициатора розыска:</span>
              <span class="wanted__content-text-name desk-span">${item.InitiatorRegion}</span>
            </div>
            `;
          }

          if (item.VIN) {
            itemContent += `
            <div class="wanted__content-text details-text">
              <span class="wanted__content-text-name name-span">VIN:
              </span>
              <span class="wanted__content-text-name desk-span">${item.VIN}</span>
            </div>
            `;
          }

          if (item.FrameNumber) {
            itemContent += `
            <div class="wanted__content-text details-text">
              <span class="wanted__content-text-name name-span">Номер кузова:
              </span>
              <span class="wanted__content-text-name desk-span">${item.FrameNumber}</span>
            </div>
            `;
          }

          if (item.VRP) {
            itemContent += `
            <div class="wanted__content-text details-text">
              <span class="wanted__content-text-name name-span">Госномер:
              </span>
              <span class="wanted__content-text-name desk-span">${item.VRP}</span>
            </div>
            `;
          }

          if (item.VehicleModel) {
            itemContent += `
            <div class="wanted__content-text details-text">
              <span class="wanted__content-text-name name-span">Марка (модель):
              </span>
              <span class="wanted__content-text-name desk-span">${item.VehicleModel}</span>
            </div>
            `;
          }

          if (item.VehicleYear) {
            itemContent += `
            <div class="wanted__content-text details-text">
              <span class="wanted__content-text-name name-span">Год выпуска:
              </span>
              <span class="wanted__content-text-name desk-span">${item.VehicleYear}</span>
            </div>
            `;
          }
  
            list.appendChild(
              createElement(
                "div",
                "background-gray",
                `<div class="wanted__content details-list">
                  ${itemContent}
                </div>`
              )
            );
          
        });
      }

      // Записи в реестре банкротов

      if (data.BankruptRegister && data.BankruptRegister.length > 0) {
        const dataWrapper = document.querySelector(".bankruptcy-registry");
        const list = document.querySelector(".bankruptcy-registry__list");
  
        dataWrapper.style.display = "block";
  
        list.innerHTML = "";
  
        data.BankruptRegister.forEach(item => {
  
          let itemContent = '';

          if (item.Vin) {
            itemContent += `
           <div class="bankruptcy-registry__item-content-text details-text">
                  <span class="bankruptcy-registry__item-content-text-name name-span">VIN:
                  </span>

                  <span class="bankruptcy-registry__item-content-text-desk desk-span">${item.Vin}</span>
                </div>
            `;
          }

          if (item.Vrp) {
            itemContent += `
           <div class="bankruptcy-registry__item-content-text details-text">
                  <span class="bankruptcy-registry__item-content-text-name name-span">Госномер:
                  </span>

                  <span class="bankruptcy-registry__item-content-text-desk desk-span">${item.Vrp}</span>
                </div>
            `;
          }

          if (item.Description) {
            itemContent += `
           <div class="bankruptcy-registry__item-content-text bankruptcy-registry__item-content-text-deskr details-text">
                  <span class="bankruptcy-registry__item-content-text-name name-span">Описание:
                  </span>

                  <span class="bankruptcy-registry__item-content-text-desk desk-span">${item.Description}</span>
                </div>
            `;
          }
  
            list.appendChild(
              createElement(
                "li",
                "bankruptcy-registry__item",
                `<div class="bankruptcy-registry__item-wrapper background-gray">
                <h4 class="bankruptcy-registry__item-title title-h4">
                 <span class="bankruptcy-registry__item-title-number"></span> ${isEmpty(item.Title)}
                </h4>
                <div class="bankruptcy-registry__item-content details-list">
                  ${itemContent}
                 </div>
                </div>`
              )
            );
          
        });
      }

 // Использование в качестве такси

 if (data.TaxiPermits && data.TaxiPermits.length > 0) {
  const dataWrapper = document.querySelector(".taxi-usage");
  const list = document.querySelector(".taxi-usage__list");
  document.querySelector('.taxi-usage__upper-count').innerHTML = data.TaxiPermits.length

  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.TaxiPermits.forEach(item => {

    let itemContent = '';

    if (item.IsActive) {
      itemContent += `
     <div class="bankruptcy-registry__item-content-text details-text">
            <span class="bankruptcy-registry__item-content-text-name name-span">Статус (Активно/Не активно):
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.IsActive}</span>
          </div>
      `;
    }

    if (item.Vrp) {
      itemContent += `
     <div class="bankruptcy-registry__item-content-text details-text">
            <span class="bankruptcy-registry__item-content-text-name name-span">Госномер:
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.Vrp}</span>
          </div>
      `;
    }

    if (item.City) {
      itemContent += `
     <div class="bankruptcy-registry__item-content-text details-text">
            <span class="bankruptcy-registry__item-content-text-name name-span">Город регистрации:
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.City}</span>
          </div>
      `;
    }

    if (item.Number) {
      itemContent += `
     <div class="bankruptcy-registry__item-content-text details-text">
            <span class="bankruptcy-registry__item-content-text-name name-span">Регистрационный номер разрешения:
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.Number}</span>
          </div>
      `;
    }

    if (item.FormNumber) {
      itemContent += `
     <div class="bankruptcy-registry__item-content-text details-text">
            <span class="bankruptcy-registry__item-content-text-name name-span">Серия и номер бланка разрешения:
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.FormNumber}</span>
          </div>
      `;
    }

    if (item.IssueDate) {
      itemContent += `
     <div class="bankruptcy-registry__item-content-text details-text">
            <span class="bankruptcy-registry__item-content-text-name name-span">Дата выдачи:
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.IssueDate}</span>
          </div>
      `;
    }

    if (item.ExpirationDate) {
      itemContent += `
     <div class="bankruptcy-registry__item-content-text details-text">
            <span class="bankruptcy-registry__item-content-text-name name-span">Срок действия:
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.ExpirationDate}</span>
          </div>
      `;
    }

    if (item.Carrier) {
      itemContent += `
     <div class="taxi-usage__item-content-text details-text">
            <span class="taxi-usage__item-content-text-name name-span">Перевозчик:
            </span>

            <span class="taxi-usage__item-content-text-desk desk-span ">${item.Carrier}</span>
          </div>
      `;
    }

      list.appendChild(
        createElement(
          "li",
          "taxi-usage__item",
          `<div class="taxi-usage__item-wrapper background-gray">
          <h4 class="taxi-usage__item-title title-h4"><span class="taxi-usage__item-title-number"></span>${isEmpty(item.Carrier)} ${isEmpty(item.IsActive)}</h4>
          <div class="taxi-usage__item-content details-list">
            ${itemContent}
          </div>
        </div>`
        )
      );
    
  });
}

 // Отчёт о проверке в CarPrice

 if (data.CarPriceReport && data.CarPriceReport.length > 0) {
  const dataWrapper = document.querySelector(".carprice-inspection-report");
  const list = document.querySelector(".carprice-inspection-report__list");

  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.CarPriceReport.forEach(item => {

    let itemContent = '';

    if (item.InspectDate) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Дата осмотра:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.InspectDate}</span>
          </div>
      `;
    }

    if (item.City) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Город:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.City}</span>
          </div>
      `;
    }

    if (item.Brand) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Марка:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Brand}</span>
          </div>
      `;
    }

    if (item.Model) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Модель:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Model}</span>
          </div>
      `;
    }

    if (item.Vin) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">VIN:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Vin}</span>
          </div>
      `;
    }

    if (item.Vrp) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Госномер:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Vrp}</span>
          </div>
      `;
    }

    if (item.Modification) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Модификация:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Modification}</span>
          </div>
      `;
    }

    if (item.Mileage) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Пробег:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Mileage}</span>
          </div>
      `;
    }

    if (item.ReleaseYear) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Год выпуска:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.ReleaseYear}</span>
          </div>
      `;
    }

    if (item.EngineVolume) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Рабочий объём (см3):
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.EngineVolume}</span>
          </div>
      `;
    }

    if (item.EnginePower) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Мощность (л.с.):
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.EnginePower}</span>
          </div>
      `;
    }

    if (item.EngineType) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Тип двигателя:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.EngineType}</span>
          </div>
      `;
    }

    if (item.WheelDriveType) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Привод:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.WheelDriveType}</span>
          </div>
      `;
    }

    if (item.Transmission) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">КПП:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Transmission}</span>
          </div>
      `;
    }

    if (item.Wheel) {
      itemContent += `
     <div class="carprice-inspection-report__content-text details-text">
            <span class="carprice-inspection-report__content-text-name name-span">Руль:
            </span>

            <span class="carprice-inspection-report__content-text-desk desk-span">${item.Wheel}</span>
          </div>
      `;
    }

      list.appendChild(
        createElement(
          "div",
          "carprice-inspection-report__content background-gray details-list",
          `${itemContent}`
        )
      );
    
  });
}

 // Выездная диагностика

 if (data.AutopodborReports && data.AutopodborReports.length > 0) {
  const dataWrapper = document.querySelector(".mobile-diagnosis");

  dataWrapper.style.display = "block"; 

  data.AutopodborReports.forEach(item => {

    let itemContent = '';

    if (item.Brand || item.Model) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Марка (модель):
            </span>

            <span class="desk-span">${isEmpty(item.Brand)} ${isEmpty(item.Model)}</span>
          </div>
      `;
    }

    
    if (item.ReleaseYear) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Год выпуска:
            </span>

            <span class="desk-span">${item.ReleaseYear}</span>
          </div>
      `;
    }

    if (item.Generation) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Поколение:
            </span>

            <span class="desk-span">${item.Generation}</span>
          </div>
      `;
    }

    if (item.Color) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Цвет:
            </span>

            <span class="desk-span">${item.Color}</span>
          </div>
      `;
    }
    
    if (item.OwnersCount) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Количество владельцев:
            </span>

            <span class="desk-span">${item.OwnersCount}</span>
          </div>
      `;
    }

    if (item.Salon) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Материал салона:
            </span>

            <span class="desk-span">${item.Salon}</span>
          </div>
      `;
    }

    if (item.SalonColor) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Цвет салона:
            </span>

            <span class="desk-span">${item.SalonColor}</span>
          </div>
      `;
    }

  document.querySelector('.mobile-diagnosis__item-content').innerHTML = `${itemContent}`

    if (item.Date) {
     document.querySelector('.mobile-diagnosis__item-title').innerHTML = `Результат осмотра от ${formatDate(item.Date)}`
    }

    if (item.BodyComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Кузов (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.BodyComment}</span>

          `
        )
      )
     }

     if (item.EngineComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Двигатель (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.EngineComment}</span>

          `
        )
      )
     }

     if (item.SteeringComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Рулевое управление (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.SteeringComment}</span>

          `
        )
      )
     }

     if (item.CompDiagnosticsComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Компьютерная диагностика (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.CompDiagnosticsComment}</span>

          `
        )
      )
     }

     if (item.ElectricsComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Электрика (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.ElectricsComment}</span>

          `
        )
      )
     }

     if (item.SalonComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Салон (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.SalonComment}</span>

          `
        )
      )
     }

     if (item.LiftComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Осмотр снизу (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.LiftComment}</span>

          `
        )
      )
     }

     if (item.AdditionalOptionsComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Дополнительные опции (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.AdditionalOptionsComment}</span>

          `
        )
      )
     }

     if (item.AdditionalComment) {
      document.querySelector('.mobile-diagnosis__item-content-inspection').appendChild(
        createElement(
          "div",
          "mobile-diagnosis__item-content-inspection text details-text",
          `
          <span class="mobile-diagnosis__item-content-inspection-text-name name-span">Дополнительно (заключение эксперта):</span>
          <span class="mobile-diagnosis__item-content-inspection-text-desk desk-span">${item.AdditionalComment}</span>

          `
        )
      )
     }

     if (item.ExpertOpinionPositive) {
      document.querySelector('.mobile-diagnosis__item-content-inspection-characteristics-details1').appendChild(
        createElement(
          "li",
          "mobile-diagnosis__item-content-inspection-characteristics-details-item",
          `
        ${(item.ExpertOpinionPositive.map(opinion => `                  <li class="mobile-diagnosis__item-content-inspection-characteristics-details-item"><span class="mobile-diagnosis__item-content-inspection-characteristics-details-item-desk desk-span">${opinion}</span></li>
          `).join(""))}
         
          `
        )
      )
     }

     if (item.ExpertOpinionNegative) {
      document.querySelector('.mobile-diagnosis__item-content-inspection-characteristics-details2').appendChild(
        createElement(
          "li",
          "mobile-diagnosis__item-content-inspection-characteristics-details-item",
          `

          ${(item.ExpertOpinionNegative.map(opinion => `                  <li class="mobile-diagnosis__item-content-inspection-characteristics-details-item"><span class="mobile-diagnosis__item-content-inspection-characteristics-details-item-desk desk-span">${opinion}</span></li>
          `).join(""))}
         
          `
        )
      )
     }


    
    

  });
}

 // Найденные объявления

 if (data.Offers && data.Offers.length > 0) {
  const dataWrapper = document.querySelector(".found-advertisements");
  const list = document.querySelector(".found-advertisements__list");

  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.Offers.forEach(item => {

    let itemContent = '';

    if (item.Vin) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Vin:
            </span>

            <span class="desk-span">${item.Vin}</span>
          </div>
      `;
    }
    if (item.Vrp) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Vrp:
            </span>

            <span class="desk-span">${item.Vrp}</span>
          </div>
      `;
    }
    if (item.ReleaseYear) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Год выпуска:
            </span>

            <span class="desk-span">${item.ReleaseYear}</span>
          </div>
      `;
    }
    if (item.Mileage) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Пробег:
            </span>

            <span class="desk-span">${item.Mileage}</span>
          </div>
      `;
    }
    if (item.Price) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Цена:
            </span>

            <span class="desk-span">${item.Price} руб.</span>
          </div>
      `;
    }
    if (item.City) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Город:
            </span>

            <span class="desk-span">${item.City}</span>
          </div>
      `;
    }
    if (item.Seller) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Продавец:
            </span>

            <span class="desk-span">${item.Seller}</span>
          </div>
      `;
    }
    if (item.PhoneNumber) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Номер телефона продавца:
            </span>

            <span class="desk-span">${item.PhoneNumber}</span>
          </div>
      `;
    }
  // document.querySelector('.mobile-diagnosis__item-content').innerHTML = `${itemContent}`

  list.appendChild(
    createElement(
      "li",
      "found-advertisements__item",
      `
      <div class="found-advertisements__item-wrapper background-gray">
                <div class="found-advertisements__item-name-and-link">
                  <span class="found-advertisements__item-name title-h4">${isEmpty(item.Source)} ${formatter2.format(new Date(item.Created))}</span>
                  <a class="found-advertisements__item-link" href="${item.OfferUrl}">Перейти</a>
                </div>
                <h4 class="found-advertisements__item-title title-h4">${item.Title}
                </h4>
                <div class="found-advertisements__item-text details-text">
                  <span class="found-advertisements__item-text-name name-span">Описание:</span>
                  <p class="found-advertisements__item-text-desk desk-span">${item.Description}</p>
                </div>
                <div class="found-advertisements__item-details details-list">
                  ${itemContent}
              </div>
              </div>

      `
    )
  );

  });


}

 // Электронный ПТС

 if (data.Pts && data.Pts.length > 0) {
  const dataWrapper = document.querySelector(".electronmic-pts");
  const list = document.querySelector(".electronmic-pts__list");

  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.Pts.forEach(item => {

    let itemContent = '';

    if (item.Status) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Статус электронного паспорта:
            </span>

            <span class="desk-span">${item.Status}</span>
          </div>
      `;
    }
    if (item.RecyclingFeeInfo) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Сведения об уплате утилизационного сбора:
            </span>

            <span class="desk-span">${item.RecyclingFeeInfo}</span>
          </div>
      `;
    }
    if (item.CustomsClearance) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Сведения о выпуске (таможенное оформление):
            </span>

            <span class="desk-span">${item.CustomsClearance}</span>
          </div>
      `;
    }
    if (item.CustomsRestrictions) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Таможенные ограничения:
            </span>

            <span class="desk-span">${item.CustomsRestrictions}</span>
          </div>
      `;
    }
    if (item.OtherRestrictions) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Ограничения (обременения) за исключением таможенных (РФ):
            </span>

            <span class="desk-span">${item.OtherRestrictions}</span>
          </div>
      `;
    }
    if (item.LastRegAction) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Сведения о последнем регистрационном действии:
            </span>

            <span class="desk-span">${item.LastRegAction}</span>
          </div>
      `;
    }

  list.appendChild(
    createElement(
      "li",
      "electronmic-pts__item",
      `
      <div class="electronmic-pts__item-wrapper background-gray details-list">
               ${itemContent}
              </div>

      `
    )
  );

  });


}

 // Информация о полисах ОСАГО

 if (data.Policies && data.Policies.length > 0) {
  const dataWrapper = document.querySelector(".osago-policies");
  const list = document.querySelector(".osago-policies__list");

  let policiesStatus = ` 

        <img src="img/status-green.svg" alt="">
        <span class="osago-policies__item-status title-h4">Действует</span>

  `

  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.Policies.forEach(item => {

    let itemContent = '';

    if (item.Expired === false) {
      policiesStatus = `
      <img src="img/status-red.svg" alt="">
      <span class="osago-policies__item-status title-h4">Не действует</span>
      `;
    }

    if (item.Insurant && item.Insurant.FullName) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Страхователь:
            </span>

            <span class="desk-span">${item.Insurant.FullName}</span>
          </div>
      `;
    }
    
    if (item.Vin) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">VIN:
            </span>

            <span class="desk-span">${item.Vin}</span>
          </div>
      `;
    }
    if (item.Vrp) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Госномер:
            </span>

            <span class="desk-span">${item.Vrp}</span>
          </div>
      `;
    }
    if (item.Model) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Марка (модель):
            </span>

            <span class="desk-span">${item.Model}</span>
          </div>
      `;
    }
    if (item.UsePurpose) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Цель использования (не используется):
            </span>

            <span class="desk-span">${item.UsePurpose}</span>
          </div>
      `;
    }
    if (item.Owner && item.Owner.FullName) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Собственник:
            </span>

            <span class="desk-span">${item.Owner.FullName}</span>
          </div>
      `;
    }
    if (item.Cbm) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">КБМ:
            </span>

            <span class="desk-span">${item.Cbm}</span>
          </div>
      `;
    }
    if (item.Region) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Регион использования:
            </span>

            <span class="desk-span">${item.Region}</span>
          </div>
      `;
    }
    if (item.ExpirationDate) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Дата окончания срока действия полиса (не используется):
            </span>

            <span class="desk-span">${formatter2.format(new Date(item.ExpirationDate))}</span>
          </div>
      `;
    }
    if (item.EnginePower) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Мощность (л.с.):
            </span>

            <span class="desk-span">${item.EnginePower} л.с.</span>
          </div>
      `;
    }
    if (item.Number) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Серия, номер полиса:
            </span>

            <span class="desk-span">${item.Number}</span>
          </div>
      `;
    }

  list.appendChild(
    createElement(
      "li",
      "osago-policies__item",
      `
      <div class="osago-policies__item-wrapper background-gray">
                <div class="osago-policies__item-title-and-status">
                <h4 class="osago-policies__item-title title-h4">${item.CompanyName} </h4>
                ${policiesStatus}
              </div>
                 <div class="osago-policies__item-content details-list">
                  ${itemContent}
                 </div>
              </div>

      `
    )
  );

  });

  

}

 // Информация о штрафах

 if (data.Fines && data.Fines.length > 0) {
  const dataWrapper = document.querySelector(".fines-information");
  const list = document.querySelector(".fines-information__list");
  let finePhoto = ``
  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.Fines.forEach(item => {

    let itemContent = '';

    if (item.StatementDate) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Дата внесения постановления:
            </span>

            <span class="desk-span">${item.StatementDate}</span>
          </div>
      `;
    }
    if (item.ViolationTime) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Время:
            </span>

            <span class="desk-span">${item.ViolationTime}</span>
          </div>
      `;
    }
    if (item.Article || item.ArticleText) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Статья КоАП РФ:
            </span>

            <span class="desk-span">${item.Article} - ${item.ArticleText}</span>
          </div>
      `;
    }

    if (item.FineAmount) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Сумма штрафа:
            </span>

            <span class="desk-span">${item.FineAmount}</span>
          </div>
      `;
    }
    if (item.DiscountEnabled) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Действует скидка:
            </span>

            <span class="desk-span">${item.DiscountAmount} руб. до ${formatter2.format(new Date(item.DiscountExpirationDate))}</span>
          </div>
      `;
    }

    if (item.Kbk) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">КБК (не используется):
            </span>

            <span class="desk-span">${item.Kbk}</span>
          </div>
      `;
    }
    if (item.Uin) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">УИН:
            </span>

            <span class="desk-span">${item.Uin}</span>
          </div>
      `;
    }
    if (item.GibddSubdivision) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Подразделение ГИБДД:
            </span>

            <span class="desk-span">${item.GibddSubdivision}</span>
          </div>
      `;
    }
    if (item.VehicleModel) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Марка (модель) (не используется):
            </span>

            <span class="desk-span">${item.VehicleModel}</span>
          </div>
      `;
    }
    if (item.FsspReferralDate) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Дата передачи в ФССП:
            </span>

            <span class="desk-span">${formatter2.format(new Date(item.FsspReferralDate))}</span>
          </div>
      `;
    }

  list.appendChild(
    createElement(
      "li",
      "fines-information__item",
      `
      <div class="fines-information__item-wrapper background-gray">
                <h4 class="fines-information__item-title title-h4">Штраф ${item.StatementNumber}
                </h4>
                <div class="fines-information__item-content details-list">
                  ${itemContent}
                </div>
              </div>

      `
    )
  );

  });

  

}

 // Отзывные компании

 if (data.RecallCompanies && data.RecallCompanies.length > 0) {
  const dataWrapper = document.querySelector(".reviews");
  const list = document.querySelector(".reviews__list");

  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.RecallCompanies.forEach(item => {

    let itemContent = '';

    if (item.Manufacturer) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Производитель:
            </span>

            <span class="desk-span">${item.Manufacturer}</span>
          </div>
      `;
    }

    if (item.Reason) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Причина отзыва:
            </span>

            <span class="desk-span">${item.Reason}</span>
          </div>
      `;
    }

    if (item.Source) {
      itemContent += `
     <div class="details-text">
            <span class="name-span">Источник:
            </span>

            <span class="desk-span">${item.Source}</span>
          </div>
      `;
    }

  list.appendChild(
    createElement(
      "li",
      "reviews__item",
      `
      <div class="reviews__item-wrapper background-gray">
                <h4 class="reviews__item-title title-h4">Отзывная компания №${item.Number} от ${formatter2.format(new Date(item.Date))}
                </h4>
                <div class="reviews__item-content">
                  ${itemContent}
                </div>
              </div>

      `
    )
  );

  });

  

}

 // Информация по VIN

 if (data.VinData && data.VinData.length > 0) {
  const dataWrapper = document.querySelector(".vin-information");
  const list = document.querySelector(".vin-information__list");

  dataWrapper.style.display = "block";

  list.innerHTML = "";

  data.VinData.forEach(item => {

    let itemContent = '';

    if (item.Vin) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">VIN:
            </span>

            <span class="desk-span">${item.Vin}</span>
            </div>
      `;
    }
    if (item.Brand || item.Model || item.ModelGen) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Марка:
            </span>

            <span class="desk-span">${isEmpty(item.Brand)} ${isEmpty(item.Model)} ${isEmpty(item.ModelGen)}</span>
            </div>
      `;
    }
    if (item.ModelCode) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Код модели:
            </span>

            <span class="desk-span">${item.ModelCode}</span>
            </div>
      `;
    }
    if (item.ModelYear) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Модельный год:
            </span>

            <span class="desk-span">${formatter2.format(new Date(item.ModelYear))}</span>
            </div>
      `;
    }
    if (item.EngineInfo) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Двигатель:
            </span>

            <span class="desk-span">${item.EngineInfo}</span>
            </div>
      `;
    }
    if (item.EnginePower) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Мощность (л.с.):
            </span>

            <span class="desk-span">${item.EnginePower} л.с.</span>
            </div>
      `;
    }
    if (item.EngineTorque) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Крутящий момент (Н/м):
            </span>

            <span class="desk-span">${item.EngineTorque} Н/м</span>
            </div>
      `;
    }
    if (item.VehicleType) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Тип транспортного средства:
            </span>

            <span class="desk-span">${item.VehicleType}</span>
            </div>
      `;
    }
    if (item.DoorsCount) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Количество дверей:
            </span>

            <span class="desk-span">${item.DoorsCount}</span>
            </div>
      `;
    }
    if (item.Vin) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">VIN:
            </span>

            <span class="desk-span">${item.Vin}</span>
            </div>
      `;
    }
    if (item.ProductionStartYear) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Начало производства:
            </span>

            <span class="desk-span">${item.ProductionStartYear}</span>
            </div>
      `;
    }
    if (item.ProductionEndYear) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Окончание производства:
            </span>

            <span class="desk-span">${item.ProductionEndYear}</span>
            </div>
      `;
    }
    if (item.OriginCountry) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Страна происхождения:
            </span>

            <span class="desk-span">${item.OriginCountry}</span>
            </div>
      `;
    }
    if (item.SalesMarket) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Рынок сбыта:
            </span>

            <span class="desk-span">${item.SalesMarket}</span>
            </div>
      `;
    }
    if (item.AssemblyCountry) {
      itemContent += `
            <span class="name-span">Страна сборки:
            </span>

            <span class="desk-span">${item.AssemblyCountry}</span>
      `;
    }
    if (item.AssemblyRegion) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Регион сборки:
            </span>

            <span class="desk-span">${item.AssemblyRegion}</span>
            </div>
      `;
    }
    if (item.Manufacturer) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Производитель:
            </span>

            <span class="desk-span">${item.Manufacturer}</span>
            </div>
      `;
    }
    if (item.ManufacturersAddress) {
      itemContent += `
      <div class="vin-information__content-text details-text">
            <span class="name-span">Адрес производителя:
            </span>

            <span class="desk-span">${item.ManufacturersAddress}</span>
            </div>
      `;
    }

  list.appendChild(
    createElement(
      "div",
      "vin-information__list",
      `
      <div class="vin-information__content background-gray details-list">
        ${itemContent}
      </div>

      `
    )
  );

  });

  

}


    // if (data.OwnershipPeriods && data.OwnershipPeriods.length > 0) {

    //   const dataWrapper = document.querySelector(".registration-history");
    //   dataWrapper.style.display = "block";
    //   const list = document.querySelector(".registration-history__upper-wrapper");

    //   list.innerHTML = "";

    //   data.OwnershipPeriods.forEach((item) => {

    //     if (item.PersonType) {
    //       list.appendChild(createElement('li', 'disadvantages__content-item', `<strong>Тип владельца:</strong> ${item.PersonType}`));
    //                 }
    //     list.appendChild(listItem);
    //   });
    // }
  }
  // Обновление HTML при загрузке страницы
  fetchJsonData();
});
