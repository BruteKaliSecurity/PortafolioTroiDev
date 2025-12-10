// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1000);
});

// Modo Oscuro/Claro
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplicar tema guardado
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Botón Volver Arriba
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Navbar con scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Activar enlace activo en navegación
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Animación de barras de habilidades
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = progress + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Inicializar animaciones cuando se carga la página
window.addEventListener('load', () => {
    animateSkillBars();
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validación mejorada
    let isValid = true;
    let errorMessage = '';
    
    // Validar nombre
    if (!name || name.length < 2) {
        isValid = false;
        errorMessage = 'El nombre debe tener al menos 2 caracteres.';
        document.getElementById('name').style.borderColor = '#ef4444';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un email válido.';
        document.getElementById('email').style.borderColor = '#ef4444';
    }
    
    // Validar asunto
    if (!subject || subject.length < 3) {
        isValid = false;
        errorMessage = 'El asunto debe tener al menos 3 caracteres.';
        document.getElementById('subject').style.borderColor = '#ef4444';
    }
    
    // Validar mensaje
    if (!message || message.length < 10) {
        isValid = false;
        errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
        document.getElementById('message').style.borderColor = '#ef4444';
    }
    
    if (isValid) {
        // Crear objeto con los datos del formulario
        const formData = {
            nombre: name,
            email: email,
            asunto: subject,
            mensaje: message,
            fecha: new Date().toLocaleString('es-ES')
        };
        
        // Mostrar mensaje de éxito
        showFormMessage('success', `¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. Te contactaré pronto.`);
        
        // Mostrar datos en consola (para demostración)
        console.log('Datos del formulario enviados:', formData);
        
        // Limpiar formulario
        contactForm.reset();
        
        // Resetear estilos de los campos
        formInputs.forEach(input => {
            input.style.borderColor = '#e2e8f0';
        });
    } else {
        showFormMessage('error', errorMessage);
    }
});

// Función para mostrar mensajes del formulario
function showFormMessage(type, message) {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    contactForm.appendChild(messageDiv);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

// Animación de entrada para elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de proyectos
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Aplicar animación a los elementos de habilidades
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Prevenir scroll horizontal
document.body.style.overflowX = 'hidden';

// Cerrar menú móvil al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Agregar efecto hover mejorado a las tarjetas de proyecto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Validación en tiempo real del formulario
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#e2e8f0';
        }
    });
});

// Función para validar campos individuales
function validateField(field) {
    const value = field.value.trim();
    
    if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    if (value === '') {
        field.style.borderColor = '#ef4444';
        return false;
    } else {
        field.style.borderColor = '#10b981';
        return true;
    }
}

// Agregar efecto de typing en el hero (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Palabras tecnológicas para rotar
const techWords = [
    'Smart Contract', 'DApp', 'Tokenomics', 'Gas Fee', 'Wallet', 'Ledger', 
    'Hash', 'Mining', 'Proof of Work', 'Proof of Stake', 'Layer 1', 'Layer 2', 
    'Fork', 'Oracle', 'NFT', 'Machine Learning', 'Deep Learning', 'LLM', 
    'Dataset', 'Inferencia', 'Entrenamiento', 'Prompting', 'Agente de IA', 
    'RAG', 'Embeddings', 'Fine-Tuning', 'Overfitting', 'Modelo Generativo', 
    'Vector Store', 'API de IA', 'Vulnerabilidad', 'Exploit', 'Phishing', 
    'Ingeniería Social', 'Malware', 'Ransomware', 'Firewall', 'Zero-Trust', 
    'OSINT', 'Pentesting', 'Red Team', 'Cifrado', 'Autenticación', 'OWASP', 
    'DDoS', 'Descentralización', 'Tokenización', 'Identidad Digital', 
    'Interoperabilidad', 'Escalabilidad'
];

let currentWordIndex = -1; // -1 para empezar con el nombre
let isTyping = false;
let typeInterval = null;
let rotationInterval = null;

// Función para escribir texto con efecto de máquina de escribir
function typeWriter(element, text, callback) {
    if (isTyping && typeInterval) {
        clearInterval(typeInterval);
    }
    isTyping = true;
    element.textContent = '';
    let i = 0;
    
    typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            if (callback) callback();
        }
    }, 80);
}

