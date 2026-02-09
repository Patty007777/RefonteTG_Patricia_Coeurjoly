document.addEventListener('DOMContentLoaded', function() {

    /* Smooth scroll pour les ancres */
    var smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            var targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#!') {
                return;
            }
            
            var targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* PrÃƒÆ’Ã‚Â©vention du comportement par dÃƒÆ’Ã‚Â©faut pour les liens vides */
    var emptyLinks = document.querySelectorAll('a[href="#"]');
    
    emptyLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
        });
    });

    /* Liens externes : ouverture dans un nouvel onglet */
    var externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(function(link) {
        var currentDomain = window.location.hostname;
        var linkDomain = new URL(link.href).hostname;
        
        if (linkDomain !== currentDomain) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    /* Navigation : lien actif */
    function activerLienActif() {
        var navLinks = document.querySelectorAll('.header__link');
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(function(link) {
            var linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('header__link--active');
            } else {
                link.classList.remove('header__link--active');
            }
        });
    }

    activerLienActif();

    /* Barre de recherche desktop */
    var searchIcon = document.getElementById('search-icon');
    var searchBar = document.getElementById('search-bar');

    function afficherRecherche(event) {
        event.preventDefault();
        searchBar.classList.toggle('show');
        
        if (searchBar.classList.contains('show')) {
            var searchInput = searchBar.querySelector('.header__search-input');
            if (searchInput) {
                setTimeout(function() {
                    searchInput.focus();
                }, 100);
            }
        }
    }

    function fermerRecherche(event) {
        if (searchBar && searchIcon) {
            if (!searchBar.contains(event.target) && !searchIcon.contains(event.target) && searchBar.classList.contains('show')) {
                searchBar.classList.remove('show');
            }
        }
    }

    if (searchIcon && searchBar) {
        searchIcon.addEventListener('click', afficherRecherche);
        document.addEventListener('click', fermerRecherche);
    }

    /* Compteur panier */
    function mettreAJourCompteurPanier() {
        var cartItems = JSON.parse(localStorage.getItem('truffeGourmandeCart')) || [];
        var cartCount = cartItems.length;
        
        var cartIcon = document.querySelector('[aria-label="Panier"]');
        if (cartIcon && cartCount > 0) {
            var badge = cartIcon.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.style.cssText = 'position: absolute; top: -5px; right: -5px; background: #d32f2f; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;';
                cartIcon.style.position = 'relative';
                cartIcon.appendChild(badge);
            }
            badge.textContent = cartCount;
        }
    }
    
    mettreAJourCompteurPanier();

    /* Infolettre footer */
    var newsletterForm = document.getElementById('newsletter-form');
    var newsletterEmail = document.getElementById('newsletter-email');
    var newsletterError = document.getElementById('newsletter-error');
    var newsletterSuccess = document.getElementById('newsletter-success');

    function soumettreInfolettre(event) {
        event.preventDefault();
        
        var email = newsletterEmail.value.trim();
        
        if (!email || !validerCourriel(email)) {
            newsletterError.classList.remove('d-none');
            newsletterSuccess.classList.add('d-none');
        } else {
            newsletterError.classList.add('d-none');
            newsletterSuccess.classList.remove('d-none');
            newsletterEmail.value = '';
        }
    }

    function reinitialiserMessages() {
        newsletterError.classList.add('d-none');
        newsletterSuccess.classList.add('d-none');
    }

    if (newsletterForm && newsletterEmail) {
        newsletterForm.addEventListener('submit', soumettreInfolettre);
        newsletterEmail.addEventListener('input', reinitialiserMessages);
    }

    /* Animation footer */
    var footer = document.querySelector('.footer');

    function observerFooter(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                footer.classList.remove('footer--visible');
                void footer.offsetWidth;
                footer.classList.add('footer--visible');
            } else {
                footer.classList.remove('footer--visible');
            }
        });
    }

    if (footer) {
        var observer = new IntersectionObserver(observerFooter, {
            threshold: 0.2
        });
        observer.observe(footer);
    }

    /* Carrousel tÃƒÆ’Ã‚Â©moignages page accueil */
    var carouselTemoignages = document.getElementById('carouselTemoignages');

    function changerIndicateurTemoignages(event) {
        var indicators = carouselTemoignages.querySelectorAll('.temoignages-section__indicator');
        indicators.forEach(function(indicator, i) {
            if (i === event.to) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    if (carouselTemoignages) {
        carouselTemoignages.addEventListener('slid.bs.carousel', changerIndicateurTemoignages);
    }

    /* Carrousel collections page accueil */
    var carouselCollections = document.getElementById('carouselCollections');

    function changerIndicateurCollections(event) {
        var indicators = carouselCollections.querySelectorAll('.collections-section__indicator');
        indicators.forEach(function(indicator, i) {
            if (i === event.to) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    if (carouselCollections) {
        carouselCollections.addEventListener('slid.bs.carousel', changerIndicateurCollections);
    }

    /* Barre de recherche mobile */
    var searchIconMobile = document.getElementById('search-icon-mobile');
    var searchBarMobile = document.getElementById('search-bar-mobile');

    function afficherRechercheMobile(event) {
        event.preventDefault();
        searchBarMobile.classList.toggle('show');
        
        if (searchBarMobile.classList.contains('show')) {
            var searchInputMobile = searchBarMobile.querySelector('.header__search-input-mobile');
            if (searchInputMobile) {
                setTimeout(function() {
                    searchInputMobile.focus();
                }, 100);
            }
        }
    }

    function fermerRechercheMobile(event) {
        if (searchBarMobile && searchIconMobile) {
            if (!searchBarMobile.contains(event.target) && !searchIconMobile.contains(event.target) && searchBarMobile.classList.contains('show')) {
                searchBarMobile.classList.remove('show');
            }
        }
    }

    if (searchIconMobile && searchBarMobile) {
        searchIconMobile.addEventListener('click', afficherRechercheMobile);
        document.addEventListener('click', fermerRechercheMobile);
    }

    /* Sous-menu mobile */
    var categoryLabels = document.querySelectorAll('.menu-mobile__category-label');
    
    categoryLabels.forEach(function(label) {
        label.addEventListener('click', function() {
            var category = this.closest('.menu-mobile__category');
            category.classList.toggle('open');
        });
    });

    initDelegatedEvents();
    initTestimonialCarousel();
    initNewsletterPopup();

    /* Bloquer le glissement horizontal du menu mobile */
    var menuOffcanvas = document.getElementById('menuOffcanvas');
    if (menuOffcanvas) {
        var touchStartX = 0;
        var touchStartY = 0;
        menuOffcanvas.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        menuOffcanvas.addEventListener('touchmove', function(e) {
            var deltaX = Math.abs(e.touches[0].clientX - touchStartX);
            var deltaY = Math.abs(e.touches[0].clientY - touchStartY);
            if (deltaX > deltaY && deltaX > 10) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});

/* Liaison pour pages refactorisÃƒÆ’Ã‚Â©es (sans onclick inline) */
function initDelegatedEvents() {

    document.querySelectorAll('.product-gallery__thumb[data-image]').forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            changeImage(this, this.getAttribute('data-image'));
        });
    });

    document.querySelectorAll('.flavor-option:not([onclick])').forEach(function(btn) {
        btn.addEventListener('click', function() { selectFlavor(this); });
    });

    document.querySelectorAll('.format-option:not([onclick])').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var price = this.getAttribute('data-price');
            if (price) {
                selectQuantity(this, parseFloat(price));
            } else {
                selectFormat(this);
            }
        });
    });

    document.querySelectorAll('.color-option:not([onclick])').forEach(function(btn) {
        btn.addEventListener('click', function() { selectColor(this); });
    });

    document.querySelectorAll('.quantity-btn:not([onclick])').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var label = this.getAttribute('aria-label') || '';
            updateQuantity(label.indexOf('Diminuer') !== -1 ? -1 : 1);
        });
    });

    document.querySelectorAll('.product-accordion__header:not([onclick])').forEach(function(header) {
        header.addEventListener('click', function() { toggleAccordion(this); });
    });

    var contactBtn = document.querySelector('.contact-float-btn:not([onclick])');
    if (contactBtn) contactBtn.addEventListener('click', toggleContactPopup);

    var contactClose = document.querySelector('.contact-popup__close:not([onclick])');
    if (contactClose) contactClose.addEventListener('click', toggleContactPopup);

    var nlClose = document.querySelector('.newsletter-popup__close:not([onclick])');
    if (nlClose) nlClose.addEventListener('click', function() { closeNewsletterPopup(); });

    document.querySelectorAll('.testimonials-nav__btn--prev:not([onclick])').forEach(function(btn) {
        btn.addEventListener('click', function() { changeTestimonial(-1); });
    });

    document.querySelectorAll('.testimonials-nav__btn--next:not([onclick])').forEach(function(btn) {
        btn.addEventListener('click', function() { changeTestimonial(1); });
    });

    document.querySelectorAll('.testimonials-nav__dot:not([onclick])').forEach(function(dot, i) {
        dot.addEventListener('click', function() { goToTestimonial(i); });
    });

    var persoCheckbox = document.getElementById('perso-checkbox');
    if (persoCheckbox && !persoCheckbox.getAttribute('onchange')) {
        persoCheckbox.addEventListener('change', togglePersoOptions);
    }

    document.querySelectorAll('.perso-options__colors .color-option:not([onclick])').forEach(function(btn) {
        btn.addEventListener('click', function() { selectPrenomColor(this); });
    });

    var addToCartBtn = document.querySelector('.add-to-cart-btn:not([onclick])');
    if (addToCartBtn) addToCartBtn.addEventListener('click', addToCart);
}

