import { Swiper, Pagination, Navigation } from 'swiper'
const DG = require('2gis-maps')

Swiper.use([Pagination, Navigation])

new Swiper('.swiper-events', {
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

new Swiper('.partners-swiper', {
  direction: 'vertical',
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 102,
  updateOnWindowResize: true,
  speed: 400,
  navigation: {
    nextEl: '.swiper-button-next',
  },
})

DG.then(function () {
  const map = DG.map('map-contacts', {
    center: [52.283734, 104.296072],
    zoom: 17,
    fullscreenControl: false,
    zoomControl: false,
  })

  DG.marker([52.283734, 104.296072]).addTo(map)
})