// Función para borrar texto
function deleteText(element, callback) {
    if (isTyping && typeInterval) {
        clearInterval(typeInterval);
    }
    isTyping = true;
    const text = element.textContent;
    let i = text.length;
    
    typeInterval = setInterval(() => {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            if (callback) callback();
        }
    }, 50);
}

// Función para cambiar solo la parte que cambia (después de "Hola, soy")
function changeNameText() {
    const changingElement = document.querySelector('.name-changing');
    if (!changingElement) return;
    
    // Solo mostrar palabras tecnológicas (currentWordIndex siempre >= 0)
    const wordToShow = techWords[currentWordIndex];
    
    // Obtener el texto actual
    const currentText = changingElement.textContent;
    
    if (currentText) {
        // Borrar el texto actual
        let i = currentText.length;
        
        if (typeInterval) {
            clearInterval(typeInterval);
        }
        
        typeInterval = setInterval(() => {
            if (i > 0) {
                changingElement.textContent = currentText.substring(0, i - 1);
                i--;
            } else {
                clearInterval(typeInterval);
                // Escribir la nueva palabra
                setTimeout(() => {
                    typeWriter(changingElement, wordToShow, () => {
                        // Texto escrito completamente
                    });
                }, 200);
            }
        }, 50);
    } else {
        // Si no hay texto, escribir directamente
        typeWriter(changingElement, wordToShow, () => {
            // Texto escrito completamente
        });
    }
}

// Función para iniciar la rotación de palabras
function startRotatingWords() {
    // Después de 5 segundos de mostrar "Alejandro Roque", empezar a rotar las palabras tecnológicas
    setTimeout(() => {
        currentWordIndex = 0;
        changeNameText();
        
        // Cambiar palabra cada 5 segundos
        rotationInterval = setInterval(() => {
            currentWordIndex = (currentWordIndex + 1) % techWords.length;
            changeNameText();
        }, 5000);
    }, 5000);
}

// Inicializar efecto de escritura en el nombre
const namePrefix = document.querySelector('.name-prefix');
const nameSpace = document.querySelector('.name-space');
const nameChanging = document.querySelector('.name-changing');

if (namePrefix && nameSpace && nameChanging) {
    namePrefix.style.opacity = '0';
    nameSpace.style.opacity = '0';
    nameChanging.style.opacity = '0';
    
    setTimeout(() => {
        namePrefix.style.opacity = '1';
        nameSpace.style.opacity = '1';
        nameChanging.style.opacity = '1';
        
        // Escribir primero "Hola, soy" (sin espacio al final)
        typeWriter(namePrefix, 'Hola, soy', () => {
            setTimeout(() => {
                // El espacio ya está visible en el HTML, solo escribir el nombre
                typeWriter(nameChanging, 'Alejandro Roque', () => {
                    // Después de mostrar el nombre una vez, empezar la rotación con palabras tecnológicas
                    startRotatingWords();
                });
            }, 500);
        });
    }, 1500);
}

// Mejorar animaciones de entrada
const animatedElements = document.querySelectorAll('.project-card, .skill-item, .stat-item');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(element);
});

// Efecto parallax mejorado
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// Agregar efecto de hover mejorado a los botones
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contador animado para estadísticas
const statNumbers = document.querySelectorAll('.stat-item h3');