/* Fonctions utilitaires */
function validerCourriel(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function animerElement(element, className, duration) {
    duration = duration || 300;
    element.classList.add(className);
    setTimeout(function() {
        element.classList.remove(className);
    }, duration);
}

/* Pages produits : galerie */
function changeImage(thumb, src) {
    var mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = src;
        document.querySelectorAll('.product-gallery__thumb').forEach(function(t) {
            t.classList.remove('active');
        });
        thumb.classList.add('active');
    }
}

/* Pages produits : sÃƒÆ’Ã‚Â©lection saveur */
function selectFlavor(element) {
    document.querySelectorAll('.flavor-option').forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    element.classList.add('selected');
    element.setAttribute('aria-pressed', 'true');
}

/* Pages produits : sÃƒÆ’Ã‚Â©lection lot */
function selectLot(element) {
    document.querySelectorAll('.format-option').forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    element.classList.add('selected');
    element.setAttribute('aria-pressed', 'true');
}

/* Pages produits : sÃƒÆ’Ã‚Â©lection couleur */
function selectColor(element) {
    var group = element.parentElement;
    group.querySelectorAll('.color-option').forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    element.classList.add('selected');
    element.setAttribute('aria-pressed', 'true');
}

function selectTextColor(element) {
    selectColor(element);
}

