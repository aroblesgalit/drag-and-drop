const image =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmGMgKmDpvLrXnhk3SiwVwqjsjfxDxBM8EQ&usqp=CAU'

const imagePortions = [
  `url(${image}) 0 0`,
  `url(${image}) -100px 0`,
  `url(${image}) 0 100px`,
  `url(${image}) 100px 100px`
]

const shuffledImages = []

const draggablesContainer = document.querySelector('#draggables')
function shuffleImages () {
  imagePortions.forEach((image, index) => {
    const el = `<div id=${index +
      1} class='draggable' style='background: ${image}' draggable='true'></div>`
    shuffledImages.push(el)
  })
  // While there remain elements to shuffle
  let curIndex = shuffledImages.length,
    randIndex
  while (curIndex != 0) {
    // Pick a remaining element
    randIndex = Math.floor(Math.random() * curIndex)
    curIndex--
    // And swap it with the current element
    ;[shuffledImages[curIndex], shuffledImages[randIndex]] = [
      shuffledImages[randIndex],
      shuffledImages[curIndex]
    ]
  }
  shuffledImages.forEach(image => {
    draggablesContainer.insertAdjacentHTML('beforeend', image)
  })
}
shuffleImages()

const draggableElements = document.querySelectorAll('.draggable')
const droppableElements = document.querySelectorAll('.droppable')

draggableElements.forEach(elem => {
  elem.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text', e.target.id)
  })
})

droppableElements.forEach(elem => {
  elem.addEventListener('dragenter', e => {
    e.target.classList.add('droppable-hover')
  })

  elem.addEventListener('dragover', e => {
    e.preventDefault()
  })

  elem.addEventListener('dragleave', e => {
    e.target.classList.remove('droppable-hover')
  })

  elem.addEventListener('drop', e => {
    e.preventDefault()
    e.target.classList.remove('droppable-hover')
    const draggableElementId = e.dataTransfer.getData('text')
    const droppableElementId = e.target.getAttribute('data-draggable-id')
    if (draggableElementId === droppableElementId) {
      e.target.classList.add('dropped')
      const draggableElement = document.getElementById(draggableElementId)
      draggableElement.classList.add('dragged')
      draggableElement.setAttribute('draggable', false)
      e.target.insertAdjacentHTML(
        'afterbegin',
        `<div class='dragged-draggable' style='background: ${
          imagePortions[draggableElementId - 1]
        }'></div>`
      )
    }
  })
})
