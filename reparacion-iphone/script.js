const mainNav = document.getElementById('main-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && event.target !== navToggle) {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
    }
});

document.addEventListener('scroll', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
});

