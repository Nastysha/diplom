(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
      factory();
}(function () {
  'use strict';

  let sketch = function (p) {
    let n_size1 = 800;
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
      p.text('Drop an image here!', p.width / 2, p.height / 2);
    };

    p.keyPressed = function () {
      if (p.keyCode === 80) p.saveCanvas('noisify', 'jpeg');
    };

    function gotFile(file) {
      if (file.type === 'image') {
        p.loadImage(file.data, imageLoaded);
      } else {
        console.log('Not an image file!');
      }
    }

    function imageLoaded(img) {
      p.loadPixels();
      img.loadPixels();

      nx = img.width;
      ny = img.height;

      const imgpixels = newArray(img.height).map((_, i) =>
          newArray(img.width).map((_, j) => {
            var loc = (i + j * img.width) * 4;
            return [img.pixels[loc + 0], img.pixels[loc + 1], img.pixels[loc + 2]];
          })
      );

      drawImage(imgpixels);
    }

    function drawImage(pixels) {
      p.noiseSeed(Math.random() * 999999);
      for (let i = 0; i < p.height; i++) {
        for (let j = 0; j < p.width; j++) {
          let cx = p.noise(i / 10, j / 200) * nx;
          let cy = p.noise(i / 150, j / 20) * ny;
          let dx = p.noise(i / 30, j / 30) * (nx / 20);
          let dy = p.noise(i / 10, j / 999) * (ny / 20);

          let c = pixels[p.floor(cy + dy)][p.floor(cx + dx)];
          p.stroke(...c);
          p.point(j, i);
        }
      }
      // p.textSize(28);
      // let text_ins = "MOMOMOMOMOMOMOMOMOMOMOM";
      // p.fill(255, 0, 0, 51);
      // // let text = p.measureText(text_ins);
      // p.rect(p.width / 2 - (p.textWidth(text_ins) / 2), p.height / 2 - 28, p.textWidth(text_ins), 28 * 1.25);
      // p.fill('red');
      // p.text(text_ins, p.width / 2, p.height / 2);

//              p.save();
// start
//             function neonLightEffect() {
//                 var text = "alert('" + String.fromCharCode(0x2665) + "')";
//                 var font = "120px Futura, Helvetica, sans-serif";
//                 var jitter = 25; // the distance of the maximum jitter
//                 var offsetX = 30;
//                 var offsetY = 70;
//                 // var blur = getBlurValue(100);
//                 // save state
//                 p.font = font;
//                 // calculate width + height of text-block
//                 var metrics = canvas.getMetrics(text, font);
//                 // create clipping mask around text-effect
//                 p.rect(offsetX - blur / 2, offsetY - blur / 2,
//                     offsetX + metrics.width + blur, metrics.height + blur);
//                 p.clip();
//                 // create shadow-blur to mask rainbow onto (since shadowColor doesn't accept gradients)
//                 // ctx.save();
//                 p.fillStyle = "#fff";
//                 p.shadowColor = "rgba(0,0,0,1)";
//                 p.shadowOffsetX = metrics.width + blur;
//                 p.shadowOffsetY = 0;
//                 p.shadowBlur = blur;
//                 p.fillText(text, -metrics.width + offsetX - blur, offsetY + metrics.top);
//                 p.restore();
//                 // create the rainbow linear-gradient
//                 var gradient = p.createLinearGradient(0, 0, metrics.width, 0);
//                 gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
//                 gradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
//                 gradient.addColorStop(0.3, "rgba(0, 255, 0, 1)");
//                 gradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
//                 gradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
//                 gradient.addColorStop(0.8, "rgba(255, 0, 255, 1)");
//                 gradient.addColorStop(1, "rgba(255, 0, 0, 1)");
//                 // change composite so source is applied within the shadow-blur
//                 p.globalCompositeOperation = "source-atop";
//                 // apply gradient to shadow-blur
//                 p.fillStyle = gradient;
//                 p.fillRect(offsetX - jitter / 2, offsetY,
//                     metrics.width + offsetX, metrics.height + offsetY);
//                 // change composite to mix as light
//                 p.globalCompositeOperation = "lighter";
//                 // multiply the layer
//                 p.globalAlpha = 0.7
//                 p.drawImage(p.canvas, 0, 0);
//                 p.drawImage(p.canvas, 0, 0);
//                 p.globalAlpha = 1
//                 // draw white-text ontop of glow
//                 p.fillStyle = "rgba(255,255,255,0.95)";
//                 p.fillText(text, offsetX, offsetY + metrics.top);
//                 // created jittered stroke
//                 p.lineWidth = 0.80;
//                 p.strokeStyle = "rgba(255,255,255,0.25)";
//                 var i = 10;
//                 while (i--) {
//                     var left = jitter / 2 - Math.random() * jitter;
//                     var top = jitter / 2 - Math.random() * jitter;
//                     p.strokeText(text, left + offsetX, top + offsetY + metrics.top);
//                 }
//                 p.strokeStyle = "rgba(0,0,0,0.20)";
//                 p.strokeText(text, offsetX, offsetY + metrics.top);
//                 p.restore();
//             };
//             neonLightEffect();
//end


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
