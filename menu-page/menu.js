// ANCHOR Hamburger menu
// Cache DOM elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.getElementById('close-btn');

// 3 event listeners:
// 1. Event Listener for hamburger button to open menu:
hamburgerBtn.addEventListener('click', openMenu);

function openMenu(e) {
    mobileMenu.classList.toggle('open-menu');
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
const navRight1 = document.querySelector('.nav-right-1');
const navRight2 = document.querySelector('.nav-right-2');

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
        errorMessageEl.remove();
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
