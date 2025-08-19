document.addEventListener('DOMContentLoaded', () => {

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

  galleryContainer.addEventListener('click', (e) => {
   
    const delBtn = e.target.closest('.card__delete-button');
    if (delBtn) {
      e.stopPropagation();
      const card = delBtn.closest('.gallery__item');
      if (card) card.remove();
      return;
    }

    const likeBtn =
      e.target.closest('.gallery__button_like') ||
      e.target.closest('.gallery__like_button');
    if (likeBtn) {
      likeBtn.classList.toggle('active');
      return;
    }

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

  const imageModal = document.querySelector('.modal-image-preview');
  const imageModalCloseBtn = imageModal.querySelector('.modal-image-preview__close');

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.classList.add('hidden');
  });

  imageModalCloseBtn.addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!modalEdit.classList.contains('hidden')) modalEdit.classList.add('hidden');
    if (!modalAddPlace.classList.contains('hidden')) modalAddPlace.classList.add('hidden');
    if (!imageModal.classList.contains('hidden')) imageModal.classList.add('hidden');
  });
});

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

function validateForm(form) {
  const inputs = Array.from(form.querySelectorAll('.form-validator__input'));
  const submitBtn = form.querySelector('.form-validator__submit');

  function checkInput(input) {
    const errorElement = form.querySelector(`.${input.name}-error`);
    errorElement.textContent = input.validity.valid ? '' : input.validationMessage;
  }

  function toggleButtonState() {
    const allValid = inputs.every(input => input.validity.valid);
    if (allValid) {
      submitBtn.disabled = false;
      submitBtn.classList.add('form-validator__submit_enabled');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('form-validator__submit_enabled');
    }
  }

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInput(input);
      toggleButtonState();
    });
  });

  toggleButtonState();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.form-validator').forEach(validateForm);

  const openEditModal = document.querySelector('.user__edit_button');
  const modalEdit = document.querySelector('.modal-edit');
  openEditModal.addEventListener('click', () => {
    modalEdit.classList.remove('hidden');
    validateForm(modalEdit.querySelector('.form-validator'));
  });

  const openAddModal = document.querySelector('.user__bio_button');
  const modalAdd = document.querySelector('.modal-add-place');
  openAddModal.addEventListener('click', () => {
    modalAdd.classList.remove('hidden');
    const form = modalAdd.querySelector('.form-validator');
    form.querySelectorAll('.form-validator__input').forEach(i => i.value = '');
    form.querySelectorAll('.form-validator__error').forEach(e => e.textContent = '');
    const btn = form.querySelector('.form-validator__submit');
    btn.disabled = true;
    btn.classList.remove('form-validator__submit_enabled');
    validateForm(form);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const addModal = document.querySelector('.modal-add-place');
  const addForm = addModal.querySelector('.add-form');
  const inputs = Array.from(addForm.querySelectorAll('[data-validate]'));
  const submitBtn = addForm.querySelector('button[type="submit"]');

  function checkInputValidity(input) {
    const errorEl = addForm.querySelector(`.${input.name}-error`);
    if (!input.validity.valid) {
      input.classList.add('add-form__input-invalid');
      errorEl.textContent = input.validationMessage;
    } else {
      input.classList.remove('add-form__input-invalid');
      errorEl.textContent = '';
    }
  }

  function toggleSubmitBtn() {
    const allValid = inputs.every(i => i.validity.valid);
    submitBtn.disabled = !allValid;
  }

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      toggleSubmitBtn();
    });
  });

  document.querySelector('.user__bio_button').addEventListener('click', () => {
    inputs.forEach(i => {
      i.value = '';
      checkInputValidity(i);
    });
    toggleSubmitBtn();
  });

  const editModal = document.querySelector('.modal:not(.modal-add-place):not(.modal-image-preview)');
  const editForm = editModal.querySelector('.edit-form');
  const editInputs = Array.from(editForm.querySelectorAll('input'));
  const editBtn = editForm.querySelector('button[type="submit"]');

  function checkEditInput(input) {
  }

  function toggleEditBtn() {
    const allValid = editInputs.every(i => i.validity.valid);
    editBtn.disabled = !allValid;
  }

  editInputs.forEach(i => i.addEventListener('input', () => {
    toggleEditBtn();
  }));

  document.querySelector('.user__edit_button').addEventListener('click', () => {
    editInputs.forEach(i => {
      i.value = '';
    });
    toggleEditBtn();
  });
});

