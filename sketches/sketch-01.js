const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    const x = width * .35;
    const y = height * .35;
    const w = width * .3;
    const h = width * .3;

    context.fillStyle = 'red';
    context.beginPath();
    context.fillRect(x, y, w, h);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width * .1, height * .1);


  };
};

canvasSketch(sketch, settings);
