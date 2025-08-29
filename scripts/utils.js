export function openModal(modal) {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modal) {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      if (!modal.classList.contains('hidden')) closeModal(modal);
    });
  }
}

export function setModalListeners() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) closeModal(modal);
    });
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
  });
}