const countUp = (element, target, suffix = '') => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            const displayValue = Math.floor(current);
            element.textContent = displayValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItem = entry.target;
            const originalText = statItem.textContent;
            let number = parseInt(originalText);
            let suffix = '';
            
            if (originalText.includes('+')) {
                suffix = '+';
            } else if (originalText.includes('%')) {
                suffix = '%';
            }
            
            if (!isNaN(number)) {
                statItem.textContent = '0' + suffix;
                countUp(statItem, number, suffix);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// INTEGRACIÓN CON GITHUB API
// ============================================

// Configuración: Cambia esto por tu nombre de usuario de GitHub
const GITHUB_USERNAME = 'BruteKaliSecurity';

// Token de GitHub (opcional, pero recomendado para evitar límites de tasa)
// Obtén uno en: https://github.com/settings/tokens (no necesita permisos especiales)
// ⚠️ IMPORTANTE: Para usar autenticación con GitHub API, configura tu token aquí
// Obtén un token en: https://github.com/settings/tokens
// Luego reemplaza 'TU_TOKEN_AQUI' con tu token personal
const GITHUB_TOKEN = ''; // Deja vacío para usar sin autenticación (límite de 60 requests/hora)

// Función para decodificar contenido base64
function decodeBase64(str) {
    try {
        return atob(str.replace(/\s/g, ''));
    } catch (e) {
        return '';
    }
}

// Función para extraer información del README
function extractReadmeInfo(readmeContent) {
    if (!readmeContent) return { description: '', tags: [] };
    
    const lines = readmeContent.split('\n');
    let description = '';
    const tags = [];
    
    // Buscar descripción (primera línea después de # o primera línea de texto)
    for (let i = 0; i < Math.min(10, lines.length); i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('#') && !line.startsWith('![') && line.length > 20) {
            description = line.replace(/[#*`]/g, '').trim();
            break;
        }
    }
    
    // Corregir problemas de codificación UTF-8
    description = description
        .replace(/anÃ¡lisis/gi, 'análisis')
        .replace(/gestiÃ³n/gi, 'gestión')
        .replace(/BogotÃ¡/gi, 'Bogotá')
        .replace(/PortÃ¡til/gi, 'Portátil')
        .replace(/Ã¡/g, 'á')
        .replace(/Ã©/g, 'é')
        .replace(/Ã­/g, 'í')
        .replace(/Ã³/g, 'ó')
        .replace(/Ãº/g, 'ú')
        .replace(/Ã±/g, 'ñ')
        .replace(/Ã/g, 'í');
    
    // Reemplazar texto específico si se encuentra
    if (description.includes('Portátil y verificable en cualquier comercio')) {
        description = description.replace(/Portátil y verificable en cualquier comercio/gi, 
                                         'Transacciones verificables con BlockChain e IA en cualquier comercio.');
    }
    
    // Buscar tecnologías en el README
    const techKeywords = ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'Node', 'Python', 'Java', 'PHP', 'TypeScript', 'Next.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Git', 'GitHub', 'Blockchain', 'BlockChain', 'IA', 'AI'];
    const contentLower = readmeContent.toLowerCase();
    
    techKeywords.forEach(tech => {
        if (contentLower.includes(tech.toLowerCase())) {
            tags.push(tech);
        }
    });
    
    // Limitar a 5 tags
    return {
        description: description || 'Proyecto en desarrollo activo.',
        tags: tags.slice(0, 5)
    };
}

// Función para obtener el README de un repositorio
async function getReadme(owner, repo) {
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers: headers
        });
        
        if (!response.ok) {
            return null;
        }
        
        const data = await response.json();
        const content = decodeBase64(data.content);
        return extractReadmeInfo(content);
    } catch (error) {
        console.error(`Error obteniendo README de ${repo}:`, error);
        return null;
    }
}

// Función para obtener los lenguajes de un repositorio
async function getRepoLanguages(owner, repo) {
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers: headers
        });
        
        if (!response.ok) {
            return [];
        }
        
        const data = await response.json();
        return Object.keys(data).slice(0, 5); // Máximo 5 lenguajes
    } catch (error) {
        console.error(`Error obteniendo lenguajes de ${repo}:`, error);
        return [];
    }
}

// Función para crear una tarjeta de proyecto
function createProjectCard(project, readmeInfo, languages) {
    const tags = readmeInfo?.tags.length > 0 ? readmeInfo.tags : languages;
    const description = readmeInfo?.description || project.description || 'Proyecto en desarrollo activo.';
    
    // URL del repositorio en GitHub
    const githubUrl = project.html_url;
    
    // Reemplazar nombres específicos de proyectos
    let displayName = project.name;
    let shouldCenterTitle = false;
    
    if (displayName === 'Sistecr-ditoHackathon' || displayName.toLowerCase().includes('sistecr-ditohackathon')) {
        displayName = 'Sistecrédito Hackathon.';
    } else if (displayName === 'Bogot-LimpIA' || displayName.toLowerCase().includes('bogot-limpia')) {
        displayName = 'Bogotá LimpIA';
    } else if (displayName === 'FormularioPrueba' || displayName.toLowerCase().includes('formularioprueba')) {
        displayName = 'Formulario Transito y Transporte MED.';
        shouldCenterTitle = true;
    } else if (displayName === 'BarrioCuidaBarrioHackathon' || displayName.toLowerCase().includes('barriocuidabarriohackathon')) {
        displayName = 'Barrio Cuida Barrio Hackathon';
        shouldCenterTitle = true;
    }
    
    const centerClass = shouldCenterTitle ? ' center-title' : '';
    
    return `
        <div class="project-card">
            <div class="project-image">
                <div class="project-placeholder${centerClass}">${displayName}</div>
            </div>
            <div class="project-info">
                <h3 class="${shouldCenterTitle ? 'center-title' : ''}">${displayName}</h3>
                <p>${description}</p>
                <div class="project-tags">
                    ${tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Ir a GitHub</a>
                </div>
                ${project.stargazers_count > 0 ? `<div class="project-stats"><span>⭐ ${project.stargazers_count}</span></div>` : ''}
            </div>
        </div>
    `;
}

