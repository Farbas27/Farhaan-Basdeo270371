
let horizon = 450;
let canvasBreedte = 800;
let canvasHoogte = 600;
let wolkx = 800;
let wolky = 100;
let zonx = 0;
let zony = 80;
let autox = -200
let autoy = 410;
let autoSnelheid = 0;
let stoplichtStatus = 0;

function setup() {
    createCanvas(canvasBreedte, canvasHoogte);
}

function draw() {
    background(135, 206, 235);

    fill(255, 223, 0)
    noStroke();
    circle(zonx, zony, 80);
    zonx += 0.5;
    if (zonx > canvasBreedte + 40) {
        zonx = -40;
    }
    fill(255);
    noStroke();
    rect(wolkx, wolky, 90, 30, 15);
    circle(wolkx + 25, wolky + 5, 40);
    circle(wolkx + 55, wolky + 5, 50);
    wolkx -= 1;
    if (wolkx < -100) {
        wolkx = canvasBreedte + 50;
    }
    fill(100, 130, 105);
    triangle(100, horizon, 300, 200, 500, horizon);
    fill(80, 110, 85);
    triangle(350, horizon, 550, 150, 750, horizon);

    tekenBoom(150, horizon - 40, 0.8);

    fill(120);
    rect(0, horizon, canvasBreedte, canvasHoogte - horizon);

    fill(255);
    for (let i = 0; i < canvasBreedte; i += 60) {
        rect(i, horizon + 70, 30, 5);
    }
    if (stoplichtStatus === 0) {
        autoSnelheid = 0;
    }
    else if (stoplichtStatus === 1) {
        autoSnelheid = 4;
    }
    else if (stoplichtStatus === 2) {
        autoSnelheid = 1.5;
    }

    autox += autoSnelheid;
    if (autox > canvasBreedte + 50) {
        autox = -200;
    }

    tekenAuto(autox, autoy);
    tekenBoom(600, horizon + 40, 1.2);

    tekenVerkeerslicht(700, horizon - 120);
}

function tekenBoom(x, y, schaal) {
    push();
    translate(x, y);
    scale(schaal);

    fill(102, 51, 0);
    rect(-10, -60, 20, 60);

    fill(34, 139, 34);
    circle(0, -80, 60);
    circle(-20, -60, 50);
    circle(20, -60, 50);
    pop();
}

function tekenAuto(x, y) {
    push();

    fill(0);
    circle(x + 40, y + 50, 35);
    circle(x + 130, y + 50, 35);
    fill(200);
    circle(x + 40, y + 50, 35);
    rect(x, y + 10, 170, 40, 10);
    fill(180, 20, 40);
    rect(x + 45, y - 10, 35, 20, 5);
    rect(x + 85, y - 10, 35, 20, 5);
    pop();
}

function tekenVerkeerslicht(x, y) {
    push();
    fill(30);
    rect(x, y, 40, 120, 5);

    fill(50);
    rect(x + 15, y + 120, 10, 80);

    fill(30);
    rect(x,y, 40, 120, 5);

    let roodKleur = color(100, 0, 0);
    let geelKleur = color(100, 100, 0);
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
function keyPressed() {
    if (keyCode === ENTER) {
        if (stoplichtStatus === 0) {
            stoplichtStatus = 1;
        } else if (stoplichtStatus === 1) {
            stoplichtStatus = 2;
        } else if (stoplichtStatus === 2) {
            stoplichtStatus = 0;
        }
    }
}

