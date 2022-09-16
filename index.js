// scoreboard
const homeEl = document.querySelector("#home-el");
const guestEl = document.querySelector("#guest-el");
   
let homeScore = 0;
let guestScore = 0;

function add(score, team){
    if(team == "home"){
    homeScore += score;
    homeEl.textContent = homeScore;
    }
    
    if(team == "guest"){
    guestScore += score;
    guestEl.textContent = guestScore;
    }
}

const newBtn = document.querySelector("#new-btn")
const saveBtn = document.querySelector("#save-btn")
const scoreEl = document.getElementById("score-el")

function newGame(){
    resetScore();
    scoreEl.textContent = "";
    resetTime();
}

function saveScore(){
    scoreEl.textContent += `[ ${homeScore} - ${guestScore} ] `
    resetScore();
}

function resetScore(){
    homeScore = 0;
    guestScore = 0;
    homeEl.textContent = homeScore;
    guestEl.textContent = guestScore; 
}


// timer
let targetSeconds = 600; //defult 10 mins
let startTime = new Date().getTime()

resetTime();
function resetTime(){
    startTime = new Date().getTime()
    setInterval( function () { timer(startTime); }, 1000)
}

const timer = function (startTime) {
  let currentTime = new Date().getTime();
  let diffSec = Math.round((currentTime - startTime) / 1000);  
  let remainingTime = targetSeconds - diffSec;
  
  update(remainingTime);   
  
  if (remainingTime == 0) {
    resetTime();
  } 
}

function update (seconds) {
  barRenderer(seconds);
  textRenderer(seconds);
}

// refresh the bar.
function barRenderer (seconds) {
  const progressBar = document.querySelector("#progress-bar");
  let percent = (seconds / targetSeconds) * 100;
  progressBar.style.width = percent + "%";
}

// refresh the text of timer.
function textRenderer (seconds) {
  const timerEl = document.querySelector("#timer-el")
  let sec = seconds % 60;  
  let min = Math.floor(seconds / 60); 

  min = min.toString().padStart(2, '0');
  sec = sec.toString().padStart(2, '0');
  
  timerEl.textContent = min + ":" + sec	
}


// timer setting
const toggleBtn = document.querySelector(".fa-gear")
const settingBoard = document.querySelector(".setting-board")

function toggleSetting(){
    toggleBtn.classList.toggle("active")
    settingBoard.classList.toggle("active");
}

function setTimer(){
    toggleBtn.classList.toggle("active");
    settingBoard.classList.toggle("active");
    
    const selectTime = document.querySelector("#select-time").value;
    targetSeconds = selectTime * 60;
    resetTime();
}