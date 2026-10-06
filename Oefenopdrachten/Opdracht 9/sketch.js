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
  for(let i = 0; i < ballen.length; i++) {
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

    // 
    bal.x += bal.xSpeed;
    bal.y += bal.ySpeed;
  }

  tekenScore();
  if (ballen.length === 0) {
    maakNieuweBallen();
  }
}

function maakNieuweBallen() {
  for (let i = 0; i < AANTAL_BALLEN; i++) {
    let randomSize = random(10, 50);
    let radius = randomSize / 2;
    let randomX = random(radius, width - radius);
    let randomY = random(radius, height - radius);

    ballen.push({
      x: randomX,
      y: randomY,
      size: randomSize,
      xSpeed: random(-5, 5),
      ySpeed: random(-5, 5),
      color: {
        R: random(0, 255),
        G: random(0, 255),
        B: random(0, 255)
      }
    });
  }
  }

  function mousePressed() {
    for (let i = ballen.length - 1; i >= 0; i--) {
      let bal = ballen[i];

      let afstand = dist(mouseX, mouseY, bal.x, bal.y);

      if (afstand < bal.size / 2) {
        score++;
         ballen.splice(i, 1);
      }
  }
  }

  function tekenScore() {
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Score: " + score, 15, 15);
  }