const display = document.querySelector(".display");
const numberButtons = document.querySelector("#number-buttons");
const operatorButtons = document.querySelector(".operator");
const clearanceButtons = document.querySelector(".clearance");

let displayed = "";
let regex = /[\/\+\*-]/; //regex targeting operators
display.innerText = 0;

numberButtons.addEventListener("click", numbersButtonHandler);
window.addEventListener("keydown", keyboardButtonHandler);
operatorButtons.addEventListener("click", operatorButtonHandler);
clearanceButtons.addEventListener("click", clearanceButtonHandler);

function keyboardButtonHandler(e) {
  const clickEvent = new Event("click", { bubbles: true });
  console.log(`key=${e.key},code=${e.code}`);
  console.log(e);
  switch (e.key) {
    case "1":
      document.querySelector("#one").dispatchEvent(clickEvent);
      break;
    case "2":
      document.querySelector("#two").dispatchEvent(clickEvent);
      break;
    case "3":
      document.querySelector("#three").dispatchEvent(clickEvent);
      break;
    case "4":
      document.querySelector("#four").dispatchEvent(clickEvent);
      break;
    case "5":
      document.querySelector("#five").dispatchEvent(clickEvent);
      break;
    case "6":
      document.querySelector("#six").dispatchEvent(clickEvent);
      break;
    case "7":
      document.querySelector("#seven").dispatchEvent(clickEvent);
      break;
    case "8":
      document.querySelector("#eight").dispatchEvent(clickEvent);
      break;
    case "9":
      document.querySelector("#nine").dispatchEvent(clickEvent);
      break;
    case "0":
      document.querySelector("#zero").dispatchEvent(clickEvent);
      break;
    case ".":
      document.querySelector("#comma").dispatchEvent(clickEvent);
      break;
    case "c":
      document.querySelector("#clear").dispatchEvent(clickEvent);
      break;
    case "Backspace":
      document.querySelector("#delete").dispatchEvent(clickEvent);
      break;
    case "+":
      document.querySelector("#plus").dispatchEvent(clickEvent);
      break;
    case "-":
      document.querySelector("#subtract").dispatchEvent(clickEvent);
      break;
    case "*":
      document.querySelector("#multiply").dispatchEvent(clickEvent);
      break;
    case "/":
      document.querySelector("#divide").dispatchEvent(clickEvent);
      break;
    case "=":
      document.querySelector("#equal").dispatchEvent(clickEvent);
      break;
    default:
      return;
  }
}

function clearanceButtonHandler(e) {
  if (e.target.nodeName == "UL") {
    return;
  }

  if (e.target.innerText === "C") {
    displayed = "";
  }

  if (e.target.innerText === "del");
  updateDisplay(e.target.innerText);
}

function numbersButtonHandler(e) {
  console.log(e);
  if (e.target.nodeName == "UL") {
    return;
  }

  if (e.target.innerText === "0" && Number(displayed) === 0) {
    return;
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

  if (displayed === "") {
    display.innerText = 0;
  }

  let separated = separateDisplay();
  console.log(separated);

  if (separated[0] === regex) {
    console.log(separated[0]);
    return;
  }

  if (e.target.innerText === "=") {
    if (Number.isNaN(separated[2])) {
      return;
    }
    if (separated[2]) {
      let result = operate(separated[0], separated[1], separated[2]);
      updateDisplay(result, "=");
      displayed = "";
    }
    return;
  }

  if (!separated[0] && !separated[1]) {
    return;
  }

  if (displayed.search(regex) !== -1) {
    // to apply multiple operators before equals
    console.log(displayed === "");
    console.log(displayed === "0");
    if (displayed === "" || displayed === "0") {
      return;
    }
    console.log(e.target.innerText);
    if (separated[2]) {
      let result = operate(separated[0], separated[1], separated[2]);
      updateDisplay(result, "=");
      updateDisplay(e.target.innerText);
    }
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
      word = Math.round(word * 100000) / 100000; //limiting decimal places to 5
      console.log(word);
    }
    displayed = Number(word);
    display.textContent = displayed;
    return;
  }
  if (word === "C") {
    displayed = "";
    return;
  } else if (word === "del") {
    console.log(displayed);
    if (displayed.length === 1 || displayed === "") {
      display.innerText = "0";
      displayed = "";
      return;
    }
    displayed = displayed.slice(0, displayed.length - 1);
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
