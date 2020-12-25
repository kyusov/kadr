import { Swiper, Pagination, Navigation } from 'swiper'
import './burger'
import './modal'

const DG = require('2gis-maps')

Swiper.use([Pagination, Navigation])

new Swiper('.swiper-events', {
  loop: true,
  updateOnWindowResize: true,
  speed: 400,
  slidesPerView : 3,
  slidesPerGroup: 3,
  centeredSlides: true,
  spaceBetween: 20,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    319: {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      loopedSlides: 1,
      spaceBetween: 10,
    },
    424: {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      loopedSlides: 1,
      spaceBetween: 50
    },
    640: {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      loopedSlides: 1,
      spaceBetween: 200
    },
    769: {
      // slidesPerView: 'auto',
      slidesPerGroup: 1,
      loopedSlides: 2,
      spaceBetween: 50
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      loopedSlides: 2,
      spaceBetween: 20
    }
  }
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
  breakpoints: {
    319: {
      spaceBetween: 102
    },
    420: {
      spaceBetween: 70
    },
    640: {
      spaceBetween: 30
    }
  }
})

/// map 2gis

DG.then(function () {
  const map = DG.map('map-contacts', {
    center: [52.283436, 104.296835],
    zoom: 17,
    fullscreenControl: false,
    zoomControl: false,
  })

  DG.marker([52.283436, 104.296835]).addTo(map)
})

/// end map

/// hover main title

const popupShow = (classname, element, event) => {
  element.classList.toggle('active')
}

const popupHide = (classname, element, event) => {
  element.classList.toggle('active')
}

const popupWindows = [
  document.querySelector('.decoy__popup-aspirant'),
  document.querySelector('.decoy__popup-employer'),
]

const spans = [...document.querySelectorAll('.decoy__title span')]
for (let i = 0; i < spans.length; i++) {
  spans[i].addEventListener(
    'mouseenter',
    popupShow.bind(this, 'active', popupWindows[i])
  )
  spans[i].addEventListener(
    'mouseleave',
    popupHide.bind(this, 'active', popupWindows[i])
  )
}

/// hover main title end

/// gifs

const gifs = [
  ...document.querySelectorAll('.aspirant-info__titles > img'),
  ...document.querySelectorAll('.employer-info__titles > img'),
]
const titles = [
  ...document.querySelectorAll('.aspirant-info__titles > h3'),
  ...document.querySelectorAll('.employer-info__titles > h3'),
]

for (let i = 0; i < titles.length; i++) {
  titles[i].addEventListener('mouseenter', () => {
    titles[i].classList.toggle('active')
    gifs[i].classList.toggle('active')
  })

  titles[i].addEventListener('mouseleave', () => {
    titles[i].classList.toggle('active')
    gifs[i].classList.toggle('active')
  })
}

/// gifs end

/// arrow to top

const arrowHandler = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

document.querySelector('.sidebar__arrow-top').addEventListener('click', arrowHandler)