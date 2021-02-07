import { Swiper, Pagination, Navigation, Mousewheel } from 'swiper'
import './burger'
import './modal'
import './map'

Swiper.use([Pagination, Navigation, Mousewheel])

new Swiper('.swiper-events', {
  loop: true,
  updateOnWindowResize: true,
  speed: 400,
  slidesPerView: 3,
  slidesPerGroup: 3,
  centeredSlides: true,
  spaceBetween: 20,
  grabCursor: true,
  mousewheelControl: true,
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
      spaceBetween: 50,
    },
    640: {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      loopedSlides: 1,
      spaceBetween: 200,
    },
    769: {
      // slidesPerView: 'auto',
      slidesPerGroup: 1,
      loopedSlides: 2,
      spaceBetween: 50,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      loopedSlides: 2,
      spaceBetween: 20,
    },
  },
})

new Swiper('.partners-swiper', {
  direction: 'vertical',
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 102,
  grabCursor: true,
  updateOnWindowResize: true,
  speed: 400,
  mousewheel: {
    eventsTarget: '.partners-swiper',
    releaseOnEdges: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
  },
  breakpoints: {
    319: {
      spaceBetween: 102,
    },
    420: {
      spaceBetween: 70,
    },
    640: {
      spaceBetween: 30,
    },
  },
})

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
  spans[i].addEventListener('mouseenter', popupShow.bind(this, 'active', popupWindows[i]))
  spans[i].addEventListener('mouseleave', popupHide.bind(this, 'active', popupWindows[i]))
}

/// hover main title end

/// arrow to top

const arrowHandler = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

document.querySelector('.sidebar__arrow-top').addEventListener('click', arrowHandler)

/// anchors
window.onload = () => {
  const burgerLinks = [...document.querySelectorAll('.dropdown__item a')].filter((e) => {
    if (e.getAttribute('href').includes('#')) return e
  })

  for (let i = 0; i < burgerLinks.length; i++) {
    burgerLinks[i].addEventListener('click', () => {
      if (document.querySelector('.dropdown').style.transform.includes('0px')) {
        const burger = document.querySelector('.burger')
        burger.dispatchEvent(new Event('click'))
      }
    })
  }

  window.onhashchange = () => {
    window.scrollTo({
      top: document.querySelector(`.${window.location.hash.substring(1)}`).offsetTop,
      behavior: 'smooth',
    })
  }

  if (window.location.hash) {
    window.scrollTo({
      top: document.querySelector(`.${window.location.hash.substring(1)}`).offsetTop,
      behavior: 'smooth',
    })
  }
}
