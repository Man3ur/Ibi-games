/* The Alien Fly — mini-jeu caché d'Ibi Games */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "the-red-one-flies/media/The red.png";

const bestScoreEl = document.getElementById("bestScore");
const currentScoreEl = document.getElementById("currentScore");

// Réglages généraux
const gravity = 0.5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = canvas.width / 10;

// Réglages des tuyaux
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) + pipeWidth;

let gamePlaying = false;
let index = 0;
let bestScore = 0;
let flight;
let flyHeight;
let currentScore;
let pipes;

try {
    bestScore = Number(localStorage.getItem("ibi-alien-best")) || 0;
} catch (e) { /* stockage indisponible */ }

const setup = () => {
    currentScore = 0;
    flight = jump;
    // Position de départ : milieu de l'écran
    flyHeight = canvas.height / 2 - size[1] / 2;
    // Les 3 premiers tuyaux
    pipes = Array.from({ length: 3 }, (_, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
};

const saveBest = () => {
    try {
        localStorage.setItem("ibi-alien-best", String(bestScore));
    } catch (e) { /* stockage indisponible */ }
};

const render = () => {
    index++;

    // Fond qui défile (2 parties)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

    if (gamePlaying) {
        for (const pipe of pipes) {
            pipe[0] -= speed;

            // tuyau du haut puis du bas
            ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
            ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

            // Collision avec un tuyau : fin de partie
            if (pipe[0] <= cTenth + size[0] && pipe[0] + pipeWidth >= cTenth &&
                (pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1])) {
                gamePlaying = false;
                saveBest();
                setup();
                break;
            }
        }

        // Tuyau sorti de l'écran : +1 point et un nouveau tuyau
        if (gamePlaying && pipes[0][0] <= -pipeWidth) {
            currentScore++;
            bestScore = Math.max(bestScore, currentScore);
            pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];
        }
    }

    // L'alien
    const frame = Math.floor((index % 9) / 3) * size[1];
    if (gamePlaying) {
        ctx.drawImage(img, 432, frame, ...size, cTenth, flyHeight, ...size);
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
    } else {
        ctx.drawImage(img, 432, frame, ...size, canvas.width / 2 - size[0] / 2, flyHeight, ...size);
        flyHeight = canvas.height / 2 - size[1] / 2;

        // Écran d'accueil
        ctx.font = "bold 30px courier, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.fillText(`Record : ${bestScore}`, canvas.width / 2, 245);
        ctx.fillText("Clique pour jouer", canvas.width / 2, 535);
    }

    bestScoreEl.textContent = `Record : ${bestScore}`;
    currentScoreEl.textContent = `Score : ${currentScore}`;

    requestAnimationFrame(render);
};

// Voler : clic / toucher sur le jeu, ou touche Espace / flèche du haut
const fly = () => {
    gamePlaying = true;
    flight = jump;
};

canvas.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    fly();
});

window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        fly();
    }
});

setup();
img.onload = render;
