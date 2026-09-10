function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(245);
  
  let mRed = color(200, 20, 30);
  let mBlue = color(40, 75, 160);
  let mYellow = color(245, 210, 50);
  let mGrey = color(150, 150, 150);
  let mBlack = color(15);
  let mWhite = color(255);

  stroke(mBlack);
  strokeWeight(8);
  strokeJoin(MITER);

  fill(mRed);
  rect(260, 0, 70, 45);
  rect(260, 110, 70, 90);
  rect(110, 250, 72, 45);


  fill(mBlue);
  rect(210, 45, 50, 65);
  rect(260, 200, 70, 40);
  rect(0, 370, 55, 75);


  fill(mYellow);
  rect(0, 110, 55, 40);
  rect(180, 290, 80, 80);


  fill(mGrey);
  rect(55, 445, 55, 115);


  fill(mBlack);
  rect(180, 200, 80, 45);


  

  line(55, 0, 55, height);
  line(110, 45, 110, height);
  line(180, 0, 180, height);
  line(210, 0, 210, 200);
  line(260, 0, 260, height);
  line(330, 0, 330, height);


  line(0, 45, width, 45);
  line(0, 110, width, 110);
  line(0, 150, 55, 150);
  line(0, 200, width, 200);
  line(110, 245, width, 245);
  line(110, 290, width, 290);
  line(0, 370, width, 370);
  line(180, 420, width, 420);
  line(0, 445, width, 445);
  line(55, 560, width, 560);
}