// Función principal para cargar proyectos desde GitHub
async function loadGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const projectsLoading = document.getElementById('projects-loading');
    
    if (!projectsGrid || !projectsLoading) {
        console.error('No se encontraron los elementos del DOM para proyectos');
        return;
    }
    
    // Verificar si el usuario configuró su GitHub
    if (GITHUB_USERNAME === 'tu-usuario-github') {
        projectsLoading.innerHTML = '<p style="color: var(--secondary-color);">⚠️ Por favor, configura tu nombre de usuario de GitHub en script.js (línea ~595)</p>';
        return;
    }
    
    try {
        projectsLoading.style.display = 'block';
        projectsGrid.innerHTML = '';
        
        // Preparar headers con token si está disponible
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        // Obtener repositorios públicos del usuario
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
            headers: headers
        });
        
        if (!response.ok) {
            if (response.status === 403) {
                // Error 403: Límite de tasa excedido o acceso denegado
                const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
                const rateLimitReset = response.headers.get('X-RateLimit-Reset');
                
                if (rateLimitRemaining === '0') {
                    const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'pronto';
                    const resetTimestamp = rateLimitReset ? parseInt(rateLimitReset) * 1000 : Date.now() + 3600000;
                    
                    // Mostrar mensaje con botón de reintento
                    showRateLimitError(resetTime, resetTimestamp);
                    return;
                } else {
                    throw new Error('Acceso denegado a la API de GitHub. Verifica que el usuario sea público o agrega un token de GitHub.');
                }
            } else if (response.status === 404) {
                throw new Error(`Usuario de GitHub "${GITHUB_USERNAME}" no encontrado. Verifica que el nombre de usuario sea correcto.`);
            } else {
                throw new Error(`Error al obtener repositorios: ${response.status} ${response.statusText}`);
            }
        }
        
        const repos = await response.json();
        
        // Filtrar repositorios (excluir forks y el portafolio actual)
        const projects = repos
            .filter(repo => {
                // Excluir forks sin estrellas
                if (repo.fork && repo.stargazers_count === 0) return false;
                // Excluir el portafolio actual (PortafolioTroi, PortafolioTroiDev, o variaciones)
                const repoNameLower = repo.name.toLowerCase();
                if (repoNameLower.includes('portafoliotroi') || 
                    repoNameLower.includes('portafolio-troi') ||
                    repoNameLower === 'portafolio') {
                    return false;
                }
                return true;
            })
            .slice(0, 6);
        
        if (projects.length === 0) {
            projectsLoading.innerHTML = '<p>No se encontraron proyectos públicos.</p>';
            return;
        }
        
        // Cargar información de cada proyecto
        const projectsPromises = projects.map(async (repo) => {
            const [readmeInfo, languages] = await Promise.all([
                getReadme(repo.owner.login, repo.name),
                getRepoLanguages(repo.owner.login, repo.name)
            ]);
            
            return createProjectCard(repo, readmeInfo, languages);
        });
        
        const projectsHTML = await Promise.all(projectsPromises);
        
        projectsLoading.style.display = 'none';
        projectsGrid.innerHTML = projectsHTML.join('');
        
        // Re-aplicar animaciones a las nuevas tarjetas
        const newCards = projectsGrid.querySelectorAll('.project-card');
        newCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
        
    } catch (error) {
        console.error('Error cargando proyectos:', error);
        projectsLoading.innerHTML = `
            <div class="error-message">
                <p style="color: var(--secondary-color); margin-bottom: 1rem;">Error al cargar proyectos: ${error.message}</p>
                <button onclick="loadGitHubProjects()" class="btn-retry">Reintentar</button>
            </div>
        `;
    }
}

