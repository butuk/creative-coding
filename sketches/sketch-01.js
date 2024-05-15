const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    const radius = width * .2;
    const w = width * .01;
    const h = width * .05;
    const circleCenterX = width * .5;
    const circleCenterY = height * .5;
    const segments = 12;
    const angle = math.degToRad(360/segments);
    let x,y;

    for (let i = 0; i < segments; i++){
      let segmentRotation = angle * i;

      context.save();
      context.fillStyle = 'black';

      //The center of the overall circle
      context.translate(circleCenterX, circleCenterY);

      //The place of the particular rectangle in relation to the center
      x = radius * Math.sin(segmentRotation);
      y = radius * Math.cos(segmentRotation);
      context.translate(x, y);
      context.rotate(-segmentRotation);

      //Particular rectangle
      context.fillRect(-w * 0.5, -h * 0.5, w, h);
      context.restore();


    }
    context.beginPath();
    context.arc(circleCenterX, circleCenterY, radius, 0, 2 * Math.PI);
    context.strokeStyle = 'black';
    context.stroke();
  };
};

canvasSketch(sketch, settings);
