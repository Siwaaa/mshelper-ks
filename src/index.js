import { createApp, reactive } from './petite-vue.es.js'
import { initSwiper } from './components/modal/swiper.js'

const bodyDOM = document.querySelector('body')

const store = reactive({
  currentPage: 1,
  pagesWithValidation: [
    {
      id: 7,
      name: 'methodsPC'
    },
    {
      id: 8,
      name: 'analiz'
    },
    {
      id: 9,
      name: 'shema'
    },
  ],
  startNavbarPage: 3,
  currentNavbarPage: 1,
  currentTab: 0,
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
          correct: false,
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
      titleDesc: 'Возможно несколько вариантов ответа',
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
      // console.log(el, this.currentPage);
      if (el.id == this.currentPage) res = false
    })

    return res
  },
  nextPage() {
    if (this.validatedScroll()) {
      this.currentPage++
    } else {
      this.modalClassActual = this.pagesWithValidation.find(el => el.id === this.currentPage).name
      this.onModal()
    }
  },
  prevPage() {
    this.currentPage--
  },
  setTab(i) {
    this.currentTab = i
  },
  onModal(type) {
    bodyDOM.style.overflow = 'hidden'
    this.modalTomography = type
    this.showModal = true

    if (type == 'mrt' || type == 'sled') {
      setTimeout(() => {
        this.swiperInstance = initSwiper(type)
      }, 100)
    }
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
  modalClasses() {
    return ['modal-' + this.modalClassActual]
  },
  modalClassSize() {
    return ['modal-' + this.modalSize]
  }
})

createApp({
  finishedPage: 11,
  listNav: [
    'Жалобы',
    'Анамнез',
    'Неврологический статус',
    'Сопутствующие заболевания',
    'Заключение',
    'Назначения',
    'Рекомендации',
    'Результаты лечения'
  ],
  // tabYears: [
  //   "2007",
  //   "2008-2013",
  //   "2014",
  //   "2015",
  //   "2016-2017",
  //   "2018",
  //   "2019-2021"
  // ],
  listTab: [
    {
      "year": "2007",
      "ul": [
        "Дебют заболевания со слов пациентки",
        "РБН слева",
        "МРТ ГМ единичный очаг в левом семиовальном центре",
        "Стационарное лечение с полным восстановлением зрения"
      ],
      "desc": null,
      "footnote": "РБН - ретробульбарный неврит, \nМРТ ГМ – магнитно-резонансная томография головного мозга"
    },
    {
      "year": "2008-2013",
      "ul": [
        "Эпизодически шаткость при ходьбе, ",
        "головные боли, ",
        "онемение в руках, ",
        "к врачу не обращалась"
      ],
      "desc": null,
      "footnote": null
    },
    {
      "year": "2014",
      "ul": [
        "Боль при движении в правом глазу, головная боль, снижение остроты зрения.",
        "МРТ ГМ от 22.01.14г: множественные очаги демиелинизации",
        "февраль 2014г - пульс-терапия метилпреднизолоном*, суммарно 5г (+). После пятой инфузии метилпреднизолона развился отек гортани, шеи, трудности при глотании, расцененные как аллергическая реакция",
        "С февраля 2014г назначен глатирамера ацетат**, переносимость хорошая",
        "Июнь 2014 - Обострение в виде нарастания шаткости при ходьбе, слабости в ногах, курс сосудисто-метаболической терапии, с положительной динамикой"
      ],
      "desc": null,
      "footnote": "МРТ ГМ – магнитно-резонансная томография головного мозга \n * https://grls.rosminzdrav.ru/Grls_View_v2.aspx?routingGuid=9def3152-83f5-46be-9aed-7d028b2e63df \n** https://grls.rosminzdrav.ru/Grls_View_v2.aspx?routingGuid=3a99c0bc-b69c-4d16-9ea6-1e99fc6a612d"
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
        "МРТ ГМ - многоочаговое поражение демиелинизирующего характера, оценки динамики и КУ в дальнейшем не проводилось  в связи с весом пациентки выше доспустимого для аппарата (более 120кг)"
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

  store
}).mount()


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