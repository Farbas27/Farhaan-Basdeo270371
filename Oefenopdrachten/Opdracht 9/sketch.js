let ballen = [];
let score = 0;
const AANTAL_BALLEN = 10;

function setup() {
  createCanvas(400, 400);
  maakNieuweBallen();
}

function draw() {
  background(30, 40, 80);

  // 2 & 3: ballen tekenen en bewegen
  for (let i = 0; i < ballen.length; i++) {
    let bal = ballen[i];

    // Teken de bal met de Kleur uit  zijn eigen data object
    fill(bal.color.R, bal.color.G, bal.color.B);
    noStroke();
    circle(bal.x, bal.y, bal.size);

    // bereken de straal om de rand collision nauwkeurig te maken
    let radius = bal.size / 2;

    // stuiteren op de x as en y as van het canvas
    if (bal.x + bal.xSpeed < radius || bal.x + bal.xSpeed > width - radius) {
      bal.xSpeed *= -1;
    }

    if (bal.y + bal.ySpeed < radius || bal.y + bal.ySpeed > height - radius) {
      bal.ySpeed *= -1;
    }

    // pas de positie van de bal aan op basis van zijn snelheid
    bal.x += bal.xSpeed;
    bal.y += bal.ySpeed;
  }

  tekenScore();

  // nieuwe ballen spawnen als alle ballen zijn weggeklikt
  if (ballen.length === 0) {
    maakNieuweBallen();
  }
}

// functie om de lijst te vullen met nieuw data objecten
function maakNieuweBallen() {
  for (let i = 0; i < AANTAL_BALLEN; i++) {
    // genereer een random grootte
    let randomSize = random(10, 50);
    let radius = randomSize / 2;

    // zorg dat de ballen niet buiten het canvas spawnen
    let randomX = random(radius, width - radius);
    let randomY = random(radius, height - radius);

    // voeg het data object toe aan de array
    ballen.push({
      x: randomX,
      y: randomY,
      size: randomSize,
      xSpeed: random(-5, 5),
      ySpeed: random(-5, 5),
      color: {
        R: random(0, 255),
        G: random(0, 255),
        B: random(0, 255),
      },
    });
  }
}

//detecteer of de muis op een bal is geklikt en verwijder deze uit de array
function mousePressed() {
  // loop door de array van ballen in omgekeerde volgorde
  for (let i = ballen.length - 1; i >= 0; i--) {
    let bal = ballen[i];

    // bereken de afstand tussen de muis en het midden van de bal
    let afstand = dist(mouseX, mouseY, bal.x, bal.y);

    // als de afstand kleiner is dan de straal van de bal, verwijder deze uit de array
    if (afstand < bal.size / 2) {
      score++;
      ballen.splice(i, 1);
    }
  }
}

// functie om de score op het canvas te tekenen
function tekenScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 15, 15);
}
