
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
let isNight = false;
let cycleTimer = 0;
let cycleLengte = 15 * 60;


function setup() {
    createCanvas(canvasBreedte, canvasHoogte);
}

function draw() {
    // tijd bij houden
    cycleTimer++;
    if (cycleTimer >= cycleLengte) {
        isNight = !isNight;
        cycleTimer = 0;
    }
    if (isNight) {
        background(20, 24, 43);
    } else {
        background(135, 206, 235);
    }
    // zon en maan
    noStroke();
    if (isNight) {
        fill(230, 230, 210);
        circle(zonx - 15, zony - 10, 15);
        circle(zonx + 10, zony + 15, 20);
        circle(zonx + 15, zony - 15, 12);
    } else {
        fill(255, 223, 0);
        circle(zonx, zony, 80);
    }
    // beweeg achtergrond
    zonx += 0.5;
    if (zonx > canvasBreedte + 40) {
        zonx = -40;
    }

    // vogel formatie
    let formatieX = zonx - 80;
    let formatieY = zony;
    // vogel
    tekenVogel(formatieX, formatieY - 20);
    tekenVogel(formatieX, formatieY + 20);
    tekenVogel(formatieX - 30, formatieY);
    tekenVogel(formatieX + 30, formatieY)

    // wolk
    if (isNight) {
        fill(80, 90, 110);
    } else {
        fill(255);
    }
    noStroke();
    rect(wolkx, wolky, 90, 30, 15);
    circle(wolkx + 25, wolky + 5, 40);
    circle(wolkx + 55, wolky + 5, 50);
    wolkx -= 1;
    if (wolkx < -100) {
        wolkx = canvasBreedte + 50;
    }
    // bergen
    if (isNight) {
        fill(40, 55, 45);
        triangle(100, horizon, 300, 200, 500, horizon);
        fill(30, 45, 35);
        triangle(350, horizon, 550, 150, 750, horizon)
    } else {
        fill(100, 130, 105);
        triangle(100, horizon, 300, 200, 500, horizon);
        fill(80, 110, 85);
        triangle(350, horizon, 550, 150, 750, horizon);
    }

    // bomen achter
    tekenBoom(60, horizon, 0.8);
    tekenBoom(140, horizon, 0.9);
    tekenBoom(canvasBreedte - 140, horizon, 0.9);
    tekenBoom(canvasBreedte - 60, horizon, 0.8);

    // lantaarenpalen
    tekenLantaarnpaal(200, horizon);
    tekenLantaarnpaal(550, horizon);

    // verkeerslicht
    tekenVerkeerslicht(canvasBreedte - 100, horizon - 200);

    //  de weg
    if (isNight) {
        fill(50);
    } else {
        fill(120);
    }
    rect(0, horizon, canvasBreedte, canvasHoogte - horizon);

    //wegmarkering
    fill(255);
    for (let i = 0; i < canvasBreedte; i += 60) {
        rect(i, horizon + 70, 30, 5);
    }
    // verkeerslicht logica en auto snelheid
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

    // auto 
    tekenAuto(autox, autoy);

    // bomen voor
    tekenBoom(50, canvasHoogte + 20, 1.3);
    tekenBoom(canvasBreedte - 50, canvasHoogte + 20, 1.3);

    // nacht overlay
    if (isNight) {
        fill(0, 0, 40, 120);
        rect(0, 0, canvasBreedte, canvasHoogte)
    }
}

function tekenLantaarnpaal(x, y) {
    push();
    if (isNight) {
        fill(255, 255, 150, 40);
        noStroke();
        triangle(x, y - 180, x - 100, y + 150, x + 100, y + 150);
    }
    stroke(40);
    strokeWeight(6)
    line(x, y, x, y - 180);
    line(x, y - 180, x + 20, y - 180);

    noStroke();
    fill(50);
    rect(x + 10, y - 183, 20, 3);

    if (isNight) {
        fill(255, 255, 180);
        ellipse(x + 20, y - 175, 16, 8);
    }
    pop();
}

function tekenVogel(x, y) {
    push();
    if (isNight) stroke(40);
    else stroke(0);
    strokeWeight(2);
    noFill();

    beginShape();
    vertex(x - 10, y + 5);
    quadraticVertex(x - 5, y - 5, x, y);
    quadraticVertex(x + 5, y - 5, x + 10, y + 5);
    endShape();
    pop();
}

function tekenBoom(x, y, schaal) {
    push();
    translate(x, y);
    scale(schaal);

    if (isNight) {
        fill(50, 25, 0);
        rect(-10, -60, 20, 60);
        fill(15, 70, 15)
    } else {
        fill(102, 51, 0);
        rect(-10, -60, 20, 60);
        fill(34, 139, 34);
    }

    circle(0, -80, 60);
    circle(-20, -60, 50);
    circle(20, -60, 50);
    pop();
}

function tekenAuto(x, y) {
    push();
    translate(x, y);
    // koplamp straal
    if (isNight) {
        fill(255, 255, 200, 70)
        noStroke();
        triangle(165, 30, 320, 5, 320, 65);
    }

    // wielen
    fill(20);
    ellipse(40, 55, 45, 45);
    ellipse(130, 55, 45, 45);

    // geen idee hoe dit heet
    fill(180);
    ellipse(40, 55, 25, 24);
    ellipse(130, 55, 25, 25);

    // onderkant
    if (isNight)
        fill(120, 20, 30);
    else fill(200, 40, 50);
    rect(0, 10, 170, 40, 10);

    // dak
    rect(30, -10, 110, 35, 10);

    // ramen
    if (isNight) fill(70, 90, 120);
    else
        fill(160, 210, 255);
    rect(40, -5, 40, 25, 5);
    rect(95, -5, 40, 25, 5);

    // kop lamp
    if (isNight)
        fill(255, 255, 200);
    else fill(255, 255, 120);
    rect(155, 25, 12, 10, 3);
    pop();
}

function tekenVerkeerslicht(x, y) {
    push();
    fill(30);
    rect(x, y, 40, 120, 5);

    fill(50);
    rect(x + 15, y + 120, 10, 80);

    fill(30);
    rect(x, y, 40, 120, 5);

    // als het nacht is gloeien lantaarens
    if (isNight) {
        fill(255, 255, 180);
        ellipse(x + 20, y, 30, 15);
    }

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