/* Pages produits : sÃƒÆ’Ã‚Â©lection format */
function selectFormat(element) {
    var formatOptions = element.parentElement.querySelectorAll('.format-option');
    formatOptions.forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    element.classList.add('selected');
    element.setAttribute('aria-pressed', 'true');
}

/* Pages produits : sÃƒÆ’Ã‚Â©lection quantitÃƒÆ’Ã‚Â© avec prix */
function selectQuantity(element, price) {
    var qtyOptions = element.parentElement.querySelectorAll('.format-option');
    qtyOptions.forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    element.classList.add('selected');
    element.setAttribute('aria-pressed', 'true');
    
    var priceElement = document.getElementById('unit-price');
    if (priceElement && price) {
        priceElement.textContent = price.toFixed(2).replace('.', ',') + ' $';
    }
}

/* Pages produits : boutons +/- quantitÃƒÆ’Ã‚Â© */
function changeQuantity(delta) {
    var input = document.getElementById('quantity-input');
    if (input) {
        var value = parseInt(input.value) + delta;
        if (value < 1) value = 1;
        input.value = value;
    }
}

function updateQuantity(change) {
    var input = document.getElementById('quantity-input');
    if (input) {
        var currentVal = parseInt(input.value) || 1;
        var newVal = Math.max(1, currentVal + change);
        input.value = newVal;
    }
}

