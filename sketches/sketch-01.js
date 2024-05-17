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
    const h = width * .2;
    const circleCenterX = width * .5;
    const circleCenterY = height * .5;
    const segments = 12;
    const angle = math.degToRad(360/segments);
    let x,y;

    for (let i = 0; i < segments; i++){
      let segmentRotation = angle * i;

      //Set of rectangles
      context.save();
      context.fillStyle = 'black';

      //The center of the overall circle
      context.translate(circleCenterX, circleCenterY);

      //The place of the particular rectangle in relation to the center
      x = radius * Math.sin(segmentRotation);
      y = radius * Math.cos(segmentRotation);
      context.translate(x, y);
      context.rotate(-segmentRotation);
      context.scale(random.range(.2, 2), random.range(.2, .5));

      //Particular rectangle
      context.beginPath();
      context.fillRect(-w * .5, -h * random.range(0, .5), w, h);

      //End of this figures set
      context.restore();

      //New figures set
      context.save();
      context.translate(circleCenterX, circleCenterY);
      context.rotate(-segmentRotation);
      context.lineWidth = random.range(5, 20);

      //Arcs
      context.beginPath();
      context.arc(0, 0, radius * random.range(.7, 1.5), angle * random.range(0, -.3), angle * random.range(0, 3));
      context.stroke();

      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
