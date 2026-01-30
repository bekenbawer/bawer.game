/* ===== ELEMENTS ===== */
let form = document.getElementById("userForm");
let valid = document.getElementById("valid");

let gameSection = document.getElementById("game");
let questionEl = document.getElementById("question");
let answerEl = document.getElementById("userAnswer");
let resultEl = document.getElementById("result");
let btn = document.getElementById("btn");
let timerEl = document.getElementById("timer");

let receiptSection = document.getElementById("receipt");
let recapName = document.getElementById("recapName");
let recapEmail = document.getElementById("recapEmail");
let recapScore = document.getElementById("recapScore");
let recapPercentage = document.getElementById("recapPercentage");

/* ===== QUESTIONS ===== */
let questions = [
    { question: "Quel langage est interprété directement par le navigateur ?", answer: "javascript" },
    { question: "Quelle balise HTML est utilisée pour créer un lien ?", answer: "a" },
    { question: "Quel attribut HTML permet de lier un fichier CSS ?", answer: "link" },
    { question: "Comment dit-on: je suis daccord en anglais ?" , answer: "i am agree"},
    { question: "Quelle propriété CSS permet de changer la couleur du texte ?", answer: "color" },
    { question: "Quelle propriété CSS permet de centrer un texte horizontalement ?", answer: "text-align" },
    { question: "Quelle méthode JavaScript permet de sélectionner un élément par son id ?", answer: "getelementbyid" },
    { question: "Quel mot-clé JavaScript permet de déclarer une variable modifiable ?", answer: "let" },
    { question: "Quelle fonction JavaScript empêche le rechargement d’un formulaire ?", answer: "preventdefault" },
    { question: "Quel type d’événement est déclenché lorsqu’un formulaire est envoyé ?", answer: "submit" },
    { question: "Quelle fonction JavaScript permet d’exécuter du code toutes les secondes ?", answer: "setinterval" },
    { question: "quelle fonction javascript permet d'ecouter l'action du html?" , answer: "addeventlistener"},
    { question: "enter le javascript , le python et le c++ qui a été crée en 2000", answer: "python"},
    { question: "il se trouve 26 personnes dans une banque une terroriste rentre et les tues toutes , combien de personne reste sur place ?", answer: "1"},
    { question: "le concepteur du langage html , est il Tim Berner Li? répond par vrai ou faux", answer: "vrai"},
    { question: "combien font 3*5-8+8-2+3" , answer: "16"}


    
]

let index = 0;
let score = 0;
let time = 30;
let timer;

/* ===== FORMULAIRE ===== */
form.addEventListener("submit", function(e) {
    e.preventDefault();

    // récupération des infos
    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let email = document.getElementById("email").value.trim();

    if (nom === "" || prenom === "" || email === "") {
        valid.textContent = "❌ Veuillez remplir toutes vos informations pour jouer !";
        return;
    }

    // stocker pour le reçu
    form.dataset.nom = nom;
    form.dataset.prenom = prenom;
    form.dataset.email = email;

    valid.textContent = `✅ ${prenom}, le jeu commence maintenant 🎮 !`;

    form.style.display = "none";
    gameSection.style.display = "block";

    afficherQuestion();
});

/* ===== AFFICHER QUESTION ===== */
function afficherQuestion() {
    questionEl.textContent = questions[index].question;
    answerEl.value = "";
    resultEl.textContent = "";
    startTimer();
}

/* ===== TIMER ===== */
function startTimer() {
    clearInterval(timer);
    time = 30;
    timerEl.textContent = "Temps : " + time + " s";

    timer = setInterval(() => {
        time--;
        timerEl.textContent = "Temps : " + time + " s";

        if (time <= 0) {
            clearInterval(timer);
            resultEl.textContent = "⏰ Temps écoulé ❌";
            passerQuestion();
        }
    }, 1000);
}

/* ===== BOUTON VALIDER ===== */
btn.addEventListener("click", function() {
    clearInterval(timer);

    let userAnswer = answerEl.value.toLowerCase().trim();

    if (userAnswer === questions[index].answer) {
        resultEl.textContent = "✅ Correct";
        score++;
    } else {
        resultEl.textContent = "❌ Incorrect";
    }

    passerQuestion();
});

/* ===== PASSER À LA QUESTION SUIVANTE ===== */
function passerQuestion() {
    index++;
    setTimeout(() => {
        if (index < questions.length) {
            afficherQuestion();
        } else {
            afficherResultatFinal();
        }
    }, 1000);
}

/* ===== RESULTAT FINAL + REÇU ===== */
function afficherResultatFinal() {
    let pourcentage = Math.round((score / questions.length) * 100);

    gameSection.style.display = "none";
    receiptSection.style.display = "block";

    recapName.textContent = "Nom : " + form.dataset.nom;
    recapEmail.textContent = "Email : " + form.dataset.email;
    recapScore.textContent = "Score : " + score + " / " + questions.length;
    recapPercentage.textContent = "Pourcentage : " + pourcentage + "%";
}


