import Swiper from 'swiper'
import './burger'

const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

const table = document.querySelector('.calendar__tbody')
const swiperContainer = document.querySelector('.swiper-wrapper')

const createSwiper = () => {
  const mySwiper = document.querySelector('.swiper-container').swiper

  if (mySwiper) {
    mySwiper.destroy()
  }

  new Swiper('.calendar-swiper', {
    direction: 'vertical',
    slidesPerView: 1,
    updateOnWindowResize: true,
    speed: 500,
  })

  console.log(Math.round(swiperContainer.children.length / 2) )

  swiperContainer.style.opacity = 1
}

const drawDays = (year, events) => {
  let arr = [[], [], [], [], []]
  const eventDates = []
  const month = new Date().getMonth()

  for (let i = 0; i < events.length; i++) {
    let prettyMonth = events[i].date.split('-')[1]

    if (prettyMonth.split('0')[0] === '') {
      prettyMonth = prettyMonth.split('0')[1]
    }

    if (+prettyMonth === month + 1) {
      eventDates.push(+events[i].date.split('-')[0])
    }
  }

  const firstDayNextMonth = new Date(year, month + 1, 1)
  const lastDayPrevMonth = new Date(year, month, 0)
  const lastCurrentMonthDate = new Date(year, month + 1, 0)

  let firstDayCurrentMonth = new Date(year, month, 1).getDate()
  let lastDayCurrentMonth = new Date(year, month + 1, 0).getDate()

  if (lastDayPrevMonth.getDay() - 1 !== 6) {
    for (let i = 0, k = lastDayPrevMonth.getDay() - 1; k >= 0; k--, i++) {
      const td = document.createElement('td')
      const span = document.createElement('span')
      td.classList.add('prevMonth')
      td.append(span)
      td.append(lastDayPrevMonth.getDate() - i)
      arr[0][k] = td
    }
  }

  if (lastCurrentMonthDate.getDay() - 1 !== 6) {
    for (let i = 0, k = lastCurrentMonthDate.getDay(); k <= 6; k++, i++) {
      const td = document.createElement('td')
      const span = document.createElement('span')
      td.classList.add('nextMonth')
      td.append(span)
      td.append(firstDayNextMonth.getDate() + i)
      arr[4][k] = td
    }
  }

  for (
    let i = 0, k = lastDayPrevMonth.getDay();
    firstDayCurrentMonth <= lastDayCurrentMonth;
    k++
  ) {
    const td = document.createElement('td')
    const span = document.createElement('span')
    td.classList.add('currentMonth')

    if (eventDates.includes(firstDayCurrentMonth)) {
      td.classList.add('active')
      td.addEventListener(
        'click',
        createSlides.bind(null, events, firstDayCurrentMonth, month)
      )
    }

    td.append(span)
    td.append(firstDayCurrentMonth)

    arr[i][k] = td

    if (k == 6) {
      k = -1
      i++
    }
    firstDayCurrentMonth++
  }

  for (let i = 0; i < arr.length; i++) {
    const tr = document.createElement('tr')
    for (let j = 0; j < arr[0].length; j++) {
      tr.append(arr[i][j])
    }
    table.append(tr)
  }
}

fetch('https://kadr-server.herokuapp.com/data')
  .then((result) => result.json())
  .then((json) => drawDays(2020, json.events))

const createSlides = (events, date, month) => {
  const dates = Object.values(events).filter(
    (e) => +e.date.split('-')[0] === date
  )

  swiperContainer.innerHTML = ''

  const arrayForSliders = []

  for (const key in dates) {
    const slide = document.createElement('div')
    const slideWrapper = document.createElement('div')
    const content = document.createElement('p')
    const buttonWrapper = document.createElement('div')
    const button = document.createElement('button')
    const subTitle = document.createElement('h3')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 52 52')
    svg.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink'
    )
    svg.setAttribute('fill', 'none')
    svg.setAttribute('width', '3.25rem')
    svg.setAttribute('height', '3.25rem')

    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    )
    circle.setAttribute('cx', '26')
    circle.setAttribute('cy', '26')
    circle.setAttribute('r', '24')
    circle.setAttribute('stroke', '#D40F14')
    circle.setAttribute('stroke-width', '4')

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M21 16L32 26.5L21 37')
    path.setAttribute('stroke', '#D40F14')
    path.setAttribute('stroke-width', '4')

    svg.append(circle)
    svg.append(path)

    button.classList.add('calendar-slide__button')
    button.textContent = 'Записаться'
    buttonWrapper.classList.add('calendar-slide__button-wrapper')
    buttonWrapper.append(button)
    buttonWrapper.append(svg)

    content.classList.add('calendar-slide__text')
    content.textContent = dates[key]['text']

    subTitle.classList.add('calendar-slide__subtitle')
    subTitle.textContent = dates[key]['title']

    if (+key === 0) {
      const mainTitle = document.createElement('div')
      mainTitle.classList.add('calendar-slide__title')
      mainTitle.textContent =
        date + ' ' + months.filter((e, index) => index === month)
      slideWrapper.append(mainTitle)
    }

    slide.classList.add('calendar-slide__content-wrapper')
    slideWrapper.classList.add('calendar-slide__wrapper')
    slideWrapper.append(subTitle)
    slideWrapper.append(content)
    slideWrapper.append(buttonWrapper)

    slide.append(slideWrapper)

    console.log(slide)
    arrayForSliders.push(slide)
  }

  // проверить на нчетных значениях
  for (let i = 0; i < arrayForSliders.length; i += 2) {
    if (arrayForSliders.length === 1) {
      const div = document.createElement('div')
      div.append(arrayForSliders[i])
      div.classList.add('swiper-slide', 'calendar-slide')
      swiperContainer.append(div)
      break
    }

    const div = document.createElement('div')
    div.append(arrayForSliders[i])
    div.append(arrayForSliders[i + 1])
    div.classList.add('swiper-slide', 'calendar-slide')
    swiperContainer.append(div)
    
  }

  createSwiper()
}
