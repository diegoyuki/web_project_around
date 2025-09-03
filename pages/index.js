import Section from '../components/Section.js';
import Card from '../components/card.js'; 
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const initialCards = [
  { title: 'Valle de Yosemite', imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg' },
  { title: 'Lago Louise', imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg' },
  { title: 'Montañas Calvas', imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg' },
  { title: 'Latemar', imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg' },
  { title: 'Vanois National...', imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg' },
  { title: 'Lago di Braies', imageUrl: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg' }
];

document.addEventListener('DOMContentLoaded', () => {
  const validatorConfig = {
    inputSelector: '.form-validator__input',
    submitButtonSelector: '.form-validator__submit',
    submitButtonActiveClass: 'form-validator__submit_enabled',
    inputErrorClass: 'add-form__input-invalid'
  };

  document.querySelectorAll('.form-validator').forEach(form => {
    const validator = new FormValidator(validatorConfig, form);
    validator.enableValidation();
  });

  const popupImage = new PopupWithImage('.modal-image-preview');
  popupImage.setEventListeners();

  const section = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card-template', (title, imageUrl) => {
        popupImage.open(title, imageUrl);
      });
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    }
  }, '.gallery');

  section.renderItems();

  const userInfo = new UserInfo({
    nameSelector: '.user__name',
    bioSelector: '.user__bio'
  });

  const editProfilePopup = new PopupWithForm('.modal-edit', (formData) => {
    userInfo.setUserInfo({ name: formData['user-name'], bio: formData['user-bio'] });
    editProfilePopup.close();
  });

  editProfilePopup.setEventListeners();

  const addCardPopup = new PopupWithForm('.modal-add-place', (formData) => {
    const newCard = new Card(
      { title: formData['place-name'], imageUrl: formData['place-url'] },
      '#card-template',
      (title, imageUrl) => popupImage.open(title, imageUrl)
    );
    section.addItem(newCard.generateCard());
    addCardPopup.close();
  });

  addCardPopup.setEventListeners();

  document.querySelector('.user__edit_button').addEventListener('click', () => {
    const { name, bio } = userInfo.getUserInfo();
    document.querySelector('[name="user-name"]').value = name;
    document.querySelector('[name="user-bio"]').value = bio;
    editProfilePopup.open();
  });

  document.querySelector('.user__bio_button').addEventListener('click', () => {
    addCardPopup.open();
  });
});