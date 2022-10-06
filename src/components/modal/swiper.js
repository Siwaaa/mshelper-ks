import Swiper, { Lazy, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

Swiper.use([Lazy, Pagination, Navigation])

export function initSwiper(type) {
  if (type == 'mrt') {
    return new Swiper('.swiper__mrt', {
      slidesPerView: 3,
      spaceBetween: 30,
      grabCursor: true,
      // centerInsufficientSlides: true,
      // centeredSlides: true,
      // centeredSlidesBounds: true,
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
        el: ".swiper__mrt_pagi",
      },
    });
  }
  
  if (type== 'sled') { 
    return new Swiper('.swiper__sled', {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true,
    // centerInsufficientSlides: true,
    // centeredSlides: true,
    // centeredSlidesBounds: true,
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