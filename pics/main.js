const image = 'https://gradle.org/images/gradle-400x400.png'

const imagePortions = [
  `url(${image}) 0 0`,
  `url(${image}) -200px 0`,
  `url(${image}) 0 200px`,
  `url(${image}) 200px 200px`
]

const draggablesContainer = document.querySelector('#draggables')
imagePortions.forEach((image, index) => {
  const el = `<div id=${index +
    1} class='draggable' style='background: ${image}'></div>`
  draggablesContainer.insertAdjacentHTML('beforeend', el)
})
