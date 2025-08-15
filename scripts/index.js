document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // EDITAR PERFIL (modal #1)
  // =========================
  const editButton = document.querySelector('.user__edit_button');
  const modalEdit = document.querySelector('.modal:not(.modal-add-place):not(.modal-image-preview)');
  const formEdit = document.querySelector('.edit-form');
  const closeButtonEdit = modalEdit.querySelector('.modal__close');

  const nameElement = document.querySelector('.user__name');
  const bioElement = document.querySelector('.user__bio');

  const inputName = formEdit.querySelectorAll('.edit-form__input')[0];
  const inputBio  = formEdit.querySelectorAll('.edit-form__input')[1];

  editButton.addEventListener('click', () => {
    const nameText = nameElement.childNodes[0].nodeValue.trim();
    const bioText  = bioElement.textContent.trim();
    inputName.value = nameText;
    inputBio.value  = bioText;
    modalEdit.classList.remove('hidden');
  });

  formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    nameElement.childNodes[0].nodeValue = inputName.value + ' ';
    bioElement.textContent = inputBio.value;
    modalEdit.classList.add('hidden');
  });

  closeButtonEdit.addEventListener('click', () => {
    modalEdit.classList.add('hidden');
  });

  modalEdit.addEventListener('click', (e) => {
    if (e.target === modalEdit) modalEdit.classList.add('hidden');
  });

  // =========================
  // AGREGAR LUGAR (modal #2)
  // =========================
  const addButton          = document.querySelector('.user__bio_button');
  const modalAddPlace      = document.querySelector('.modal-add-place');
  const closeButtonAdd     = document.querySelector('.modal-add-place__close');
  const formAddPlace       = document.querySelector('.add-form');
  const inputPlaceName     = formAddPlace.querySelectorAll('.add-form__input')[0];
  const inputPlaceUrl      = formAddPlace.querySelectorAll('.add-form__input')[1];
  const galleryContainer   = document.querySelector('.gallery');

  addButton.addEventListener('click', () => {
    inputPlaceName.value = '';
    inputPlaceUrl.value  = '';
    modalAddPlace.classList.remove('hidden');
  });

  closeButtonAdd.addEventListener('click', () => {
    modalAddPlace.classList.add('hidden');
  });

  modalAddPlace.addEventListener('click', (e) => {
    if (e.target === modalAddPlace) modalAddPlace.classList.add('hidden');
  });

  formAddPlace.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (inputPlaceName.value || '').trim();
    const url   = (inputPlaceUrl.value  || '').trim();
    if (!title || !url) return;

    const card = document.createElement('div');
    card.className = 'gallery__item';
    card.innerHTML = `
      <button class="card__delete-button">
        <img src="images/delete.svg" alt="Eliminar tarjeta">
      </button>
      <img class="gallery__image" src="${url}" alt="${title}">
      <div class="gallery__info">
        <p class="gallery__title">${title}</p>
        <button class="gallery__button gallery__button_like"></button>
      </div>
    `;
    galleryContainer.prepend(card);
    modalAddPlace.classList.add('hidden');
  });

  // ================================
  // GALERÍA: eliminar / like / preview
  // ================================

  galleryContainer.addEventListener('click', (e) => {
    // Eliminar
    const delBtn = e.target.closest('.card__delete-button');
    if (delBtn) {
      e.stopPropagation();
      const card = delBtn.closest('.gallery__item');
      if (card) card.remove();
      return;
    }

    // Like (ambas clases)
    const likeBtn =
      e.target.closest('.gallery__button_like') ||
      e.target.closest('.gallery__like_button');
    if (likeBtn) {
      likeBtn.classList.toggle('active');
      return;
    }

    // Vista previa de imagen
    const img = e.target.closest('.gallery__image');
    if (img) {
      const card  = img.closest('.gallery__item');
      const title = card?.querySelector('.gallery__title')?.textContent?.trim() || '';

      const imageModal = document.querySelector('.modal-image-preview');
      const imageModalImg = imageModal.querySelector('.modal-image-preview__img');
      const imageModalCaption = imageModal.querySelector('.modal-image-preview__caption');

      imageModalImg.src = img.src;
      imageModalImg.alt = img.alt || title;
      imageModalCaption.textContent = title;
      imageModal.classList.remove('hidden');
    }
  });

  // =========================
  // Cierre del modal de imagen
  // =========================
  const imageModal = document.querySelector('.modal-image-preview');
  const imageModalCloseBtn = imageModal.querySelector('.modal-image-preview__close');

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.classList.add('hidden');
  });

  imageModalCloseBtn.addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  // =========================
  // Cerrar cualquier modal con ESC
  // =========================
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!modalEdit.classList.contains('hidden')) modalEdit.classList.add('hidden');
    if (!modalAddPlace.classList.contains('hidden')) modalAddPlace.classList.add('hidden');
    if (!imageModal.classList.contains('hidden')) imageModal.classList.add('hidden');
  });
});

// =========================
// LIKE usando iconos <img>
// =========================
document.querySelectorAll('.gallery__button_like').forEach(button => {
  button.addEventListener('click', () => {
    const icon = button.querySelector('.gallery__like-icon');
    const currentSrc = icon.getAttribute('src');

    if (currentSrc === 'images/heartbutton.svg') {
      icon.setAttribute('src', 'images/heartactive.png');
    } else if (currentSrc === 'images/heartactive.png') {
      icon.setAttribute('src', 'images/heartbutton.svg');
    }
  });
});
