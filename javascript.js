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

// 5. Convert infix formula array to postfix notation using the Shunting Yard algorithm
function postfix(formula){
    let postfixat = [];
    let operators = [];
    for(const item of formula){
        if(typeof item === 'number'){
            postfixat.push(item);
        } else {
            while (
                operators.length > 0 &&
                operatorPriority[item] <= operatorPriority[operators[operators.length - 1]]
            ) {
                postfixat.push(operators.pop());
            }
            operators.push(item);
        }
    }
    while(operators.length > 0){
        postfixat.push(operators.pop());
    }
    return postfixat;
}

// 6. Convert a string to a float rounded to two decimal places
function toTwoDecimalFloat(str) {
  return parseFloat(parseFloat(str).toFixed(2));
}

// 7. Parse the input string, convert to postfix, and compute the result
function computeFormula(input){
    
    // 7.1 Build the formula
    let formula = [];
    for(let i = 0; i < input.length; i++){
        let number = new String();
        if((i === 0 || operatorKeys.includes(input[i-1])) && input[i] === '-'){
            number += '-'
            i++;
        }
        while((isDigit(input[i]) || input[i] === '.') && i < input.length){
            number += input[i];
            i++;
        }
        formula.push(toTwoDecimalFloat(number));
    
        formula.push(input[i]);
    }
    formula.pop();

    if(input[0] === '-' && input[1] === '-'){
        formula.shift();
        formula.shift();
    }
    formula = postfix(formula);
    
    // 7.2 Compute the formula
    let result = [];
    for(const item of formula){
        if(typeof item === 'number'){
            result.push(item);
        }
        else{
            let b = result.pop();
            let a = result.pop();
            switch(item){
                case '+':{
                    result.push(a+b);
                    break;
                }
                case '-':{
                    result.push(a-b);
                    break;
                }
                case '*':{
                    result.push(a*b);
                    break;
                }
                case '/':{
                    if(b === 0){
                        alert("Can't divide by 0");
                    }
                    else{
                        result.push(a/b);
                    }
                    break;
                }
            }
        }
    }
    result = result.pop();
    return parseFloat(result.toFixed(2));
}

// 8. Add click event listeners to all Calculator buttons
calculatorButtons.forEach(element => {
    element.addEventListener('click', (event) => {
        const value = element.id[0];
        const text = resultDisplay.textContent;
        const lastChar = text[text.length - 1];
        const secondLast = text[text.length - 2];
        if(value >= '0' && value <= '9'){
            resultDisplay.textContent += value;
        }
        else if(value === '.'){
            if(text.length > 0)
                if(lastChar !== '.' && canFloat === false){
                    resultDisplay.textContent += value;
                    canFloat = true;
                }
        }
        else if(operatorKeys.includes(value) && value !== '=' && value !== 'AC'){
            if(text.length === 0 && value !== '-')
                return;
            if(value === '-'){
                if(!(lastChar === '-' && secondLast === '-')){
                    resultDisplay.textContent += value;
                }
            }
            else{
                if(!operatorKeys.includes(lastChar)){
                    resultDisplay.textContent += value;
                }
            }
        }
        else if(value === '='){
            if(operatorKeys.includes(text[text.length-1])){
                return;
            }
            else{
                equationDisplay.textContent = text;
                resultDisplay.textContent = computeFormula(text);
            }
        }
        if(operatorKeys.includes(value)){
            canFloat = false;
        }
        resultBar.scrollLeft = resultBar.scrollWidth;
        
        // 8.1 Update clear button label after any input
        updateClearButtonLabel();
    });
});

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