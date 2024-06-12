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
  scaleMin: 1,
  scaleMax: 30,
  frequency: 0.001,
  amplitude: 0.25,
  animate: true,
  frame: 0,
  lineCap: 'butt'
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

      let f = parameters.animate ? frame : parameters.frame;

      const item = {
        x: column * cell.width,
        y: row * cell.height,
        width: cell.width * .9,
        height: cell.height * .9,//
      }

      //item.randomNumber = random.noise2D(item.x + frame * animationSpeed, item.y, parameters.frequency);
      item.randomNumber = random.noise3D(item.x, item.y, f * animationSpeed, parameters.frequency);
      item.angle = item.randomNumber * Math.PI * parameters.amplitude;
      //console.log(math.mapRange(item.randomNumber, -1, 1, 1, 30)); //------------------
      item.scale = math.mapRange(item.randomNumber, -1, 1, parameters.scaleMin, parameters.scaleMax);

      context.save();
      context.translate(pic.marginX, pic.marginY)
      context.translate(item.x, item.y);
      context.translate(item.width / 2, item.height / 2);
      context.rotate(item.angle);
      context.lineWidth = item.scale;
      context.lineCap = parameters.lineCap
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
  let folder;

  folder = pane.addFolder({title: 'Grid'});
  folder.addInput(parameters, 'lineCap', {options: {butt: 'butt', round: 'round', square: 'square'}});
  folder.addInput(parameters, 'columns', {min: 2, max: 50, step: 1});
  folder.addInput(parameters, 'rows', {min: 2, max: 50, step: 1});
  folder.addInput(parameters, 'scaleMin', {min: 1, max: 100});
  folder.addInput(parameters, 'scaleMax', {min: 1, max: 100});

  folder = pane.addFolder({title: 'Noise'});
  folder.addInput(parameters, 'frequency', {min: -0.01, max: 0.01});
  folder.addInput(parameters, 'amplitude', {min: 0, max: 1});

  folder = pane.addFolder({title: 'Play'});
  folder.addInput(parameters, 'animate');
  folder.addInput(parameters, 'frame', {min: 0, max: 999, step: 1});


};
createPane();

canvasSketch(sketch, settings);
