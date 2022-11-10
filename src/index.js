import { createApp, reactive } from './petite-vue.es.js'
import { initSwiper } from './components/modal/swiper.js'
import { setNavbarPosition } from './components/navbar/navbar.js';

document.addEventListener("DOMContentLoaded", startedCheck);
window.addEventListener('resize', () => { fixVH() });

function startedCheck() {
  fixVH()
  setNavbarPosition()
}

const bodyDOM = document.querySelector('body')

const store = reactive({
  currentPage: 1,
  finishedPage: 8,
  pagesWithValidation: [
    // {
    //   id: 7,
    //   name: 'methodsPC'
    // },
    // {
    //   id: 8,
    //   name: 'analiz'
    // },
    // {
    //   id: 9,
    //   name: 'shema'
    // },
  ],
  anamnezWithValidation: [
    {
      id: 8,
      name: 'result'
    },
  ],
  listNav: [
    'Жалобы',
    'Анамнез',
    'Неврологический статус',
    'Сопутствующие заболевания',
    'Результаты лечения'
  ],
  startNavbarPage: 3,
  currentNavbarPage: 1,

  listTab: [
    {
      "year": "2004",
      "html": 
      `
      <h3>Дебют заболевания</h3><ul><li>Чувство стягивания в ногах, онемение в области грудной клетки, задержки при мочеиспускании</li><li>По МРТ грудного отдела спинного мозга выдвинуто предположение о сирингомиелии</li></ul>
      `
    },
    {
      "year": "2006",
      "html": 
      `
      <h4>Апрель</h4><ul><li>Повторный эпизод онемения в области грудной клетки</li><li>МРТ головного мозга и спинного мозга – выявлены очаговые изменения</li><li>Выставлен диагноз РС</li></ul>
      `
    },
    {
      "year": "2007-2014",
      "html": 
      `
      <h3>Лечение</h3><h4>2007</h4><ul class="low-margin"> <li>С 2007 (EDSS=1.5) – начата терапия препаратом глатирамера ацетат, переносимость удовлетворительная</li><li>Состояние стабильное, обострений не отмечается</li><li>По данным МРТ отрицательной динамики нет</li><li>Продолжает прием ГА</li></ul><h4>Сентябрь 2014 </h4><ul class="low-margin"> <li>Обострение в виде онемения в ногах, с 3,5 баллов по EDSS</li><li>Проведена гормональная пульс-терапия: метилпреднизолон 1000 мг <br>в\в капельно №5</li></ul>
      `
    },
    {
      "year": "2015",
      "html": 
      `
      <h4>Март</h4><ul class="low-margin"> <li>Обострение со слабостью в ногах, задержкой при мочеиспускании, EDSS в период обострений 4,5 балла. Проведена гормональная пульс-терапия- метилпреднизолон 1000 мг в\в капельно  №5</li></ul><h4>Июнь </h4><ul class="low-margin"> <li>Обострение  по EDSS=4,5 балла, слабостью в ногах, головокружением, задержкой при мочеиспускании, гипостезией ног</li><li>МРТ – отрицательная динамика в виде появления новых активных очагов как в головном мозге, так и на шейном уровне спинного мозга. <br> Проведена гормональная пульс-терапия- метилпреднизолон 1000 мг в\в капельно  №5</li></ul><h4>Август</h4><ul class="low-margin"> <li>Обострение, проведена гормональная пульс-терапия- метилпреднизолон 1000 мг в\в капельно  №5</li></ul><h4>Октябрь </h4><ul class="low-margin"> <li>Обострение с  симптомами нижнего парапареза до 4 баллов, задержки при мочеиспускании. Вне обострения EDSS=3.0 балла. Переведена на терапию лечение интерфероном бета-1b</li></ul><h4>Декабрь </h4><ul class="low-margin"> <li>Обострение с EDSS= 5,0, нижний умеренный спастический парапарез, гипостезия с уровня Th6-7, вестибуло-атактический синдром. Проведена гормональная пульс-терапия- метилпреднизолон 1000 мг в\в капельно №5</li></ul>
      `
    },
    {
      "year": "2016",
      "html": 
      `
      <h4>Март</h4><ul class="low-margin"> <li>Обострение  с умеренным нижним парапарезом, задержками при мочеиспускании, гипостезией в правой руке, EDSS=4,5. Проведена гормональная пульс-терапия- метилпреднизолон 1000 мг в\в капельно №5</li></ul><h4>Июнь </h4><ul class="low-margin"> <li>МРТ отрицательная динамика в вид появления нового активного очага</li></ul><h4>Октябрь </h4><ul class="low-margin"> <li>Обострение с EDSS=5,0 баллов, умеренным нижним спастическим парапарезом, императивными позывами на мочеиспускание, с эпизодами задержек. Проведена гормональная пульс-терапия- метилпреднизолон 1000 мг в\в капельно №5</li></ul>
      `
    },
    {
      "year": "2017",
      "html": 
      `
      <h4>Февраль</h4><ul class="low-margin"> <li>EDSS=4.0 балла, переведена на терапию диметилфумаратом (от терапии натализумабои и финголимодом пациентка отказалась)</li></ul><h4>Март </h4><ul class="low-margin"> <li>Обострение с EDSS=5,0 баллов, умеренный нижний спастический парапарез, гипостезия в руках, легкая дизартрия, задержки при мочеиспускании. Проведена гормональная пульс-терапия-метилпреднизолон 1000 мг в\в капельно  №5</li></ul><h4>Июль </h4><ul class="low-margin"> <li>EDSS=4.0 балла,  первый курс инфузий препаратом алемтузумаб по личному решению пациентки</li></ul><h4>Август </h4><ul class="low-margin"> <li>(EDSS=4.0) – второй курс инфузий препаратом алемтузумаб</li></ul>
      `
    },
    {
      "year": "2018",
      "html": 
      `
      <ul><li>МРТ – отрицательной динамики нет</li><li>Лабораторный мониторинг – без патологии</li><li>После алемтузумаба проверяли ОАК, ОАМ, креатинин, глюкоза каждый месяц и ТТГ 1 раз в 3 месяца</li></ul>
      `
    },
    {
      "year": "2019",
      "html": 
      `
      <ul><li>С осени 2019 года – медленно нарастание инвалидизации в виде медленного усиления слабости в ногах – оценка ретроспективная, клиническая</li><li>МРТ – отрицательной динамики нет</li><li>Лабораторный мониторинг – без патологии. 1 раз в 3 месяца</li></ul>
      `
    },
    {
      "year": "2021",
      "html": 
      `
      <h4>Весна</h4><ul class="low-margin"> <li>Весна 2021 года (EDSS=5.5) – диагностирован ВПРС. На основании жалоб, анамнестических сведений, данных неврологического осмотра и дополнительных методов обследования поставлен диагноз: Рассеянный склероз, вторично прогрессирующее течение, без обострений, стабилизация</li></ul><h4>Март </h4><ul class="low-margin"> <li>EDSS 5,5</li></ul><h4>Июль </h4><ul class="low-margin"> <li>EDSS 5,5 (выставлен по 6мППИ: отмечено усиление неврологического дефицита с 4,5 до 5,5 баллов за 6 месяцев при отсутствии обострений)</li><li>С июля 2021 г. получает специфическую иммуномодулирующую терапию препаратом сипонимод 2 мг (переведена на терапию сипонимодом 2 мг (проведено исследование на Цитохром CYP2C9/ген СYР2С9 – С\С; А/А). Переносимость лечения удовлетворительная</li><li>Уровень лимфоцитов в крови на фоне терапии 0,4-0,7 тыс/мкл, остальные показатели анализа крови в норме</li></ul>
      `
    },
    {
      "year": "2022",
      "html": 
      `
      <h4>Февраль</h4><ul><li>Перенесла Covid-19, в легкой форме</li></ul>
      `
    },
  ],
  currentTab: 0,
  mrtAvailabilityInYears: ["2004", "2006", "2007-2014", "2015", "2016", "2018", "2019", "2021", "2022"],
  sledAvailabilityInYears: ["2019", "2021", "2022"],

  modalTomography: null,
  swiperInstance: null,

  modalClassActual: null,
  modalStep: 1,
  modalQA: {
    result: {
      title: 'С какими препаратами сипонимод следует одновременно принимать с осторожностью? ',
      titleDesc: 'Возможно несколько вариантов ответа',
      qa: [
        {
          text: 'Противоопухолевые',
          correct: true,
        },
        {
          text: 'Иммуномодулирующие',
          correct: false,
        },
        {
          text: 'Иммуносупрессивные',
          correct: true,
        },
        {
          text: 'Бета-адреноблокаторы',
          correct: true,
        },
      ]
    },
  },

  modalSize: 'big',
  showModal: false,
  mask: null,
  setNavbar(i) {
    this.currentNavbarPage = i
    this.currentPage = this.currentNavbarPage + this.startNavbarPage
  },
  validatedScroll() {
    let res = true
    this.pagesWithValidation.forEach(el => {
      if (el.id == this.currentPage) res = false
    })
    this.anamnezWithValidation.forEach(el => {
      if (el.id == this.currentTab) res = false
    })

    return res
  },
  nextPage(target) {
    // Проверка для табов анамнез,
    // если на нем, то кнопка Далее работает переключателем для анамнеза
    if (this.currentPage == 4 && this.currentTab !== this.listTab.length - 1) {
      if (this.validatedScroll() || target == 'modal') {
        this.currentTab++
        console.log(this.modalClassActual);
        return
      } else {
        console.log('mmmmm');
        this.modalClassActual = this.anamnezWithValidation.find(el => el.id === this.currentTab).name
        this.onModal(this.modalClassActual)
        return
      }
    }

    if (this.validatedScroll() || target == 'modal') {
      const s = this.currentPage++
      setNavbarPosition()
      ym(90738866,'reachGoal','go_to_slide_' + s)
    } else {
      this.modalClassActual = this.pagesWithValidation.find(el => el.id === this.currentPage).name
      this.onModal(this.modalClassActual)
    }
  },
  prevPage() {
    // Проверка для табов анамнез,
    // если на нем, то кнопка Назад работает переключателем для анамнеза
    if (this.currentPage == 4 && this.currentTab !== 0) {
      this.currentTab--
      return
    }

    this.currentPage--
    setNavbarPosition()
  },
  setTab(i) {
    this.currentTab = i
  },
  async onModal(type) {
    bodyDOM.style.overflow = 'hidden'
    this.modalTomography = type
    this.showModal = true

    await this.localInitSwiper(type)
    this.initClipLine()
  },
  closeModal() {
    bodyDOM.style.overflow = 'visible'
    this.showModal = false
    this.modalTomography = ''
    this.modalStep = 1
  },
  onMaskClick(event) {
    if (this.mask === event.target) {
      this.closeModal();
    }
  },
  async localInitSwiper(t) {
    if (t == 'mrt' || 
        t == 'sled' || 
        t == 'analiz' || 
        t == 'shema' ||
        t == 'swiper-mrt-2021' ||
        t == 'swiper-mrt-2022'
    ) {
      setTimeout(() => {
        this.swiperInstance = initSwiper(t)
      }, 100)
    }
  },
  initClipLine () {
    const l = document.querySelectorAll('.swiper__mrt__text > span')
    
    l.forEach(el => {
      $clamp(el, {
        clamp: 6, // Число строк
        useNativeClamp: true // НЕ используем -webkit-line-clamp
       });
    })
  },
  readMore(e) {
    if(e.target.classList.contains('active')) {
      e.target.classList.remove('active')
      $clamp(e.target.previousSibling, {
        clamp: 6, // Число строк
        useNativeClamp: true // НЕ используем -webkit-line-clamp
      });      
    } else {
      e.target.classList.add('active')
      e.target.previousSibling.removeAttribute('style')
    }
  },
  modalClasses() {
    return ['modal-' + this.modalClassActual]
  },
  modalClassSize() {
    return ['modal-' + this.modalSize]
  },
  onClickCheckbox(event) {
    const t = event.target

    if(this.modalStep === 1) {
      t.classList.toggle('c-selected')
    }
  },
  checkboxClasses() {
    return ['checkbox-box']
  },
  nextCheckboxAnswer() {
    this.modalStep = 2;

    document.querySelectorAll('.checkbox-box').forEach(el => {
      console.log(el);
      el.classList.add('c-' + el.getAttribute("aria-checked"))
      el.parentElement.nextSibling.classList.add('l-' + el.getAttribute("aria-checked"))
    })
  },
  backCheckboxAnswer() {
    this.modalStep = 1;

    document.querySelectorAll('.checkbox-box').forEach(el => {
      el.classList.remove('c-selected')
      el.classList.remove('c-true')
      el.classList.remove('c-false')
      el.parentElement.nextSibling.classList.remove('l-true')
      el.parentElement.nextSibling.classList.remove('l-false')
    })
  }
})

createApp({store}).mount()


// Animation

const e = document.querySelectorAll("[data-animate-on-scroll]")
const t = new IntersectionObserver((e => {
  e.forEach((e => {
    e.isIntersecting && e.target.setAttribute("data-animate-on-scroll", "animated")
  }
  ))
}), {
  threshold: 0.25
});

e.forEach((e => {
  t.observe(e)
}
))

/*
* Решение проблемы с высотой моб браузеров
* with css: height = calc(var(--vh, 1vh) * 100);
*/
function fixVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}