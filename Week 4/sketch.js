// arrys voor de 3d vormen
let positiesX = [];
let positiesY = [];
let positiesZ = [];

let groottes = [];
let kleuren = [];
let types = [];

// snelheden voor beweging in 3d
let snelhedenX = [];
let snelhedenY = [];
let snelhedenZ = [];

// rotatiesnelheden zodat de 3d vormen om hun as tollen
let rotatiesX = [];
let rotatiesY = [];
let huidigeRotatieX = [];
let huidigeRotatieY = [];

let aantalVormen;

function setup() {
  createCanvas(800, 600, WEBGL);
  aantalVormen = random(20, 50);

  // vul de arrays met willekeurige 3d eigenschappen via een loop
  for (let i = 0; i < aantalVormen; i++) {
    // kiest een willekeurige X‑positie tussen -width/2 en width/2
    // kiest een willekeurige Y‑positie tussen -height/2 en height/2
    // kiest een willekeurige Z‑diepte tussen -300 en 100

    maakVorm(random(-width / 2, width / 2),
      random(-height / 2, height / 2),
      random(-300, 100));
  }
}

function draw() {
  background(240);
  // voeg basis 3d belichting toe zodat je de diepte en schaduwen goed ziet
  //gelijkmatige verlichting over alle 3D‑objecten 
  ambientLight(100);
  //  is een gerichte lichtbron die vanuit een richting
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  noStroke();

  // loop daar alle vormen heen
  for (let i = 0; i < positiesX.length; i++) {
    // 3d beweging update de x, y en z posities
    positiesX[i] += snelhedenX[i];
    positiesY[i] += snelhedenY[i];
    positiesZ[i] += snelhedenY[i];

    // bouncen tegen de wanden (WEBGL werkt vanuit het midden: 0,0)
    // checkt of de vorm buiten het 3d gebied gaat 
    if (positiesX[i] < -width / 2 || positiesX[i] > width / 2) {
      snelhedenX[i] *= -1 // omkeren van x snelheid bij linker of rechter rand
    }
    if (positiesY[i] < -height / 2 || positiesY[i] > height / 2) {
      snelhedenY[i] *= -1;  // omkeren van y snelheid bij boven of onder rand
    }
    // bouncen in de diepte
    if (positiesZ[i] < -400 || positiesZ[i] > 200) {
      snelhedenZ[i] *= -1;  // omkeren van z snelheid bij voor of achter grens
    }
    // update de draaiing van de vorm
    huidigeRotatieX[i] += rotatiesX[i];
    huidigeRotatieY[i] += rotatiesY[i];
    push();

    // verplaats de vormen naar zijn 3d positie
    translate(positiesX[i], positiesY[i], positiesZ[i]);

    // laat de vormen om zijn eigen as draaien
    rotateX(huidigeRotatieX[i]);
    rotateY(huidigeRotatieY[i]);


    // geef de vormen zijn materiaal en Kleur
    ambientMaterial(kleuren[i]);

    // teken het juiste 3d type op basis van de arry
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

// hulp functie om een 3d vorm aan te maken
function maakVorm(x, y, z) {
  positiesX.push(x);
  positiesY.push(y);
  positiesZ.push(z);

  // geeft een willekeurige grootte
  groottes.push(random(30, 100));

  // geeft de vorm een willekeurige bewegingssnelheid
  snelhedenX.push(random(-1, 1));
  snelhedenY.push(random(-1, 1));
  snelhedenZ.push(random(-1, 1));

  // geeft elke vorm een willekeurige rotatiesnelheid 
  rotatiesX.push(random(0.01, 0.03));
  rotatiesY.push(random(0.01, 0.03));

  // geeft elke vorm een willekeurige startrotatie tussen 0 en 360 graden
  huidigeRotatieX.push(random(TWO_PI));
  huidigeRotatieY.push(random(TWO_PI));

  // kiest een willekeurige kleur en 3d vorm
  kleuren.push(color(random(0, 255), random(0, 255), random(0, 255)));
  types.push(floor(random(0, 4)));
}

// interactie vormen toevoefen op muisklik
function mousePressed() {
  //Check of de muis binnen het canvas zit
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // Omrekenen naar WEBGL‑coördinaten
    let d3X = mouseX - width / 2;
    let d3Y = mouseY - height / 2;
    // nieuw vorm maken op die plek
    maakVorm(d3X, d3Y, random(-100, 100));
  }
}

// knoppen functionaliteiten
function keyPressed() {
  // bavkspace verandert kleuren
  if (keyCode === BACKSPACE) {
    // // loop door alle vormen heen zodat elke vorm apart wordt bijgewerkt en getekend
    for (let i = 0; i < positiesX.length; i++) {
      kleuren[i] = color(random(0, 255), random(0, 255), random(0, 255));
    }
  }

  // s is screenshot
  if (key === 's' || key === 'S') {
    saveCanvas('mijn-3d- kunstwerk', 'png');
  }

  // enter is reset
  if (keyCode === ENTER) {
    positiesX = []; positiesY = []; positiesZ = [];
    groottes = []; kleuren = []; types = [];
    snelhedenX = []; snelhedenY = []; snelhedenZ = [];
    rotatiesX = []; rotatiesY = [];
    huidigeRotatieX = []; huidigeRotatieY = [];

    aantalVormen = random(20, 50);
    for (let i = 0; i < aantalVormen; i++) {
      maakVorm(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-300, 100));
    }
  }
}
