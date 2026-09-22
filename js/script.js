/* =========================================================
   SOY RIVERVIEW RESORT — MAIN SCRIPT
   ========================================================= */

// ========== HAMBURGER MENU TOGGLE ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        closeMobileMenu();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            e.preventDefault();
            setTimeout(() => {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            }, 100);
        }
    });
});

// ========== SLIDESHOW LOGIC ==========
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentIndex = 0, slideInterval;
const intervalTime = 5500;

function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('slide-dot');
        if (idx === currentIndex) dot.classList.add('active-dot');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll('.slide-dot').forEach((dot, idx) => {
        idx === currentIndex
            ? dot.classList.add('active-dot')
            : dot.classList.remove('active-dot');
    });
}

function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    updateDots();
    resetInterval();
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function resetInterval() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

createDots();
resetInterval();

const heroContainer = document.querySelector('.hero-slideshow');
if (heroContainer) {
    heroContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroContainer.addEventListener('mouseleave', resetInterval);
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-links a, .btn-gold, .logo a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.getElementById(href.substring(1));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        }
    });
});

// ========== NAVBAR SCROLL EFFECT & ACTIVE LINK ==========
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    window.scrollY > 50
        ? nav.classList.add('scrolled')
        : nav.classList.remove('scrolled');

    const sections = ['home', 'gallery', 'dining', 'rooms', 'about', 'contact'];
    const scrollPos = window.scrollY + 150;

    for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active-page');
                if (link.getAttribute('href') === `#${section}`) {
                    link.classList.add('active-page');
                }
            });
            break;
        }
    }
});

// ========== SCROLL TO TOP ==========
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    window.scrollY > 500
        ? scrollBtn.classList.add('show')
        : scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== CONFIGURE SOCIAL MEDIA LINKS ==========
// Replace the URLs below with your real social media profiles
document.getElementById('instagramLink').href = 'https://instagram.com/soyriverviewresort';
document.getElementById('facebookLink').href = 'https://facebook.com/YOUR_FACEBOOK';
document.getElementById('twitterLink').href = 'https://twitter.com/YOUR_TWITTER';
document.getElementById('youtubeLink').href = 'https://youtube.com/@YOUR_YOUTUBE';
document.getElementById('tiktokLink').href = 'https://tiktok.com/@soyriverviewresort';

// Footer social links
document.getElementById('footerInstagram').href = 'https://instagram.com/soyriverviewresort';
document.getElementById('footerFacebook').href = 'https://facebook.com/YOUR_FACEBOOK';
document.getElementById('footerYouTube').href = 'https://youtube.com/@YOUR_YOUTUBE';
