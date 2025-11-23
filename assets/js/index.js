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

    const navLinks = document.querySelectorAll('.header-horizontal__link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(function(link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('header-horizontal__link--active');
        } else {
            link.classList.remove('header-horizontal__link--active');
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