// Función para mostrar error de límite de tasa con botón de reintento
function showRateLimitError(resetTime, resetTimestamp) {
    const projectsGrid = document.getElementById('projects-grid');
    const projectsLoading = document.getElementById('projects-loading');
    
    if (!projectsGrid || !projectsLoading) return;
    
    projectsLoading.style.display = 'block';
    projectsGrid.innerHTML = '';
    
    const message = `
        <div class="rate-limit-error">
            <p style="color: var(--secondary-color); margin-bottom: 1rem;">
                ⚠️ Límite de solicitudes de GitHub excedido.
            </p>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
                Intenta de nuevo después de las <strong>${resetTime}</strong>.
            </p>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.85rem;">
                💡 <strong>Tip:</strong> Para evitar esto, agrega un token de GitHub en script.js (línea ~615).<br>
                Obtén uno en: <a href="https://github.com/settings/tokens" target="_blank" style="color: var(--primary-color);">github.com/settings/tokens</a>
            </p>
            <button onclick="loadGitHubProjects()" class="btn-retry">Reintentar</button>
            <div id="countdown" style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.85rem;"></div>
        </div>
    `;
    
    projectsLoading.innerHTML = message;
    
    // Contador regresivo
    const countdownEl = document.getElementById('countdown');
    if (countdownEl && resetTimestamp) {
        const updateCountdown = () => {
            const now = Date.now();
            const diff = resetTimestamp - now;
            
            if (diff > 0) {
                const minutes = Math.floor(diff / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);
                countdownEl.textContent = `Tiempo restante: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                setTimeout(updateCountdown, 1000);
            } else {
                countdownEl.textContent = '¡Ya puedes intentar de nuevo!';
                countdownEl.style.color = 'var(--primary-color)';
            }
        };
        updateCountdown();
    }
}

// Inicializar cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    // Activar primera sección
    activateNavLink();
    
    // Agregar clase de carga completada
    document.body.classList.add('loaded');
    
    // Prevenir scroll durante carga
    document.body.style.overflow = 'hidden';
    
    // Cargar proyectos de GitHub
    loadGitHubProjects();
    
    // Inicializar galería de reconocimientos
    initRecognitionGallery();
});

// ============================================
// GALERÍA DE RECONOCIMIENTOS
// ============================================

// Configuración: Imágenes de reconocimientos desde la carpeta images/
const RECOGNITION_IMAGES = [
    'images/💻⚡LATIN HACK 2025⚡💻Un lugar donde las ideas se convierten en código, el café en energía y los .jpg',
    'images/💻⚡LATIN HACK 2025⚡💻Un lugar donde las ideas se convierten en código, el café en energía y los -2.jpg',
    'images/💻⚡LATIN HACK 2025⚡💻Un lugar donde las ideas se convierten en código, el café en energía y los -3.jpg',
    'images/💻⚡LATIN HACK 2025⚡💻Un lugar donde las ideas se convierten en código, el café en energía y los -4.jpg',
    'images/Quiero dar las gracias de corazón a @celocolombia , @eafit , @feg_eafit y a FinHub. ❤️Conseguimo.jpg',
    'images/Quiero dar las gracias de corazón a @celocolombia , @eafit , @feg_eafit y a FinHub. ❤️Conseguimo-2.jpg',
    'images/Quiero dar las gracias de corazón a @celocolombia , @eafit , @feg_eafit y a FinHub. ❤️Conseguimo-3.jpg',
    'images/Quiero dar las gracias de corazón a @celocolombia , @eafit , @feg_eafit y a FinHub. ❤️Conseguimo-4.jpg',
    'images/No todos los días se visita el lugar donde nació el verbo "googlear". 💻🧑🏾‍💻⚡🔓🚀🔒La empres.webp',
    'images/No todos los días se visita el lugar donde nació el verbo "googlear". 💻🧑🏾‍💻⚡🔓🚀🔒La empres-2.webp',
    'images/No todos los días se visita el lugar donde nació el verbo "googlear". 💻🧑🏾‍💻⚡🔓🚀🔒La empres-3.webp',
    'images/1765304838932.jpeg'
];

let currentImageIndex = 0;
let galleryInterval = null;
let validImageIndices = []; // Índices de las imágenes que se cargaron correctamente

// Función para inicializar la galería de reconocimientos
function initRecognitionGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    const galleryIndicators = document.getElementById('gallery-indicators');
    
    if (!galleryContainer || !galleryIndicators) return;
    
    // Si no hay imágenes configuradas, mostrar placeholder
    if (RECOGNITION_IMAGES.length === 0) {
        return;
    }
    
    // Limpiar placeholder si existe
    const placeholder = galleryContainer.querySelector('.gallery-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    // Limpiar arrays y contenedores
    validImageIndices = [];
    galleryContainer.innerHTML = '';
    galleryIndicators.innerHTML = '';
    
    let processedCount = 0;
    const totalImages = RECOGNITION_IMAGES.length;
    
    // Crear imágenes y rastrear cuáles se cargan correctamente
    RECOGNITION_IMAGES.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Reconocimiento ${index + 1}`;
        img.className = 'gallery-image';
        img.style.display = 'none';
        
        // Manejar carga exitosa
        img.onload = function() {
            this.style.display = 'block';
            validImageIndices.push(index);
            processedCount++;
            
            // Si es la primera imagen cargada, activarla
            if (validImageIndices.length === 1) {
                this.classList.add('active');
            }
            
            // Cuando todas las imágenes se han procesado, crear indicadores
            if (processedCount === totalImages) {
                createIndicators();
            }
        };
        
        // Manejar errores de carga
        img.onerror = function() {
            console.warn(`No se pudo cargar la imagen: ${imageUrl}`);
            this.style.display = 'none';
            processedCount++;
            
            // Cuando todas las imágenes se han procesado, crear indicadores
            if (processedCount === totalImages) {
                createIndicators();
            }
        };
        
        galleryContainer.appendChild(img);
    });
    
    // Función para crear indicadores solo para imágenes válidas
    function createIndicators() {
        // Limpiar indicadores existentes
        galleryIndicators.innerHTML = '';
        
        // Crear indicadores solo para las imágenes que se cargaron correctamente
        validImageIndices.forEach((originalIndex, displayIndex) => {
            const indicator = document.createElement('div');
            indicator.className = 'gallery-indicator';
            if (displayIndex === 0) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                goToImageByValidIndex(displayIndex);
            });
            galleryIndicators.appendChild(indicator);
        });
        
        // Si hay imágenes válidas, iniciar el autoplay
        if (validImageIndices.length > 0) {
            currentImageIndex = 0;
            startGalleryAutoPlay();
        }
    }
}

