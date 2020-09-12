// Variáveis
const time = document.querySelector('.time p');
const allSelects = document.querySelectorAll('.select-time select');
const startTimerBtn = document.querySelector('.start-timer');
const hoursInput = document.querySelector('.hours-input');

const resumeTimerBtn = document.querySelector('.resume-timer')
const pauseTimerBtn = document.querySelector('.pause-timer')

let alarmAudio = new Audio('/sounds/alarm-clock.mp3');

let timestampArray = JSON.parse(localStorage.getItem('timestamp')) || ['0', '0', '0'];
let intervalID;

// Methods
startTimerBtn.addEventListener('click', startTimer);
resumeTimerBtn.addEventListener('click', resumeTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);

// Function for populating selects with options
function populateSelects() {
    allSelects.forEach(select => {
        for (let i = 0; i <= 59; i++) {
            select.innerHTML += `<option value="${i}">${i}</option>`;
        }
    })
}

function renderTimerByLocalStorage() {
    const allSpan = document.querySelectorAll('.time p span');

    allSpan.forEach((timeSpan, index) => {
        timeSpan.innerHTML = timestampArray[index];
    })

    let selectSegundos = document.querySelector('select.segundos');
    let selectMinutos = document.querySelector('select.minutos');

    selectSegundos.value = timestampArray[2];
    selectMinutos.value = timestampArray[1];

    hoursInput.value = timestampArray[0];
}


function pauseTimer() {
    clearInterval(intervalID);
}

function resumeTimer() {
    renderTimerByLocalStorage();
    startTimer();
}

// Function timer start
function startTimer() {
    if (!checkInputs()) {
        alert('Digite um número válido!');
        return;
    }

    clearInterval(intervalID);

    let values = getAllTimeValues();

    let seconds = time.querySelector('.seconds');
    let minutes = time.querySelector('.minutes');
    let hours = time.querySelector('.hours');

    seconds.innerHTML = values[2];
    minutes.innerHTML = values[1];
    hours.innerHTML = values[0];

    intervalID = setInterval(() => {
        let counter = seconds.innerHTML;
        counter--;
        seconds.innerHTML = counter;

        if (seconds.innerHTML <= 0) {
            if (minutes.innerHTML <= 0) {
                if (hours.innerHTML <= 0 && minutes.innerHTML <= 0 && seconds.innerHTML <= 0 ) {
                    alert('Timer Expirou!');
                    alarmAudio.play();
                    clearInterval(intervalID);
                    return;
                }
                hours.innerHTML--;
                minutes.innerHTML = 60;
            }
            minutes.innerHTML--;
            seconds.innerHTML = 60;
        }

        timestampArray = [hours.innerHTML, minutes.innerHTML, seconds.innerHTML];
        saveToStorage();
    }, 1000)
    
}

// Handle the input checking, returns true if input value is filled and false otherwise
function checkInputs() {
    if (hoursInput.value >= 0) { return true; }
    return false;
}

// Gets and returns an array with all the selected values of the inputs (considering selects)
function getAllTimeValues() {
    let selectValues = [];

    selectValues.push(hoursInput.value);
    allSelects.forEach(select => selectValues.push(select.value));

    return selectValues;
}

function saveToStorage() {
    localStorage.setItem('timestamp', JSON.stringify(timestampArray));
}

populateSelects();
renderTimerByLocalStorage();