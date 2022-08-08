const calculator = document.querySelector(".calc");
const obj = {
    firstOperand: null,
    waitingForSecondOperand: false,
    secondOperand: null,
    operator: null
}

const display = () => {
    const display = document.querySelector(".result");
    if (obj.firstOperand === null) {
        display.innerText = "";
        return;
    }
    else if (obj.firstOperand.length >= 26) {
        display.innerText = parseFloat(obj.firstOperand);
        return;
    }
    display.innerText = obj.firstOperand;
}

const numPress = (target) => {
    display();
    const num = target.innerText;
    if (obj.firstOperand === null) {
        if (num === "0") {
            return;
        }
        obj.firstOperand = num;
        display();
        return;
    }
    else if (obj.firstOperand === "-" && num === "0") {
        return;
    }
    obj.firstOperand += num;
    display();
}

const numPressKey = (code) => {
    display();
    const num = code[code.length-1];
    console.log(num);
    if (obj.firstOperand === null) {
        if (num === "0") {
            return;
        }
        obj.firstOperand = num;
        display();
        return;
    }
    else if (obj.firstOperand === "-" && num === "0") {
        return;
    }
    obj.firstOperand += num;
    display();
}

const decimal = () => {
    if (obj.firstOperand === null) {
        obj.firstOperand = "0.";
        display();
        return;
    }
    obj.firstOperand += ".";
    display();
}

const head = (target) => {
    const operator = target.innerText;
    if (operator === "-" && obj.firstOperand === null) {
        obj.firstOperand = "-";
        display();
        return;
    }
    else if (obj.firstOperand === null || obj.firstOperand === "-") {
        return;
    }
    else if (obj.waitingForSecondOperand === false) {
        obj.operator = operator;
        obj.secondOperand = parseFloat(obj.firstOperand);
        obj.firstOperand = null;
        obj.waitingForSecondOperand = true;
        display();
        return;
    }
    switch (obj.operator) {
        case "+":
            obj.secondOperand = obj.secondOperand + parseFloat(obj.firstOperand);
            break;
        case "-":
            obj.secondOperand = obj.secondOperand - parseFloat(obj.firstOperand);
            break;
        case "x":
            obj.secondOperand = obj.secondOperand * parseFloat(obj.firstOperand);
            break;
        case "/":
            obj.secondOperand = obj.secondOperand / parseFloat(obj.firstOperand);
            break;
    }
    obj.firstOperand = null;
    obj.operator = operator;
    display();
}

const headKey = (key) => {
    const operator = key;
    if (operator === "-" && obj.firstOperand === null) {
        obj.firstOperand = "-";
        display();
        return;
    }
    else if (obj.firstOperand === null || obj.firstOperand === "-") {
        return;
    }
    else if (obj.waitingForSecondOperand === false) {
        obj.operator = operator;
        obj.secondOperand = parseFloat(obj.firstOperand);
        obj.firstOperand = null;
        obj.waitingForSecondOperand = true;
        display();
        return;
    }
    switch (obj.operator) {
        case "+":
            obj.secondOperand = obj.secondOperand + parseFloat(obj.firstOperand);
            break;
        case "-":
            obj.secondOperand = obj.secondOperand - parseFloat(obj.firstOperand);
            break;
        case "x":
            obj.secondOperand = obj.secondOperand * parseFloat(obj.firstOperand);
            break;
        case "/":
            obj.secondOperand = obj.secondOperand / parseFloat(obj.firstOperand);
            break;
    }
    obj.firstOperand = null;
    obj.operator = operator;
    display();
}

const equals = () => {
    if (obj.firstOperand === null || obj.waitingForSecondOperand === false) {
        return;
    }
    switch (obj.operator) {
        case "+":
            obj.secondOperand = obj.secondOperand + parseFloat(obj.firstOperand);
            break;
        case "-":
            obj.secondOperand = obj.secondOperand - parseFloat(obj.firstOperand);
            break;
        case "x":
            obj.secondOperand = obj.secondOperand * parseFloat(obj.firstOperand);
            break;
        case "/":
            obj.secondOperand = obj.secondOperand / parseFloat(obj.firstOperand);
            break;
    }
    const display = document.querySelector(".result");
    if (isNaN(obj.secondOperand) || obj.secondOperand === Infinity) {
        display.innerText = "Error!!";
    }
    else {
        display.innerText = obj.secondOperand;
    }
    obj.firstOperand = null;
    obj.waitingForSecondOperand = false;
    obj.secondOperand = null;
    obj.operator = null;
}

const clear = () => {
    obj.firstOperand = null;
    obj.waitingForSecondOperand = false;
    obj.secondOperand = null;
    obj.operator = null;
    display();
}

calculator.addEventListener("click", (event) => {
    const target = event.target;
    if (target.className === "num") {
        numPress(target);
    }
    else if (target.className === "decimal") {
        decimal();
    }
    else if (target.className === "head") {
        head(target);
    }
    else if (target.className === "equals") {
        equals();
    }
    else {
        clear();
    }
})

document.addEventListener("keydown", (event) => {
    const code = event.code;
    console.log(code);
    if (isNaN(parseInt(code[code.length-1])) !== true) {
        numPressKey(code);
    }
    else if (code === "NumpadAdd") {
        headKey("+");
    }
    else if (code === "NumpadSubtract") {
        headKey("-");
    }
    else if (code === "NumpadMultiply") {
        headKey("x");
    }
    else if (code === "NumpadDivide") {
        headKey("/");
    }
    else if (code === "NumpadDecimal") {
        decimal();
    }
    else if (code === "NumpadEnter" || code === "Enter") {
        equals();
    }
    else if (code === "Delete" || code === "Backspace") {
        clear();
    }
})