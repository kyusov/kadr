import { Swiper, Pagination } from 'swiper'

Swiper.use([Pagination])

new Swiper('.swiper-container', {
  loop: true,
  updateOnWindowResize: true,
  speed: 400,
  slidesPerView: 3,
  spaceBetween: 18,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
})