/* Pages produits : ajout au panier */
function addToCart() {
    alert('Produit ajoutÃƒÆ’Ã‚Â© au panier !');
}

/* Pages produits : accordÃƒÆ’Ã‚Â©on */
function toggleAccordion(header) {
    var content = header.nextElementSibling;
    var isOpen = content.classList.contains('show');

    document.querySelectorAll('.product-accordion__content').forEach(function(c) {
        c.classList.remove('show');
    });
    document.querySelectorAll('.product-accordion__header').forEach(function(h) {
        h.classList.remove('active');
        h.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
        content.classList.add('show');
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
    }
}

/* Pages produits : popup contact */
function toggleContactPopup() {
    var popup = document.getElementById('contact-popup');
    if (popup) {
        popup.classList.toggle('show');
    }
}

/* Carrousel tÃƒÆ’Ã‚Â©moignages pages produits */
function initTestimonialCarousel() {
    var carouselEl = document.getElementById('testimonialCarousel');
    if (!carouselEl) return;

    var testimonialCarousel = new bootstrap.Carousel(carouselEl, {
        interval: 5000,
        wrap: true,
        pause: 'hover'
    });

    window.changeTestimonial = function(direction) {
        testimonialCarousel.pause();
        if (direction === 1) {
            testimonialCarousel.next();
        } else {
            testimonialCarousel.prev();
        }
    };

    window.goToTestimonial = function(index) {
        testimonialCarousel.pause();
        testimonialCarousel.to(index);
    };

    carouselEl.addEventListener('slid.bs.carousel', function(e) {
        var dots = document.querySelectorAll('.testimonials-nav__dot');
        dots.forEach(function(dot, index) {
            if (index === e.to) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    });
}

/* Popup infolettre */
function initNewsletterPopup() {
    var overlay = document.getElementById('newsletter-overlay');
    var popup = document.getElementById('newsletter-popup');
    var form = document.getElementById('popup-newsletter-form');
    var DISMISS_DELAY = 7 * 24 * 60 * 60 * 1000;

    if (!overlay || !popup) return;

    function isPopupBlocked() {
        var subscribed = localStorage.getItem('tg_newsletter_subscribed');
        if (subscribed) return true;

        var dismissed = localStorage.getItem('tg_newsletter_dismissed');
        if (dismissed && (Date.now() - parseInt(dismissed, 10)) < DISMISS_DELAY) return true;

        return false;
    }

    function showPopup() {
        if (isPopupBlocked()) return;
        overlay.classList.add('active');
        popup.classList.add('active');
    }

    function closePopup() {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        if (!localStorage.getItem('tg_newsletter_subscribed')) {
            localStorage.setItem('tg_newsletter_dismissed', Date.now().toString());
        }
    }

    window.closeNewsletterPopup = closePopup;
    overlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closePopup();
    });

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('tg_newsletter_subscribed', Date.now().toString());
            localStorage.removeItem('tg_newsletter_dismissed');
            closePopup();
            alert('Merci ! Votre code de 10 % vous sera envoy\u00e9 par courriel.');
        });
    }

    var popupTriggered = false;

    function triggerPopup() {
        if (popupTriggered) return;
        popupTriggered = true;
        showPopup();
    }

    setTimeout(triggerPopup, 8000);

    window.addEventListener('scroll', function() {
        if (popupTriggered) return;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop >= 200) triggerPopup();
    });
}

