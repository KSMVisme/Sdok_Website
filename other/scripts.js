
// --- SCROLL NAVIGATION ---
function scrollToSection(selector) {
    const wrapper = document.querySelector('.scroll-wrapper');
    const target = document.querySelector(selector);
    if (!target) return;

    if (window.innerWidth <= 768) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
        const topPos = target.offsetTop;
        wrapper.scrollTo({ top: topPos, behavior: 'smooth' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        scrollToSection(targetId);
    });
});

// --- LOGO MORPHING SCRIPT ---
const logoContainer = document.querySelector('.logo');
const scrollWrapper = document.querySelector('.scroll-wrapper');

function checkLogo(scrollY) {
    // Próg scrollowania po którym zmienia się logo (100px)
    if (scrollY > 100) {
        logoContainer.classList.add('shrunk');
    } else {
        logoContainer.classList.remove('shrunk');
    }
}

// Nasłuchiwanie dla Desktopu (na wrapperze)
if (scrollWrapper) {
    scrollWrapper.addEventListener('scroll', () => {
        checkLogo(scrollWrapper.scrollTop);
    });
}

// Nasłuchiwanie dla Mobile (na oknie)
window.addEventListener('scroll', () => {
    checkLogo(window.scrollY);
});

// Sprawdzenie na starcie (np. po odświeżeniu strony w połowie)
window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        checkLogo(window.scrollY);
    } else if (scrollWrapper) {
        checkLogo(scrollWrapper.scrollTop);
    }
});

// --- CAROUSEL SCRIPT ---
const carouselImages = document.querySelectorAll('.hero-image img');
const dotsContainer = document.querySelector('.carousel-dots');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentImgIndex = 0;
let intervalId;

// Generowanie kropek
carouselImages.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        changeImage(index);
        resetInterval();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function changeImage(index) {
    carouselImages[currentImgIndex].classList.remove('active');
    dots[currentImgIndex].classList.remove('active');

    currentImgIndex = index;

    carouselImages[currentImgIndex].classList.add('active');
    dots[currentImgIndex].classList.add('active');
}

function nextImage() {
    let newIndex = (currentImgIndex + 1) % carouselImages.length;
    changeImage(newIndex);
}

function prevImage() {
    let newIndex = (currentImgIndex - 1 + carouselImages.length) % carouselImages.length;
    changeImage(newIndex);
}

function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextImage, 3000);
}

// Obsługa przycisków
nextBtn.addEventListener('click', () => {
    nextImage();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    prevImage();
    resetInterval();
});

// Start automatyczny
intervalId = setInterval(nextImage, 3000);