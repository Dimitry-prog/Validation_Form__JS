
const signUpForm = document.querySelector('.sign-up__form');
const submitButton = signUpForm.querySelector('.form__submit');

const firstNameInut = signUpForm.querySelector('.input--first-name');
const lastNameInput = signUpForm.querySelector('.input--last-name');

const emailInput = signUpForm.querySelector('.input--email');

const passwordInput = signUpForm.querySelector('.input--password');
const confirmPasswordInput = signUpForm.querySelector('.confirm-passwor');

signUpForm.addEventListener('submit', function (event) {
	event.preventDefault();
});

const smoothReveal = ScrollReveal({
	origin: 'top',
	distance: '60px',
	duration: 3500,
	delay: 100,

})

smoothReveal.reveal(`.fieldset`, { interval: 500 })
