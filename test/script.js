// Función para desplazarse suavemente a una sección
function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  // Verificar si el navegador admite scrollIntoView() con 'smooth'
  if ('scrollBehavior' in document.documentElement.style) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    // Desplazamiento suave manual para navegadores antiguos
    const currentPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop;
    const distance = targetPosition - currentPosition;
    const duration = 500; // Duración de la animación en milisegundos

    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollY = easeInOutQuad(progress, currentPosition, distance, duration);
      window.scrollTo(0, scrollY);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
}

// Función de easing para la animación de desplazamiento suave
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

// Añadir event listeners a los enlaces del menú
const menuLinks = document.querySelectorAll('nav a');
menuLinks.forEach(link => {
  link.addEventListener('click', scrollToSection);
});

// Función para validar el formulario de contacto
function validateForm(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  let isValid = true;

  if (nameInput.value.trim() === '') {
    isValid = false;
    nameInput.classList.add('error');
  } else {
    nameInput.classList.remove('error');
  }

  if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
    isValid = false;
    emailInput.classList.add('error');
  } else {
    emailInput.classList.remove('error');
  }

  if (messageInput.value.trim() === '') {
    isValid = false;
    messageInput.classList.add('error');
  } else {
    messageInput.classList.remove('error');
  }

  if (isValid) {
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado correctamente');
  }
}

// Función para validar el formato de correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Añadir event listener al formulario de contacto
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', validateForm);

// Función para mostrar y ocultar el menú en dispositivos móviles
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});

// Función para agregar un evento de scroll suave
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});


// Obtener el elemento HTML donde se mostrará la animación
const animationContainer = document.getElementById('animation-container');

// Configurar la animación
const animation = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'iMONKEy.json'
});

let currentPlaySpeed = 6.5;

function playAnimation() {
    animation.play();
    animation.setSpeed(currentPlaySpeed); // Establecer la velocidad inicial a 4

    animation.addEventListener('complete', () => {
        // Aumentar o disminuir la velocidad de la animación
        currentPlaySpeed = getRandomPlaySpeed(6.5, 6.5);
        animation.setSpeed(currentPlaySpeed);

        // Generar una pausa aleatoria antes de volver a reproducir la animación
        const pauseDuration = getRandomPause(100, 7000); // Entre 10 y 5000 milisegundos
        setTimeout(() => {
            // Volver a reproducir la animación
            animation.goToAndPlay(0, true);
        }, pauseDuration);
    });
}

function getRandomPlaySpeed(min, max) {
    // Generar una velocidad aleatoria entre un rango
    return Math.random() * (max - min) + min;
}

function getRandomPause(min, max) {
    // Generar una pausa aleatoria entre un rango
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resizeAnimation() {
    const containerWidth = animationContainer.offsetWidth;
    const containerHeight = animationContainer.offsetHeight;
    const animationWidth = animation.preloadedImages[0].width;
    const animationHeight = animation.preloadedImages[0].height;

    // Calcular los factores de escala para mantener el aspect ratio de la animación
    const scaleX = containerWidth / animationWidth;
    const scaleY = containerHeight / animationHeight;
    const scale = Math.min(scaleX, scaleY);

    // Establecer el tamaño del contenedor de la animación
    animationContainer.style.width = `${containerWidth}px`;
    animationContainer.style.height = `${containerHeight}px`;

    // Ajustar la escala de la animación
    animation.setTransform({
        a: scale,
        b: 0,
        c: 0,
        d: scale,
        tx: (containerWidth - animationWidth * scale) / 2,
        ty: (containerHeight - animationHeight * scale) / 2
    });
}

// Iniciar la reproducción de la animación después de 5 segundos
setTimeout(playAnimation, 4500);

// Ajustar el tamaño de la animación al contenedor
resizeAnimation();

// Escuchar el evento 'resize' y ajustar la animación cuando se redimensiona la ventana
window.addEventListener('resize', resizeAnimation);
