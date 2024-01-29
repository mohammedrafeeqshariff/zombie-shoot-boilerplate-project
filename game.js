// Iteration 1: Declare variables required for this game

let gameBody = document.querySelector("#game-body");
var timer = document.querySelector("#timer").textContent;
var lives = document.querySelector("#lives");

// Iteration 1.2: Add shotgun sound

let gunAudio = new Audio(
  "https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav"
);

gameBody.addEventListener("click", () => {
  gunAudio.pause();
  gunAudio.currentTime = 0;
  gunAudio.play();
});

// Iteration 1.3: Add background sound
let backgroundAudio = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3"
);

backgroundAudio.loop = true;
backgroundAudio.play();

// Iteration 1.4: Add lives

var totalLives = 3;
console.log(totalLives);

// Iteration 2: Write a function to make a zombie

var img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-3.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];

var count = 0;
var zombie = document.getElementById(`zombie${count}`);

function createZombie() {
  var randomImages = img[randomise(0, 6)];
  console.log("ri", randomImages)

  var zombieImage = document.createElement("img");

  zombieImage.src = `./assets/${randomImages}`;
  zombieImage.id = `zombie${count}`;
  zombieImage.className = "zombie-image";
  zombieImage.alt = "zombie-image";

  zombieImage.style.transform = `translateX(${randomise(0, 90)}vw)`;
  zombieImage.style.animationDuration = `${randomise(3, 7)}s`;

  gameBody.append(zombieImage);

  zombieImage.addEventListener("click", () => {
    destroyzombie(zombieImage);
  });
}
// Iteration 3: Write a function to check if the player missed a zombie

function zombieMissed(zombie) {
  var zombieRect = zombie.getBoundingClientRect();

  if (zombieRect.top <= 0) {
    totalLives--;
    console.log(totalLives);
    return true;
  }
  if (totalLives <= 0) {
    clearInterval(timerId);
    window.location.href = "game-over.html";
  }
  return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function destroyzombie(zombie) {
  zombie.style.display = "none";
  count++;
  createZombie();
}

// Iteration 5: Creating timer
var timerId = setInterval(() => {
  timer--;
  document.querySelector("#timer").textContent = timer;

  let zombie = document.getElementById(`zombie${count}`);

  if (zombieMissed(zombie)) {
    destroyzombie(zombie);
  }

  if (totalLives == 0) {
    clearInterval(timerId);
    window.location.href = "game-over.html";
  }

  if (timer <= 0) {
    clearInterval(timerId);
    window.location.href = "win.html";
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie();

// Iteration 7: Write the helper function to get random integer

function randomise(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue)) + minValue;
}
