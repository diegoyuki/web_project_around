export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.remove('hidden');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.add('hidden');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains('modal') ||
        evt.target.classList.contains('modal__close')
      ) {
        this.close();
      }
    });
  }
}