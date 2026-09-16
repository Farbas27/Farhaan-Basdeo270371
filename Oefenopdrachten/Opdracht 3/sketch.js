let score;

function setup() {
  createCanvas(400, 200);
  score = int(random(0, 101));
}

function draw() {
  background(240);
  textSize(32)

  if (score >= 90) {
    fill(0, 200, 0);
    text("uitstekend!", 20, 100);
  } else if (score >= 70 && score <= 89) {
    fill(255, 220, 0);
    text("Goed gedaan!", 20, 100);
  } else if (score >= 50 && score <= 69) {
    fill(255, 140, 0);
    text("Voldoende", 20, 100);
  } else {
    fill(255, 0, 0);
    text("Onvoldoend", 20, 100)
  }
  fill(0);
  textSize(16);
  text("Score: " + score, 20, 30)
}
