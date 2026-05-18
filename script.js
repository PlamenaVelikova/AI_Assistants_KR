document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобилно меню
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // 2. Плавно скролване до секции
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Скролване с отместване за хедъра
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Затваряне на мобилното меню при клик
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });

    // 3. Анимация при появяване на секции при скрол
    const sections = document.querySelectorAll('.content-section');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target); // Спираме да наблюдаваме след появата
            }
        });
    }, {
        threshold: 0.1 // Секцията трябва да е 10% видима
    });
    
    sections.forEach(section => {
        // Първоначално задаваме анимацията на pause
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
});

/* Active section in navigation */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {
            link.classList.add("active");
        }
    });
});

// Floating particles
function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    document.querySelector(".particles").appendChild(particle);

    const size = Math.random() * 6 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = "100vh";

    particle.style.opacity = Math.random();

    particle.style.animationDuration = (Math.random() * 5 + 3) + "s";

    setTimeout(() => {
        particle.remove();
    }, 8000);
}

setInterval(createParticle, 300);

// 3D Tilt effect

const cards = document.querySelectorAll(".card, .example-item");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (x - centerX) / -10;

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });

});
