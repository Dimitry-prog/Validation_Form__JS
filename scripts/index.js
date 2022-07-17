
const signUpForm = document.querySelector('.sign-up__form');
const submitButton = signUpForm.querySelector('.form__submit');

const firstNameInut = signUpForm.querySelector('.input--first-name');
const lastNameInput = signUpForm.querySelector('.input--last-name');

const emailInput = signUpForm.querySelector('.input--email');

const passwordInput = signUpForm.querySelector('.input--password');
const confirmPasswordInput = signUpForm.querySelector('.confirm-passwor');

const popUp = document.querySelector('.pop-up');
const rootElement = document.querySelector('.root');
const popUpClose = document.querySelector('.pop-up__close');


const isPasswordIncludesNumber = (formElement, inputName, inputSelector) => {
  inputName = formElement.querySelector(`.${inputSelector}`);
  let arr = inputName.value.split('');
  for (let item of arr) {
    if (!isNaN(item)) {
      return true;
    }
  }
}

const isPasswordIncludesUpperLetter = (formElement, inputName, inputSelector) => {
  inputName = formElement.querySelector(`.${inputSelector}`);
  let res = inputName.value.toLowerCase();
  if (inputName.value !== res) {
    return true;
  }
}

const isPasswordIncludesLowerLetter = (formElement, inputName, inputSelector) => {
  inputName = formElement.querySelector(`.${inputSelector}`);
  let res = inputName.value.toUpperCase();
  if (inputName.value !== res) {
    return true;
  }
}

const checkPassword = (formElement, inputName, inputSelector) => {
  if (isPasswordIncludesNumber(formElement, inputName, inputSelector) && isPasswordIncludesUpperLetter(formElement, inputName, inputSelector) && isPasswordIncludesLowerLetter(formElement, inputName, inputSelector)) {
    return true;
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('fieldset--error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error-active');
  if (!checkPassword(signUpForm, 'pass', 'input--password')) {
    errorElement.textContent = errorElement.textContent + ' ' + ' You password have to includes: upper, lower letter and number'
  }
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('fieldset--error');
  errorElement.classList.remove('form__input-error-active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button--inactive');
  } else {
    buttonElement.classList.remove('button--inactive');
  }
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.sign-up__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);

    });
  });
};

const clearForm = (formName) => {
  formName.reset();
}


const enableValidation = () => {
  const signUpForm = document.querySelector('.sign-up__form');
  signUpForm.addEventListener('submit', function (event) {
    event.preventDefault();
    clearForm(signUpForm);
    togglePopUp();

  });
  setEventListeners(signUpForm);
};

enableValidation();



const togglePopUp = () => {
  popUp.classList.toggle('pop-up--opened');
  rootElement.classList.toggle('page--hidden');
}

popUpClose.addEventListener('click', togglePopUp);
popUp.addEventListener('click', function (event) {
  if (event.target === popUp) {
    togglePopUp();
  }
})

/* const smoothReveal = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 3500,
  delay: 100,

})

smoothReveal.reveal(`.fieldset`, { interval: 500 }) */
