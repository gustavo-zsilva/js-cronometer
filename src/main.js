// Variáveis
const time = document.querySelector('.time p')
const allSelects = document.querySelectorAll('.select-time select')
const startTimerBtn = document.querySelector('.start-timer')
const hoursInput = document.querySelector('.hours-input')

// Methods
startTimerBtn.addEventListener('click', startTimer)

// Function for populating selects with options
function populateSelects() {
    allSelects.forEach(select => {
        for (let i = 0; i <= 59; i++) {
            select.innerHTML += `<option value="${i}">${i}</option>`;
        }
    })
   
}

// Function timer start
function startTimer() {
    if (!checkInputs()) {
        alert('Digite um número válido!')
        return;
    }

    let values = getAllTimeValues();

    let seconds = time.querySelector('.seconds');
    let minutes = time.querySelector('.minutes');
    let hours = time.querySelector('.hours');

    seconds.innerHTML = values[2];
    minutes.innerHTML = values[1];
    hours.innerHTML = values[0];

    let intervalID = setInterval(() => {
        let counter = seconds.innerHTML;
        counter--;
        seconds.innerHTML = counter;

        if (seconds.innerHTML == 0) {
            if (minutes.innerHTML == 0) {
                if (hours.innerHTML == 0 && minutes.innerHTML == 0 && seconds.innerHTML == 0 ) {
                    alert('Timer Expirou!')
                    clearInterval(intervalID)
                    return;
                }

                hours.innerHTML--;
                minutes.innerHTML = 60;
            }
            minutes.innerHTML--;
            seconds.innerHTML = 60;
        } 
    }, 1000)
    
}

// Handle the input checking, returns true if input value is filled and false otherwise
function checkInputs() {
    if (hoursInput.value.length > 0) { return true; }
    return false;
}

// Gets and returns an array with all the selected values of the inputs (considering selects)
function getAllTimeValues() {
    let selectValues = [];

    selectValues.push(hoursInput.value);
    allSelects.forEach(select => selectValues.push(select.value));

    return selectValues;
}

populateSelects()