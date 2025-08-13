document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
        
        // Ganti icon
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Tutup menu ketika mengklik di luar
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && e.target !== mobileToggle) {
            mainNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            mobileToggle.querySelector('i').classList.add('fa-bars');
        }
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    // Create dots
    if (slides.length > 0 && sliderDots) {
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
    }
    
    //fungsi slider
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        const dots = document.querySelectorAll('.dot');
        if (dots.length > 0) dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    sliderDots.addEventListener('click', resetInterval);
    
    // Language Switcher
    const languageSwitcher = document.querySelectorAll('.language-switcher span');
    
    languageSwitcher.forEach(span => {
        span.addEventListener('click', function() {
            languageSwitcher.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically change the language
            // For demo purposes, we'll just show an alert
            alert(`Language changed to ${this.textContent}`);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Animation on scroll
    function animateOnScroll() {
        // Hanya jalankan di desktop
        if (window.innerWidth > 768) {
            const elements = document.querySelectorAll('.product-card, .news-card, .about-content, .about-image');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
    }
    
    // Set initial state for animation
    if (window.innerWidth > 768) {
        document.querySelectorAll('.product-card, .news-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        const aboutContent = document.querySelector('.about-content');
        const aboutImage = document.querySelector('.about-image');
        
        if (aboutContent) {
            aboutContent.style.opacity = '0';
            aboutContent.style.transform = 'translateX(-20px)';
            aboutContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        if (aboutImage) {
            aboutImage.style.opacity = '0';
            aboutImage.style.transform = 'translateX(20px)';
            aboutImage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
});
