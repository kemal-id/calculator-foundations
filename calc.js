const display = document.querySelector(".display");
const numberButtons = document.querySelector(".numbers");
const operatorButtons = document.querySelector(".operator");

let displayed = "";
display.innerText = 0;

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
  if(e.target.innerText === "="){
    let separated = separateDisplay(displayed);
    let leftOperandInput = Number(separated[1]);
    let rightOperandInput = Number(separated[2]);
    let operatorInput = separated[0];
    let result = operate(operatorInput, leftOperandInput, rightOperandInput);
    updateDisplay(result, e.target.innerText);
    console.log(result);
    return;
  }
  if(displayed.includes(e.target.innerText)){
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

function updateDisplay(word, equals = "") {
  console.log(word);
  if(equals === "="){
    displayed = word;
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

function separateDisplay (string) {
  let operator = string.search(/[-\/\+\*]/);
  let separated = string.split(/[-\/\+\*]/);
  separated.unshift(string.charAt(operator));
  console.log(separated);
  return separated;
}