// Función para cambiar a una imagen por su índice válido (0, 1, 2, etc. según imágenes cargadas)
function goToImageByValidIndex(validIndex) {
    const galleryContainer = document.getElementById('gallery-container');
    const galleryIndicators = document.getElementById('gallery-indicators');
    
    if (!galleryContainer || !galleryIndicators) return;
    
    const images = galleryContainer.querySelectorAll('.gallery-image');
    const indicators = galleryIndicators.querySelectorAll('.gallery-indicator');
    
    if (indicators.length === 0 || validIndex < 0 || validIndex >= validImageIndices.length) return;
    
    // Remover clase active de todas las imágenes e indicadores
    images.forEach(img => img.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Activar la imagen correspondiente al índice válido
    const targetOriginalIndex = validImageIndices[validIndex];
    if (images[targetOriginalIndex]) {
        images[targetOriginalIndex].classList.add('active');
    }
    
    // Activar el indicador
    if (indicators[validIndex]) {
        indicators[validIndex].classList.add('active');
    }
    
    currentImageIndex = validIndex;
    restartGalleryAutoPlay();
}

// Función para cambiar a la siguiente imagen
function nextImage() {
    if (validImageIndices.length === 0) return;
    
    const nextIndex = (currentImageIndex + 1) % validImageIndices.length;
    goToImageByValidIndex(nextIndex);
}

// Función para iniciar el cambio automático
function startGalleryAutoPlay() {
    if (galleryInterval) {
        clearInterval(galleryInterval);
    }
    
    galleryInterval = setInterval(() => {
        nextImage();
    }, 4000); // Cambiar cada 4 segundos
}

// Función para reiniciar el autoplay
function restartGalleryAutoPlay() {
    startGalleryAutoPlay();
}

// Pausar al hacer hover sobre la galería
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.recognitions-gallery');
    if (gallery) {
        gallery.addEventListener('mouseenter', () => {
            if (galleryInterval) {
                clearInterval(galleryInterval);
            }
        });
        
        gallery.addEventListener('mouseleave', () => {
            startGalleryAutoPlay();
        });
    }
});

