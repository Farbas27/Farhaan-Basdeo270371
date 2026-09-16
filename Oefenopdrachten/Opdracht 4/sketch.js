let teller = 0;
let stoplichtStatus = 0;
let ballx = 400;
let bally = 300;
let ballSize = 60;
let ballSpeed = 5;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  // instructietekst
  fill(0);
  noStroke();
  textSize(14);
  text("1. Houd B om een blockje te Laten verschijnen.(x:20 y:20) ", 20, 20);
  text("2. Druk op spatie om van rood -> groen -> oranje te gaan. (x: 20, y:120)", 20, 120);
  text("3. Druk op enter om van rood -> groen -> oranje te gaan. (x: 20, y:240)", 20, 240);
  text("4. Beweeg de eightball met WASD of de pijltijstoetsen. (x: 360, y: 20)", 360, 20);

  if (keyIsDown(66)) {
    fill(255);
    stroke(0);
    rect(20, 30, 60, 60);
  }
  // teller
  teller += 1;
  if (teller > 500) {
    teller = 0;
  }

  // teller en verkeerslicht
  fill(0);
  noStroke();
  textSize(20);
  text("Teller: " + teller, 20, 150);
  tekenVerkeerslicht(20, 260);

  // besturing eichtball
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    ballx -= ballSpeed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    ballx += ballSpeed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    bally -= ballSpeed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    bally += ballSpeed;
  }

  // schermranden
  if (ballx < -ballSize / 2) ballx = width + ballSize / 2;
  if (ballx > width + ballSize / 2) ballx = -ballSize / 2;
  if (bally < -ballSize / 2) bally = height + ballSize / 2;
  if (bally > height + ballSize / 2) bally = -ballSize / 2;

  // 8ball teken
  push();
  fill(0);
  stroke(50);
  circle(ballx, bally, ballSize);

  fill(255);
  noStroke();
  circle(ballx, bally, ballSize * 0.45);

  fill(0);
  textAlign(CENTER, CENTER);
  text("8", ballx, bally);
  pop();
}

function keyPressed() {
  if (key === ' ') {
    stoplichtStatus = (stoplichtStatus + 1) % 3;
  }
  if (keyCode === ENTER) {
    stoplichtStatus = (stoplichtStatus + 1) % 3;
    teller = 0;
  }
}

function tekenVerkeerslicht(x, y) {
  push();
  fill(30);
  rect(x, y, 40, 120, 5);

  fill(50);
  rect(x + 15, y + 120, 10, 80);

  let roodKleur = color(100, 0, 0);
  let geelKleur = color(100, 100, 0)
  let groenKleur = color(0, 100, 0);

  if (stoplichtStatus === 0) roodKleur = color(255, 0, 0);
  if (stoplichtStatus === 1) groenKleur = color(0, 255, 0);
  if (stoplichtStatus === 2) geelKleur = color(255, 255, 0);

  fill(roodKleur);
  circle(x + 20, y + 25, 25);
  fill(geelKleur);
  circle(x + 20, y + 65, 25);
  fill(groenKleur);
  circle(x + 20, y + 105, 25);
  pop();
}