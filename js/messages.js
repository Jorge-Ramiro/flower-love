// Lista de mensajes románticos que aparecerán en burbujas
const messages = [
    "Me encanta tu sonrisa. ❤️",
    "Tus ojos son los más bonitos.",
    "Eres mi unica persona favorita. 💕",
    "Porque cada que te veo mi corazón se llena de felicidad.",
    "Porque me gusta cada estilo de ropa que utilizas.",
    "Porque disfruto escuchar tu risa.",
    "Por tú forma de querer.",
    "Porque no hay actividad que me parezca aburrida si la hacemos juntos.",
    "Eres lo primero y ultimo que pienso cada día. 💭",
    "porque me encanta mirarte y me preguntes que?.",
    "porque todos los bonitos momentos que hemos vivido.",
    "porque me basta con agarrarte del dedo para saber que te quiero.",
    "Porque me encanta acariciar tu pancita.",
    "Porque vi un hogar junto a ti.",
    "Porque vi en ti a la mujer que quiero para el resto de mi vida.",
    "Porque me enseñaste muchas cosas.",
    "Porque junto a ti soy una mejor persona.",
    "Porque tus abrazos son los más calidos que he sentido.",
    "Porque estar contigo me trae paz. -",
    "Porque haces que lo ordinario sea divertido.",
    "Porque eres lo mejor que me ha pasado en la vida.",
    "Porque te quiero compartir mis mejores momentos así como tambien los no tan buenos.",
    "Porque quiero estar en todos tus momentos felices y tristes.",
    "Porque quiero ver todos los amaneceres que me quedan a tu lado.",
    "Por todos los planes que tenemos pendientes.",
    "Porque te volviste la razón de mi felicidad.",
    "Porque me hiciste creer en Dios y que tiene un plan.",
    "Por todas las aventuras que nos esperan.",
    "Por los dos hijos que queremos tener.",
    "Porque cada que me volteas a ver haces que me ponga feliz.",
    "Porque me encantan tus besos.",
    "Porque disfruto cuando me hablas de todo.",
    "Porque no quiero compartir mi vida con nadie más que no seas tú.",
    "Porque hay tantas experiencias que quiero crear a tú lado.",
    "Porque te quiero amar el resto de mi vida.",
    "Porque quiero prepar ricas conmidas junto a ti.",
    "Quiero que disfrutemos de la tranquilidad de una pelicula, pero que tambien disfrutemos de un buen concierto, un buen viaje.",
    "Quiero envejecer junto a ti.",
    "Quiero ver el mundo a través de tus ojos.",
    "Porque quiero cumplir todo lo que te dije.",
    'Me encantas.',
    'Te Quiero Mucho.',
    'Te extraño a diario.',
    'Siento que cada día que no estamos bien es un día desperdiciado.'
];

// Función que crea una burbuja de texto con un mensaje aleatorio
function createTextBubble() {
    // Creamos un nuevo elemento <div>
    const bubble = document.createElement("div");

    // Le asignamos la clase CSS "text-bubble" (debes definirla en tu CSS)
    bubble.className = "text-bubble";

    // Seleccionamos un mensaje aleatorio del arreglo
    bubble.innerText = messages[Math.floor(Math.random() * messages.length)];

    // Calculamos una posición aleatoria dentro de la pantalla (entre 10% y 90%)
    const left = Math.random() * 80 + 10;
    const top = Math.random() * 80 + 10;

    // Establecemos la posición absoluta y aplicamos las coordenadas calculadas
    bubble.style.position = "absolute";
    bubble.style.left = left + "vw"; // vw = porcentaje del ancho de la ventana
    bubble.style.top = top + "vh";   // vh = porcentaje del alto de la ventana

    // Buscamos el contenedor con ID "bubbles-text" y añadimos la burbuja
    const container = document.getElementById("bubbles-text");
    container.appendChild(bubble);

    // Esperamos un momento (10ms) para asegurarnos de que se renderizó
    setTimeout(() => {
        const rect = bubble.getBoundingClientRect(); // Obtenemos las coordenadas reales del div

        // Si la burbuja se sale por la derecha, la ajustamos hacia la izquierda
        if (rect.right > window.innerWidth) {
            const newLeft = window.innerWidth - rect.width - 10;
            bubble.style.left = `${newLeft}px`;
        }

        // Si la burbuja se sale por la parte inferior, la subimos
        if (rect.bottom > window.innerHeight) {
            const newTop = window.innerHeight - rect.height - 10;
            bubble.style.top = `${newTop}px`;
        }

        // Si se va muy a la izquierda, la traemos hacia adentro
        if (rect.left < 0) {
            bubble.style.left = "10px";
        }

        // Si se va muy arriba, la bajamos un poco
        if (rect.top < 0) {
            bubble.style.top = "10px";
        }
    }, 10);

    // Eliminamos la burbuja automáticamente después de 8 segundos
    setTimeout(() => {
        bubble.remove();
    }, 8000);
}

// Llamamos a la función createTextBubble cada 500 milisegundos (0.5 segundos)
setInterval(createTextBubble, 500);

const imagenes = [
    '',
    'assets/IMG-20241117-WA0047.jpg',
    'assets/IMG-20241117-WA0251.jpg',
    'assets/IMG-20241117-WA0261.jpg',
    'assets/IMG-20241117-WA0325.jpg',
    'assets/IMG-20241117-WA0369.jpg',
    'assets/IMG-20241117-WA0380.jpg',
    'assets/IMG-20241118-WA0024.jpg',
    'assets/IMG-20241222-WA0045.jpg',
    'assets/IMG-20241222-WA0071.jpg',
    'assets/IMG-20250202-WA0001.jpg',
    'assets/IMG-20250202-WA0005.jpg',
    'assets/IMG-20250202-WA0161.jpg',
    'assets/IMG-20250317-WA0007.jpg',
    'assets/IMG-20250317-WA0015.jpg',
    'assets/IMG-20250317-WA0093.jpg',
    'assets/IMG-20250317-WA0111.jpg',
    'assets/IMG-20250407-WA0075.jpg',
    'assets/IMG-20250408-WA0001.jpg',
    'assets/IMG-20250421-WA0003.jpg',
    'assets/IMG-20250504-WA0055~2.jpg',
    'assets/IMG-20250504-WA0341.jpg',
    'assets/IMG-20250602-WA0012.jpg',
    'assets/IMG-20250602-WA0052.jpg',
    'assets/IMG-20250602-WA0062.jpg',
    'assets/IMG-20250713-WA0059.jpg',
    'assets/IMG-20250713-WA0115.jpg',
    'assets/IMG_20250713_144145443_HDR.jpg',
];

let indice = 0;
const fondo = document.getElementById('fondo');
const intervalo = 5000; // tiempo en milisegundos (5000 ms = 5 segundos)

setInterval(() => {
    indice = (indice + 1) % imagenes.length;
    fondo.src = imagenes[indice];
}, intervalo);

setTimeout(() => {
    const div = document.getElementById('title');
    div.classList.add('oculto'); // Oculta con transición
    // También puedes removerlo completamente del DOM si prefieres:
    div.remove();
}, 5000); // 5000 milisegundos = 5 segundos