
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const dot = document.querySelector("#coma")

const equalButton = document.querySelector("#igual");
const clearButton = document.querySelector("#escape");
const undoButton = document.querySelector("#undo");

const resultBoard = document.querySelector("#result")
const divNumbers = document.querySelector("#showNumbers");
const numberEquation = document.querySelector("#numbers");
const errorDiv = document.querySelector("#error");

numbers.forEach((number) => {
    number.onclick =  () => appendNumbers(number)
});
operators.forEach((operator) => { 
    operator.onclick = () => setOperator(operator)
});

dot.onclick = () => appendDot()
clearButton.onclick = () => clearAppendNumbers()
undoButton.onclick = () => undoAppendNumbers()

equalButton.onclick = () => evaluate()

let shouldResetScreen = false
let currentOperation = null
let firstNumbers = ''
let secondNumbers = ''
let numberId = 0
numberEquation.textContent = "0"

function appendNumbers(value) {
    if(numberEquation.textContent.length != 36){
        if(numberEquation.textContent === "0" || shouldResetScreen)
        resetScreen()
        numberEquation.textContent += value.textContent
    } 
}

function setOperator(value) {
   if (currentOperation !== null) evaluate()
   firstNumbers = numberEquation.textContent 
   shouldResetScreen = true
   currentOperation = value
   let para = document.createElement("p")
   para.id = 'para' + numberId++
   let div = document.createElement("div")
   para.textContent = `${firstNumbers} ${currentOperation.textContent}`
   makeDiv(div)
   div.appendChild(para)
   console.log(div.childNodes.length)
   if(resultBoard.childNodes.length == 8){
    resultBoard.removeChild(resultBoard.firstChild)
}

   
}
function evaluate() {
    if(currentOperation === null || shouldResetScreen) return
    if(currentOperation.textContent === "/" && numberEquation.textContent === '0'){
        errorDiv.style.display = "block"
            errorDiv.textContent = "You can't divide by zero!"
        setTimeout(function(){
        errorDiv.style.display = "none"     
        },2000)
        return

    }
    secondNumbers = numberEquation.textContent
    console.log(secondNumbers)
    numberEquation.textContent = roundResult(operate(currentOperation.textContent,firstNumbers,secondNumbers))
    let div = resultBoard.lastChild
    let para = div.lastChild
    para.textContent = `${firstNumbers} ${currentOperation.textContent} ${secondNumbers} =`
    let resultPara = document.createElement("p")
    resultPara.id = "resultPara"
    resultPara.textContent = numberEquation.textContent
    div.appendChild(resultPara)    
    currentOperation = null;
}
function appendDot() {
    if(numberEquation.textContent.includes('.'))return
    numberEquation.textContent += '.'
}
function makeDiv(div) {
    div.style.width = "100%"
    div.style.height = "13%"
    div.style.fontSize = "16px"
    div.style.display = "flex"
    div.style.justifyContent = "space-between"
    div.style.alignItems = "center"
    div.style.fontFamily = "'Courier New', Courier, monospace"
    div.style.borderTop = "0.5px solid #D0D1D3"
    resultBoard.appendChild(div)
}
function resetScreen() {
    numberEquation.textContent = ''
    shouldResetScreen = false
}
function clearAppendNumbers() {
    if(numberEquation.textContent == '0') return
    numberEquation.textContent = '0'
    resultBoard.removeChild(resultBoard.lastChild)
    firstNumbers = ''
    secondNumbers = ''
    currentOperation = null

}
function undoAppendNumbers() {
    if(numberEquation.textContent != '0'){
    numberEquation.textContent = numberEquation.textContent.slice(0,-1)
        if(numberEquation.textContent == ''){
        numberEquation.textContent = '0';
        }
    }
}


function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }
function add(a, b) {
    return a + b
  }
  
  function substract(a, b) {
    return a - b
  }
  
  function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  
  function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case '*':
        return multiply(a, b)
      case '/':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }
   
