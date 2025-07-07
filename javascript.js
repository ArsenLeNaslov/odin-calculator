// 1. Select DOM elements for calculator display and buttons
const numberButtonSection = document.querySelector('.numeri');
const operatorButtonSection = document.querySelector('.op');
const resultDisplay = document.querySelector('.aequales');
const equationDisplay = document.querySelector('.aequatio');
let calculatorButtons;

const resultBar = document.querySelector('.result');
const operatorKeys = ['AC','+', '-', '*', '/', '='];
const operatorPriority = {
    '+':1,
    '-':1,
    '*':2,
    '/':2,
}

let canFloat = false;

// 2. Dynamically create number and operation buttons and add them to the DOM
function initializeButtons(){
    
    // 2.1 Create number buttons (0-9 and decimal point)
    for(let i = 9; i >= -1; i--){
        let button = document.createElement('button');
        button.id = `${i}-key`;
        button.textContent = i;
        numberButtonSection.appendChild(button);
        if(i === -1){
            button.id = `.-key`;
            button.textContent = '.';
        }
    }

    // 2.2 Create operation buttons (+, -, *, /, =, AC - C)
    for(let i = 0; i < 6; i++){
        let button = document.createElement('button');
        button.id = `${operatorKeys[i]}-key`;
        button.textContent = operatorKeys[i];
        operatorButtonSection.appendChild(button);
    }

    calculatorButtons = document.querySelectorAll('button');
}
initializeButtons();


// 3. Clear both the equation and result displays
function clearScreen(){
    equationDisplay.textContent = '';
    resultDisplay.textContent = '';
}

// 4. Check if a character is a digit (0-9)
function isDigit(a){
    return a >= '0' && a <= '9';
}

// 11. Background music: play on first user interaction and allow toggling mute/unmute

// 11.1 Start music on 1st user's interaction
function startMusic1Interaction() {
    music.play().catch(() => {}); // Ignore errors if already playing
    window.removeEventListener('click', startMusic1Interaction);
}
window.addEventListener('click', startMusic1Interaction);

// 11.2 Music Control Setup
const music = document.getElementById("bg-music");
const toggleMusicBtn = document.getElementById("toggle-music");

if (toggleMusicBtn && music) {
    toggleMusicBtn.textContent = music.muted ? "🔇" : "🌌";

    toggleMusicBtn.addEventListener("click", () => {
        music.muted = !music.muted;
        toggleMusicBtn.textContent = music.muted ? "🔇" : "🌌";
    });
}