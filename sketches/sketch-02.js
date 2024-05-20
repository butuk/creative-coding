const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const point = {x: 800, y: 400, radius: 10};
    context.save();
    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
    context.restore();

    const pointB = new Point(600, 500, 10);

    pointB.draw(context);
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.context = context;
    this.draw();
  }

  draw(context) {
   // console.log(context);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
  }
}