
const signUpForm = document.querySelector('.sign-up__form');
const submitButton = signUpForm.querySelector('.form__submit');

const firstNameInut = signUpForm.querySelector('.input--first-name');
const lastNameInput = signUpForm.querySelector('.input--last-name');

const emailInput = signUpForm.querySelector('.input--email');

const passwordInput = signUpForm.querySelector('.input--password');
const confirmPasswordInput = signUpForm.querySelector('.input--confirm-password');

const popUp = document.querySelector('.pop-up');
const rootElement = document.querySelector('.root');
const popUpClose = document.querySelector('.pop-up__close');
const vivusPiture = document.querySelector('.sign-up__vivus');
const doneMarkImg = document.querySelector('.img__doneMark');

const nationalitySelect = signUpForm.querySelector('.select__nationality');
const birthDaySelect = signUpForm.querySelector('.select__birthday');
const birthMonthSelect = signUpForm.querySelector('.select__month');
const birthYearSelect = signUpForm.querySelector('.select__year');

nationalitySelect.addEventListener('click', function () {
  errorMessage(nationalitySelect);
});

birthDaySelect.addEventListener('click', function () {
  errorMessage(birthDaySelect);
});

birthMonthSelect.addEventListener('click', function () {
  errorMessage(birthMonthSelect);
});

birthYearSelect.addEventListener('click', function () {
  errorMessage(birthYearSelect);
});

console.log('form: ', document.forms.signup);
console.log('elem: ', document.forms.signup.elements);
console.log('by name: ', document.forms.signup.firtName);
console.log('firt name valid: ', document.forms.signup.firtName.validity.valid);

console.log('by name nationality: ', document.forms.signup.nationality);
console.log('nationality valid: ', document.forms.signup.firtName.validity.valid);

let names = Array.from(document.forms.signup.elements).forEach(elem => {
  if (elem.id.validity) {
    console.log('work');
  } else {
    console.log('noooooooooooooooooo');
  }
});

console.log(names);

const clearForm = (formName) => {
  formName.reset();
}

const isValidForm = () => {
  if (firstNameInut.value !== '' && lastNameInput.value !== '' && emailInput.value !== '' && isValidConfirmPasswords() && nationalitySelect.value !== '' && birthDaySelect.value !== '' && birthMonthSelect.value !== '' && birthYearSelect.value !== '') {
    return true;
  } else return false;
}

signUpForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (isValidForm()) {
    clearForm(signUpForm);
    togglePopUp();
    sendForm();
    submitButton.classList.remove('button__shake');
    vivusPiture.classList.add('sign-up__vivus--hidden');
  } else {
    submitButton.classList.add('button__shake');
    const allInput = signUpForm.querySelectorAll('.sign-up__input');
    allInput.forEach(item => {
      if (!item.validity.valid) {
        const errorElement = signUpForm.querySelector(`.${item.id}-error`);
        item.closest('.fieldset').classList.add('fieldset--error');
        errorElement.textContent = item.validationMessage;
      }
    });
    const allSelect = signUpForm.querySelectorAll('.select ');
    allSelect.forEach(item => {
      if (!item.validity.valid) {
        const errorElement = signUpForm.querySelector(`.${item.id}-error`);
        item.closest('.fieldset').classList.add('fieldset--error');
        errorElement.textContent = item.validationMessage;
      }
    });
  }

});

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

const isPasswordIncludesNumber = (formElement, inputSelector) => {
  let arr = formElement.querySelector(`.${inputSelector}`).value.split('');
  for (let item of arr) {
    if (!isNaN(item)) {
      return true;
    }
  }
  return false;
}

const isPasswordIncludesUpperLetter = (formElement, inputSelector) => {
  let res = formElement.querySelector(`.${inputSelector}`).value.toLowerCase();
  if (formElement.querySelector(`.${inputSelector}`).value !== res) {
    return true;
  }
  return false;
}

const isPasswordIncludesLowerLetter = (formElement, inputSelector) => {
  let res = formElement.querySelector(`.${inputSelector}`).value.toUpperCase();
  if (formElement.querySelector(`.${inputSelector}`).value !== res) {
    return true;
  }
  return false;
}

const isValidPassword = (formElement, inputSelector, errorSelector) => {
  const inputElement = formElement.querySelector(`.${inputSelector}`);
  const errorMessage = formElement.querySelector(`.${errorSelector}`);

  if (isPasswordIncludesNumber(formElement, inputSelector) && isPasswordIncludesUpperLetter(formElement, inputSelector) && isPasswordIncludesLowerLetter(formElement, inputSelector)) {
    errorMessage.textContent = '';
    inputElement.closest('.fieldset').classList.remove('fieldset--error');
    showDoneMark(inputElement);
    return true;
  } else {
    errorMessage.textContent = `${inputElement.validationMessage} You password have to includes: upper, lower letter and number`;
    inputElement.closest('.fieldset').classList.add('fieldset--error');
    hideDoneMark(inputElement);
    return false;
  }
}

const isMatchPasswords = (pas1, pas2, errorSelector) => {
  const errorMessage = signUpForm.querySelector(`.${errorSelector}`);

  if (pas1.value !== pas2.value) {
    errorMessage.textContent = `Passwords do not match`;
    hideDoneMark(confirmPasswordInput);
    return false;
  }
  else {
    showDoneMark(confirmPasswordInput);
    return true;
  }

}

const isValidConfirmPasswords = () => {
  if (isValidPassword(signUpForm, 'input--password', 'pas-error') && isValidPassword(signUpForm, 'input--confirm-password', 'conf-pas-error') && isMatchPasswords(passwordInput, confirmPasswordInput, 'conf-pas-error')) return true;
  return false;
}

passwordInput.addEventListener('input', function () {
  isValidPassword(signUpForm, 'input--password', 'pas-error');

});

confirmPasswordInput.addEventListener('input', function () {
  isValidPassword(signUpForm, 'input--confirm-password', 'conf-pas-error');
  isMatchPasswords(passwordInput, confirmPasswordInput, 'conf-pas-error');
});

const errorMessage = (inputElement) => {
  const errorElement = signUpForm.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.closest('.fieldset').classList.add('fieldset--error');
    hideDoneMark(inputElement);
  } else {
    errorElement.textContent = '';
    inputElement.closest('.fieldset').classList.remove('fieldset--error');
    showDoneMark(inputElement);
  }
}

emailInput.addEventListener('input', function () {
  errorMessage(emailInput);
});

lastNameInput.addEventListener('input', function () {
  errorMessage(lastNameInput);
});

firstNameInut.addEventListener('input', function () {
  errorMessage(firstNameInut);
});

const showDoneMark = (inputElement) => {
  const imgElement = document.querySelector(`.${inputElement.id}-done`);
  imgElement.classList.add('img__doneMark--visibly');
}

const hideDoneMark = (inputElement) => {
  const imgElement = document.querySelector(`.${inputElement.id}-done`);
  imgElement.classList.remove('img__doneMark--visibly');
}

const vivus = new Vivus('vivus', { type: 'scenario-sync', duration: 1000, file: './img/SignUp.svg', start: 'autostart', })

const smoothReveal = ScrollReveal({
  origin: 'bottom',
  distance: '60px',
  duration: 3500,
  delay: 100,

})

smoothReveal.reveal(`.fieldset`, { interval: 500 })




const sendForm = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector('.sign-up__right').classList.add('form__send');
      document.querySelector('.sign-up__right--container').innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "ajax.txt", true);
  xhttp.send();
}

