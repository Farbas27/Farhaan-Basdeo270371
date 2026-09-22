let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


let spelers = ['Blauw', 'Rood'];
let actieveSpeler;
let spelActief = true
let winnaar = null;
let w, h;
let clickGeluid;
let winLijn = null;

function preload(){
    soundFormats('mp3');
    clickGeluid = loadSound('matthewvakaliuk73627-mouse-click-290204.mp3');
}

function setup() {
    createCanvas(400, 450);
    clickGeluid.setVolume(0.3);
    w = width / 3;
    h = (height - 50) / 3;
    resetSpel();
}

function draw() {
    bepaalAchtergrond();
    tekenHoverEffect();
    tekenRaster();
    tekenZetten();
    tekenWinLijn();
    tekenStatus();
}

// veranderd achtergrond kleur
function bepaalAchtergrond() {
    if (spelActief) {
        if (actieveSpeler === spelers[0]) {
            background(240, 245, 255);
        } else {
            background(255, 240, 240)
        }
    } else {
        if (winnaar === 'Gelijkspel') {
            background(230);
        } else if (winnaar === spelers[0]) {
            background(200, 220, 255);
        } else {
            background(255, 200, 200);
        }
    }
}

// hover effect
function tekenHoverEffect() {
    if (!spelActief) return;

    let j = floor(mouseX / w);
    let i = floor(mouseY / h);

    if (i >= 0 && i < 3 && j >= 0 && j < 3 && board[i][j] === '') {
        noStroke();
        if (actieveSpeler === spelers[0]) {
            fill(0, 0, 255, 30);
        } else {
            fill(255, 0, 0, 30);
        }
        rect(j * w, i * h, w, h);
    }
}
// teken raster
function tekenRaster() {
    stroke(40);
    strokeWeight(4);
    for (let i = 1; i < 3; i++) {
        line(i * w, 0, i * w, height - 50);
        line(0, i * h, width, i * h);
    }
}

//teken cirkels en kruiszen
function tekenZetten() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = j * w + w / 2;
            let y = i * h + h / 2;
            let spot = board[i][j];

            if (spot === spelers[0]) {
                noFill();
                stroke(0, 0, 255);
                strokeWeight(6);
                ellipse(x, y, w * 0.6);
            } else if (spot === spelers[1]) {
                stroke(255, 0, 0);
                strokeWeight(6);
                let xr = w * 0.3;
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);

            }
        }
    }
}

// teken de win streep
function tekenWinLijn() {
    if (spelActief || !winLijn || winnaar === 'Gelijkspel') return;

    strokeWeight(8);
    stroke(winnaar === spelers[0] ? color(0, 0, 255) : color(255, 0, 0));

    if (winLijn.type === 'rij') {
        let y = winLijn.index * h + h / 2;
        line(20, y, width - 20, y);
    }

    if (winLijn.type === 'kolom') {
        let x = winLijn.index * w + w / 2;
        line(x, 20, x, height - 70);
    }

    if (winLijn.type === 'diagonaal1') {
        line(20, 20, width - 20, height - 70);
    }

    if (winLijn.type === 'diagonaal2') {
        line(width - 20, 20, 20, height - 70);
    }
}

// toon status
function tekenStatus() {
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();
    fill(0);

    if (spelActief) {
        text(
            "Beurt: " + (actieveSpeler === spelers[0] ? "Speler 1 (Blauw)" : "Speler 2 (Rood)"),
            width / 2,
            height - 25
        );
    } else {
        if (winnaar === 'Gelijkspel') {
            text("Het is een gelijkspel Klik om te herstarten.", width / 2, height - 25);
        } else {
            let winnaarTekst = winnaar === spelers[0] ? "Speler 1 (blauw)" : "Spelers 2 (Rood)";
            text(winnaarTekst + "wint klik om te herstarten.", width / 2, height - 25);
        }
    }
}

// herstarten
function mousePressed() {
    if (spelActief) {
        let j = floor(mouseX / w);
        let i = floor(mouseY / h);

        if (i >= 0 && i < 3 && j >= 0 && j < 3) {
            if (board[i][j] === '') {
                clickGeluid.stop();
                clickGeluid.play();
                board[i][j] = actieveSpeler;
                controleerEindeSpel();
                if (spelActief) {
                    wisselSpeler();
                }
            }
        }
    } else {
        resetSpel();
    }
}

function wisselSpeler() {
    actieveSpeler = actieveSpeler === spelers[0] ? spelers[1] : spelers[0];
}

function resetSpel() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    actieveSpeler = spelers[0];
    spelActief = true;
    winnaar = null;
    winLijn = null;
}

function controleerEindeSpel() {
    // horizontaal
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' &&
            board[i][0] === board[i][1] &&
            board[i][1] === board[i][2]) {

                   winLijn = { type: 'rij', index: i };
            kondigWinnaar(board[i][0]);
            return;
        }
    }
    // verticaal
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' &&
            board[0][j] === board[1][j] &&
            board[1][j] === board[2][j]) {

                winLijn = { type: 'kolom', index: j };
            kondigWinnaar(board[0][j]);
            return;
        }
    }
    // controleer diagonaal
    if (board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) {

            winLijn = { type: 'diagonaal1' };
        kondigWinnaar(board[0][0]);
        return;
    }
    if (board[0][2] !== '' &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]) {

           winLijn = { type: 'diagonaal2' };
        kondigWinnaar(board[0][2]);
        return;
    }
    //controleer op gelijkspel
    let legeCellen = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                legeCellen++;
            }
        }
    }
    if (legeCellen === 0) {
        winnaar = 'Gelijkspel';
        spelActief = false;
    }
}
function kondigWinnaar(s) {
    winnaar = s;
    spelActief = false;
}