/* Page PÃƒÆ’Ã‚Â¢ques : Kit */
function changeImageKit(thumb, src) {
    var mainImage = document.getElementById('main-image-kit');
    if (mainImage) {
        mainImage.src = src;
    }
    var thumbs = thumb.parentElement.querySelectorAll('.product-gallery__thumb');
    thumbs.forEach(function(t) {
        t.classList.remove('active');
    });
    thumb.classList.add('active');
}

function selectColorKit(btn) {
    var container = btn.parentElement;
    var options = container.querySelectorAll('.color-option');
    options.forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('selected');
    btn.setAttribute('aria-pressed', 'true');
}

function updateQuantityKit(change) {
    var input = document.getElementById('quantity-input-kit');
    if (input) {
        var newVal = parseInt(input.value) + change;
        if (newVal >= 1) {
            input.value = newVal;
        }
    }
}

function addToCartKit() {
    var quantity = document.getElementById('quantity-input-kit').value;
    var colorBtn = document.querySelector('#color-label-kit').nextElementSibling.querySelector('.color-option.selected');
    var color = colorBtn ? colorBtn.getAttribute('aria-label') : 'Assortiment';
    alert('Kit de PÃƒÆ’Ã‚Â¢ques ajoutÃƒÆ’Ã‚Â© au panier !\nQuantitÃƒÆ’Ã‚Â© : ' + quantity + '\nCouleur : ' + color);
}

/* Page PÃƒÆ’Ã‚Â¢ques : Oeuf */
function changeImageOeuf(thumb, src) {
    var mainImage = document.getElementById('main-image-oeuf');
    if (mainImage) {
        mainImage.src = src;
    }
    var thumbs = thumb.parentElement.querySelectorAll('.product-gallery__thumb');
    thumbs.forEach(function(t) {
        t.classList.remove('active');
    });
    thumb.classList.add('active');
}

function selectColorOeuf(btn) {
    var container = btn.parentElement;
    var options = container.querySelectorAll('.color-option');
    options.forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('selected');
    btn.setAttribute('aria-pressed', 'true');
}

function selectFormatOeuf(btn) {
    var container = btn.parentElement;
    var options = container.querySelectorAll('.format-option');
    options.forEach(function(opt) {
        opt.classList.remove('selected');
        opt.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('selected');
    btn.setAttribute('aria-pressed', 'true');
}

function updateQuantityOeuf(change) {
    var input = document.getElementById('quantity-input-oeuf');
    if (input) {
        var newVal = parseInt(input.value) + change;
        if (newVal >= 1) {
            input.value = newVal;
        }
    }
}

function addToCartOeuf() {
    var quantity = document.getElementById('quantity-input-oeuf').value;
    var formatBtn = document.querySelector('#format-label-oeuf').nextElementSibling.querySelector('.format-option.selected');
    var format = formatBtn ? formatBtn.textContent : '6 unitÃƒÆ’Ã‚Â©s';
    var colorBtn = document.querySelector('#color-label-oeuf').nextElementSibling.querySelector('.color-option.selected');
    var color = colorBtn ? colorBtn.getAttribute('aria-label') : 'Assortiment';
    alert('Biscuits \u0152uf de PÃƒÆ’Ã‚Â¢ques ajoutÃƒÆ’Ã‚Â©s au panier !\nFormat : ' + format + '\nQuantitÃƒÆ’Ã‚Â© : ' + quantity + '\nCouleur : ' + color);
}

/* Personnalisation */
function togglePersoOptions() {
    var checkbox = document.getElementById('perso-checkbox');
    var persoOptions = document.getElementById('perso-options');
    if (!checkbox || !persoOptions) return;
    if (checkbox.checked) {
        persoOptions.classList.remove('d-none');
    } else {
        persoOptions.classList.add('d-none');
    }
}

function selectPrenomColor(button) {
    var parent = button.closest('.perso-options__colors');
    if (!parent) return;
    var buttons = parent.querySelectorAll('.color-option');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');
}