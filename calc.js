const display = document.querySelector(".display");
const numberButtons = document.querySelector("#number-buttons");
const operatorButtons = document.querySelector(".operator");
const clearanceButtons = document.querySelector(".clearance");
const buttons = {
  one: document.querySelector("#one"),
  two: document.querySelector("#two"),
  three: document.querySelector("#three"),
  four: document.querySelector("#four"),
  five: document.querySelector("#five"),
  six: document.querySelector("#six"),
  seven: document.querySelector("#seven"),
  eight: document.querySelector("#eight"),
  nine: document.querySelector("#nine"),
  zero: document.querySelector("#zero"),
  comma: document.querySelector("#comma"),
  clear: document.querySelector("#clear"),
  delete: document.querySelector("#delete"),
  plus: document.querySelector("#plus"),
  minus: document.querySelector("#subtract"), //somehow using key subtract returns null
  multiply: document.querySelector("#multiply"),
  divide: document.querySelector("#divide"),
  equal: document.querySelector("#equal"),
};

let displayed = "";
let regex = /[\/\+\*-]/; //regex targeting operators
display.innerText = 0;

numberButtons.addEventListener("click", numbersButtonHandler);
window.addEventListener("keydown", keyboardButtonHandler);
operatorButtons.addEventListener("click", operatorButtonHandler);
clearanceButtons.addEventListener("click", clearanceButtonHandler);

function keyboardButtonHandler(e) {
  const clickEvent = new Event("click", { bubbles: true });

  switch (e.key) {
    case "1":
      buttons.one.dispatchEvent(clickEvent);
      buttons.one.focus();
      break;
    case "2":
      buttons.two.dispatchEvent(clickEvent);
      buttons.two.focus();
      break;
    case "3":
      buttons.three.dispatchEvent(clickEvent);
      buttons.three.focus();
      break;
    case "4":
      buttons.four.dispatchEvent(clickEvent);
      buttons.four.focus();
      break;
    case "5":
      buttons.five.dispatchEvent(clickEvent);
      buttons.five.focus();
      break;
    case "6":
      buttons.six.dispatchEvent(clickEvent);
      buttons.six.focus();
      break;
    case "7":
      buttons.seven.dispatchEvent(clickEvent);
      buttons.seven.focus();
      break;
    case "8":
      buttons.eight.dispatchEvent(clickEvent);
      buttons.eight.focus();
      break;
    case "9":
      buttons.nine.dispatchEvent(clickEvent);
      buttons.nine.focus();
      break;
    case "0":
      buttons.zero.dispatchEvent(clickEvent);
      buttons.zero.focus();
      break;
    case ".":
      buttons.comma.dispatchEvent(clickEvent);
      buttons.comma.focus();
      break;
    case "c":
      buttons.clear.dispatchEvent(clickEvent);
      buttons.clear.focus();
      break;
    case "Backspace":
      buttons.delete.dispatchEvent(clickEvent);
      buttons.delete.focus();
      break;
    case "+":
      buttons.plus.dispatchEvent(clickEvent);
      buttons.plus.focus();
      break;
    case "-":
      buttons.minus.dispatchEvent(clickEvent);
      buttons.minus.focus();
      break;
    case "*":
      buttons.multiply.dispatchEvent(clickEvent);
      buttons.multiply.focus();
      break;
    case "/":
      buttons.divide.dispatchEvent(clickEvent);
      buttons.divide.focus();
      break;
    case "=":
      buttons.equal.dispatchEvent(clickEvent);
      buttons.equal.focus();
      break;
    default:
      return;
  }
}

function clearanceButtonHandler(e) {
  console.log(e);
  if (e.target.nodeName == "UL") {
    return;
  }

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
    display.textContent = "0";
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
