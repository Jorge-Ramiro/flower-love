/*Crear las palabras de la cancion con efecto*/
const contenedor = document.getElementById("animado");
const texto = ["Hola", " ", "mundo", " ", "desde", " ", "JS"];

for (let i = 0; i < texto.length; i++) {
    const span = document.createElement("span");
    const char = texto[i] === " " ? "\u00A0" : texto[i];
    span.textContent = char;
    span.classList.add("letra");
    span.style.animationDelay = `${i * 0.1}s`;
    contenedor.appendChild(span);
}

// Efecto de las letras de escribir
const text = "Nuestra historia comenzó hace...";
const container = document.getElementById("typeWriter");

// Crear el cursor
const cursor = document.createElement("span");
cursor.textContent = "_";
cursor.classList.add("cursor");
container.appendChild(cursor);

let i = 0;

function write() {
    if (i < text.length) {
        //Insertar letra antes del cursor
        const letter = document.createTextNode(text[i]);
        container.insertBefore(letter, cursor);
        i++;
        setTimeout(write, 140); // velocidad entre letras
    } else {
        cursor.remove(); // Eliminar el cursor al final si quieres
        // O dejarlo parpadeando
        actualizarTiempo()
        
    }
}
write();

// Fecha inicial (puedes modificarla a la que necesites)
const fechaInicial = new Date("2024-11-17T20:00:00"); // Año-Mes-DíaThh:mm:ss
let firstTime = true;

function crearBloque(valor, unidad, index) {
    const claseAnimada = firstTime ? 'animada' : '';
      const delay = index * 0.7;
      return `
        <span class="unid ${claseAnimada}" style="animation-delay: ${delay}s;">
          <span class="number">${valor}</span> ${unidad}
        </span>
      `;
}

function actualizarTiempo() {
    const ahora = new Date();
    let diferencia = Math.floor((ahora - fechaInicial) / 1000);

    const dias = Math.floor(diferencia / (60 * 60 * 24));
    diferencia %= 60 * 60 * 24;

    const horas = Math.floor(diferencia / (60 * 60 ));
    diferencia %= 60 * 60;

    const minutos = Math.floor(diferencia / 60);
    const segundos = diferencia % 60;

    const daycouter = document.getElementById("dayCounter");
    daycouter.innerHTML =
        crearBloque(dias, "Días", 0) +
        crearBloque(horas, "Horas", 1) +
        crearBloque(minutos, "Minutos", 2) +
        crearBloque(segundos, "Segundos", 3);
    
    // Después de la primera ejecución (y su animación), iniciamos el setInterval
    if (firstTime) {
        firstTime = false;
        // Esperamos que termine la animación (~1s) antes de iniciar el intervalo
        setTimeout(() => {
          setInterval(actualizarTiempo, 1000);
        }, 1000); // 1 segundo de espera
      }
}

