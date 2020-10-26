import { Swiper, Pagination, Navigation } from 'swiper'
const DG = require('2gis-maps')

Swiper.use([Pagination, Navigation])

new Swiper('.swiper-events', {
  loop: true,
  updateOnWindowResize: true,
  speed: 400,
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 20,
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
    center: [52.283436, 104.296835],
    zoom: 17,
    fullscreenControl: false,
    zoomControl: false,
  })

  DG.marker([52.283436, 104.296835]).addTo(map)
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

/// burger

const burgerHandler = (dropdown, event) => {
  const parent = event.target.classList.contains('burger')
    ? event.target
    : event.target.parentElement

  const spans = [...parent.children]

  if (!parent.classList.contains('active')) {
    parent.classList.toggle('active')

    dropdown.style.transform = 'translateY(0)'
 
    spans.map((e) => {
      e.style.margin = 0
      e.style.backgroundColor = 'white'
    })

    parent.style.borderColor = 'white'

    spans[1].style.opacity = 0

    spans[0].style.transform = 'rotate(45deg)'
    spans[2].style.transform = 'rotate(-45deg)'
  } else {
    parent.classList.toggle('active')

    dropdown.style.transform = 'translateY(-150%)'

    spans.map((e) => (e.style.backgroundColor = '#D40F14'))

    parent.style.borderColor = '#D40F14'

    spans[0].style.transform = 'translate(0, 0) rotate(0deg)'
    spans[1].style.opacity = 1
    spans[2].style.transform = 'translate(0, 0) rotate(0deg)'

    spans[0].style.marginBottom = '0.875rem'
    spans[2].style.marginTop = '0.875rem'
  }
}

const burger = document.querySelector('.burger')
const dropdown = document.querySelector('.dropdown')

burger.addEventListener('click', burgerHandler.bind(this, dropdown))

/// burger end


/// gifs

const gifs = [...document.querySelectorAll('.aspirant-info__titles > img'), ...document.querySelectorAll('.employer-info__titles > img')]
const titles = [...document.querySelectorAll('.aspirant-info__titles > h3'), ...document.querySelectorAll('.employer-info__titles > h3')]

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