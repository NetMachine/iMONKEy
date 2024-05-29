const mainNav = document.getElementById('main-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && event.target !== navToggle) {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
    }
});

document.addEventListener('scroll', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
});


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/* DESVANECIMIENTO CAPA NEGRA */
const loadingOverlay = document.getElementById("loading-overlay");
const contenedor = document.getElementById("contenedor");
const root = document.documentElement;
const body = document.body;



window.addEventListener("load", function () {
 
body.style.overflow = 'hidden';


        contenedor.classList.add("fade-in");
    // Espera 1 segundo y luego elimina el overlay
    
});


// Obtener el elemento del overlay



// Esperar a que se cargue el contenido HTML
document.addEventListener("DOMContentLoaded", function () {
    // Esperar 500ms adicionales para que se carguen los recursos
    setTimeout(function () {
        // Agregar la clase 'fade-out' para iniciar la animación de desvanecimiento
        
loadingOverlay.classList.add("fade-out");

        // Esperar 1 segundo y luego eliminar el overlay
        setTimeout(function () {
            document.body.removeChild(loadingOverlay);
contenedor.style.zIndex = "1";
root.style.touchAction = 'auto';
root.style.height = 'auto';
// Reactivar el scroll
body.style.overflow = 'auto';
        }, 2000);
    }, 2000);
});

