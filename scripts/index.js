import Card from './card.js';
import FormValidator from './FormValidator.js';
import { openModal, setModalListeners } from './utils.js';

const initialCards = [
  {
    title: 'Valle de Yosemite',
    imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg'
  },
  {
    title: 'Lago Louise',
    imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg'
  },
  {
    title: 'Montañas Calvas',
    imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg'
  },
  {
    title: 'Latemar',
    imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg'
  },
  {
    title: 'Vanois National...',
    imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg'
  },
  {
    title: 'Lago di Braies',
    imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const config = {
    inputSelector: '.form-validator__input',
    submitButtonSelector: '.form-validator__submit',
    submitButtonActiveClass: 'form-validator__submit_enabled',
    inputErrorClass: 'add-form__input-invalid'
  };

  document.querySelectorAll('.form-validator').forEach(form => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
  });

  setModalListeners();

  const gallery = document.querySelector('.gallery');
  initialCards.forEach(cardData => {
    const card = new Card(cardData, '#card-template');
    gallery.appendChild(card.generateCard());
  });

  const addForm = document.querySelector('.add-form');
  const inputPlaceName = addForm.querySelector('[name="place-name"]');
  const inputPlaceUrl = addForm.querySelector('[name="place-url"]');
  const modalAdd = document.querySelector('.modal-add-place');
  const addBtn = document.querySelector('.user__bio_button');

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = inputPlaceName.value.trim();
    const imageUrl = inputPlaceUrl.value.trim();
    if (!title || !imageUrl) return;

    const newCard = new Card({ title, imageUrl }, '#card-template');
    gallery.prepend(newCard.generateCard());
    inputPlaceName.value = '';
    inputPlaceUrl.value = '';
    modalAdd.classList.add('hidden');
  });

  addBtn.addEventListener('click', () => {
    inputPlaceName.value = '';
    inputPlaceUrl.value = '';
    openModal(modalAdd);
  });

  const editBtn = document.querySelector('.user__edit_button');
  const modalEdit = document.querySelector('.modal-edit');
  const formEdit = document.querySelector('.edit-form');
  const inputName = formEdit.querySelector('[name="user-name"]');
  const inputBio = formEdit.querySelector('[name="user-bio"]');
  const nameElement = document.querySelector('.user__name');
  const bioElement = document.querySelector('.user__bio');

  editBtn.addEventListener('click', () => {
    inputName.value = nameElement.childNodes[0].nodeValue.trim();
    inputBio.value = bioElement.textContent.trim();
    openModal(modalEdit);
  });

  formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    nameElement.childNodes[0].nodeValue = inputName.value + ' ';
    bioElement.textContent = inputBio.value;
    modalEdit.classList.add('hidden');
  });
});
