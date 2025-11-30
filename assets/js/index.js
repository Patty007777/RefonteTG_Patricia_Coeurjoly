  document.addEventListener('DOMContentLoaded', function() {

    // =======  BONNES PRATIQUES =============================
    
    
    // Smooth scroll pour les ancres internes

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#!') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
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

    const emptyLinks = document.querySelectorAll('a[href="#"]');
    
    emptyLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
        });
    });
    
    // Les liens externes en nouvel onglet

    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(function(link) {
        const currentDomain = window.location.hostname;
        const linkDomain = new URL(link.href).hostname;
        
        if (linkDomain !== currentDomain) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    
    // ============ HEADER ============================================
    
    // Les dropdowns de la navigation

    const dropdowns = document.querySelectorAll('.header-horizontal__dropdown');
    
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.header-horizontal__dropdown-menu');
            if (menu && window.innerWidth >= 768) {
                menu.style.display = 'block';
                menu.style.opacity = '1';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.header-horizontal__dropdown-menu');
            if (menu) {
                menu.style.opacity = '0';
                setTimeout(function() {
                    menu.style.display = 'none';
                }, 200);
            }
        });
        
        const dropdownLink = dropdown.querySelector('.header-horizontal__link');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(event) {
                if (window.innerWidth < 768) {
                    event.preventDefault();
                    const menu = dropdown.querySelector('.header-horizontal__dropdown-menu');
                    if (menu) {
                        const isVisible = menu.style.display === 'block';
                        menu.style.display = isVisible ? 'none' : 'block';
                    }
                }
            });
        }
    });
    

    // L'indicateur de page active

    const navLinks = document.querySelectorAll('.header__link'); 
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(function(link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('header__link--active');
        } else {
            link.classList.remove('header__link--active');
        }
    });

    
    // Le bouton de recherche

  
const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.querySelector('.header__search-button');

    if (searchIcon && searchBar) {
        searchIcon.addEventListener('click', function(event) {
            event.preventDefault();
            searchBar.classList.toggle('show');
            
            if (searchBar.classList.contains('show')) {
                const searchInput = searchBar.querySelector('.header__search-input');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            }
        });
        
        if (searchButton) {
            searchButton.addEventListener('click', function(event) {
                event.preventDefault();
                const searchInput = searchBar.querySelector('.header__search-input');
                if (searchInput && searchInput.value.trim()) {
                    console.log('Recherche :', searchInput.value);
                }
            });
        }
        
        document.addEventListener('click', function(event) {
            if (!searchBar.contains(event.target) && !searchIcon.contains(event.target) && searchBar.classList.contains('show')) {
                searchBar.classList.remove('show');
            }
        });
    }


    // Le compteur du panier

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('truffeGourmandeCart')) || [];
        const cartCount = cartItems.length;
        
        const cartIcon = document.querySelector('[aria-label="Panier"]');
        if (cartIcon && cartCount > 0) {
            let badge = cartIcon.querySelector('.cart-badge');
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
    
    updateCartCount();

    // ============ FOOTER ANIMATION EFFET DACTYLOGRAPHIE ===============

    const footer = document.querySelector('.footer');

    if (footer) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    footer.classList.remove('footer--visible');
                    void footer.offsetWidth;
                    footer.classList.add('footer--visible');
                } else {
                    footer.classList.remove('footer--visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(footer);
    }

      // ============ SECTION TÉMOIGNAGES - PAGE BOUTIQUE.HTML ==================

    var carouselTemoignages = document.getElementById('carouselTemoignages');

    if (carouselTemoignages) {
        var INTERVAL = 5000;
        var timer = null;
        var paused = false;
        var bsCarousel = new bootstrap.Carousel(carouselTemoignages, {
            interval: false,
            wrap: true,
            touch: true
        });

        function start() {
            stop();
            if (!paused) {
                timer = setInterval(function() {
                    bsCarousel.next();
                }, INTERVAL);
            }
        }

        function stop() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        function pause() {
            paused = true;
            stop();
        }

        function resume() {
            paused = false;
            start();
        }

        carouselTemoignages.querySelectorAll('.temoignages-section__nav-btn, .temoignages-section__indicator').forEach(function(el) {
            el.addEventListener('click', pause);
        });

        var scrollTimeout = null;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                if (paused) resume();
            }, 200);
        });

        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                resume();
            } else {
                stop();
            }
        });

        var section = carouselTemoignages.closest('.temoignages-section');
        if (section) {
            new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting) {
                    if (paused) resume();
                    else if (!timer) start();
                } else {
                    stop();
                }
            }, { threshold: 0.3 }).observe(section);
        }

        carouselTemoignages.addEventListener('slid.bs.carousel', function(event) {
            var indicators = carouselTemoignages.querySelectorAll('.temoignages-section__indicator');
            indicators.forEach(function(indicator, i) {
                if (i === event.to) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        });

        start();
    }

    // ============ SECTION LES COLLECTIONS ÉPHÉMÈRES DU TEMPS DES FÊTES / PAGE CHIEN.HTML ==================

var carouselCollections = document.getElementById('carouselCollections');

if (carouselCollections) {
    var INTERVAL_COLLECTIONS = 5000;
    var timerCollections = null;
    var pausedCollections = false;
    var bsCarouselCollections = new bootstrap.Carousel(carouselCollections, {
        interval: false,
        wrap: true,
        touch: true
    });

    function startCollections() {
        stopCollections();
        if (!pausedCollections) {
            timerCollections = setInterval(function() {
                bsCarouselCollections.next();
            }, INTERVAL_COLLECTIONS);
        }
    }

    function stopCollections() {
        if (timerCollections) {
            clearInterval(timerCollections);
            timerCollections = null;
        }
    }

    function pauseCollections() {
        pausedCollections = true;
        stopCollections();
    }

    function resumeCollections() {
        pausedCollections = false;
        startCollections();
    }

    carouselCollections.querySelectorAll('.collections-section__nav-btn, .collections-section__indicator').forEach(function(el) {
        el.addEventListener('click', pauseCollections);
    });

    var scrollTimeoutCollections = null;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeoutCollections);
        scrollTimeoutCollections = setTimeout(function() {
            if (pausedCollections) resumeCollections();
        }, 200);
    });

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            resumeCollections();
        } else {
            stopCollections();
        }
    });

    var sectionCollections = carouselCollections.closest('.collections-section');
    if (sectionCollections) {
        new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                if (pausedCollections) resumeCollections();
                else if (!timerCollections) startCollections();
            } else {
                stopCollections();
            }
        }, { threshold: 0.3 }).observe(sectionCollections);
    }

    carouselCollections.addEventListener('slid.bs.carousel', function(event) {
        var indicators = carouselCollections.querySelectorAll('.collections-section__indicator');
        indicators.forEach(function(indicator, i) {
            if (i === event.to) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    });

    startCollections();
}
    
});

// ================== FONCTIONS UTILITAIRES =================================


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function animateElement(element, className, duration = 300) {
    element.classList.add(className);
    setTimeout(function() {
        element.classList.remove(className);
    }, duration);
}
