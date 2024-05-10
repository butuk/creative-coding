const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

function toRad(angle) {
  return angle/180 * Math.PI;
}

const sketch = () => {
  return ({ context, width, height }) => {
    const w = width * .01;
    const h = width * .3;
    const x = width * .5;
    const y = height * .5;
    const times = 12;
    const angle = toRad(360/times);

    for (let i = 0; i < times; i++){
      context.save();
      context.fillStyle = 'red';
      context.translate(x, y);
      context.rotate(angle * i);
      context.fillRect(0.5 * -w, 0.5 * -h, w, h);
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
