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
    1} class='draggable' style='background: ${image}' draggable='true'></div>`
  draggablesContainer.insertAdjacentHTML('beforeend', el)
})

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
