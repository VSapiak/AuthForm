// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8Kd3K0g3O4pf6MJ2ISuj7niFF7gY68-M',
  authDomain: 'authentication-f6359.firebaseapp.com',
  projectId: 'authentication-f6359',
  storageBucket: 'authentication-f6359.appspot.com',
  messagingSenderId: '490964966849',
  appId: '1:490964966849:web:f93da1cfe963d7548da340',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authForm = document.querySelector('#authForm');
const signUpButton = document.querySelector('#signUpButton');
const signOutButton = document.querySelector('#signOutButton');
const userBtn = document.querySelector('.authorised-btn-wrapper');
const signUpBtn = document.querySelector('.openSignUp');
const modalWindow = document.querySelector('.modal-js');
const formBtnSubmit = document.querySelector('.form--btn-submit');

// Check the user's authentication state
const checkAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      userBtn.querySelector('span').nextSibling.textContent = user.displayName;
      signUpBtn.classList.add('is-hidden');
      userBtn.classList.remove('is-hidden');
      signOutButton.classList.remove('is-hidden');
    } else {
      signUpBtn.classList.remove('is-hidden');
      userBtn.classList.add('is-hidden');
      signOutButton.classList.add('is-hidden');
    }
  });
};

checkAuthState();

// Функція для реєстрації користувача
const userSignUp = (name, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userSignUpCreate => {
      const user = userSignUpCreate.user;
      modalWindow.classList.add('is-hidden');
      return updateProfile(auth.currentUser, {
        displayName: name,
      });
    })
    .then(() => {
      userBtn.querySelector('span').nextSibling.textContent =
        auth.currentUser.displayName;
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

// Функція входу користувача
const userSignIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(userSignUpCreate => {
      modalWindow.classList.add('is-hidden');
      console.log(userSignUpCreate);
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

// Функція виходу користувача
const userSignOut = () => {
  signOut(auth)
    .then(() => {
      signOutButton.classList.remove('is-hidden');
    })
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

// Обробка подання форми користувача
function handleFormSubmit(e) {
  e.preventDefault();
  const { email, password } = e.target.elements;
  const userEmail = email.value.trim();
  const userPassword = password.value.trim();

  if (formBtnSubmit.textContent.toLowerCase() === 'sign up') {
    const { name } = e.currentTarget.elements;
    const userName = name.value.trim();
    userSignUp(userName, userEmail, userPassword);
  } else if (formBtnSubmit.textContent.toLowerCase() === 'sign in') {
    userSignIn(userEmail, userPassword);
  } else {
    alert('Something went wrong');
  }
}

authForm.addEventListener('submit', handleFormSubmit);

signUpButton.addEventListener('click', userSignUp);
signUpButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);
