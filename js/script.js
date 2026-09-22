/* =========================================================
   SOY RIVERVIEW RESORT — MAIN SCRIPT (FULL UPGRADE)
   ========================================================= */

(function () {
    'use strict';

    /* =========================================================
       1. HAMBURGER MENU TOGGLE
       ========================================================= */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetElement = document.getElementById(href.substring(1));
                if (targetElement) {
                    e.preventDefault();
                    closeMobileMenu();
                    setTimeout(function () {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 350);
                }
            }
        });
    });

    /* =========================================================
       2. SCROLL PROGRESS BAR
       ========================================================= */
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    /* =========================================================
       3. HERO SLIDESHOW
       ========================================================= */
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const totalSlideNum = document.getElementById('totalSlideNum');

    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 6000;

    function padNumber(num) {
        return num < 10 ? '0' + num : '' + num;
    }

    function createDots() {
        if (!dotsContainer || slides.length === 0) return;
        dotsContainer.innerHTML = '';
        slides.forEach(function (_, idx) {
            const dot = document.createElement('span');
            dot.classList.add('slide-dot');
            if (idx === currentIndex) dot.classList.add('active-dot');
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
            dot.addEventListener('click', function () {
                goToSlide(idx);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = document.querySelectorAll('.slide-dot');
        dots.forEach(function (dot, idx) {
            if (idx === currentIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }

    function updateCounter() {
        if (currentSlideNum) currentSlideNum.textContent = padNumber(currentIndex + 1);
    }

    function goToSlide(index) {
        if (slides.length === 0) return;
        slides[currentIndex].classList.remove('active');
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        updateDots();
        updateCounter();
        resetInterval();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function resetInterval() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (slides.length > 0) {
        if (totalSlideNum) totalSlideNum.textContent = padNumber(slides.length);
        createDots();
        updateCounter();
        resetInterval();

        const heroContainer = document.querySelector('.hero-slideshow');
        if (heroContainer) {
            heroContainer.addEventListener('mouseenter', function () {
                clearInterval(slideInterval);
            });
            heroContainer.addEventListener('mouseleave', resetInterval);
        }

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        heroContainer.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroContainer.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
            }
        }, { passive: true });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    }

    /* =========================================================
       4. SMOOTH SCROLL FOR INTERNAL LINKS
       ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.getElementById(href.substring(1));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================================
       5. NAVBAR SCROLL EFFECT + ACTIVE LINK
       ========================================================= */
    const nav = document.getElementById('mainNav');
    const sections = ['home', 'gallery', 'dining', 'rooms', 'testimonials', 'about', 'contact'];

    function handleNavScroll() {
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        const scrollPos = window.scrollY + 150;

        for (let i = 0; i < sections.length; i++) {
            const el = document.getElementById(sections[i]);
            if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
                document.querySelectorAll('.nav-links a').forEach(function (link) {
                    link.classList.remove('active-page');
                    if (link.getAttribute('href') === '#' + sections[i]) {
                        link.classList.add('active-page');
                    }
                });
                break;
            }
        }
    }

    /* =========================================================
       6. SCROLL TO TOP BUTTON
       ========================================================= */
    const scrollBtn = document.getElementById('scrollTopBtn');

    function handleScrollBtn() {
        if (!scrollBtn) return;
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }

    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================================
       7. UNIFIED SCROLL LISTENER
       ========================================================= */
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateScrollProgress();
                handleNavScroll();
                handleScrollBtn();
                ticking = false;
            });
            ticking = true;
        }
    });

    /* =========================================================
       8. GALLERY FILTER
       ========================================================= */
    const galleryFilters = document.querySelectorAll('#galleryFilters .filter-btn');
    const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');

    galleryFilters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            galleryFilters.forEach(function (b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(function (item) {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeUp 0.5s ease both';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* =========================================================
       9. DINING FILTER
       ========================================================= */
    const diningFilters = document.querySelectorAll('#diningFilters .filter-btn');
    const diningCards = document.querySelectorAll('#diningGrid .card');

    diningFilters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            diningFilters.forEach(function (b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            const filter = this.getAttribute('data-dfilter');

            diningCards.forEach(function (card) {
                const category = card.getAttribute('data-dish-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeUp 0.5s ease both';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* =========================================================
       10. LIGHTBOX
       ========================================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let lightboxItems = [];
    let lightboxIndex = 0;

    function openLightbox(index) {
        if (!lightbox || lightboxItems.length === 0) return;
        lightboxIndex = index;
        const item = lightboxItems[lightboxIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay span');

        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Gallery image';
        }
        if (lightboxCaption) {
            lightboxCaption.textContent = caption ? caption.textContent : '';
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNextLightbox() {
        if (lightboxItems.length === 0) return;
        lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
        openLightbox(lightboxIndex);
    }

    function showPrevLightbox() {
        if (lightboxItems.length === 0) return;
        lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        openLightbox(lightboxIndex);
    }

    // Only image items (exclude video)
    lightboxItems = Array.prototype.slice.call(
        document.querySelectorAll('#galleryGrid .gallery-item:not(.video-item)')
    );

    lightboxItems.forEach(function (item, idx) {
        item.addEventListener('click', function () {
            openLightbox(idx);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', function (e) {
        e.stopPropagation();
        showNextLightbox();
    });
    if (lightboxPrev) lightboxPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        showPrevLightbox();
    });

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextLightbox();
        if (e.key === 'ArrowLeft') showPrevLightbox();
    });

    /* =========================================================
       11. TESTIMONIAL SLIDER
       ========================================================= */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDotsContainer = document.getElementById('testimonialDots');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');

    let testimonialIndex = 0;
    let testimonialInterval;

    function createTestimonialDots() {
        if (!testimonialDotsContainer || testimonialCards.length === 0) return;
        testimonialDotsContainer.innerHTML = '';
        testimonialCards.forEach(function (_, idx) {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (idx === testimonialIndex) dot.classList.add('active');
            dot.setAttribute('aria-label', 'Show testimonial ' + (idx + 1));
            dot.addEventListener('click', function () {
                goToTestimonial(idx);
            });
            testimonialDotsContainer.appendChild(dot);
        });
    }

    function updateTestimonialDots() {
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach(function (dot, idx) {
            if (idx === testimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToTestimonial(index) {
        if (testimonialCards.length === 0) return;
        testimonialCards[testimonialIndex].classList.remove('active');
        testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
        testimonialCards[testimonialIndex].classList.add('active');
        updateTestimonialDots();
        resetTestimonialInterval();
    }

    function nextTestimonialSlide() {
        goToTestimonial(testimonialIndex + 1);
    }

    function prevTestimonialSlide() {
        goToTestimonial(testimonialIndex - 1);
    }

    function resetTestimonialInterval() {
        if (testimonialInterval) clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonialSlide, 6000);
    }

    if (prevTestimonial) prevTestimonial.addEventListener('click', prevTestimonialSlide);
    if (nextTestimonial) nextTestimonial.addEventListener('click', nextTestimonialSlide);

    if (testimonialCards.length > 0) {
        createTestimonialDots();
        resetTestimonialInterval();

        const wrapper = document.querySelector('.testimonials-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', function () {
                clearInterval(testimonialInterval);
            });
            wrapper.addEventListener('mouseleave', resetTestimonialInterval);
        }

        // Touch swipe
        let tStartX = 0;
        let tEndX = 0;

        const slider = document.getElementById('testimonialSlider');
        if (slider) {
            slider.addEventListener('touchstart', function (e) {
                tStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            slider.addEventListener('touchend', function (e) {
                tEndX = e.changedTouches[0].screenX;
                const diff = tStartX - tEndX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? nextTestimonialSlide() : prevTestimonialSlide();
                }
            }, { passive: true });
        }
    }

    /* =========================================================
       12. BOOKING FORM + PRICE CALCULATOR
       ========================================================= */
    const bookingForm = document.getElementById('bookingForm');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const roomTypeSelect = document.getElementById('roomType');
    const guestsSelect = document.getElementById('guests');
    const guestNameInput = document.getElementById('guestName');
    const guestPhoneInput = document.getElementById('guestPhone');
    const specialRequestsInput = document.getElementById('specialRequests');
    const nightsCountEl = document.getElementById('nightsCount');
    const totalPriceEl = document.getElementById('totalPrice');

    function calculateBooking() {
        if (!checkinInput || !checkoutInput || !roomTypeSelect) return;

        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const roomOption = roomTypeSelect.options[roomTypeSelect.selectedIndex];
        const pricePerNight = roomOption ? parseFloat(roomOption.getAttribute('data-price')) || 0 : 0;

        let nights = 0;
        if (checkin && checkout) {
            const inDate = new Date(checkin);
            const outDate = new Date(checkout);
            const diffTime = outDate - inDate;
            nights = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
        }

        const total = nights * pricePerNight;

        if (nightsCountEl) nightsCountEl.textContent = nights;
        if (totalPriceEl) {
            totalPriceEl.textContent = 'KSh ' + total.toLocaleString();
        }
    }

    if (checkinInput) checkinInput.addEventListener('change', calculateBooking);
    if (checkoutInput) checkoutInput.addEventListener('change', calculateBooking);
    if (roomTypeSelect) roomTypeSelect.addEventListener('change', calculateBooking);

    // Prevent past dates
    if (checkinInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        if (checkoutInput) checkoutInput.min = today;
    }

    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', function () {
            if (checkinInput.value) {
                const nextDay = new Date(checkinInput.value);
                nextDay.setDate(nextDay.getDate() + 1);
                checkoutInput.min = nextDay.toISOString().split('T')[0];
                if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
                    checkoutInput.value = nextDay.toISOString().split('T')[0];
                }
                calculateBooking();
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = guestNameInput ? guestNameInput.value.trim() : '';
            const phone = guestPhoneInput ? guestPhoneInput.value.trim() : '';
            const guests = guestsSelect ? guestsSelect.value : '';
            const roomType = roomTypeSelect ? roomTypeSelect.value : '';
            const checkin = checkinInput ? checkinInput.value : '';
            const checkout = checkoutInput ? checkoutInput.value : '';
            const special = specialRequestsInput ? specialRequestsInput.value.trim() : '';
            const nights = nightsCountEl ? nightsCountEl.textContent : '0';
            const total = totalPriceEl ? totalPriceEl.textContent : 'KSh 0';

            // Simple validation
            if (!name || !phone || !guests || !roomType || !checkin || !checkout) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            const message =
                'Hello SOY Riverview Resort,%0A%0A' +
                'I would like to book a stay:%0A' +
                '------------------------%0A' +
                'Name: ' + encodeURIComponent(name) + '%0A' +
                'Phone: ' + encodeURIComponent(phone) + '%0A' +
                'Room: ' + encodeURIComponent(roomType) + '%0A' +
                'Check-in: ' + checkin + '%0A' +
                'Check-out: ' + checkout + '%0A' +
                'Nights: ' + nights + '%0A' +
                'Guests: ' + encodeURIComponent(guests) + '%0A' +
                'Estimated Total: ' + encodeURIComponent(total) + '%0A' +
                (special ? 'Special Requests: ' + encodeURIComponent(special) + '%0A' : '') +
                '%0AThank you!';

            const whatsappURL = 'https://wa.me/254724286855?text=' + message;
            window.open(whatsappURL, '_blank');
            showToast('Redirecting to WhatsApp to confirm your booking...', 'success');
        });
    }

    /* =========================================================
       13. NEWSLETTER FORM
       ========================================================= */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input && input.value) {
                showToast('Subscribed successfully! Thank you.', 'success');
                input.value = '';
            }
        });
    }

    /* =========================================================
       14. TOAST NOTIFICATIONS
       ========================================================= */
    function showToast(message, type) {
        let toast = document.getElementById('siteToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'siteToast';
            toast.style.cssText =
                'position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);' +
                'background:rgba(0,0,0,0.9);color:#fff;padding:14px 24px;border-radius:50px;' +
                'font-size:0.88rem;font-weight:600;z-index:9999;opacity:0;visibility:hidden;' +
                'transition:all 0.4s cubic-bezier(0.2,0.9,0.4,1.1);box-shadow:0 10px 30px rgba(0,0,0,0.3);' +
                'display:flex;align-items:center;gap:10px;max-width:90vw;text-align:center;';
            document.body.appendChild(toast);
        }

        const icon = type === 'error'
            ? '<i class="fas fa-exclamation-circle" style="color:#ff6b6b;"></i>'
            : '<i class="fas fa-check-circle" style="color:#4ade80;"></i>';

        toast.innerHTML = icon + '<span>' + message + '</span>';
        toast.style.opacity = '1';
        toast.style.visibility = 'visible';
        toast.style.transform = 'translateX(-50%) translateY(0)';

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.visibility = 'hidden';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
        }, 3500);
    }

    /* =========================================================
       15. DARK MODE TOGGLE (persisted)
       ========================================================= */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    }

    let storedTheme = 'light';
    try {
        storedTheme = localStorage.getItem('soy-theme') || 'light';
    } catch (err) {
        storedTheme = 'light';
    }
    applyTheme(storedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.body.classList.contains('dark-mode');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            try {
                localStorage.setItem('soy-theme', newTheme);
            } catch (err) {
                // ignore
            }
        });
    }

    /* =========================================================
       16. ANIMATED STATS COUNTER
       ========================================================= */
    const stats = document.querySelectorAll('.stat strong[data-count]');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated || stats.length === 0) return;

        const statsContainer = document.querySelector('.about-stats');
        if (!statsContainer) return;

        const rect = statsContainer.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;

        if (!isVisible) return;

        statsAnimated = true;

        stats.forEach(function (stat) {
            const target = parseInt(stat.getAttribute('data-count'), 10) || 0;
            const duration = 1800;
            const startTime = performance.now();

            function step(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                stat.textContent = current.toLocaleString() + '+';

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    stat.textContent = target.toLocaleString() + '+';
                }
            }

            requestAnimationFrame(step);
        });
    }

    /* =========================================================
       17. SCROLL REVEAL ANIMATIONS
       ========================================================= */
    const revealElements = document.querySelectorAll(
        '.section, .card, .room-card, .feature-box, .contact-card, .testimonial-card, .gallery-item'
    );

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* =========================================================
       18. LAZY LOAD FALLBACK (for older browsers)
       ========================================================= */
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported — no action needed
    } else if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const lazyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    lazyObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(function (img) {
            lazyObserver.observe(img);
        });
    }

    /* =========================================================
       19. SOCIAL MEDIA LINKS CONFIGURATION
       ========================================================= */
    // Replace these with your real profile URLs
    const socialLinks = {
        instagram: 'https://instagram.com/soyriverviewresort',
        facebook: 'https://facebook.com/YOUR_FACEBOOK',
        twitter: 'https://twitter.com/YOUR_TWITTER',
        youtube: 'https://youtube.com/@YOUR_YOUTUBE',
        tiktok: 'https://tiktok.com/@soyriverviewresort'
    };

    function setHref(id, url) {
        const el = document.getElementById(id);
        if (el) el.href = url;
    }

    setHref('instagramLink', socialLinks.instagram);
    setHref('facebookLink', socialLinks.facebook);
    setHref('twitterLink', socialLinks.twitter);
    setHref('youtubeLink', socialLinks.youtube);
    setHref('tiktokLink', socialLinks.tiktok);

    setHref('footerInstagram', socialLinks.instagram);
    setHref('footerFacebook', socialLinks.facebook);
    setHref('footerYouTube', socialLinks.youtube);
    setHref('footerTiktok', socialLinks.tiktok);

    /* =========================================================
       20. INIT ON LOAD + RESIZE
       ========================================================= */
    window.addEventListener('load', function () {
        updateScrollProgress();
        handleNavScroll();
        handleScrollBtn();
        animateStats();
        calculateBooking();
    });

    window.addEventListener('resize', function () {
        updateScrollProgress();
    });

    window.addEventListener('scroll', function () {
        animateStats();
    });

})();
