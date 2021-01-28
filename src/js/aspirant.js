/// gifs

const gifs = [...document.querySelectorAll('.aspirant-info__titles > img')]
const titles = [...document.querySelectorAll('.aspirant-info__titles > h3')]

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
