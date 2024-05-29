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
const form2 = document.getElementById('contact-form');
form2.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    validateForm(event);
  }
});

// Función para validar el formulario de contacto
function validateForm(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
const notification = document.querySelector('.send-notification');


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
    const text1 = nameInput.value;
    const text2 = emailInput.value;
    const text3 = messageInput.value;
    const message = `\n${text1}\n${text2}\n${text3}\n`;
    sendTelegramMessager(message);

notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 4000);

nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
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


                


// Añadir event listeners a los enlaces del menú
const menuLinks = document.querySelectorAll('nav a');
menuLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

// Seleccionar el logo
const logo = document.querySelector('.logo');

// Agregar event listener al clic del logo
logo.addEventListener('click', (event) => {
  // Llamar a la función para desplazarse al inicio
  scrollToSection(event);
});
