let maxDepth = 7;
let depth = 0;
let speed = 0.02;



function setup() {
  createCanvas(1200, 1500);
}

function draw() {
  let t = (sin(frameCount * speed) + 1) / 2;
  depth = int(t * maxDepth);
  background(220);

  textSize(16);
  text("Farhaan", 10, 20);

  noStroke();
  fill("red"); rect(0, 100, 400, 100);
  fill("white"); rect(0, 200, 400, 100);
  fill("blue"); rect(0, 300, 400, 100);

  stroke(0);
  strokeWeight(1);

  for (let rij = 0; rij < 8; rij++) {
    for (let kolom = 0; kolom < 8; kolom++) {

      if ((rij + kolom) % 2 === 0) {
        fill(255);
      } else {
        fill(0);
      }
      rect(500 + kolom * 50, 100 + rij * 50, 50, 50);
    }
  }

  stroke(0);
  strokeWeight(2);
  noFill();

  ellipse(150, 650, 30, 30);

  line(150, 665, 150, 725);

  line(150, 680, 120, 695);
  line(150, 680, 180, 695);

  line(150, 725, 130, 775);
  line(150, 725, 170, 775);


  stroke(0);
  strokeWeight(2);
  noFill();

  rect(550, 650, 200, 150)
  triangle(550, 650, 650, 550, 750, 650);

  fill(255, 255, 255, 120);
  rect(630, 720, 40, 80);

  stroke(0);
  strokeWeight(2);

  fill(150);
  rect(330, 580, 15, 200);

  fill(30);
  rect(310, 430, 55, 150, 10);

  fill("red");
  ellipse(3375 / 10, 455, 30, 30);

  fill("orange");
  ellipse(3375 / 10, 505, 30, 30);

  fill("green");
  ellipse(3375 / 10, 555, 30, 30);

  stroke(0);
  strokeWeight(6);
  fill(255);

  rect(950, 100, 100, 100, 15);

  strokeWeight(2);
  fill(0);

  ellipse(975, 125, 14, 14);
  ellipse(1025, 125, 14, 14);
  ellipse(1000, 150, 14, 14);
  ellipse(975, 175, 14, 14);
  ellipse(1025, 175, 14, 14);

  fill(0);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text("Mario", 1025, 620);
  textAlign(LEFT);

  let marioGrid = [
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
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

  let pixelGroote = 12;
  let startx = 950;
  let starty = 630;

  noStroke();
  for (let r = 0; r < marioGrid.length; r++) {
    for (let k = 0; k < marioGrid[r].length; k++) {
      let pixelType = marioGrid[r][k];
      if (pixelType === 1) {
        fill(220, 0, 0);
      } else if (pixelType === 2) {
        fill(255, 204, 153);
      } else if (pixelType === 3) {
        fill(80, 50, 30);
      } else if (pixelType === 4)
        fill(0, 0, 255);

      if (pixelType !== 0) {
        rect(startx + k * pixelGroote, starty + r * pixelGroote, pixelGroote, pixelGroote);
      }
    }
  }

  textAlign(CENTER);
  text("Link", 1025, 900);
  textAlign(LEFT);

  let linkGrid = [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0],
    [0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0],
    [0, 0, 2, 2, 3, 2, 5, 2, 2, 5, 2, 3, 2, 2, 0],
    [0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0],
    [0, 0, 0, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 0, 0],
    [0, 3, 3, 4, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 0],
    [0, 3, 4, 4, 4, 3, 3, 1, 1, 1, 1, 3, 2, 2, 0],
    [0, 3, 3, 4, 3, 3, 3, 1, 3, 3, 1, 3, 2, 2, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 0],
    [0, 0, 0, 0, 3, 3, 1, 1, 3, 3, 1, 1, 3, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  ];

  pixelGroote = 12;
  let startxlink = 950;
  let startylink = 920;

  noStroke();
  for (let r = 0; r < linkGrid.length; r++) {
    for (let k = 0; k < linkGrid[r].length; k++) {
      let pixelType = linkGrid[r][k];
      if (pixelType === 1) fill(0, 200, 0);
      else if (pixelType === 2) fill(255, 204, 153);
      else if (pixelType === 3) fill(80, 50, 30);
      else if (pixelType === 4) fill(255, 220, 0);
      else if (pixelType === 5) fill(60, 40, 20);

      if (pixelType !== 0) {
        rect(startxlink + k * pixelGroote, startylink + r * pixelGroote, pixelGroote, pixelGroote);
      }
    }
  }



  fill(0);
  noStroke();

  let x1 = 300;
  let y1 = 1100;
  let x2 = 100;
  let y2 = 1400;
  let x3 = 500;
  let y3 = 1400;

  sierpinski(x1, y1, x2, y2, x3, y3, depth);
}

function sierpinski(x1, y1, x2, y2, x3, y3, depth) {
  if (depth === 0) {
    fill(255, 100, 200);
    triangle(x1, y1, x2, y2, x3, y3);
    return;
  }

  let mx12 = (x1 + x2) / 2;
  let my12 = (y1 + y2) / 2;
  let mx23 = (x2 + x3) / 2;
  let my23 = (y2 + y3) / 2;
  let mx31 = (x3 + x1) / 2;
  let my31 = (y3 + y1) / 2;

  sierpinski(x1, y1, mx12, my12, mx31, my31, depth - 1);
  sierpinski(mx12, my12, x2, y2, mx23, my23, depth - 1);
  sierpinski(mx31, my31, mx23, my23, x3, y3, depth - 1);
}
