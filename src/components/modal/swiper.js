import Swiper, { Lazy, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

Swiper.use([Lazy, Pagination, Navigation])

export function initSwiper(type) {
  if (type == 'mrt') {
    return new Swiper('.swiper__mrt', {
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      centerInsufficientSlides: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
      watchSlidesProgress: true,
      preloadImages: false,
      lazy: {
        enabled: true,
        checkInView: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        650: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // when window width is >= 1100px
        1100: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      },
      navigation: {
        nextEl: '.swiper-button-next-mrt',
        prevEl: '.swiper-button-prev-mrt',
      },
      pagination: {
        el: ".swiper__mrt_pagi",
      },
    });
  }
  
  if (type == 'sled') { 
    return new Swiper('.swiper__sled', {
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      centerInsufficientSlides: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
      watchSlidesProgress: true,
      preloadImages: false,
      lazy: {
        enabled: true,
        checkInView: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        // when window width is >= 1100px
        1100: {
          slidesPerView: 'auto',
          spaceBetween: 100,
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: ".swiper__sled_pagi",
        clickable: true
      },
      on: {
        activeIndexChange: function () {
          if(this.activeIndex > 0) {
            document.getElementById('modal-t-title').innerHTML = 'Анализы 2019-2020'
          } else {
            document.getElementById('modal-t-title').innerHTML = 'Динамика по шкале EDSS'
          }
        }
      }
    })
  }

  if (type == 'analiz') { 
    return new Swiper('.analyzes-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      watchSlidesProgress: true,
      pagination: {
        el: ".analyzes-swiper__pagi",
      },
    })
  }

  if (type == 'shema') { 
    return new Swiper('.shema-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      watchSlidesProgress: true,
      pagination: {
        el: ".shema-swiper__pagi",
      },
    })
  }

  if (type == 'swiper-mrt-2021') { 
    return new Swiper('#swiper-mrt-2021', {
      slidesPerView: 1,
      spaceBetween: 30,
      nested: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next-2021',
        prevEl: '.swiper-button-prev-2021',
      },
      pagination: {
        el: ".swiper__mrt__item-pagination",
        clickable: true
      },
      on: {
        click: function (s, e) {
          const instance = basicLightbox.create(`
            <img 
              style="width: 100%; object-fit: contain;" 
              src="${e.target.getAttribute("src")}"
            >
          `)
          instance.show()
        }
      }
    })
  }

  if (type == 'swiper-mrt-2022') { 
    return new Swiper('#swiper-mrt-2022', {
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      nested: true,
      watchSlidesProgress: true,
      pagination: {
        el: ".swiper__mrt__item-pagination",
        clickable: true
      },
    })
  } 
}