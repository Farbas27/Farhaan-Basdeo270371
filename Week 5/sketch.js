let quizData = []; // array waarin alle vragen, opties en juisten antwoorden worden opgeslagen
let huidigeVraagIndex = 0; // houd bij welke vraag de speler is 
let score = 0; 
let spelStatus = "START"; // bepaalt welke scherm getoond wordt ("START", "QUIZ", "FEEDBACK" of "EINDE")
let gekozenAntwoord = -1; // slaat de index op van de antwoorden die de speler heeft geklikt
let isAntwoordGoed = false; // het andwoord word true als je de huiste kiest anders blijft het false

// variabele voor  de open vragen in de html inputveld
let invoerveld; // bewaart het html  input element
let openVraagAntwoord = ""; // slaat de tekst op die de gebruiker intypt

// setup word 1 keer uitgevoerd bij de start
function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);

  // inputveld voor open vraag
invoerveld = createInput('');
invoerveld.size(400, 40);
invoerveld.style('Front-size', '18px');
invoerveld.style('text-align', 'center');
invoerveld.style('border-radius', '8px')
invoerveld.style('border', '2px solid #475569')
invoerveld.style('backround-color', '#1e293b')



  // data base met alle vragen
  quizData = [
    {
      vraag: "Wat betekent het woord 'phishing'?",
      opties: [
        "Een techniek om sneller te kunnen downloaden.",
        "Een poging om iemand te misleiden zodat ze gevoelige informatie geven.",
        "Het updaten van een antivirussoftware.",
        "Een manier om wifi-wachtwoorden te kraken.",
      ],
      correct: 1,
    },
    {
      vraag: "Wat is een sterk wachtwoord?",
      opties: [
        "je geboortedatum met uitroeptekens.",
        "Het woord 'wachtwoord123'.",
        "Een wachtwoord met lengte, hoofdletters, kleine letters, cijfers en symbolen.",
        "Een kort wachtwoord dat makkelijk te onthouden is.",
      ],
      correct: 2,
    },
    {
      vraag: "Wat doet een firewall?",
      opties: [
        "Het beveiligt een computer tegen malware.",
        "Het verbetert de internetverbinding.",
        "Het blokkeert ongewenste e-mailberichten.",
        "Het updatet het besturingssysteem.",
      ],
      correct: 0,
    },
    {
      vraag: "wat is malware?",
      opties: [
        "Schadelijke software zoals virussen, worms, ransomware of spyware.",
        "Een porgramma waarmee je hardware kunt repareren.",
        "Software die je computer helpt minder stroom te gebruiken.",
        "Een type computerbeeldscherm dat speciaal is voor gaming.",
      ],
      correct: 0,
    },
    {
      vraag: "waarom is 2FA belangrijk?",
      opties: [
        "omdat je computer dan sneller werkt.",
        "omdat het extra beveiliging biedt.",
        "omdat het de inlogtijd vermindert.",
        "omdat het de kosten voor beveiliging verlaagt.",
      ],
      correct: 1,
    },
    {
      vraag: "wat is ransomware?",
      opties: [
        "Software die je computer helpt minder stroom te gebruiken.",
        "Een type computerbeeldscherm dat speciaal is voor gaming.",
        "Schadelijke software die je bestanden versleutelt en een losgeld vraagt.",
        "Een programma waarmee je hardware kunt repareren.",
      ],
      correct: 2,
    },
    {
      vraag: "wat is social engineering?",
      opties: [
        "Het bouwen van een sociaal netwerk zoals Facebook.",
        "Manipulatie van mensen om toegang of informatie te krijgen.",
        "Het herprogrammeren van een server.",
        "Het beveiligen van je router tegen hackers.",
      ],
      correct: 1,
    },
    {
      vraag: "wat betekent encryptie?",
      opties: [
        "Het versleutelen van data zodat alleen bevoegde personen het kunnen lezen.",
        "Het permanent verwijderen van tijdelijke internetbestanden.",
        "Het kopiëren van data naar een externe harde schijf.",
        "Het opsporen van fouten in programmacode.",
      ],
      correct: 0,
    },
    {
      vraag: "wat is een VPN?",
      opties: [
        "Een virusscanner voor mobiele telefoon.",
        "een videospeler voor beveiligde media bestanden.",
        "Een type netwerkkabel voor sneller internet.",
        "Een beveiligde verbinding die je internetverkeer versleutelt en je IP-adres verbergt.",
      ],
      correct: 3,
    },
    {
      vraag: "waarom moet je software updaten?",
      opties: [
        "omdat het je computer sneller maakt.",
        "omdat het beveiliginglekken repareren en bescherming verbetert.",
        "omdat het de inlogtijd vermindert.",
        "omdat het de kosten voor beveiliging verlaagt.",
      ],
      correct: 1,
    },
  ];
}

