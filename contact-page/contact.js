// ANCHOR hamburger menu
// Cache DOM elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.getElementById('close-btn');

// 3 event listeners:
// 1. Event Listener for hamburger button to open menu:
hamburgerBtn.addEventListener('click', openMenu);

function openMenu(e) {
    // e.stopPropagation();
    mobileMenu.classList.toggle('open-menu');
    console.log(mobileMenu.classList);
}

// 2. Event listener for close button in <aside>
closeBtn.addEventListener('click', (e) =>
    mobileMenu.classList.remove('open-menu'),
);

// 3. Event Listener to close mobile menu when clicking outside of the menu
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== hamburgerBtn) {
        mobileMenu.classList.remove('open-menu');
    }
});

// ANCHOR Search bar click Event
// DOM Elements
const searchBtn = document.getElementById('search-btn');
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');
const navBar = document.querySelector('.nav-bar');
const navRight1 = document.querySelector('.nav-right-1');
const navRight2 = document.querySelector('.nav-right-2');
const brandName = document.querySelector('.brand');

// Event Listener for search btn
searchBtn.addEventListener('click', openSearchBar);

function openSearchBar(e) {
    searchForm.classList.toggle('open-search-bar');
    navRight1.classList.toggle('hide-desktop-nav');
    navRight2.classList.toggle('hide-nav-right-2');
}

// Event listener to close search bar when clicked outside of search bar
document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && !searchBtn.contains(e.target)) {
        searchForm.classList.remove('open-search-bar');
        navRight1.classList.remove('hide-desktop-nav');
        navRight2.classList.remove('hide-nav-right-2');
        brandName.classList.remove('hide-brand');
    }
});

// NOTE Seach bar keydown event validation
searchInput.addEventListener('keydown', validateSearch);

function validateSearch(e) {
    if (e.key !== 'Enter') {
        return;
    }
    e.preventDefault();

    const searchVal = searchInput.value.trim();
    const errorMessageEl = searchForm.querySelector('.search-error');

    // clear previous existing error message if any
    if (errorMessageEl) {
        error.remove();
    }

    if (searchVal.length < 4) {
        const error = document.createElement('p');
        error.classList.add('search-error');
        searchForm.appendChild(error);
        error.innerText = 'Please enter at least 4 characters.';
        return;
    }

    searchInput.value = '';
}

// NOTE Clear error message on input event
searchInput.addEventListener('input', clearSearchError);

function clearSearchError(e) {
    const errorMessageEl = searchForm.querySelector('.search-error');
    if (errorMessageEl) {
        errorMessageEl.remove();
    }
}

// ANCHOR Contact form

// DOM Elements
const errorList = document.querySelector('.error-ul');
const contactForm = document.querySelector('.contact-form');
const firstNameEl = document.getElementById('first-name');
const lastNameEl = document.getElementById('last-name');
const emailEl = document.getElementById('email');
const messageEl = document.getElementById('message');
const submitBtn = document.querySelector('.submit-btn');

// Event listener on contact form for submit
contactForm.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    const emailVal = e.target.querySelector('#email').value.trim();

    errorList.innerHTML = '';

    const isNameValid = nameValidation();
    const isEmailValid = emailValidation(emailVal);
    const isMessageValid = messageValidation();

    // Check if all fields have passed validation, return success message
    if (isNameValid && isEmailValid && isMessageValid) {
        const newLi = document.createElement('li');
        errorList.appendChild(newLi);
        newLi.classList.add('success-message');
        newLi.innerHTML = `<span class="material-symbols-outlined">outbox</span> Your message has been sent successfully. We will get back to you as soon as we can!`;
    }
}

// Create display message
function createMessage(message) {
    const newLi = document.createElement('li');
    errorList.appendChild(newLi);
    newLi.classList.add('red-text');
    newLi.innerHTML = `<span class="material-symbols-outlined">error</span>${message}`;
}

// NOTE First name and last name validation
// Logic: Both fields should have at least 2 characters
// Obtain .value and clean up with trim()
// Validate logic -> if conditions unmet, display error message to .error-ul
// clear / reset .error-ul at the beginning
function nameValidation() {
    const firstNameVal = firstNameEl.value.trim();
    const lastNameVal = lastNameEl.value.trim();

    if (firstNameVal.length < 2 || lastNameVal.length < 2) {
        const message =
            'Your first name and last name should be at least 2 characters each.';
        createMessage(message);
        // specify false result for master validation of all fields at submitForm()
        return false;
    }

    // clear fields only if validation passes -> fields are valid
    firstNameEl.value = '';
    lastNameEl.value = '';
    return true;
}

// NOTE Email validation
function emailValidation(emailVal) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(emailVal)) {
        const message = 'Please enter a valid email.';
        createMessage(message);
        return false;
    }

    // clear fields if fields are valid
    emailEl.value = '';
    return true;
}

// NOTE Message validation
function messageValidation() {
    const messageVal = messageEl.value.trim();

    if (messageVal.length < 30) {
        const message = 'Your message must be at least 30 characters.';
        createMessage(message);
        return false;
    }

    messageEl.value = '';
    return true;
}
