function setup() {
  createCanvas(900, 600);
  background(220);
  noStroke();

  textSize(16);
  fill(0);
  text("1.", 20, 15);
  text("2.", 20, 105);
  text("3.", 80, 105);
  text("4.", 80, 205);
  text("5.", 540, 20);
  text("6.", 350, 105);
  text("7.", 625, 105);

  // 1 10 blokjes op een rij 7 blokje blauw
  for (let i = 0; i < 10; i++) {
    if (i === 6) fill(0, 0, 255);
    else fill(255);
    rect(20 + i * 50, 30, 50, 50)
  }
  // 2 5 blokjes onder elkaar zwart naar wit
for (let i = 0; i < 5; i++) {
  let shade = map(i, 0, 4, 0, 255);
  fill(shade);
  rect(20, 120 + i * 50, 50, 50);
}

  // 3 4 blokjes naast elkaar breedte +25, steeds groener
  let x3 = 80;
  let w3 = 25;
  for (let i = 0; i < 4; i++) {
    fill(0, i * 60, 0);
    rect(x3, 120, w3, 50);
    x3 += w3;
    w3 += 25;
  }
  // 4 4 blauwe blokjes breedte +25, hoogte +25, blauw naar zwart
  let x4 = 80;
  let w4 = 25;
  let h4 = 50;
  for (let i = 0; i < 4; i++) {
    let blue = map(i, 0, 3, 255, 0);
    fill(0, 0, blue);
    rect(x4, 220, w4, h4);
    x4 += w4;
    w4 += 25;
    h4 += 25;
  }
  // 5 6 cirkels naast elkaar strokeWeight groter
  for (let i = 0; i < 6; i++) {
    stroke(0);
    strokeWeight(i + 1);
    noFill();
    circle(540 + i * 50, 60, 30);
  }
  noStroke();

  // 6 Bullseye 10 ringen, rood/wit
  let radius = 100;
  let toggle = true;
  for (let i = 0; i < 10; i++) {
    fill(toggle ? "red" : "white");
    circle(400, 200, radius);
    radius -= 10;
    toggle = !toggle;
  }
  // 7 Accordeon 21 rechthoeken
  // eerste 11 breder laatste 10 smaller
let x7 = 625;
let y7 = 120;
let w7 = 20;

for (let i = 0; i < 21; i++) {

  if (i % 2 === 0) fill(200);  
  else fill(255);             

  if (i < 11) w7 += 10;
  else w7 -= 10;

  let xPos = x7 - w7 / 2;

  rect(xPos, y7, w7, 20);

  y7 += 20; 
}
}
