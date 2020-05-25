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
let drawblur = false;
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
                let n_size1 = 430;
                let n_size2 = 600;
                let nx, ny;
                let input;
                let blurImg;
                p.setup = function () {
                    const c = p.createCanvas(n_size1, n_size2);
                    p.pixelDensity(1);
                    p.noLoop();
                    c.parent("maskFrame");
                    blurImg = p.loadImage('/diplom-master/img/blur.png');
                    blurImg.filter('BLUR', 3);
                    input = p.createFileInput(gotFile);
                    input.parent('inputFile');
                    input.class('form-control-file');
                    $('#onLoad').on('click', function () {
                            $('#preLoader').show();
                            click = true;
                            gotFile(inFile);
                            drawblur = true;
                    });
                    // p.textFont('Quarantype Campfire');
                    p.textFont('font_lat_1');
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
                            $('#preLoader').hide();
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

                    let x = 0, y = 0;
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
                     */
                    let marginLeftAll = 0;
                    let textHeader = $('#inputHeader').val();
                    let textDescription = $('#inputDescription').val(),
                        textDate = $('#inputDate').val(),
                        textTime = $('#inputTime').val();
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
                    var marginTop = 0;
                    var marginTopAll = 0;

                    /**
                     * Рисуем заголовок
                     */
                    let line_array = getLineArray(textHeader);
                    console.log(line_array);
                    drawText(line_array);

                    function getLineArray(text) {
                        getTextSize();
                        let marginLeft = marginLeftAll, lineHeight = marginTop / 1.5, font, line = 0, lineArray = [];
                        for (let i = 0; i < text.length; i++) {
                            font = array[Math.floor(Math.random() * 9) + 0];
                            p.textFont(font);
                            if ((marginLeft + p.textWidth(text.charAt(i))) > n_size1) {
                                marginTop += lineHeight;
                                marginLeft = marginLeftAll;
                                lineArray.push([line, marginLeft, marginTop, text.charAt(i), p.textWidth(text.charAt(i)), p.textAscent() + p.textDescent(), font]);
                                line++;
                            } else {
                                marginLeft += p.textWidth(text.charAt(i));
                                lineArray.push([line, marginLeft, marginTop, text.charAt(i), p.textWidth(text.charAt(i)), p.textAscent() + p.textDescent(), font]);
                            }
                        }
                        return lineArray;
                    }

                    function drawText(text) {
                        // getTextSize();
                        p.fill($('.pcr-result').val());
                        let marginLeftArray = [], marginTopArray = [];
                        if (text[text.length - 1][0] + 1 < 4) {
                            marginTop = (n_size2 - (text[text.length - 1][5] / 1.5) - (text[text.length - 1][0] + 1) * (text[text.length - 1][5]) / 2) / 2;
                        } else {
                            marginTop = (n_size2 - (text[text.length - 1][0] + 1) * (text[text.length - 1][5]) / 2) / 2 - text[text.length - 1][5] / 1.5;
                        }
                        for (let i = 0; i < text[text.length - 1][0] + 1; i++) {
                            marginLeftArray[i] = 0;
                            marginTopArray[i] = 0;
                            for (let j = 0; j < text.length; j++) {
                                if (text[j][0] === i) {
                                    marginLeftArray[i] += text[j][4];
                                }

                            }
                            marginLeftArray[i] = (n_size1 - (marginLeftArray[i])) / 2;
                        }

                        let marginLeft = 0, countStr = null, marginTop_loc = marginTop /*+ marginTopAll*/;

                        for (let i = 0; i < text.length; i++) {
                            if (text[i][0] != countStr) {
                                countStr = text[i][0];
                                marginLeft = p.textWidth(text[i][3]) / 1.8 + marginLeftArray[text[i][0]];
                                marginTop_loc += text[i][5] / 1.5;
                            } else {
                                marginLeft += p.textWidth(text[i][3]) / 2;
                            }
                            if ((Math.random() >= 0.6)) {
                                console.log('tru');
                                // p.fill('#FFFFFFD1');
                                // p.image(blurImg, Math.floor(Math.random() * n_size1) + 0, Math.floor(Math.random() * n_size2) + 0,70, 70);
                                // p.filter('BLUR', 3);
                                // p.circle(Math.floor(Math.random() * n_size2) + 0, Math.floor(Math.random() * n_size1) + 0, Math.floor(Math.random() * n_size2/5) + 0);
                                // p.filter('');
                                p.fill($('.pcr-result').val());
                            }

                            p.textFont(text[i][6]);
                            p.text(text[i][3], /*marginLeftArray[text[i][0]] +*/ marginLeft, marginTop_loc);
                            marginLeft += p.textWidth(text[i][3]) / 2;
                        }
                    }

                    function getTextSize() {
                        for (let i = 400; i > 0; i--) {
                            p.textSize(i);
                            let char = "и";

                            marginTop = (p.textAscent() + p.textDescent()) / 1.5 /*+ (p.textAscent() + p.textDescent()) / 2*/;

                            x = parseInt((n_size1 + p.textWidth(char) / 2) / p.textWidth(char));
                            y = parseInt((n_size2 /*- p.textDescent() * 2*/) / (marginTop));

                            let z = x * y;
                            if (z >= textHeader.length) {

                                // marginLeftAll_const = (n_size1 - x * p.textWidth(char)) / 2;
                                // marginLeftAll_const = p.textWidth(char) / 2;
                                marginLeftAll = p.textWidth(char) / 2;
                                marginTopAll = /*p.textAscent()*/ /*+ p.textDescent()*/ marginTop / 1.5;
                                // return i;
                                break;
                            }
                        }
                    }

                    /**
                     */

                    /**
                     * Рисуем описание
                     */
                    drawDescription(textDescription, 36);
                    drawDescription(textDate, 42);
                    drawDescription(textTime, 42);

                    function drawDescription(text, textS) {
                        p.textSize(textS);
                        p.fill('#' + pickr2.getColor().toHEXA().join(''));
                        let x1, x2, x1_max, x2_max;

                        x1_max = n_size1 - p.textWidth(text) * 2;

                        let str = text;
                        let target = "\n";
                        let pos = 0, count = 1;
                        while ((pos = str.indexOf(target, pos + 1)) != -1) {
                            count++;
                        }
                        x2_max = p.textAscent() + p.textDescent();
                        x2_max = x2_max * count;
                        x2_max = n_size2 - x2_max;

                        x1 = Math.floor(Math.random() * x1_max) + p.textWidth(text);
                        x2 = Math.floor(Math.random() * x2_max) + p.textAscent() + p.textDescent();


                        p.text(text, x1, x2);
                    }

                    /**
                     */
                    // p.fill('#FFFFFFD1');
                    // p.circle(n_size2 / 2, n_size1 / 2, 100);
                    // p.filter('BLUR', 3);

                }

                function getBlur() {
                    p.circle(n_size2 / 2,  n_size1 / 2, 50);
                    p.filter('BLUR', 3);
                }
            };
            new p5(sketch);
            click = false;

            function newArray(n, value) {
                n = n || 0;
                var array = new Array(n);
                for (var i = 0; i < n; i++) {
                    array[i] = value;
                }
                return array;
            }


        }
    ));
}

run();