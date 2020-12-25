const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

const close = () => {
  document.body.style.overflow = 'initial'
  
  modal.style.opacity = 0
  overlay.style.opacity = 0

  setTimeout(() => {
    modal.style.display = 'none'
    overlay.style.display = 'none'
  }, 500)
}

const open = () => {
  document.body.style.overflow = 'hidden'

  modal.style.display = 'block'
  overlay.style.display = 'block'

  setTimeout(() => {
    modal.style.opacity = 1
    overlay.style.opacity = 1
  }, 100)
}

const closeBtn = document.querySelector('.modal__close')
const openBtn = document.querySelector('.about__right button')

overlay.addEventListener('click', close)
closeBtn.addEventListener('click', close)
openBtn.addEventListener('click', open)