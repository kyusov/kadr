const burgerHandler = (dropdown, event) => {
  const parent = event.target.classList.contains('burger')
    ? event.target
    : event.target.parentElement

  const spans = [...parent.children]

  if (!parent.classList.contains('active')) {
    parent.classList.toggle('active')

    dropdown.style.transform = 'translateY(0)'
    document.body.style.overflowY = 'hidden'

    spans.map((e) => {
      e.style.backgroundColor = 'white'
    })

    parent.style.borderColor = 'white'

    spans[0].style.bottom = '1.255rem'
    spans[2].style.top = '1.255rem'
    
    setTimeout(() => {
      spans[0].style.transform = 'rotate(45deg)'
      spans[1].style.opacity = 0
      spans[2].style.transform = 'rotate(-45deg)'
    }, 500)

  } else {
    parent.classList.toggle('active')

    dropdown.style.transform = 'translateY(-250%)'
    document.body.style.overflowY = 'unset'

    spans.map((e) => (e.style.backgroundColor = '#D40F14'))

    parent.style.borderColor = '#D40F14'

    spans[0].style.transform = 'rotate(0deg)'
    spans[1].style.opacity = 1
    spans[2].style.transform = 'rotate(0deg)'

    setTimeout(() => {
      spans[0].style.bottom = '0.875rem'
      spans[2].style.top = '0.875rem'
    }, 500)
  }
}

const burger = document.querySelector('.burger')
const dropdown = document.querySelector('.dropdown')

burger.addEventListener('click', burgerHandler.bind(this, dropdown))
