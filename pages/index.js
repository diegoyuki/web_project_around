import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'f84d45fc-8ca5-429d-943f-7b066554a10c',
    'Content-Type': 'application/json'
  }
});

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

  const userInfo = new UserInfo({
    nameSelector: '.user__name',
    bioSelector: '.user__bio',
    avatarSelector: '.profile__avatar'
  });

  const popupConfirm = new PopupWithConfirmation('.modal-confirm');
  popupConfirm.setEventListeners();

  const editProfilePopup = new PopupWithForm('.modal-edit', (formData) => {
    const name = formData['user-name'];
    const about = formData['user-bio'];
    editProfilePopup.renderLoading(true);

    api.updateUserInfo({ name, about })
      .then((updatedData) => {
        userInfo.setUserInfo({ name: updatedData.name, bio: updatedData.about });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.error('Error al actualizar perfil:', err);
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  });
  editProfilePopup.setEventListeners();

  const addCardPopup = new PopupWithForm('.modal-add-place', (formData) => {
    const name = formData['place-name'];
    const link = formData['place-url'];
    addCardPopup.renderLoading(true);

    api.addCard({ name, link })
      .then((newCardData) => {
        const cardElement = createCard({
          title: newCardData.name,
          imageUrl: newCardData.link,
          id: newCardData._id,
          ownerId: newCardData.owner,
          isLiked: newCardData.isLiked
        });
        section.addItem(cardElement);
        addCardPopup.close();
      })
      .catch(err => console.error('Error al agregar tarjeta:', err))
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  });
  addCardPopup.setEventListeners();

  const editAvatarPopup = new PopupWithForm('.modal-edit-avatar', (formData) => {
    const avatarUrl = formData['avatar-url'];
    editAvatarPopup.renderLoading(true);

    api.updateAvatar({ avatar: avatarUrl })
      .then((updatedUser) => {
        document.querySelector('.profile__avatar').src = updatedUser.avatar;
        editAvatarPopup.close();
      })
      .catch(err => console.error('Error al actualizar avatar:', err))
      .finally(() => {
        editAvatarPopup.renderLoading(false);
      });
  });
  editAvatarPopup.setEventListeners();

  const section = new Section({
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    }
  }, '.gallery');

  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log('Número de tarjetas recibidas:', cards.length);
    console.log('Tarjetas recibidas:', cards);
    userInfo.setUserInfo({
      name: userData.name,
      bio: userData.about
    });
    document.querySelector('.profile__avatar').src = userData.avatar;
    window.currentUserId = userData._id;

    section.renderItems(cards.map(card => ({
      title: card.name,
      imageUrl: card.link,
      id: card._id,
      ownerId: card.owner,
      isLiked: card.isLiked
    })));
  })
  .catch((err) => {
    console.error('Error al cargar datos:', err);
  });

  function createCard(cardData) {
  const card = new Card(
    cardData,
    '#card-template',
    (title, imageUrl) => popupImage.open(title, imageUrl),
    (cardId, cardElement) => {
      popupConfirm.open(() => {
        api.deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            popupConfirm.close();
          })
          .catch(err => console.error('Error al eliminar tarjeta:', err));
      });
    },
    (cardId, isLiked) => {
      if (!isLiked) {
        return api.likeCard(cardId);
      } else {
        return api.unlikeCard(cardId);
      }
    }
  );
  return card.generateCard();
}

  document.querySelector('.user__edit_button').addEventListener('click', () => {
    const { name, bio } = userInfo.getUserInfo();
    document.querySelector('[name="user-name"]').value = name;
    document.querySelector('[name="user-bio"]').value = bio;
    editProfilePopup.open();
  });

  document.querySelector('.user__bio_button').addEventListener('click', () => {
    addCardPopup.open();
  });

  document.querySelector('.user__avatar-edit-button').addEventListener('click', () => {
    editAvatarPopup.open();
  });
});
