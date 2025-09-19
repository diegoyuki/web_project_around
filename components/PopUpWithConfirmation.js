import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__confirm-button');
    this._handleConfirm = null;
  }

  setSubmitAction(action) {
    this._handleConfirm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }

  open(action) {
    this.setSubmitAction(action);
    super.open();
  }
}
