let x = 100;

let greeting = "hello world";

let a = 20;
 let b = 10;

 let optellen = a + b;
 let afftrekken = a - b;
 let vermenigvuldigen = a * b; 
 let delen = a/b;

 function setup() {
  createCanvas(400,400);
  textSize(20);

  text("x:" + x, 20,20);
  text(greeting, 20, 60);

  let y = 80;

  text("optellen: " + optellen, 20, y);
  y += 20;

   text("afftrekken: " + afftrekken, 20, y);
   y += 20;

    text("vermenigvuldigen: " + vermenigvuldigen, 20, y);
    y += 20;
  text("delen: " + delen, 20, y);
 
    
 }