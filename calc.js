const display = document.querySelector(".display");
const numberButtons = document.querySelector(".numbers");
const operatorButtons = document.querySelector(".operator");

let leftOperandInput;
let operatorInput;
let rightOperandInput;
let displayed = "";

numberButtons.addEventListener("click", numbersButtonHandler);
operatorButtons.addEventListener("click", operatorButtonHandler);

function numbersButtonHandler(e) {
  console.log(e);
  if (e.target.nodeName == "UL") {
    return;
  }
  if (e.target.innerText === "C") {
    displayed = "";
  }
  updateDisplay(e.target.innerText);
}

function operatorButtonHandler(e) {
  console.log(e);
  updateDisplay(e.target.innerText);
}

function operate(leftOperand, rightOperand, operator) {
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

function updateDisplay(word) {
  if (word === "C") {
    displayed = "";
  } else {
    displayed += word;
  }
  display.textContent = displayed;
}
