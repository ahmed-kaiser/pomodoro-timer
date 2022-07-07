class Timer{
    constructor(min){
        this.number = min
        this.time = this.number*60;
        this.minutes = this.number;
        this.second = 0;
        this.interval = null;
    }

    startTimer(){
        this.interval = setInterval(() =>{
            this.minutes = Math.floor(this.time / 60);
            this.second = this.time % 60;
            this.updateDisplay();
            this.time--;
            if (this.time === 0){
                this.resetTimer();
                this.playAudio();
            }
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.interval);
    }

    resetTimer(){
        clearInterval(this.interval);
        this.time = this.number*60;
        this.minutes = this.number;
        this.second = 0;
        this.interval = null;
        this.updateDisplay();
    }

    updateDisplay(){
        let min = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        let sec = this.second < 10 ? "0" + this.second : this.second;
        document.getElementById("timer").innerText = `${min}:${sec}`;
    }

    playAudio(){
        let audio = new Audio("funny.mp3");
        audio.play();
    }
}

let body = document.getElementById("bd");
let displayTime = document.getElementById("timer");

let pomodoro = document.getElementById("timer_one");
let short_break = document.getElementById("timer_two");
let long_break = document.getElementById("timer_three");

let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");

let timer = new Timer(25);

function check(){
    timer.resetTimer();
    if (startBtn.style.display === "none"){
        startBtn.style.display = "inline-block";
        stopBtn.style.display = "none";
    }
}

pomodoro.addEventListener('click', () => {
    check();
    timer = new Timer(25);
    body.style.backgroundImage = "linear-gradient(to bottom, rgb(128, 210, 218), rgb(190, 187, 90) 100%)";
    displayTime.innerText = "25:00";
    short_break.classList.remove("active");
    long_break.classList.remove("active");
    pomodoro.classList.add("active");
})

short_break.addEventListener('click', () => {
    check();
    timer = new Timer(5);
    body.style.backgroundImage = "linear-gradient(to bottom, rgb(128, 153, 218), rgb(90, 190, 187) 100%)";
    displayTime.innerText = "05:00";
    pomodoro.classList.remove("active");
    long_break.classList.remove("active");
    short_break.classList.add("active");
})

long_break.addEventListener('click', () => {
    check();
    timer = new Timer(15);
    body.style.backgroundImage = "linear-gradient(to bottom, rgba(110, 70, 231, 0.652), rgba(22, 162, 255, 0.625) 100%)";
    displayTime.innerText = "15:00";
    pomodoro.classList.remove("active");
    short_break.classList.remove("active");
    long_break.classList.add("active");
})

startBtn.addEventListener('click', (e) => {
    timer.startTimer();
    startBtn.style.display = "none";
    stopBtn.style.display = "inline-block";
})

stopBtn.addEventListener('click', (e) => {
    timer.stopTimer();
    stopBtn.style.display = "none";
    startBtn.style.display = "inline-block";
})

resetBtn.addEventListener('click', (e) => {
    timer.resetTimer();
    stopBtn.style.display = "none";
    startBtn.style.display = "inline-block";
})

document.getElementById("card").style.cursor = "pointer";
