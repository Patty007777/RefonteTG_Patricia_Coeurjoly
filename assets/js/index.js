 // =======  BONNES PRATIQUES =============================
 
    document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll pour les ancres internes

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
    
    // Prévention des liens vides

    var emptyLinks = document.querySelectorAll('a[href="#"]');
    
    emptyLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
        });
    });
    
    // Les liens externes en nouvel onglet

    var externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(function(link) {
        var currentDomain = window.location.hostname;
        var linkDomain = new URL(link.href).hostname;
        
        if (linkDomain !== currentDomain) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    
    // ============ L'INDICATEUR DE PAGE ACTIVE ===============

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


    // ============  BOUTON DE RECHERCHE DANS LE HEADER ===============

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


    // ============ LE COMPTEUR DU PANIER ===============

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


    // ============ FORMULAIRE SOUMETTRE DE L'INFOLETTRE  ===============

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


    // ============ ANIMATION DU TEXTE DACTYLOGRAPHIÉ DANS LE FOOTER ===============

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


    // ============ L'INDICATEURS D'IMAGE DANS LE CARROUSEL DES TÉMOIGNAGES ===============

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


    // ============ L'INDICATEURS D'IMAGES DANS LE CARROUSEL LES COLLECTIONS ===============

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

   // ============ BOUTON DE RECHERCHE MOBILE ===============

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

});


// ================== FONCTIONS UTILITAIRES =================================

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