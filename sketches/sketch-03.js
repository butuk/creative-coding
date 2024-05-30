const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const grid = {
      columns: 4,
      rows: 4,
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
      height: pic.height / grid.rows
    };

    for (let i = 0; i < cellsAmount; i++) {
      const column = i % grid.columns;
      const row = Math.floor(i / grid.columns);

      const item = {
        x: column * cell.width,
        y: row * cell.height,
        width: cell.width * .9,
        height: cell.height * .9,
      }

      context.save();
      context.translate(item.x + pic.marginX, item.y + pic.marginY);
      context.beginPath();
      console.log(item.width); //------------------
      context.moveTo(0, item.height / 2);
      context.lineTo(item.width, item.height / 2);
      context.lineWidth = 5;
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
