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
    
    // Funcionalidad para los elementos colapsables en experiencia profesional
    const timelineHeaders = document.querySelectorAll('.timeline-header');
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    // Función para manejar el clic en los encabezados o botones de la experiencia
    function toggleExperienceContent(event) {
        // Encontrar el elemento timeline-item padre
        const timelineItem = event.currentTarget.closest('.timeline-item');
        
        // Encontrar el contenido y el botón dentro de ese elemento
        const content = timelineItem.querySelector('.timeline-content');
        const button = timelineItem.querySelector('.toggle-btn');
        
        // Alternar la clase collapsed en el contenido
        content.classList.toggle('collapsed');
        
        // Alternar la clase active en el botón para la rotación
        button.classList.toggle('active');
    }
    
    // Añadir el evento de clic tanto al encabezado como al botón
    timelineHeaders.forEach(header => {
        header.addEventListener('click', toggleExperienceContent);
    });
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Evitar que el clic en el botón también active el evento del encabezado
            e.stopPropagation();
            
            // Llamar a la misma función de toggle
            toggleExperienceContent(e);
        });
    });
    
    // Reemplazo el efecto de escritura parpadeante por una simple aparición del nombre
    const headerTitle = document.querySelector('.profile-info h1');
    if (headerTitle) {
        // Simplemente añadimos una clase para una transición suave sin parpadeo
        headerTitle.classList.add('fade-in-text');
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
    
    // Crear el efecto de partículas de fondo con menos densidad y sin parpadeo
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
    
    // Crear partículas (reduciendo la cantidad para minimizar distracciones)
    const particleCount = window.innerWidth < 768 ? 10 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        
        // Estilos para partículas
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(0, 184, 255, ' + (Math.random() * 0.15 + 0.05) + ')';
        particle.style.borderRadius = '50%';
        // Reducir el brillo para evitar efecto de parpadeo
        particle.style.boxShadow = '0 0 3px rgba(0, 184, 255, 0.3)';
        
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
    particle.speedY = -(Math.random() * 0.3 + 0.1); // Hacia arriba (más lento)
    
    // Opacidad aleatoria pero menos variable
    particle.style.opacity = Math.random() * 0.4 + 0.3;
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

// Añadir estilos CSS para las animaciones (sin parpadeo)
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
    
    .fade-in-text {
        opacity: 0;
        animation: fadeIn 1s forwards;
    }
    
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    /* Eliminar la animación de brillo parpadeante */
    .tech-highlight {
        color: var(--accent-color);
        text-shadow: 0 0 5px var(--glow-color);
    }
`;

document.head.appendChild(styleElement);