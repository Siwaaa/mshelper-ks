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
      "ul": [
        "Чувство стягивания в ногах, онемение в области грудной клетки, задержки при мочеиспускании.",
        "По МРТ грудного отдела спинного мозга выдвинуто предположение о сирингомиелии.",
      ],
      "desc": null,
      "footnote": null
    },
    {
      "year": "2006",
      "ul": [
        "Повторный эпизод онемения в области грудной клетки.",
        "МРТ головного мозга и спинного мозга – выявлены очаговые изменения.",
        "Выставлен диагноз РС.",
      ],
      "desc": null,
      "footnote": null
    },
    {
      "year": "2007-2014",
      "ul": [
        "Боль при движении в правом глазу, головная боль, снижение остроты зрения.",
        "МРТ ГМ от 22.01.14г: множественные очаги демиелинизации",
        "февраль 2014г - пульс-терапия метилпреднизолоном*, суммарно 5г (+). После пятой инфузии метилпреднизолона развился отек гортани, шеи, трудности при глотании, расцененные как аллергическая реакция",
        "С февраля 2014г назначен глатирамера ацетат**, переносимость хорошая",
        "Июнь 2014 - Обострение в виде нарастания шаткости при ходьбе, слабости в ногах, курс сосудисто-метаболической терапии, с положительной динамикой"
      ],
      "desc": null,
      "footnote": null
    },
    {
      "year": "2015",
      "ul": [
        "Январь 2015 – обострение,  нарастание шаткости при ходьбе, слабости в ногах",
        "Проведено лечение сосудисто-метаболическиой терапией с некоторой положительной динамикой",
        "МРТ ГМ от 24.04.2015 - по сравнению с исследованием 22.01.14 появление 4 новых очагов"
      ],
      "desc": null,
      "footnote": null
    },
    {
      "year": "2016-2017",
      "ul": [
        "Без обострений",
        "МРТ ГМ - многоочаговое поражение демиелинизирующего характера, оценки динамики и контрастного усиления в дальнейшем не проводилось  в связи с весом пациентки выше допустимого для аппарата (более 120кг)"
      ],
      "desc": null,
      "footnote": null
    },
    {
      "year": "2018",
      "ul": [
        "Cентябрь 2018- удаление гигантской вентральной грыжи и холецистэктомия, послеоперационный период без особенностей",
        "Длительно принимает бисопролол, тиазол, курсами баклофен"
      ],
      "desc": "Анализ мочи, БХ анализ крови, гормоны ЩЖ от 04.12.18: без  отклонений \nЭКГ от 13.05.18г: ЧСС 67, ритм синусовый, нормальное положение ЭОС.",
      "footnote": null
    },
    {
      "year": "2019-2021",
      "ul": [
        "С 2019г глатирамера ацетат* другого производителя, отмечается общий зуд тела,частые состояния удушья, выпадение волос, выраженная тахикардия",
        "С декабря 2020 самостоятельно приостанавливает лечение глатирамера ацетатом ввиду сохраняющегося зуда, выпадения волос"
      ],
      "desc": "ОАК, БХАК, гормоны ЩЖ от 25.05.21г: лейкоцитурия, бактериурия, СОЭ 50",
      "footnote": "*https://grls.rosminzdrav.ru/Grls_View_v2.aspx?routingGuid=23024584-cc6d-42ca-b455-2b0808206073"
    },
  ],
  currentTab: 0,
  mrtAvailabilityInYears: ["2007", "2014", "2015"],
  sledAvailabilityInYears: ["2016-2017", "2018", "2019-2021"],

  modalTomography: null,
  swiperInstance: null,

  modalClassActual: null,
  modalStep: 1,
  modalQA: {
    methodsPC: {
      title: 'Какие методы, кроме шкалы EDSS можно использовать для оценки прогрессиирования заболевания?',
      titleDesc: 'Возможно несколько вариантов ответа',
      qa: [
        {
          text: 'SDMT',
          correct: true,
        },
        {
          text: 'Тест ходьбы на 25 футов',
          correct: true,
        },
        {
          text: 'MsProDiscuss',
          correct: true,
        },
        {
          text: 'Тест девяти колышков',
          correct: true,
        },
      ]
    },
    analiz: {
      title: 'Какие анализы необходимо провести особым группам пациентов перед применением сипонимода?',
      titleDesc: 'Возможно несколько вариантов ответа',
      qa: [
        {
          text: 'Генотипирование по изоферменту CYP2C9 c целью определения метаболического статуса',
          correct: false,
        },
        {
          text: 'Офтальмологическое обследование',
          correct: true,
        },
        {
          text: 'Оценка состояния ССС',
          correct: false,
        },
        {
          text: 'Выявление антител к VZV или подтверждённые данные о перенесенной ветряной оспе или о полном курсе вакцинации против VZV',
          correct: true,
        },
        {
          text: 'Общий и биохимический анализ крови',
          correct: false,
        },
        {
          text: 'ЭКГ',
          correct: true,
        },
        {
          text: 'Уровень АсАТ, АлАТ, билирубин',
          correct: false,
        }
      ]
    },
    shema: {
      title: 'Через сколько месяцев по сравнению с датой первого зафиксированного нарастания неврологических нарушений можно зафиксировать подтверждённое прогрессирование инвалидизации?',
      titleDesc: '',
      qa: [
        {
          text: 'Через 1 месяц',
          correct: false,
        },
        {
          text: 'Через 6 месяцев',
          correct: true,
        },
        {
          text: 'Через 8 месяцев',
          correct: false,
        },
        {
          text: 'Через 12 месяцев',
          correct: false,
        }
      ]
    }
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

    return res
  },
  nextPage(target) {
    // Проверка для табов анамнез,
    // если на нем, то кнопка Далее работает переключателем для анамнеза
    if (this.currentPage == 4 && this.currentTab !== this.listTab.length - 1) {
      this.currentTab++
      return
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
    this.currentPage--
    setNavbarPosition()
  },
  setTab(i) {
    this.currentTab = i
  },
  onModal(type) {
    bodyDOM.style.overflow = 'hidden'
    this.modalTomography = type
    this.showModal = true

    this.localInitSwiper(type)
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
  localInitSwiper(t) {
    if (t == 'mrt' || t == 'sled' || t == 'analiz' || t == 'shema') {
      setTimeout(() => {
        this.swiperInstance = initSwiper(t)
      }, 100)
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
      el.classList.add('c-' + el.ariaChecked)
      el.parentElement.nextSibling.classList.add('l-' + el.ariaChecked)
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