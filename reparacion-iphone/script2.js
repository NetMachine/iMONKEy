// Función para desplazar suavemente a una sección
function scrollToSection(event, verticalPosition = 0) {
  // Prevenir el comportamiento por defecto del enlace
  event.preventDefault();

  // Obtener el ID del elemento de destino desde el atributo 'href' del enlace
  const targetId = event.currentTarget.getAttribute('href');

  // Buscar el elemento de destino en el DOM
  const targetElement = document.querySelector(targetId);

  // Verificar si el elemento de destino existe
  if (!targetElement) {
    console.error("Element not found: " + targetId);
    return;
  }

  // Verificar si el navegador admite el desplazamiento suave ('smooth')
  if ('scrollBehavior' in document.documentElement.style) {
    // Desplazamiento suave con 'scrollIntoView' si es compatible
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: getVerticalPosition(verticalPosition, targetElement)
    });
  } else {
    // Desplazamiento suave manual para navegadores antiguos
    const currentPosition = window.pageYOffset;
    const targetPosition = getTargetPosition(targetElement, verticalPosition);
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

// Función auxiliar para obtener la posición vertical de la sección
function getTargetPosition(element, verticalPosition) {
  const elementHeight = element.offsetHeight;
  const windowHeight = window.innerHeight;
  return element.offsetTop + (elementHeight - windowHeight) * (verticalPosition / elementHeight);
}

// Función auxiliar para obtener el valor de 'block' para scrollIntoView()
function getVerticalPosition(verticalPosition, element) {
  const percentage = verticalPosition / element.offsetHeight;
  if (percentage <= 0) {
    return 'start';
  } else if (percentage >= 1) {
    return 'end';
  } else {
    return percentage;
  }
}

// Función de easing para la animación de desplazamiento suave
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

// Escuchar eventos de click en los enlaces y desplazarse suavemente a la sección correspondiente
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', event => {
    scrollToSection(event);
  });
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
    const text1 = nameInput.value;
    const text2 = emailInput.value;
    const text3 = messageInput.value;
    const message = `\n${text1}\n${text2}\n${text3}\n`;
    sendTelegramMessager(message);
    alert('Mensaje enviado con éxito, nos contactaremos dentro de las siguientes horas.');


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


/*
const buttonPrice2 = document.getElementById('price-btn');
// Evento de inicio de toque
buttonPrice2.addEventListener('touchstart', (event) => {
  
buttonPrice2.classList.add('active');
});

// Evento de fin de toque
buttonPrice2.addEventListener('touchend', () => {
  scrollToSection(event, 250);
buttonPrice2.classList.remove('active');
});*/

//const contactForm = document.getElementById('contact-form');
//contactForm.addEventListener('click', validateForm);

// Añadir event listener al formulario de contacto
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', validateForm);


const form2 = document.getElementById('contact-form');
form2.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    validateForm(event);
  }
});
                

const contactButton = document.querySelector('contact-btn');
 
        // Evento de inicio de toque
        contactButton.addEventListener('touchstart', (event) => {
            contactButton.classList.add('active');
        });


        // Evento de fin de toque
        contactButton.addEventListener('touchend', (event) => {
            
            contactButton.classList.remove('active');


        });


const faqSection = document.querySelector('.faq');
const faqContent =document.querySelector('.faq-content');
const btnExpandFAQ = document.querySelector('.btn-expand-faq');
const el = document.getElementById("faq-expand-contract");

let isExpanded = false;

// Función para manejar el toque y el clic
function toggleFAQ(event) {
  event.preventDefault();
  btnExpandFAQ.classList.toggle('active');
  
  document.querySelector('.collapsible').classList.toggle('collapsed');

  if (isExpanded) {
    btnExpandFAQ.textContent = 'Más preguntas';
    scrollToSection(event);

  } else {
    btnExpandFAQ.textContent = 'Menos preguntas';
    faqContent.style.height = "auto";
  }

  btnExpandFAQ.classList.remove('active');
  isExpanded = !isExpanded;
}

// Eventos de toque
btnExpandFAQ.addEventListener('touchstart', () => {
  btnExpandFAQ.classList.add('active');
});

btnExpandFAQ.addEventListener('touchend', toggleFAQ);

// Eventos de clic
btnExpandFAQ.addEventListener('click', toggleFAQ);

const arrowcontainer = document.querySelector('arrow-container');

/*
arrowcontainer.addEventListener('click', (event) => {

  scrollToSection(event);
});


 
      */
        arrowcontainer.addEventListener('touchstart', (event) => {
            arrowcontainer.classList.add('active');
        });


        // Evento de fin de toque
        arrowcontainer.addEventListener('touchend', (event) => {
            
            contaarrowcontainerctButton.classList.remove('active');

           scrollToSection(event);
        });
