const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const amount = 60;
const pointRadius = 10;
const radiusRange = {from: .5, to: 1.2};
const directionRange = {from: -5, to: 5};
const closestPoint = 200;
const lineWidth = 4;
const lineRange = {from: 6, to: .1};

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

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const another = points[j];

        const dist = point.start.getDistance(another.start);

        if (dist > closestPoint) continue;

        context.lineWidth = math.mapRange(dist, 0, closestPoint, lineRange.from, lineRange.to);

        context.beginPath();
        context.moveTo(point.start.x, point.start.y);
        context.lineTo(another.start.x, another.start.y);
        context.stroke();
      }
    }

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

  getDistance(point) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Point {
  constructor(x, y) {
    this.start = new Vector(x, y);
    this.vector = new Vector(random.range(directionRange.from, directionRange.to), random.range(directionRange.from, directionRange.to));
    this.random = random.range(radiusRange.from, radiusRange.to);
    this.radius = pointRadius * this.random;
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
    context.lineWidth = lineWidth * this.random;
    context.stroke();
    context.restore();
  }
}