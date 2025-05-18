(function () {
    var canvas = $('#canvas');

    if (!canvas[0].getContext) {
        $("#error").show();
        return false;
    }

    var width = canvas.width();
    var height = canvas.height();

    canvas.attr("width", width);
    canvas.attr("height", height);

    var opts = {
        seed: {
            x: width / 2 - 20,
            color: "rgb(190, 26, 37)",
            scale: 2
        },
        branch: [
            [535, 680, 570, 250, 500, 200, 30, 100, [
                [540, 500, 455, 417, 340, 400, 13, 100, [
                    [450, 435, 434, 430, 394, 395, 2, 40]
                ]],
                [550, 445, 600, 356, 680, 345, 12, 100, [
                    [578, 400, 648, 409, 661, 426, 3, 80]
                ]],
                [539, 281, 537, 248, 534, 217, 3, 40],
                [546, 397, 413, 247, 328, 244, 9, 80, [
                    [427, 286, 383, 253, 371, 205, 2, 40],
                    [498, 345, 435, 315, 395, 330, 4, 60]
                ]],
                [546, 357, 608, 252, 678, 221, 6, 100, [
                    [590, 293, 646, 277, 648, 271, 2, 80]
                ]]
            ]]
        ],
        bloom: {
            num: 700,
            width: 1080,
            height: 650,
        },
        footer: {
            width: 1200,
            height: 5,
            speed: 10,
        }
    }

    var tree = new Tree(canvas[0], width, height, opts);
    var seed = tree.seed;
    var foot = tree.footer;
    var hold = 1;

    canvas.click(function (e) {
        var offset = canvas.offset(), x, y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        if (seed.hover(x, y)) {
            hold = 0;
            canvas.unbind("click");
            canvas.unbind("mousemove");
            canvas.removeClass('hand');
        }
    }).mousemove(function (e) {
        var offset = canvas.offset(), x, y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        canvas.toggleClass('hand', seed.hover(x, y));
    });

    var seedAnimate = eval(Jscex.compile("async", function () {
        seed.draw();
        while (hold) {
            $await(Jscex.Async.sleep(10));
        }
        while (seed.canScale()) {
            seed.scale(0.95);
            $await(Jscex.Async.sleep(10));
        }
        while (seed.canMove()) {
            seed.move(0, 2);
            foot.draw();
            $await(Jscex.Async.sleep(10));
        }
    }));

    var growAnimate = eval(Jscex.compile("async", function () {
        do {
            tree.grow();
            $await(Jscex.Async.sleep(10));
        } while (tree.canGrow());
    }));

    var flowAnimate = eval(Jscex.compile("async", function () {
        do {
            tree.flower(2);
            $await(Jscex.Async.sleep(10));
        } while (tree.canFlower());
    }));

    var moveAnimate = eval(Jscex.compile("async", function () {
        tree.snapshot("p1", 240, 0, 610, 680);
        while (tree.move("p1", 500, 0)) {
            foot.draw();
            $await(Jscex.Async.sleep(10));
        }
        foot.draw();
        tree.snapshot("p2", 500, 0, 610, 680);

        canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
        canvas.css("background", "#F5E8DC");
        $await(Jscex.Async.sleep(300));
        canvas.css("background", "none");
    }));

    var jumpAnimate = eval(Jscex.compile("async", function () {
        var ctx = tree.ctx;
        while (true) {
            tree.ctx.clearRect(0, 0, width, height);
            tree.jump();
            foot.draw();
            $await(Jscex.Async.sleep(25));
        }
    }));

    var textAnimate = eval(Jscex.compile("async", function () {
        var together = new Date();
        together.setFullYear(2024, 11, 17);
        together.setHours(20);
        together.setMinutes(0);
        together.setSeconds(0);
        together.setMilliseconds(0);

        var done = false;

        /*$("#code").show().typewriter();*/

        $("#clock-box").fadeIn(500);
        timeElapse(together);
        setInterval(function () {
            timeElapse(together);
        }, 1000);

        // Poner la animación con callback que marca done = true
        $("#code").show().typewriter(function () {
            done = true;
        });
        // Esperar hasta que done sea true
        while (!done) {
            $await(Jscex.Async.sleep(50));
        }

        // Letra de la canción
        lyrics = [
            {
                text: "¿Cuánto tiempo te amaré?, Mientras las estrellas estén por encima de ti y más si puedo.",
                time: 16.0
            },
            { text: "¿Cuánto tiempo te necesitaré?", time: 30.54 },
            { text: "Siempre y cuando las estaciones necesitan, Siga su plan.", time: 34.56 },
            { text: "¿Cuánto tiempo estaré contigo?", time: 45.44 },
            { text: "Mientras el mar esté obligado a", time: 49.36 },
            { text: "Lavar sobre la arena", time: 55.00 },
            { text: "¿Cuánto tiempo te querré?", time: 60.50 },
            { text: "Siempre y cuando quieras que lo haga", time: 64.20 },
            { text: "Y más largo de lejos.", time: 69.48 },
            { text: "¿Cuánto tiempo te sostengo?", time: 74.92 },
            { text: "Mientras tu padre te lo dijera", time: 78.82 },
            { text: "Siempre y cuando puedas.", time: 84.26 },
            { text: "¿Cuánto tiempo te daré?", time: 89.34 },
            { text: "Mientras viva a través de ti", time: 93.52 },
            { text: "Sin importar el tiempo que digas.", time: 98.0 },
            { text: "¿Cuánto tiempo te amaré?", time: 104.0 },
            { text: "Mientras las estrellas estén por encima de ti", time: 108.0 },
            { text: "Y más si me permite.", time: 113.0 },
            { text: "¿Cuánto tiempo te amaré?", time: 162.0 }
        ];

        // Reproducir la musica
        var audio = document.getElementById("song");
        if (audio) {
            audio.play();
        }

        // Borrar dedicatoria para dar paso a las letras
        $("#code").text("");

        // Iniciar sincronización
        syncLyrics(audio, lyrics);

    }));

    var runAsync = eval(Jscex.compile("async", function () {
        $await(seedAnimate());
        $await(growAnimate());
        $await(flowAnimate());
        $await(moveAnimate());

        textAnimate().start();

        $await(jumpAnimate());
    }));

    runAsync().start();
})();

window.addEventListener("load", function () {
    const audio = document.getElementById("song");
    if (audio) {
        audio.addEventListener("ended", async function () {
            $("#code").text("");
            // Crear nuevo <span class="say"> para el texto final
            var $container = $("#code");
            var $newSay = $('<span class="say"></span>');
            $container.append($newSay);
            $newSay.html(`Pase lo que pase...<br>Te quedarás en mi corazón<br>Ya tatuaste tu nombre en mi pecho.`);
            $newSay.typewriter();
        });
    }
});