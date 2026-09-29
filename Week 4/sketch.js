let positiesX = [];
let positiesY = [];
let positiesZ = [];

let groottes = [];
let kleuren = [];
let types = [];

let snelhedenX = [];
let snelhedenY = [];
let snelhedenZ = [];

let rotatiesX = [];
let rotatiesY = [];
let huidigeRotatieX = [];
let huidigeRotatieY = [];

let aantalVormen;


function setup() {
  createCanvas(800, 600, WEBGL);
  aantalVormen = random(20, 50);

  for (let i = 0; i < aantalVormen; i++) {
    maakVorm = (random(-width / 2, width / 2), random(-height / 2, height / 2), random(-300, 100));
  }
}

function draw() {
  background(240);
  ambientLight(100);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  noStroke();

  for (let i = 0; i < positiesX.length; i++) {
    positiesX[i] += snelhedenX[i];
    positiesY[i] += snelhedenY[i];
    positiesZ[i] += snelhedenY[i];

    if (positiesX[i] < -width / 2 || positiesX[i] > width / 2) {
      snelhedenX[i] *= -1
    }
    if (positiesY[i] < -height / 2 || positiesY[i] > height / 2) {
      snelhedenY *= -1;
    }
    if (positiesZ[i] < -400 || positiesZ[i] > 200) {
      snelhedenY *= -1;
    }
    huidigeRotatieX[i] += rotatiesX[i];
    huidigeRotatieY[i] += rotatiesY[i];
    push();

    translate(positiesX[i], positiesY[i], positiesZ[i]);

    rotatiesX(huidigeRotatieX[i]);
    rotatiesY(huidigeRotatieY[i]);

    ambientMaterial(kleuren[i]);

    if (types[i] === 0) {
      sphere(groottes[i] / 2);
    }
    else if (types[i] === 1) {
      box(groottes[i]);
    }
    else if (types[i] === 2) {
      cone(groottes[i] / 2, groottes[i]);
    }
    else if (types[i] === 3) {
      cylinder(groottes[i] / 3, groottes[i]);
    }
    pop();
  }
}
