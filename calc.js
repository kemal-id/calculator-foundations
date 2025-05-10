const display = document.querySelector(".display");
const numberButtons = document.querySelector(".numbers");
const operatorButtons = document.querySelector(".operator");

let displayed = "";
let regex = /[\/\+\*-]/; //regex targeting operators
display.innerText = 0;

numberButtons.addEventListener("click", numbersButtonHandler);
operatorButtons.addEventListener("click", operatorButtonHandler);

function numbersButtonHandler(e) {
  console.log(e);
  if (e.target.nodeName == "UL") {
    return;
  }
  if (e.target.innerText === "0" && Number(displayed) === 0) {
    return;
  }
  if (e.target.innerText === "C") {
    displayed = "";
  }

  if (e.target.innerText === ".") {
    let separated = separateDisplay();
    let isDecimal = decimalHandler(separated);
    console.log(isDecimal);
    if (isDecimal) {
      return;
    }
  }
  updateDisplay(e.target.innerText);
}

function operatorButtonHandler(e) {
  console.log(e);
  if (e.target.nodeName == "UL" || displayed === "0") {
    return;
  }
  if (e.target.innerText === "=") {
    let separated = separateDisplay();
    if (Number.isNaN(separated[2])) {
      return;
    }
    let result = operate(separated[0], separated[1], separated[2]);
    updateDisplay(result, "=");
    displayed = "";
    return;
  }
  if (displayed.toString().search(regex) !== -1) {
    // to apply multiple operators before equals
    console.log(e.target.innerText);
    let separated = separateDisplay();
    let result = operate(separated[0], separated[1], separated[2]);
    updateDisplay(result, "=");
    updateDisplay(e.target.innerText);
    return;
  }
  updateDisplay(e.target.innerText);
}

function operate(operator, leftOperand, rightOperand) {
  let result;
  switch (operator) {
    case "+":
      result = add(leftOperand, rightOperand);
      break;
    case "-":
      result = subtract(leftOperand, rightOperand);
      break;
    case "*":
      result = multiply(leftOperand, rightOperand);
      break;
    case "/":
      result = divide(leftOperand, rightOperand);
      break;
    default:
      break;
  }
  return result;
}

function updateDisplay(word, equals = "") {
  console.log(word);
  if (equals === "=") {
    if (!Number.isSafeInteger(word)) {
      Math.round(word * 100000) / 100000; //limiting decimal places to 5
      console.log(word);
    }
    displayed = Number(word);
    display.textContent = displayed;
    return;
  }
  if (word === "C") {
    displayed = "";
  } else {
    displayed += word;
  }
  display.textContent = displayed;
}

function separateDisplay() {
  let string = displayed;
  let operator = string.search(regex);
  let separated = string.split(regex);
  separated.unshift(string.charAt(operator));
  console.log(separated);
  separated[1] = Number(separated[1]);
  separated[2] = Number(separated[2]);
  return separated;
}

function decimalHandler(array) {
  let isFirstDecimal = Number.isSafeInteger(array[1]);
  let isSecondDecimal;
  let isOperatorInputted = array[0] !== "";
  if (array[2]) {
    isSecondDecimal = !Number.isSafeInteger(array[2]);
    if (isSecondDecimal) {
      return true;
    } else {
      return false;
    }
  }

  if (isFirstDecimal && !isOperatorInputted) {
    return false;
  } else {
    return true;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

//still couldn't work with negatives.
