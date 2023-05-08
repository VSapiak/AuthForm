const openSignUp = document.querySelector('.openSignUp');
const closeModal = document.querySelector('.modal-close-js');

const authModal = document.querySelector('.auth-modal-js');

const btnSubmit = document.querySelector('#signUpButton');

const btnSignUp = document.querySelector('.form__btn-sign-up');
const btnSignIn = document.querySelector('.form__btn-sign-in');

const formInputAdd = document.querySelector('.form-add');
const inputName = document.querySelector('form__input-name');

function openModal() {
  authModal.classList.remove('is-hidden');
}

function closeIsModal() {
  authModal.classList.add('is-hidden');
}

function onBtnSignIn() {
  btnSignUp.classList.remove('active');
  btnSignIn.classList.add('active');
  btnSubmit.textContent = 'Sign In';
  formInputAdd.innerHTML = '';
}

function onBtnSignUp() {
  btnSignIn.classList.remove('active');
  btnSignUp.classList.add('active');
  btnSubmit.textContent = 'Sign Up';
  formInputAdd.innerHTML = `<div class="form-input">
	<input
	  type="text"
	  class="form-input-name"
	  placeholder="name"
	  name="name">
 </div>`;
}

btnSignIn.addEventListener('click', onBtnSignIn);
btnSignUp.addEventListener('click', onBtnSignUp);

openSignUp.addEventListener('click', openModal);
closeModal.addEventListener('click', closeIsModal);
