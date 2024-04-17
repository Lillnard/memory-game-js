document.addEventListener("DOMContentLoaded", function () {
    const emojis = [
        "😻",
        "😻",
        "🐵",
        "🐵",
        "🐷",
        "🐷",
        "🐶",
        "🐶",
        "🦒",
        "🦒",
        "🦊",
        "🦊",
        "🐼",
        "🐼",
        "🐸",
        "🐸",
    ];
    let openCards = [];
    let matchedCards = [];
    let firstClick = true;
    let startTime;
    let endTime;
    let highScore = localStorage.getItem("memoryHighScore")
        ? localStorage.getItem("memoryHighScore")
        : Infinity;

    let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleclick;
        document.querySelector(".game").appendChild(box);
    }

    function handleclick() {
        if (firstClick) {
            startTimer();
            firstClick = false;
        }
        if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
            this.classList.add("boxOpen");
            openCards.push(this);
        }

        if (openCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add("boxMatch");
            openCards[1].classList.add("boxMatch");
            matchedCards.push(openCards[0], openCards[1]);
        } else {
            openCards[0].classList.remove("boxOpen");
            openCards[1].classList.remove("boxOpen");
        }
        openCards = [];

        if (matchedCards.length === emojis.length) {
            endTimer();
            if (endTime - startTime < highScore) {
                highScore = endTime - startTime;
                localStorage.setItem("memoryHighScore", highScore);
            }
            displayResultOverlay();
        }
    }

    function startTimer() {
        startTime = Date.now();
    }

    function endTimer() {
        endTime = Date.now();
    }

    function formatTime(time) {
        let seconds = Math.floor(time / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return `${minutes}:${seconds}`;
    }

    function displayResultOverlay() {
        const resultOverlay = document.getElementById("resultOverlay");
        const yourTime = document.getElementById("yourTime");
        const bestTimeResult = document.getElementById("bestTimeResult");

        yourTime.textContent = formatTime(endTime - startTime);

        if (endTime - startTime < highScore) {
            highScore = endTime - startTime;
            localStorage.setItem("memoryHighScore", highScore);
        }
        bestTimeResult.textContent = formatTime(highScore);

        resultOverlay.style.display = "block";
    }

    // Restante do seu código de jogo aqui...

    //função modo dark
    let trilho = document.getElementById("trilho");
    let titulo = document.getElementById("titulo");
    let body = document.querySelector("body");
    let container = document.querySelector(".container");
    let reset = document.querySelector(".reset");

    trilho.addEventListener("click", () => {
        trilho.classList.toggle("dark");
        titulo.classList.toggle("dark");
        body.classList.toggle("dark");
        container.classList.toggle("dark");
        reset.classList.toggle("dark");
    });

    const overlay = document.getElementById("overlay");
    const startButton = document.getElementById("startButton");
    const resultOverlay = document.getElementById("resultOverlay");
    const restartButton = document.getElementById("restartButton");
    const bestTime = document.getElementById("bestTime");

    overlay.style.display = "block";
    bestTime.textContent = formatTime(highScore);

    startButton.addEventListener("click", function () {
        overlay.style.display = "none";
        startGame();
    });

    restartButton.addEventListener("click", function () {
        resultOverlay.style.display = "none";
        startGame();
    });

    function startGame() {
        openCards = [];
        matchedCards = [];
        firstClick = true;
        startTime = null;
        endTime = null;

        let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

        document.querySelector(".game").innerHTML = "";

        for (let i = 0; i < emojis.length; i++) {
            let box = document.createElement("div");
            box.className = "item";
            box.innerHTML = shuffleEmojis[i];
            box.onclick = handleclick;
            document.querySelector(".game").appendChild(box);
        }
    }
});
