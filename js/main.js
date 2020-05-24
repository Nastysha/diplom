const pickr = Pickr.create({
    el: '#picker',
    theme: 'nano', // or 'monolith', or 'nano'

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: false
        }
    }
});

const pickr2 = Pickr.create({
    el: '#picker_2',
    theme: 'nano', // or 'monolith', or 'nano'

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: false
        }
    }
});

$('#preLoader').hide();

let click = false;
let inFile;

$('#onLoad').on('click', function () {
    $('#preLoader').show();
    setTimeout(10);
});

function run() {
    (function (factory) {
        typeof define === 'function' && define.amd ? define(factory) :
            factory();
    }(function () {
        let sketch = function (p) {
            let n_size1 = 400;
            let n_size2 = 600;
            let nx, ny;
            let input;
            p.setup = function () {
                const c = p.createCanvas(n_size1, n_size2);
                p.pixelDensity(1);
                p.noLoop();
                c.parent("maskFrame");
                input = p.createFileInput(gotFile);
                input.parent('inputFile');
                input.class('form-control-file');
                $('#onLoad').on('click', function () {
                    $('#preLoader').show();
                    click = true;
                    gotFile(inFile);
                });
                p.textFont('Quarantype Campfire');
                // p.fill
            };

            p.draw = function () {
                p.fill(0);
                p.textSize(98);
                p.textAlign(p.CENTER);
                p.background('#353535');

                // p.textFont('Campfire');
                p.text('GENI', p.width / 2, p.height / 1.8);

            };

            p.keyPressed = function () {
                if (p.keyCode === 80) p.saveCanvas('noisify', 'jpeg');
            };

            let image_test;

            function gotFile(file) {
                inFile = file;
                if (click) {
                    if (file.type === 'image') {
                        image_test = file.data;
                        p.loadImage(file.data, imageLoaded);
                    } else {
                        console.log('Этот файл не Jpeg!');
                    }
                }
            }

            function imageLoaded(img) {
                p.loadPixels();
                img.loadPixels();

                nx = img.width;
                ny = img.height;

                // console.log()

                const imgpixels = newArray(img.height).map((_, i) =>
                    newArray(img.width).map((_, j) => {
                        var loc = (i + j * img.width) * 4;
                        return [img.pixels[loc + 0], img.pixels[loc + 1], img.pixels[loc + 2]];
                    })
                );
                // console.log(imgpixels);
                drawImage(imgpixels);
                $('#preLoader').hide();
                setTimeout(100)
                $('#preLoader').hide();
            }

            function drawImage(pixels) {

                let x, y;
                let k = Math.floor(Math.random() * 4) + 1;
                p.noiseSeed(Math.random() * 999999);
                /**
                 * Рисуем картинку
                 */
                for (let i = 0; i < p.height; i++) {
                    for (let j = 0; j < p.width; j++) {

                        let cx = 0;
                        let cy = 0;
                        let dx = 0;
                        let dy = 0;
                        switch (k) {
                            case 1 : {
                                cx = p.noise(i / n_size1, j / n_size1, 103) * nx;
                                cy = p.noise(i / n_size1, j / n_size1, 200) * ny;
                                dx = p.noise(i / n_size2, j / n_size2, 300) * (nx / 20);
                                dy = p.noise(i / n_size2, j / n_size2, 400) * (ny / 20);
                            }
                                break;
                            case 2 : {
                                cx = p.noise(i / 320, (j - 7) / 3, (i + j) * 0, 2) * nx;
                                cy = p.noise(j / 100, i / 200) * ny;
                                dx = p.noise(i / 100, j / 200) * (nx / 20);
                                dy = p.noise(j / 100, i / 200) * (ny / 20);
                            }
                                break;
                            case 3 : {
                                cx = p.noise(i / 10, j / 200) * nx;
                                cy = p.noise(i / 150, j / 20) * ny;
                                dx = p.noise(i / 30, j / 30) * (nx / 20);
                                dy = p.noise(i / 10, j / 999) * (ny / 20);
                            }
                                break;
                            case 4 : {
                                cx = p.noise(i / 100, j / 200) * nx;
                                cy = p.noise(i / 100, j / 200) * ny;
                                dx = p.noise(i / 100, j / 200) * (nx / 20);
                                dy = p.noise(i / 100, j / 200) * (ny / 20);
                            }
                                break;

                        }
                        let c = pixels[p.floor(cy + dy)][p.floor(cx + dx)];
                        p.stroke(...c);
                        p.point(j, i);
                    }
                }
                /**
                 * @type {number}
                 */
                let marginLeftAll = 0;
                let marginTopAll = 100;
                let marginLeftAll_const;
                let textHeader = $('#inputHeader').val();
                let textDescription = $('#textDescription').val();
                let array = [
                    'd_Pitch',
                    'Blacker Pro Display Trial',
                    'Colus',
                    'd_Pitch Black',
                    'Fakedes Outline',
                    'Gorod', 'LaMos',
                    'Miratrix',
                    'mr_EklektykG Stencil',
                    'SK Nigar RUS'
                ];
                var length_text = textHeader.length;
                var marginTop = 0;
                let line_array = [];

                getTextSize();
                /**
                 * Рисуем заголовок
                 */
                for (let i = 0; i < length_text; i++) {
                    p.fill(0, 0, 0);
                    var fonts = array[Math.floor(Math.random() * 9) + 0];
                    p.fill($('.pcr-result').val());
                    p.textFont(fonts);
                    wrapText(p, textHeader.charAt(i), marginLeftAll, marginTopAll, n_size1, marginTop / 1.5, length_text - i, fonts);
                }

                //p.textSize(28);
                //p.fill(255, 0, 0, 51);

                function wrapText(context, words, marginLeft, marginTop, maxWidth, lineHeight, lengthAllTextEnd, font_char) {
                    var line = words;
                        var testLine = words;
                        if ((marginLeft + context.textWidth(words)) > maxWidth) {
                            marginTopAll += lineHeight;
                            marginTop = marginTopAll;
                            if (lengthAllTextEnd < x) {
                                marginLeftAll = (n_size1 - lengthAllTextEnd * p.textWidth(words)) / 2;
                            } else {
                                marginLeftAll = marginLeftAll_const;
                            }
                            marginLeft = marginLeftAll;
                            context.text(line, marginLeft, marginTop); //вывод буквы
                            marginLeftAll += context.textWidth(words);
                            return ;
                        }
                    marginLeftAll += context.textWidth(words);
                    context.text(line, marginLeft, marginTop);// вывод буквы
                }

                function getTextSize() {
                    for (let i = 200; i > 0; i--) {
                        p.textSize(i);
                        let char = "И";

                        marginTop = p.textAscent() + p.textDescent();
                        x = parseInt((n_size1) / p.textWidth(char));
                        y = parseInt((n_size2) / marginTop);

                        let z = x * y;
                        if (z >= length_text) {
                            // marginLeftAll_const = (n_size1 - x * p.textWidth(char)) / 2;
                            marginLeftAll_const = p.textWidth(char)/2;
                            console.log(n_size1,x, p.textWidth(char));
                            marginLeftAll = marginLeftAll_const;
                            marginTopAll = p.textAscent() /*+ p.textDescent()*/;
                            return i;
                            break;
                        }
                    }
                }
            }
        };
        new p5(sketch);

        function newArray(n, value) {
            n = n || 0;
            var array = new Array(n);
            for (var i = 0; i < n; i++) {
                array[i] = value;
            }
            return array;
        }


    }));
}
run();