export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    } else {
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
    }
  }

  _toggleButtonState() {
    const allValid = this._inputList.every(input => input.validity.valid);
    if (allValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.add(this._config.submitButtonActiveClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.remove(this._config.submitButtonActiveClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState(); 
  }

  enableValidation() {
    this._setEventListeners();
  }
}