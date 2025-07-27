document.addEventListener('DOMContentLoaded', () => {
  const editButton = document.querySelector('.user__edit_button');
  const modal = document.querySelector('.modal');
  const form = document.querySelector('.edit-form');
  const closeButton = document.querySelector('.modal__close');
  const likeButtons = document.querySelectorAll('.gallery__like_button');

  const inputFields = form.querySelectorAll('.edit-form__input');
  const inputName = inputFields[0];
  const inputBio = inputFields[1];

  const nameElement = document.querySelector('.user__name');
  const bioElement = document.querySelector('.user__bio');

  editButton.addEventListener('click', () => {
    const nameText = nameElement.childNodes[0].nodeValue.trim();
    const bioText = bioElement.textContent.trim();

    inputName.value = nameText;
    inputBio.value = bioText;

    modal.classList.remove('hidden');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    nameElement.childNodes[0].nodeValue = inputName.value + " ";
    bioElement.textContent = inputBio.value;
    modal.classList.add('hidden');
  });

  closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});

likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active'); // Activa o desactiva el corazón
    });
  });