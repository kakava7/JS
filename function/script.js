function addValue(button){
    const textInput = document.getElementById('display');
    textInput.value = textInput.value + button.value;
    updateOperatorsState();
    updateCalcBtnState();
};

function updateOperatorsState(){
    const display = document.getElementById("display");
    const inputValue = display.value;
    const operatorButton = document.querySelectorAll('input[data-type="operators"]');

     if(inputValue === ""){
        operatorButton.forEach(button => {
            button.disabled = true;
        });
    }else{
        operatorButton.forEach(button => {
            button.disabled = false;
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateOperatorsState();
    updateCalcBtnState();
})

document.getElementById("clearBtn").addEventListener("click", () =>{
    const textInput = document.getElementById('display');
    textInput.value = "";
    updateOperatorsState();
});

function parseExpression(expression){
    const match = expression.match(/(\d+)([+\-*/])(\d+)/);
    const calcBtn = document.getElementById("calcBtn");


    if(match){
        return {
            firstNum: Number(match[1]),
            operator: match[2],
            secondNum: Number(match[3])
        };
    }
    return null;
};

function updateCalcBtnState(){
    const calcBtn = document.getElementById("calcBtn");
    const parsed = parseExpression(document.getElementById("display").value);
    if(!parsed){
        calcBtn.disabled = true;
    }else{
        calcBtn.disabled = false;
    }
}

function calculation(){
    const textInput = document.getElementById('display');
    const parsed = parseExpression(textInput.value);

    let result;
    
    let key = parsed.operator;

    switch (key) {
        case "+":
            result = parsed.firstNum + parsed.secondNum;
            break;
        case "-":
            result = parsed.firstNum - parsed.secondNum;
            break;
        case "*":
            result = parsed.firstNum * parsed.secondNum;
            break;
        case "/":
            if(parsed.secondNum === 0){
                alert("Деление на 0 невозомжно")
                textInput.value = "";
                updateOperatorsState();
                return;
            }else{
                result = parsed.firstNum / parsed.secondNum
            }
            break;
        default:
            break;
    }

    textInput.value = result;
};

document.getElementById("calcBtn").addEventListener("click", () => {
    calculation();
    updateCalcBtnState();
});
