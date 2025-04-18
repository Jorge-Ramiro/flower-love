var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada linea y su tiempo de aparicion en segundos
var lyricsData = [
    {Text:"Cuando te miro a los ojos" +
        "\nEs como ver el cielo nocturno.", time: 22},
    {Text:"O un hermoso amanecer" +
        "\nHay tantas cosas que sostienen", time:32.28},
    {Text:"Y al igual que las viejas estrellas,", time:43.30},
    {Text:"Veo que has llegado tan lejos", time: 46},
    {Text:"Para estar justo donde estás" +
        "\nQué edad tiene tu alma?", time: 53.92},
    {Text:"Bueno, no me rendiré con nosotros" +
        "\nIncluso si los cielos se ponen ásperos.", time: 64.38},
    {Text:"Te estoy dando todo mi amor" +
        "\nTodavía estoy mirando hacia arriba.", time: 74.46},
    {Text:"Y cuando necesitas tu espacio" +
        "\nPara hacer un poco de navegación.", time: 85.64},
    {Text:"Estaré aquí esperando pacientemente" +
        "\nPara ver lo que encuentras.", time: 96.28},
    {Text:"Porque incluso las estrellas se queman" +
        "\nAlgunos incluso caen a la tierra", time: 106.88},
    {Text:"Tenemos mucho que aprender" +
        "\nDios sabe que valemos la pena", time: 117.44},
    {Text:"No, no me rendiré", time: 127.48},
    {Text:"No quiero ser alguien que se vaya tan fácilmente.", time: 134.24},
    {Text:"Estoy aquí para quedarme y hacer la diferencia que pueda hacer.", time: 137.50},
    {Text:"Nuestras diferencias hacen mucho para enseñarnos cómo usar" +
        "\nlas herramientas y los dones que tenemos", time: 144.98},
    {Text:"Sí, tenemos mucho en juego", time: 149.71},
    {Text:"Y al final, sigues siendo mi amiga, al menos lo pretendiamos que trabajáramos,", time: 155.12},
    {Text:"No nos rompimos, no nos quemamos", time: 159.02},
    {Text:"Tuvimos que aprender a doblarnos sin que el mundo se hunda,", time: 161.18},
    {Text:"Tuve que aprender lo que tengo, y lo que no soy" +
        "\n¿Y quién soy?.", time: 165.18},
    {Text:"No me rendiré con nosotros," +
        "\nIncluso si los cielos se ponen ásperos.", time: 175.28},
    {Text:"Te estoy dando todo mi amor" +
        "\nTodavía estoy mirando hacia arriba", time: 185.54},
    {Text:"Todavía estoy mirando hacia arriba, pero no me rendiré con nosotros" +
        "\nNo me rendiré con nosotros (No, no me rindo)", time: 193.24},
    {Text:"Dios sabe que soy duro, él sabe (Soy duro, soy amado)", time: 199.94},
    {Text:"Tenemos mucho que aprender (Estamos vivos, somos amados)", time: 203.96},
    {Text:"Dios sabe que valemos la pena (Y valemos la pena)", time: 210.66},
    {Text:"No me rendiré con nosotros," +
        "\nIncluso si los cielos se ponen ásperos", time: 217.04},
    {Text:"Te estoy dando todo mi amor, " +
        "Todavía estoy mirando hacia arriba", time: 226.56},
    

]

let index = 0;

setInterval(() => {
    if (index >= lyricsData.length) return;

    const currentTime = audio.currentTime;
    const nextLyric = lyricsData[index];

    if (currentTime >= nextLyric.time) {
        lyrics.innerText = nextLyric.Text;
        index++;
    }
}, 100); // revisa cada 100ms


// Animar letras
/*function updateLyrics() {

    var time = Math.floor(audio.currentTime);
    console.log(time);
    var currentLine = lyricsData.find(
        (line) => time >= line.time && time < line.time + 6);
    console.log(time, "currentLine:", currentLine);
    if (currentLine) {
        // Calcula la opacidad basada en el tiempo en la linea actual
        var fadeInDuration = 0.1; // Duracion del efecto en segundos
        var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
        lyrics.innerHTML = opacity;

        // Aplica el efecto de aparicion
        lyrics.style.opacity = opacity;
        lyrics.innerHTML = currentLine.Text;
    } else {
        lyrics.innerHTML = "entro al else"
        // Restablece la opacidad y el contenido si no hay una linea actual
        lyrics.style.opacity = 0;
        lyrics.innerHTML = "";
    }
}

setInterval(updateLyrics, 1000);*/


// funcion titulo
// funcion para ocultar el titulo despues de 216 segundos

function ocultarTitulo() {
    var titulo = document.querySelector(".titulo");
    titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 20000);

audio.onended = function () {
    lyrics.innerText = "Gracias por estar conmigo hasta el final de la canción. Te Quiero Mucho 💖";
};
