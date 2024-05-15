
        // Obtener el elemento HTML donde se mostrará la animación
        const animationContainer = document.getElementById('animation-container');

        // Configurar la animación
        const animation = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: false, // No se repetirá en bucle
            autoplay: false,
            path: '/iMONKEy.json'
        });

        let currentPlaySpeed = 4; // Velocidad inicial de la animación

        function playAnimation() {
            animation.play();
            animation.setSpeed(currentPlaySpeed); // Establecer la velocidad inicial a 4

            animation.addEventListener('complete', () => {
                // Aumentar o disminuir la velocidad de la animación
                currentPlaySpeed = getRandomPlaySpeed(3, 6);
                animation.setSpeed(currentPlaySpeed);

                // Generar una pausa aleatoria antes de volver a reproducir la animación
                const pauseDuration = getRandomPause(10, 5000); // Entre 10 y 5000 milisegundos
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

            // Establecer el tamaño del contenedor de la animación
            animationContainer.style.width = `${containerWidth}px`;
            animationContainer.style.height = `${containerHeight}px`;

            // Ajustar la escala de la animación
            animation.setTransform({
                a: containerWidth / animation.totalFrames,
                b: 0,
                c: 0,
                d: containerHeight / animation.totalFrames,
                tx: 0,
                ty: 0
            });
        }

        // Iniciar la reproducción de la animación después de 5 segundos
        setTimeout(playAnimation, 5000);

        // Ajustar el tamaño de la animación al contenedor
        resizeAnimation();

        // Escuchar el evento 'resize' y ajustar la animación cuando se redimensiona la ventana
        window.addEventListener('resize', resizeAnimation);