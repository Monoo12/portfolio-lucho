// Variables globales
let currentSection = 'inicio';
let isScrolling = false;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializePortfolioFilters();
    initializeSkillBars();
    initializeContactForm();
    initializeModals();
    initializeCounters();
});

// Navegación
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scroll para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Cerrar menu móvil
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Actualizar enlace activo basado en scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Actualizar enlace activo en la navegación
function updateActiveNavLink() {
    if (isScrolling) return;

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Efectos de scroll y animaciones de entrada
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.portfolio-item, .skill-category, .contact-item, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
}

// Inicializar animaciones generales
function initializeAnimations() {
    // Animación del scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('sobre-mi');
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Animaciones de hover para elementos interactivos
    const interactiveElements = document.querySelectorAll('.btn, .portfolio-item, .skill-badge');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Filtros del portafolio
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Barras de progreso de habilidades
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = targetWidth;
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Formulario de contacto
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Mostrar estado de carga
        submitBtn.classList.add('loading');
        
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado exitosamente!', 'success');
        
        // Resetear formulario
        form.reset();
        submitBtn.classList.remove('loading');
        
        // Resetear labels
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
            label.style.top = '15px';
            label.style.fontSize = '16px';
            label.style.color = 'var(--text-light)';
        });
    });

    // Animación de labels flotantes
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const label = input.nextElementSibling;
        
        input.addEventListener('focus', () => {
            label.style.top = '-10px';
            label.style.fontSize = '12px';
            label.style.color = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.style.top = '15px';
                label.style.fontSize = '16px';
                label.style.color = 'var(--text-light)';
            }
        });
    });
}

// Modales del portafolio
function initializeModals() {
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                openModal.style.display = 'none';
            }
        }
    });
}

// Funciones para abrir y cerrar modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animación de entrada
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'fadeInUp 0.3s ease forwards';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'fadeInUp 0.3s ease reverse';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Contadores animados
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animar contador
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this.parentElement.parentElement)">&times;</button>
        </div>
    `;

    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        color: var(--text-dark);
        padding: 20px;
        border-radius: 10px;
        box-shadow: var(--shadow-heavy);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        border-left: 4px solid ${getNotificationColor(type)};
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'var(--primary-color)',
        error: 'var(--accent-color)',
        warning: '#FFA726',
        info: 'var(--secondary-color)'
    };
    return colors[type] || colors.info;
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// Efectos de paralaje suaves
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Inicializar paralaje después de cargar la página
window.addEventListener('load', initializeParallax);

// Lazy loading para imágenes (si se añaden en el futuro)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Smooth scroll para todos los enlaces internos
function initializeSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Detección de dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimizaciones para móviles
function initializeMobileOptimizations() {
    if (isMobile()) {
        // Reducir animaciones en móviles para mejor performance
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(style);

        // Desactivar efectos de hover en móviles
        const hoverElements = document.querySelectorAll('.btn, .portfolio-item, .skill-badge');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', () => {});
        });
    }
}

// Preloader (opcional)
function initializePreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <span class="logo-text">MEG</span>
                <span class="logo-subtitle">Art</span>
            </div>
            <div class="preloader-spinner"></div>
        </div>
    `;

    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 300);
        }, 500);
    });
}

// Gestión de estado de la aplicación
const AppState = {
    currentFilter: 'all',
    isModalOpen: false,
    activeSection: 'inicio',
    
    setCurrentFilter(filter) {
        this.currentFilter = filter;
    },
    
    setModalState(isOpen) {
        this.isModalOpen = isOpen;
    },
    
    setActiveSection(section) {
        this.activeSection = section;
    }
};

// Utilidades de performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimizar eventos de scroll
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Optimizar eventos de resize
const optimizedResizeHandler = debounce(() => {
    // Recalcular posiciones si es necesario
    if (window.innerWidth !== AppState.lastWidth) {
        AppState.lastWidth = window.innerWidth;
        initializeMobileOptimizations();
    }
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Validación avanzada del formulario
function validateForm(form) {
    const errors = [];
    const formData = new FormData(form);
    
    // Validar nombre
    const name = formData.get('name');
    if (!name || name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar email
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    // Validar asunto
    const subject = formData.get('subject');
    if (!subject || subject.trim().length < 5) {
        errors.push('El asunto debe tener al menos 5 caracteres');
    }
    
    // Validar mensaje
    const message = formData.get('message');
    if (!message || message.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

// Mejorar el manejo del formulario de contacto
function enhanceContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const errors = validateForm(form);
        
        if (errors.length > 0) {
            showNotification(errors[0], 'error');
            return;
        }
        
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        
        try {
            // Simular envío del formulario
            await simulateFormSubmission();
            showNotification('¡Mensaje enviado exitosamente!', 'success');
            form.reset();
            resetFormLabels(form);
        } catch (error) {
            showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch(field.name) {
        case 'name':
            isValid = value.length >= 2;
            message = 'El nombre debe tener al menos 2 caracteres';
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = 'Por favor ingresa un email válido';
            break;
        case 'subject':
            isValid = value.length >= 5;
            message = 'El asunto debe tener al menos 5 caracteres';
            break;
        case 'message':
            isValid = value.length >= 10;
            message = 'El mensaje debe tener al menos 10 caracteres';
            break;
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = 'var(--accent-color)';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: var(--accent-color);
            font-size: 0.8rem;
            margin-top: 5px;
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = 'var(--primary-light)';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function resetFormLabels(form) {
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
        label.style.top = '15px';
        label.style.fontSize = '16px';
        label.style.color = 'var(--text-light)';
    });
}

async function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simular éxito del 90% del tiempo
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Error de red simulado'));
            }
        }, 2000);
    });
}

// Mejorar la experiencia del usuario con micro-interacciones
function initializeMicroInteractions() {
    // Efecto de ondas en los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Animación de escritura para el título hero
    animateTypeWriter();
    
    // Efecto de partículas flotantes (opcional)
    if (!isMobile()) {
        createFloatingParticles();
    }
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function animateTypeWriter() {
    const nameElement = document.querySelector('.hero-title .name');
    if (!nameElement) return;
    
    const text = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            nameElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                nameElement.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 15; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--primary-color);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.3;
        animation: floatRandom ${duration}s ease-in-out infinite;
    `;
    
    container.appendChild(particle);
}

// Agregar estilos de animación para las ondas y partículas
const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes floatRandom {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-10px) translateX(-15px);
        }
        75% {
            transform: translateY(-30px) translateX(5px);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar todas las mejoras cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    enhanceContactForm();
    initializeMicroInteractions();
    initializeMobileOptimizations();
    
    // Inicializar preloader si se desea
    // initializePreloader();
});

// Gestión de errores global
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    // En producción, podrías enviar esto a un servicio de logging
});

// Optimización de performance con requestAnimationFrame
function optimizeAnimations() {
    let ticking = false;
    
    function updateAnimations() {
        // Aquí se ejecutarían las animaciones que necesitan ser optimizadas
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    return requestTick;
}

const optimizedAnimationHandler = optimizeAnimations();