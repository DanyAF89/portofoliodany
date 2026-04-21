// Typing Animation
const texts = ["Full Stack Developer", "Web Designer", "Tech Enthusiast"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    const typingTextEl = document.getElementById("typing-text");
    if(typingTextEl) {
        typingTextEl.textContent = letter;
    }

    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 2; // Delete faster
    }

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Typing Animation
    type();
    
    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 4. Sticky Header Reveal on Scroll
    const header = document.getElementById('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('glass-panel', 'shadow-md');
                header.classList.remove('bg-transparent', 'border-white/5');
                header.classList.add('border-white/10');
                header.style.padding = "10px 0";
            } else {
                header.classList.remove('glass-panel', 'shadow-md');
                header.classList.add('bg-transparent', 'border-white/5');
                header.classList.remove('border-white/10');
                header.style.padding = "16px 0";
            }
        });
    }

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                // Optional: unobserve after animating to only play once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        // Set initial state
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-[1200ms]', 'ease-out');
        observer.observe(el);
    });

    // 6. Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    if(scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = `${scrollPx / winHeightPx * 100}%`;
            scrollProgress.style.width = scrolled;
        });
    }

    // 7. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    if (cursorDot && cursorOutline) {
        // Show cursor on initial mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.classList.remove('opacity-0');
            cursorOutline.classList.remove('opacity-0');
            cursorDot.classList.add('opacity-100');
            cursorOutline.classList.add('opacity-100');
        });

        // Smooth cursor animation
        const animateCursor = () => {
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;

            cursorDot.style.transform = `translate(calc(-50% + ${dotX}px), calc(-50% + ${dotY}px))`;
            cursorOutline.style.transform = `translate(calc(-50% + ${outlineX}px), calc(-50% + ${outlineY}px))`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .service-card, .hover-trigger');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    }

    // 8. Spotlight Effect on Cards
    const cards = document.querySelectorAll('.project-card, .service-card, .glass-panel.hover-trigger');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 9. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button styling
                filterBtns.forEach(b => {
                    b.classList.remove('bg-accent', 'text-white', 'shadow-[0_0_15px_rgba(37,99,235,0.4)]');
                    b.classList.add('bg-white/5', 'text-slate-300', 'border-white/10');
                });
                btn.classList.add('bg-accent', 'text-white', 'shadow-[0_0_15px_rgba(37,99,235,0.4)]');
                btn.classList.remove('bg-white/5', 'text-slate-300', 'border-white/10');

                const filterValue = btn.getAttribute('data-filter');

                // Filter cards with smooth animation
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});
