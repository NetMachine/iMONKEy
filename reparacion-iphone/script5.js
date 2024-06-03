// Deshabilitar la restauración automática del scroll por parte del navegador
        history.scrollRestoration = "manual";

        // Evento que se ejecuta justo antes de que la página se descargue o se recargue
        window.addEventListener('beforeunload', function(e) {
            setTimeout(function() {
                window.scrollTo(0, 0);
            }, 100); // Retraso de 100 milisegundos
        });
        
// Seleccionar todos los elementos de preguntas frecuentes
const faqItems = document.querySelectorAll(".faq-item");

// Agregar un evento de clic a cada elemento de pregunta
faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Alternar la clase "active" en el elemento de pregunta actual
    item.classList.toggle("active");

    // Obtener el elemento de respuesta correspondiente
    const answer = item.querySelector(".faq-answer");

    // Alternar la visibilidad de la respuesta
    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = "0";
    }
  });
});


//const faqSection = document.querySelector('#faq');
/*
const btnExpandFAQ = document.querySelector('.btn-expand-faq');

let isExpanded = true;

btnExpandFAQ.addEventListener('click', () => {
    btnExpandFAQ.classList.add('hidden');
         faqItems.forEach((item, index) => {
    if (index > 4) {
      item.classList.toggle('show');
    }
  });



});*/


