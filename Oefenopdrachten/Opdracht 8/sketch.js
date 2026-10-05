 let arrPersoon = [
    ['naam1', 'naam2', 'naam3', 'naam4', 'naam5'],
    ['naam6', 'naam7', 'naam8', 'naam9', 'naam10'],
    ['naam11', 'naam12', 'naam13', 'naam14', 'naam15']
  ];
  
function setup() {
  createCanvas(400, 400);

 
}

function draw() {
  background(220);
  for (let i = 0; i < arrPersoon.length; i++) {
    for (let j = 0; j < arrPersoon[i].length; j++) {
      ellipse(i * 50 + 25, j * 50 + 25, 40, 40);
      text(arrPersoon[i][j], i * 50 + 15, j * 50 + 25);
    }
  }
}