function draw() {
  tekenAchtergrond();
  if (spelStatus === "START") {
    tekenStartScherm();// tekent altijd eerst de tech achtergrond
  } else if (spelStatus === "QUIZ") {
    toonVraagEnOpties(); // toonde huidige vragen
  } else if (spelStatus === "FEEDBACK") {
    tekenFeedbackScherm(); // laat zien als het antwoord als het goed of fout is
  } else if (spelStatus === "EINDE") {
    tekenEindScherm(); // toon einde scherm en je punten
  }
}

// tekend een voeiende kleurverloop achtergrond met een raster
function tekenAchtergrond() {
  // maakt een verticaal kleurverloop (gradient) van boven naar bendeden
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(15, 23, 42), color(30, 41, 59), inter);
    stroke(c);
    line(0, i, width, i);
  }
  
  // teken dunne rasterlijnen voor een digitale/cyber look
  stroke(51, 65, 85, 50);
  strokeWeight(1);
  for (let x = 0; x < width; x += 40) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 40) {
    line(0, y, width, y);
  }
}

// teken titel en start knop 
function tekenStartScherm() {
  fill(56, 189, 248);
  noStroke();
  textSize(40);
  textStyle(BOLD);
  text("CYBERSECURITY QUIZ", width / 2, 180);

  fill(226, 232, 240);
  textSize(18);
  textStyle(NORMAL);

  text(
    "Test je kennis over online veiligheid. \nde quiz bevat 10 vragen.",
    width / 2,
    260,
  );

  tekenKnop(
    width / 2,
    height / 2 + 100,
    200,
    50,
    "START QUIZ",
    color(14, 165, 233),
  );
}

// tekent de actieve vraag, de voortsgaanbalk en de 4 antwoord opties
function toonVraagEnOpties() {
  let huidigeData = quizData[huidigeVraagIndex];

  // teken de achtergrond van de voortsgaanbalk
  fill(51, 65, 85);
  noStroke();
  rect(50, 40, width - 100, 10, 5);

  // teken de gekleurd voortsgang (een blauwe balk die groeit per vraag)
  fill(14, 165, 233);
  let voortgangBreedte = map(
    huidigeVraagIndex + 1,
    0,
    quizData.length,
    0,
    width - 100,
  );
  rect(50, 40, voortgangBreedte, 10, 5);

  // tekend de huidige vraag nummer
  fill(148, 163, 184);
  textSize(14);
  textStyle(BOLD);
  text(`VRAAG ${huidigeVraagIndex + 1} VAN ${quizData.length}`, width / 2, 22);

  // teken de eigenlijke examen vragen 
  fill(255);
  textSize(22);
  textStyle(BOLD);

  text(huidigeData.vraag, 60, 80, width - 120, 80);

  // instelingen voor de 4 antwoord knopen 
  let startY = 200;
  let KnopHoogte = 70;
  let tussenruimte = 15;

  textStyle(NORMAL);
  textSize(16);

  // loop door  de 4 optie  om de knopen  onder elkaar te tekenen 
  for (let i = 0; i < huidigeData.opties.length; i++) {
    let KnopY = startY + i * (KnopHoogte + tussenruimte);

    //  als mij muis boven een knop zweeft hover
    let hover =
      mouseX > 100 &&
      mouseX < width - 100 &&
      mouseY > KnopY &&
      mouseY < KnopY + KnopHoogte;

      // geeft de knop een lichter kleur
    fill(hover ? color(47, 73, 117) : color(30, 41, 59));
    stroke(71, 85, 105);
    strokeWeight(2);

    rect(100, KnopY, width - 200, KnopHoogte, 8);

    // teken de antwoord tekst binnenin de zojuist getekend knop 
    noStroke();
    fill(241, 245, 249);

    text(huidigeData.opties[i], 120, KnopY, width - 240, KnopHoogte);
  }
}

// teken het russen scherm dat zegt als je antwoord goed is 
function tekenFeedbackScherm() {
  let huidigeData = quizData[huidigeVraagIndex];

  // als antwoord goed was toon groene succes tekst
  if (isAntwoordGoed) {
    fill(34, 197, 94);
    textSize(32);
    textStyle(BOLD);
    text("GOED GEDAAN!", width / 2, 150);
  } else {
    // ander als het fout is toon rode fout tekst
    fill(239, 68, 68);
    textSize(32);
    textStyle(BOLD);
    text("HELAAS, FOUT!", width / 2, 150);
  }
  fill(255);
  textSize(18);
  textStyle(NORMAL);
  text("Het juiste antwoord was:", width / 2, 240);

  // teken een groen omrand vak met goed antwoord er in 
  fill(30, 41, 59);
  stroke(34, 197, 94);
  strokeWeight(2);
  rect(100, 260, width - 200, 80, 8);

  noStroke();
  fill(255);
  text(huidigeData.opties[huidigeData.correct], 120, 260, width - 240, 80);

  // bepaal tekst knop: als dit de laast vraag is 'BEKIJK SCORE', anders 'VOLGEND VRAAG'
  let knopText =
    huidigeVraagIndex === quizData.length - 1
      ? "BEKIJK SCORE"
      : "VOLGENDE VRAAG";

      // teken knop op het feedback scherm 
  tekenKnop(width / 2, 470, 220, 50, knopText, color(14, 165, 233));
}

