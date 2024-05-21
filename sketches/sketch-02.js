const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const amount = 40;
const pointRadius = 10;

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({ context, width, height }) => {


  const points = [];
  for (let i=0; i<amount; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    points.push(new Point(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(point => {
      point.draw(context);
    })
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = pointRadius;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
  }
}