import Swiper, { Lazy, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

Swiper.use([Lazy, Pagination, Navigation])

export function initSwiper(type) {
  if (type == 'mrt') {
    return new Swiper('.swiper__mrt', {
      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      speed: 800,
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
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
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
    speed: 800,
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
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: ".swiper__sled_pagi",
    },
    })
  }

  if (type == 'analiz') { 
    return new Swiper('.analyzes-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    speed: 800,
    watchSlidesProgress: true,
    preloadImages: false,
    lazy: {
      enabled: true,
      checkInView: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: ".swiper__sled_pagi",
    },
    })
  }
}