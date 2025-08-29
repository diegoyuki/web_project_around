import { openModal } from './utils.js';

export default class Card {
  constructor({ title, imageUrl }, templateSelector) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.gallery__item');
    return template.cloneNode(true);
  }

  _handleLikeClick(likeBtn, likeIcon) {
    const currentSrc = likeIcon.getAttribute('src');
    if (currentSrc === 'images/heartbutton.svg') {
      likeIcon.setAttribute('src', 'images/heartactive.png');
    } else {
      likeIcon.setAttribute('src', 'images/heartbutton.svg');
    }
  }

  _handleDeleteClick(cardElement) {
    cardElement.remove();
  }

  _handleImageClick() {
    const imageModal = document.querySelector('.modal-image-preview');
    const imageModalImg = imageModal.querySelector('.modal-image-preview__img');
    const imageModalCaption = imageModal.querySelector('.modal-image-preview__caption');

    imageModalImg.src = this._imageUrl;
    imageModalImg.alt = this._title;
    imageModalCaption.textContent = this._title;

    openModal(imageModal);
  }

  _setEventListeners(cardElement) {
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.gallery__button_like');
    const likeIcon = cardElement.querySelector('.gallery__like-icon');
    const image = cardElement.querySelector('.gallery__image');

    deleteBtn.addEventListener('click', () => this._handleDeleteClick(cardElement));
    likeBtn.addEventListener('click', () => this._handleLikeClick(likeBtn, likeIcon));
    image.addEventListener('click', () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    const img = this._element.querySelector('.gallery__image');
    const title = this._element.querySelector('.gallery__title');

    img.src = this._imageUrl;
    img.alt = this._title;
    title.textContent = this._title;

    this._setEventListeners(this._element);

    return this._element;
  }
}