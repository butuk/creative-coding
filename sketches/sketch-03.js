const canvasSketch = require ('canvas-sketch');
const random = require ('canvas-sketch-util/random');
const math = require ('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

const parameters = {
  columns: 10,
  rows: 10,
}

const animationSpeed = 20;

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const grid = {
      columns: parameters.columns,
      rows: parameters.rows,
    };
    const pic = {
      width: width * .8,
      height: height * .8,
    };

    pic.marginX = (width - pic.width) * .5;
    pic.marginY = (height - pic.height) * .5;
    const cellsAmount = grid.columns * grid.rows;
    const cell = {
      width: pic.width / grid.columns,
      height: pic.height / grid.rows,
    };

    for (let i = 0; i < cellsAmount; i++) {
      const column = i % grid.columns;
      const row = Math.floor(i / grid.columns);

      const item = {
        x: column * cell.width,
        y: row * cell.height,
        width: cell.width * .9,
        height: cell.height * .9,//
      }

      item.randomNumber = random.noise2D(item.x + frame * animationSpeed, item.y, 0.001);
      item.angle = item.randomNumber * Math.PI * .25;
      //console.log(math.mapRange(item.randomNumber, -1, 1, 1, 30)); //------------------
      item.scale = math.mapRange(item.randomNumber, -1, 1, 1, 30);

      context.save();
      context.translate(pic.marginX, pic.marginY)
      context.translate(item.x, item.y);
      context.translate(item.width / 2, item.height / 2);
      context.rotate(item.angle);
      context.lineWidth = item.scale;
      context.beginPath();

      context.moveTo(0, 0);
      context.lineTo(item.width, 0);
      context.stroke();
      context.restore();
    }
  };
};
const createPane = () => {
  const pane = new Tweakpane.Pane();

  let folder = pane.addFolder({title: 'Grid'});
  folder.addInput(parameters, 'columns', {min: 2, max: 50, step: 1});
  folder.addInput(parameters, 'rows', {min: 2, max: 50, step: 1});
};
createPane();

canvasSketch(sketch, settings);
