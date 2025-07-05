document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave al hacer clic en los enlaces del menú
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Efecto de resaltado para elementos técnicos al pasar el cursor
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 184, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Añadir efecto de aparición al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a observar para animación de entrada
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });
    
    // Efecto de escritura para el título del encabezado
    const headerTitle = document.querySelector('.profile-info h1');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        headerTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                headerTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Añadir cursor parpadeante al final
                headerTitle.insertAdjacentHTML('beforeend', '<span class="cursor">|</span>');
                const cursor = document.querySelector('.cursor');
                
                // Hacer que el cursor parpadee
                setInterval(() => {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }, 500);
                
                // Eliminar el cursor después de 3 segundos
                setTimeout(() => {
                    if (cursor) cursor.remove();
                }, 3000);
            }
        };
        
        // Iniciar el efecto de escritura después de un breve retraso
        setTimeout(typeWriter, 500);
    }
    
    // Añadir el año actual al pie de página
    const footerYear = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Jordi Puig Bou - Todos los derechos reservados`;
    
    // Añadir funcionalidad para mostrar imagen por defecto si la foto de perfil no carga
    const profilePic = document.getElementById('profile-pic');
    
    profilePic.addEventListener('error', function() {
        this.src = 'img/default-avatar.png';
    });
    
    // Crear el efecto de partículas de fondo
    createParticles();
});

// Función para crear partículas de fondo
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);
    
    // Estilos para el contenedor de partículas
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    
    // Crear partículas
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        
        // Estilos para partículas
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(0, 184, 255, ' + (Math.random() * 0.2 + 0.1) + ')';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 5px rgba(0, 184, 255, 0.5)';
        
        // Posición inicial
        resetParticle(particle);
        
        // Añadir al contenedor
        container.appendChild(particle);
        
        // Animar la partícula
        animateParticle(particle);
    }
}

// Restablecer la posición de la partícula
function resetParticle(particle) {
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + 100 + '%'; // Empezar desde debajo
    
    // Velocidades aleatorias (lento para un efecto sutil)
    particle.speedY = -(Math.random() * 0.5 + 0.2); // Hacia arriba
    
    // Opacidad aleatoria
    particle.style.opacity = Math.random() * 0.6 + 0.4;
}

// Animar una partícula
function animateParticle(particle) {
    let posY = parseFloat(particle.style.top);
    
    const moveParticle = () => {
        posY += particle.speedY;
        particle.style.top = posY + '%';
        
        // Si la partícula sale de la pantalla, resetearla
        if (posY < -10) {
            resetParticle(particle);
            posY = parseFloat(particle.style.top);
        }
        
        requestAnimationFrame(moveParticle);
    };
    
    moveParticle();
}

// Añadir estilos CSS para las animaciones
const styleElement = document.createElement('style');
styleElement.textContent = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-item.visible {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
    
    .cursor {
        font-weight: 100;
        transition: opacity 0.5s ease;
    }
    
    @keyframes glow {
        0% { text-shadow: 0 0 5px rgba(0, 184, 255, 0.5); }
        50% { text-shadow: 0 0 15px rgba(0, 184, 255, 0.8); }
        100% { text-shadow: 0 0 5px rgba(0, 184, 255, 0.5); }
    }
    
    .tech-highlight {
        animation: glow 2s infinite;
    }
`;

document.head.appendChild(styleElement);