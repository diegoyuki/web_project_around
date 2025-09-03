export default class Card {
  constructor({ title, imageUrl }, templateSelector, handleCardClick) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector('.gallery__item');
    return template.cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.gallery__button_like');
    const likeIcon = cardElement.querySelector('.gallery__like-icon');
    const image = cardElement.querySelector('.gallery__image');

    deleteBtn.addEventListener('click', () => cardElement.remove());

    likeBtn.addEventListener('click', () => {
      const currentSrc = likeIcon.getAttribute('src');
      likeIcon.setAttribute(
        'src',
        currentSrc === 'images/heartbutton.svg'
          ? 'images/heartactive.png'
          : 'images/heartbutton.svg'
      );
    });

    image.addEventListener('click', () => this._handleCardClick(this._title, this._imageUrl));
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