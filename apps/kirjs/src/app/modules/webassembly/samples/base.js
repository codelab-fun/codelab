const size = 10;


const config = {
  rowSize: 40,
  log: console.log
};
function drawOnCanvas(canvas, arr){
  const context = canvas.getContext('2d');

  for(let i = 0; i < arr.length; i++){
    const x = i % config.rowSize;
    const y = Math.floor(i / config.rowSize);

    context.fillStyle = arr[i] ? 'lime' : '#444';

    context.fillRect(x * size, y * size, size -1, size -1);
  }
}


async function run(code, canvas) {
  const result = await WebAssembly.instantiate(code, {config});

  let memory = new Uint32Array(result.instance.exports.memory.buffer);
  memory[Math.round(config.rowSize/2)] = 1;

  const r = result.instance.exports.evolve(100);
  drawOnCanvas(canvas, memory);
  return r;
}

