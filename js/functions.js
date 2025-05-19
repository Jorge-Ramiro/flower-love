var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function () {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

/*(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);*/

(function ($) {
    $.fn.typewriter = function (callback) {
        this.each(function () {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

/*------------------------------------------------------------------------ */

function timeElapse(date) {
    var current = new Date(); // ← CORREGIDO
	current.setHours(current.getHours() - 1);
    var seconds = (current.getTime() - date.getTime()) / 1000;

    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);

    var hours = Math.floor(seconds / 3600);
    if (hours < 10) hours = "0" + hours;

    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) minutes = "0" + minutes;

    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;

    var result = " <span class=\"digit\">" + days + "</span> días " +
        "<span class=\"digit\">" + hours + "</span> horas " +
        "<span class=\"digit\">" + minutes + "</span> minutos " +
        "<span class=\"digit\">" + seconds + "</span> segundos";
    $("#clock").html(result);
}

function typeLine(text) {
    return new Promise(resolve => {
        // Cambia el tamaño de fuente antes de comenzar a escribir
        $("#code").css("font-size", "26px"); // Ajusta el tamaño a lo que quieras
        let i = 0;
        const interval = setInterval(() => {
            $("#code").text(text.substring(0, i) + (i < text.length ? "_" : ""));
            i++;
            if (i > text.length) {
                clearInterval(interval);
                setTimeout(resolve, 300); // Pausa después de cada línea
            }
        }, 50); // velocidad de tipeo
    });
}

async function syncLyrics(audio, lyrics) {
    let currentIndex = 0;

    function checkLyrics() {
        if (currentIndex >= lyrics.length) return;
        const currentTime = audio.currentTime;
        if (currentTime >= lyrics[currentIndex].time) {
            typeLine(lyrics[currentIndex].text);
            currentIndex++;
        }
    }

    const interval = setInterval(() => {
        checkLyrics();
        if (currentIndex >= lyrics.length) {
            clearInterval(interval);
        }
    }, 300); // comprobamos cada 300ms
}