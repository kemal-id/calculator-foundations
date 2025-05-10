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

let leftOperandInput;
let operatorInput;
let rightOperandInput;

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
