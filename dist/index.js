(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}(function () {
    'use strict';


    let sketch = function (p) {
        OnLoad();
        console.log();
        let n_size1 = 400;
        let n_size2 = 600;
        let nx, ny;

        p.setup = function () {
            const c = p.createCanvas(n_size1, n_size2);
            p.pixelDensity(1);
            p.noLoop();
            c.drop(gotFile);
        };

        p.draw = function () {
            p.fill(255);
            p.textSize(21);
            p.textAlign(p.CENTER);
            p.background('#888');
            p.text('Перенесите изображение сюда', p.width / 2, p.height / 2);

        };

        p.keyPressed = function () {
            if (p.keyCode === 80) p.saveCanvas('noisify', 'jpeg');
        };

        let image_test;

        function gotFile(file) {
            if (file.type === 'image') {
                image_test = file.data;
                p.loadImage(file.data, imageLoaded);
            } else {
                console.log('Этот файл не Jpeg!');
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
        }

        function drawImage(pixels) {
            let k = Math.floor(Math.random() * 4) + 1;
            p.noiseSeed(Math.random() * 999999);
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

            let text_filed = "Савинова Анастасия Hello world";
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
            // for (let i = 0; i < 10; i++) {
            //     p.textFont(array[i]);
            //     p.text(text_filed, p.height / 2 , 100 + i * 20);
            // }


            for (let i = 0; i < text_filed.length; i++) {
                // alert(text_filed.charAt(i));
                // p.textFont("./fonts/" + (Math.floor(Math.random() * 9) + 1) + ".ttf");
                p.textSize(56);
                p.textFont(array[Math.floor(Math.random() * 9) + 0]);
                // p.rect(p.width / 2 - (p.textWidth(text_ins) / 2), p.height / 2 - 28, p.textWidth(text_ins), 28 * 1.25);
                // p.fill('red');
                p.text(text_filed.charAt(i), 100 + i * 30, p.height / 2);
            }

            p.textSize(28);
            let text_ins = "MOMOMOMOMOMOMOMOMOMOMOM";
            p.fill(255, 0, 0, 51);
            // let text = p.measureText(text_ins);
            // p.rect(p.width / 2 - (p.textWidth(text_ins) / 2), p.height / 2 - 28, p.textWidth(text_ins), 28 * 1.25);
            // p.fill('red');
            // p.text(text_ins, p.width / 2, p.height / 2);

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
