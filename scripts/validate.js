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