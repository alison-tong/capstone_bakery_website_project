// ANCHOR hamburger menu
// Cache DOM elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.getElementById('close-btn');

// Create 3 event listeners:
// 1. Event Listener for hamburger button to open menu:
hamburgerBtn.addEventListener('click', openMenu);

function openMenu(e) {
    /* hamburger hidden off screen with translateX(100%) by default, .open-menu class applies translateX(0%) */
    mobileMenu.classList.toggle('open-menu');
}

// 2. Event listener for close button in <aside>
closeBtn.addEventListener('click', (e) =>
    /* hamburger reverts back to translateX(100%) off screen */
    mobileMenu.classList.remove('open-menu'),
);

// 3. Event Listener to close mobile menu when clicking outside of the menu
document.addEventListener('click', (e) => {
    /* 
    Validation logic: 
    - if the click was outside the menu (NOT the menu) 
    - AND if the click was NOT the hamburger button 
        -> Check required since hamburger button sits outside of <aside> menu. First condition is immediately satisfied and closes the menu
    */
    if (!mobileMenu.contains(e.target) && e.target !== hamburgerBtn) {
        mobileMenu.classList.remove('open-menu');
    }
});

// ANCHOR Search bar click Event
// DOM Elements
const searchBtn = document.getElementById('search-btn');
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');
const navRight1 = document.querySelector('.nav-right-1');
const navRight2 = document.querySelector('.nav-right-2');

// 1. Event Listener for search btn
searchBtn.addEventListener('click', openSearchBar);

function openSearchBar(e) {
    /* Show search bar and hide all nav items */
    searchForm.classList.toggle('open-search-bar');
    navRight1.classList.toggle('hide-desktop-nav');
    navRight2.classList.toggle('hide-nav-right-2');
}

// 2. Event listener to close search bar when clicked outside of search bar
document.addEventListener('click', (e) => {
    /* 
    Validation logic:
        - if the click was anywhere except the search form or search button, close everything.
        - execution: if click was outside the search form AND outside the search button
    */
    if (!searchForm.contains(e.target) && !searchBtn.contains(e.target)) {
        searchForm.classList.remove('open-search-bar');
        navRight1.classList.remove('hide-desktop-nav');
        navRight2.classList.remove('hide-nav-right-2');
    }
});

// NOTE Search bar keydown event validation
searchInput.addEventListener('keydown', validateSearch);

function validateSearch(e) {
    /* Only run rest of the function when user presses enter */
    if (e.key !== 'Enter') {
        return;
    }
    e.preventDefault();

    /* Input validation */

    // Trim search value to prevent spaces being entered
    const searchVal = searchInput.value.trim();

    // Create an error message element for when validation fails
    const errorMessageEl = searchForm.querySelector('.search-error');

    // Clear previous existing error message if any
    if (errorMessageEl) {
        errorMessageEl.remove();
    }

    // Validate and add error message to DOM
    if (searchVal.length < 4) {
        const error = document.createElement('p');
        error.classList.add('search-error');
        searchForm.appendChild(error);
        error.innerText = 'Please enter at least 4 characters.';
        return;
    }

    searchInput.value = ''; /* clear input if validation passes */
}

// NOTE Clear error message on input event
// The event listener clears error message as user start correcting input
searchInput.addEventListener('input', clearSearchError);

function clearSearchError(e) {
    const errorMessageEl = searchForm.querySelector('.search-error');
    // logic: if error message exists, remove it
    if (errorMessageEl) {
        errorMessageEl.remove();
    }
}

// ANCHOR Contact form validation
// DOM Elements
const errorList = document.querySelector('.error-ul');
const contactForm = document.querySelector('.contact-form');
const firstNameEl = document.getElementById('first-name');
const lastNameEl = document.getElementById('last-name');
const emailEl = document.getElementById('email');
const messageEl = document.getElementById('message');

// Event listener on contact form for submit
contactForm.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    const emailVal = e.target.querySelector('#email').value.trim();

    // Clear all previous error messages
    errorList.innerHTML = '';

    /* 
     Runs all three validation and stores their true/false values 
        1. name validation
        2. email validation
        3. message validation
        > each validation is set to return true or false boolean
     */
    const isNameValid = nameValidation();
    const isEmailValid = emailValidation(emailVal);
    const isMessageValid = messageValidation();

    // Check if all fields have passed validation, return success message on DOM
    if (isNameValid && isEmailValid && isMessageValid) {
        const newLi = document.createElement('li');
        errorList.appendChild(newLi);
        newLi.classList.add('success-message');
        newLi.innerHTML = `<span class="material-symbols-outlined">outbox</span> Your message has been sent successfully. We will get back to you as soon as we can!`;
    }
}

// Create error/success message display function
function createMessage(message) {
    const newLi = document.createElement('li');
    errorList.appendChild(newLi);
    newLi.classList.add('red-text');
    newLi.innerHTML = `<span class="material-symbols-outlined">error</span>${message}`;
}

/* NOTE First name and last name validation
    Logic: Both fields should have at least 2 characters
            - Obtain .value and clean up with trim()
            - Validate logic -> if conditions unmet, display error message to .error-ul
*/

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
    // return boolean result
    return true;
}

// NOTE Email validation for custom error message display
function emailValidation(emailVal) {
    // Using regex to check email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Using regex.test() built in method to test pattern of string/email
    // logic: if email format is INVALID, run error message
    if (!regex.test(emailVal)) {
        const message = 'Please enter a valid email.';
        createMessage(message);
        // return boolean result
        return false;
    }

    // clear fields if fields are valid
    emailEl.value = '';
    // then return boolean result
    return true;
}

// NOTE Message validation
function messageValidation() {
    const messageVal = messageEl.value.trim();

    if (messageVal.length < 30) {
        const message = 'Your message must be at least 30 characters.';
        createMessage(message);
        // return boolean result
        return false;
    }

    // clear fields if message length is valid
    messageEl.value = '';
    // return boolean result
    return true;
}
