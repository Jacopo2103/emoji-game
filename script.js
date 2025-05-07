const squares = document.querySelectorAll(".square");
const score = document.querySelector("#score");
const timeLeft = document.querySelector("#time-left");

let result = 0;
let currentTime = 60;
let hitPosition;
let timerId;

let gameSpeed = 1000;

function setDifficulty(speed) {
  gameSpeed = speed;
  console.log("Difficoltà impostata a:", gameSpeed, "ms");
  moveEmoji();
}

function getMouseCoords(e) {
  var e = e || window.event;
  document.getElementById("container").innerHTML =
    e.clientX + ", " + e.clientY + "<br>" + e.screenX + ", " + e.screenY;
}

function startGame() {
  // Logica per iniziare il gioco
  console.log("Gioco iniziato!");
  // Puoi aggiungere codice qui per avviare timer, mostrare elementi, ecc.
}

let gameStarted = false;

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById("gameArea").style.display = "block";
        console.log("Gioco iniziato!");
        // Altra logica per iniziare il gioco, come avviare timer, ecc.
    }
}

function resetGame() {
    gameStarted = false;
    document.getElementById("gameArea").style.display = "none";
    console.log("Gioco resettato!");
    // Altra logica per ripristinare lo stato iniziale
}

function resetGame() {
  // Logica per resettare il gioco
  console.log("Gioco resettato!");
  // Puoi azzerare punteggi, nascondere elementi, ecc.
}

var followCursor = (function () {
  var s = document.createElement("img");
  s.src = "Images/Martello.png"; // Sostituisci con il percorso del tuo PNG
  s.style.position = "absolute";
  s.style.margin = "0";
  s.style.padding = "0";
  s.style.width = "32px"; // larghezza immagine
  s.style.height = "32px"; // altezza immagine
  s.style.pointerEvents = "none"; // Non intercetta eventi di clic

  return {
    init: function () {
      document.body.appendChild(s);
    },

    run: function (e) {
      var e = e || window.event;
      s.style.left = e.clientX - 16 + "px"; // Aggiusta per centrare l'immagine
      s.style.top = e.clientY - 16 + "px"; // Aggiusta per centrare l'immagine
      getMouseCoords(e);
    },
  };
})();

window.onload = function () {
  followCursor.init();
  document.body.onmousemove = followCursor.run;
};

function randomSquare() {
  // Puliamo tutti i quadrati
  squares.forEach((square) => {
    square.classList.remove("emoji");
  });
  // Prendiamo un quadrato casuale
  let randomSquare = squares[Math.floor(Math.random() * 9) + 1];
  // Aggiungiamo la classe 'emoji'
  randomSquare.classList.add("emoji");
  // Salviamo la posizione del quadrato giusto
  hitPosition = randomSquare.id;
}

function moveEmoji() {
  clearInterval(timerId); // ferma l'intervallo precedente
  timerId = setInterval(randomSquare, gameSpeed); // usa la velocità scelta
}

function countdown() {
  // Decrementa il tempo rimanente di un secondo
  currentTime--;
  timeLeft.textContent = currentTime; // Aggiorna il tempo rimanente sullo schermo

  // Se il tempo è scaduto, ferma il gioco
  if (currentTime === 0) {
    clearInterval(timerId); // Ferma il timer dell'emoji
    clearInterval(countdownTimerId); // Ferma il timer del countdown
    alert("Game Over! Your score is " + result); // Mostra il punteggio finale
  }
}

squares.forEach((square) => {
  // Aggiungi un evento di ascolto per il click su ogni quadrato
  square.addEventListener("mousedown", () => {
    // Se il quadrato cliccato è quello giusto
    if (square.id === hitPosition) {
      result++; // Incrementa il punteggio
      score.textContent = result; // Aggiorna il punteggio sullo schermo
      hitPosition = null; // Resetta l'indice dell'emoji
    }
  });
});

moveEmoji();
let countdownTimerId = setInterval(countdown, 1000);
