// State variables to store numbers
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentScreen = document.getElementById('curr-operand');
const previousScreen = document.getElementById('prev-operand');

// 1. Number add karne ka function
function appendNumber(number) {
    // Agar pehle se dot hai toh wapas dot nahi lagana
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Agar 0 hai toh replace karo, nahi toh append karo
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

// 2. Operator select karne ka function (+, -, *, /)
function chooseOperation(op) {
    if (currentOperand === '') return;
    
    // Agar pehle se kuch type kiya hai toh calculate karlo
    if (previousOperand !== '') {
        compute();
    }
    
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// 3. Calculation Logic (Main part)
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    // Agar number nahi hai toh return karo
    if (isNaN(prev) || isNaN(current)) return;

    // Switch case - Teacher ko dikhana ki tumne logic manually likha hai
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
             // Simple logic to prevent divide by zero error display
            if(current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// 4. Screen Clear
function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// 5. Delete last digit
function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') {
        currentOperand = '0';
    }
    updateDisplay();
}

// 6. UI Update
function updateDisplay() {
    currentScreen.innerText = currentOperand;
    
    // Show operator in small text above
    if (operation != null) {
        previousScreen.innerText = `${previousOperand} ${operation}`;
    } else {
        previousScreen.innerText = '';
    }
}
