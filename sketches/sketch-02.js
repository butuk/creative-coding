const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const amount = 40;
const pointRadius = 10;

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
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
      point.update();
      point.draw(context);
      point.bounce(width, height);
    })
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Point {
  constructor(x, y) {
    this.start = new Vector(x, y);
    this.vector = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = pointRadius * random.range(.5, 1.5);
  }

  update() {
    this.start.x += this.vector.x;
    this.start.y += this.vector.y;
  }

  bounce(width, height) {
    if (this.start.x <= 0 || this.start.x >= width) this.vector.x *= -1;
    if (this.start.y <= 0 || this.start.y >= height) this.vector.y *= -1;
  }

  draw(context) {
    context.save();
    context.translate(this.start.x, this.start.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 4;
    context.stroke();
    context.restore();
  }
}