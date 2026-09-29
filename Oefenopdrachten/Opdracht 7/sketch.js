let pixelSize = 20;

let kleuren = {
  0: '#ffffff',  
  1: 'blue',   
  2: '#f2c27b',   
  3: 'Black',   
  4: 'red',   
  5: 'yellow'    
};

let mario = [
  [0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0],
  [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
  [0, 0, 0, 3, 3, 3, 2, 2, 3, 2, 0, 0],
  [0, 0, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2],
  [0, 0, 3, 2, 3, 3, 2, 2, 2, 3, 2, 2],
  [0, 0, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3],
  [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 1, 1, 4, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 4, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1],
  [0, 2, 2, 1, 4, 4, 5, 4, 4, 5, 4, 2],
  [0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 2],
  [0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [0, 0, 0, 4, 4, 4, 0, 0, 4, 4, 4, 0],
  [0, 0, 3, 3, 3, 0, 0, 0, 3, 3, 3, 0],
  [0, 3, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3]
];

function setup() {
  createCanvas(mario[0].length * pixelSize, mario.length * pixelSize);
  noStroke();
}

function draw() {
  background(220);

  for (let y = 0; y < mario.length; y++) {
    for (let x = 0; x < mario[y].length; x++) {

      fill(kleuren[mario[y][x]]);
      rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

    }
  }
}