// tekent het eindschem als de quiz is af gelopen
// toont de definetive score en en een felicitatie bij een perfecte score.
function tekenEindScherm() {
  fill(56, 189, 248);
  textSize(40);
  textStyle(BOLD);

  text("QUIZ AFGEROND!", width / 2, 180);

  // scoreweregave
  fill(255);
  textStyle(NORMAL);
  textSize(24);

  text(`Score: ${score} / ${quizData.length}`, width / 2, 260);
// compliment bij een perfecte score 
  textSize(18);

  if (score === quizData.length) {
    text("goed gedaan", width / 2, 320);
  }
// reset knop  om opnieuw te spelen 
  tekenKnop(width / 2, 450, 220, 50, "OPNIEUW SPELEN", color(34, 197, 94));
}

// universele functie om een interactieve knop te tekenen 
// verandert van kleur (hover effect) als muis eroverheen beweegt
function tekenKnop(x, y, w, h, label, knopKleur) {
  let knopX = x - w / 2;
  let knopY = y - h / 2;

  // controleer of mui zich binnen de knop bevind
  let hover =
    mouseX > knopX &&
    mouseX < knopX + w &&
    mouseY > knopY &&
    mouseY < knopY + h;

    // kleur bepalen: lichter bij hover anders normaal
  if (hover) {
    fill(red(knopKleur) + 20, green(knopKleur) + 20, blue(knopKleur) + 20);
  } else {
    fill(knopKleur);
  }
   // vorm van de knop tekenen
  stroke(255, 50);
  strokeWeight(1);
  rect(knopX, knopY, w, h, 25);

 // tekst op knop center tekenen 
  noStroke();
  fill(255);
  textStyle(BOLD);
  textSize(16);
  text(label, x, y);
}

// p5 ingebouwde functie die af gaat zodra  er geklikt word 
// Regelt de navigatie en logica op basis van de huidige 'spelStatus'
function mousePressed() {
  if (spelStatus === "START") {
    // klik op de start knop 
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 75 &&
      mouseY < height / 2 + 125
    ) {
      spelStatus = "QUIZ";
    }
    // quiz scherm
  } else if (spelStatus === "QUIZ") {
    let startY = 200;
    let knopHoogte = 70;
    let tussenruimte = 15;

    // loop door 4 moglijke antwoord opties 
    for (let i = 0; i < 4; i++) {
      let knopY = startY + i * (knopHoogte + tussenruimte);

      // controleer op welke antwoord is geklikt 
      if (
        mouseX > 100 &&
        mouseX < width - 100 &&
        mouseY > knopY &&
        mouseY < knopY + knopHoogte
      ) {
        gekozenAntwoord = i;
        let huidigeData = quizData[huidigeVraagIndex];

        // controleer als het antwoord goed is 
        if (gekozenAntwoord === huidigeData.correct) {
          isAntwoordGoed = true;
          score++;
        } else {
          isAntwoordGoed = false;
        }
        // schakel over naar feedback scherm 
        spelStatus = "FEEDBACK";
        break; // Stop de loop na de klikregistratie
      }
    }
    // feedback scherm 
  } else if (spelStatus === "FEEDBACK") {
    // Klik op de "VOLGENDE" / "BEKIJK SCORE" knop
    if (
      mouseX > width / 2 - 110 &&
      mouseX < width / 2 + 110 &&
      mouseY > 445 &&
      mouseY < 495
    ) {
      // als dit de laast vraag was stuur door naar eindscherm
      if (huidigeVraagIndex === quizData.length - 1) {
        spelStatus = "EINDE";
      } else {
        // ander naar de volgend vraag 
        huidigeVraagIndex++;
        spelStatus = "QUIZ";
      }
    }
    // eind scherm 
  } else if (spelStatus === "EINDE") {
    // klik op "OPNIEUW SPELEN"  knop 
    if (
      mouseX > width / 2 - 110 &&
      mouseX < width / 2 + 110 &&
      mouseY > 425 &&
      mouseY < 475
    ) {
      // reset all  variabelen naar begingwaarden
      huidigeVraagIndex = 0;
      score = 0;
      gekozenAntwoord = -1;
      isAntwoordGoed = false;
      spelStatus = "START";
    }
  }
}
