const canvasSketch = require('canvas-sketch');
let canvasManager;
let text = 'R';
const settings = {
  dimensions: [ 1080, 1080 ]
};
const font = {
  size: '1000px',
  family: 'serif'
};

const sketch = () => {
  return ({ context, width, height }) => {

    //Artboard
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //Big letter
    context.fillStyle = 'black';
    context.font = `${font.size} ${font.family}`;
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    //Text measurements
    const metrics = context.measureText(text);
    const img = {
      x: -metrics.actualBoundingBoxLeft,
      y: -metrics.actualBoundingBoxAscent,
      width: metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
      height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    }

    //Rendering
    context.save();
    context.translate((width - img.width) * .5 - img.x, (height - img.height) * .5 - img.y);
    context.beginPath();
    context.rect(img.x, img.y, img.width, img.height);
    context.stroke();
    context.fillText(text, 0, 0);
    context.restore();
  };
};
const changeLetter = (event) => {
  text = event.key.toUpperCase();
  canvasManager.render();
}

document.addEventListener('keyup', changeLetter);

const start = async () => {
  canvasManager = await canvasSketch(sketch, settings);
}
start();


