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
    {
      id: 5,
      name: 'nevro'
    },
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
    // {
    //   id: 8,
    //   name: 'result'
    // },
  ],
  listNav: [
    'Жалобы',
    'Анамнез',
    'Неврологический статус',
    'Сопутствующие заболевания',
    'Заключение'
  ],
  startNavbarPage: 3,
  currentNavbarPage: 1,

  listTab: [
    {
      "year": "2003",
      "html": 
      `
      <ul><li>Дебют заболевания</li><li>Чувствительные нарушения (онемение слева по гемитипу)</li><li>Госпитализация в неврологическое отделение, симптоматическая терапия</li><li>Симптомы регрессировали в течение месяца</li></ul>
      `
    },
    {
      "year": "2004-2006",
      "html": 
      `
      <h4>Апрель 2004</h4><ul><li>Обострение, после обследования выставлен диагноз РС</li><li>Ремитирующее течение, 2-6 обострений в год</li><li>Терапия ГКС/ обострения, не требующие терапии ГКС</li></ul><h4>2006</h4><ul><li>Роды</li></ul>
      `
    },
    {
      "year": "2009-2010",
      "html": 
      `
      <h4>Апрель 2009</h4><ul class="low-margin"><li>Выраженное обострение</li><li>Дексаметазон – регресс симптоматики в течение недели</li></ul><h4>Октябрь 2009</h4><ul class="low-margin"><li>Обострение. Нарушение речи, слабость в правых конечностях, координаторные нарушения</li><li>Госпитализация</li><li>Пульс-терапия метилпреднизолоном 500 мг вв кап №3</li><li>Положительная динамика</li></ul><h4>2009 – 2010</h4><ul class="low-margin"><li>Лечение сипонимодом в рамках клинического исследования. Без осложнений, обострений не зарегистрировано</li><li>EDSS 2 балла</li></ul>
      `
    },
    {
      "year": "2011-2012",
      "html": 
      `
      <h4>2011-2012</h4><ul><li>Не принимала терапию ПИТРС, зарегистрировано обострение заболевания, которое послужило основанием для обращения центр РС</li><li>Нарастание баллов по шкале EDSS  c 2 до 3 баллов. </li><li>Зарегистрировано подтвержденное прогрессирование инвалидизации (ППИ-6)</li></ul>
      `
    },
    {
      "year": "2013",
      "html": 
      `
      <h4>2013</h4><ul><li>Получает сипонимод в программе клинического исследования исследование</li><li>Планируется продолжение получения препарата до декабря 2022</li></ul>
      `
    },
  ],
  currentTab: 0,
  mrtAvailabilityInYears: [],
  sledAvailabilityInYears: ["2019"],

  modalTomography: null,
  swiperInstance: null,

  modalClassActual: null,
  modalStep: 1,
  modalQA: {
    nevro: {
      title: 'Какие препараты показаны для лечения вторично прогрессирующего рассеянного склероза и предназначены для предотвращения обострений и радиологической активности, а также для предотвращения прогрессирования согласно утвержденным в 2022 году клиническим рекомендациям ?',
      // titleDesc: 'Возможно несколько вариантов ответа',
      qa: [
        {
          text: 'Инерферон бета-1а',
          correct: false,
        },
        {
          text: 'Инерферон бета-1б',
          correct: false,
        },
        {
          text: 'Окрелизумаб',
          correct: false,
        },
        {
          text: 'Митоксантрон',
          correct: false,
        },
        {
          text: 'Сипонимод',
          correct: false,
        },
        {
          text: 'Все ответы верны',
          correct: false,
        },
        {
          text: 'Ни один из ответов не верен',
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
        return
      } else {
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
        t == 'nevro' ||
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