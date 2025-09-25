export default class Card {
  constructor({ title, imageUrl, id, ownerId, isLiked }, templateSelector, handleCardClick, handleDeleteClick, handleLikeToggle) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._id = id;
    this._ownerId = ownerId;
    this._isLiked = isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeToggle = handleLikeToggle;
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

    // mostrar botón eliminar solo si propietario
    if (this._ownerId === window.currentUserId) {
      deleteBtn.addEventListener('click', () => {
        this._handleDeleteClick(this._id, cardElement);
      });
    } else {
      deleteBtn.style.display = 'none';
    }

    likeBtn.addEventListener('click', () => {
      this._handleLikeToggle(this._id, this._isLiked)
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked;
          likeIcon.setAttribute(
            'src',
            this._isLiked ? '../images/heartactive.png' : '../images/heartbutton.svg'
          );
        })
        .catch(err => console.error('Error al alternar like:', err));
    });

    image.addEventListener('click', () => this._handleCardClick(this._title, this._imageUrl));
  }

  generateCard() {
    this._element = this._getTemplate();
    const img = this._element.querySelector('.gallery__image');
    const titleEl = this._element.querySelector('.gallery__title');
    const likeIcon = this._element.querySelector('.gallery__like-icon');

    img.src = this._imageUrl;
    img.alt = this._title;
    titleEl.textContent = this._title;
    likeIcon.setAttribute(
      'src',
      this._isLiked ? '../images/heartactive.png' : '../images/heartbutton.svg'
    );

    this._setEventListeners(this._element);

    return this._element;
  }
}
