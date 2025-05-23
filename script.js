document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"], .hero-section a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // For logo/home link, scroll to top if target is #accueil or just #
            if (targetId === '#' || targetId === '#accueil') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Adjust for fixed header height
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Close mobile nav if open
            if (document.querySelector('.nav-links').classList.contains('nav-active')) {
                document.querySelector('.nav-links').classList.remove('nav-active');
                document.querySelector('header').classList.remove('nav-open');
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
            header.classList.toggle('nav-open');
        });
    }
    
    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Contact form submission (simulation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation example (can be expanded)
            const name = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simulate form submission
            alert('Message envoyé (simulation) ! Merci de m\'avoir contacté.');
            contactForm.reset(); 
        });
    }

    // Active navigation link highlighting based on scroll position
    const sections = document.querySelectorAll('main section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;

    function changeNavActiveState() {
        let index = sections.length;

        while(--index && window.scrollY + headerHeight < sections[index].offsetTop) {}
        
        document.querySelectorAll('.nav-links a').forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${sections[index].id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
             // If #accueil is scrolled to top (or near top)
             if (window.scrollY < sections[0].offsetTop) {
                const homeLink = document.querySelector('.nav-links a[href="#accueil"]');
                if(homeLink) homeLink.classList.add('active');
             }
        }
    }

    // Initial call and on scroll
    if (sections.length > 0) {
        changeNavActiveState();
        window.addEventListener('scroll', changeNavActiveState);
    }

});

