import gallery from './app.js'


const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    lightboxContent: document.querySelector('.lightbox__content'),
    lightboxImage: document.querySelector('.lightbox__image'),
    closeButton: document.querySelector('[data-action="close-lightbox"]'),
}

const galleryList = createGalleryList(gallery)
refs.gallery.insertAdjacentHTML("afterbegin", galleryList)
function createGalleryList() {
  return gallery.map(({preview, original, description}) => {
    return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
  })
    .join("")
}
// console.log(galleryList);


refs.gallery.addEventListener("click", onGalleryItemClick)
refs.closeButton.addEventListener("click", onCloseModal)
refs.lightboxOverlay.addEventListener("click", onOverlayClick)

function onGalleryItemClick(evt) {
    evt.preventDefault()
    if (!evt.target.classList.contains("gallery__image")) {
     return;
    }
    onOpenModal()
    getAttributeImage(evt.target.dataset.source, evt.target.alt)
}
    
 function onOpenModal() {
  window.addEventListener("keydown", onEscKeyPress)
  refs.lightbox.classList.add("is-open")
}
    
function getAttributeImage(src, alt) {
  refs.lightboxImage.src = src
  refs.lightboxImage.alt = alt
    
}


function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress)
  refs.lightbox.classList.remove("is-open")
  getAttributeImage('','')
}


function onOverlayClick(event) {
  if (event.currentTarget === event.target)
    console.log("fff");
  onCloseModal()
}

function onEscKeyPress(event) {
  console.log(event);
  if (event.code === 'Escape')
  onCloseModal()
}

