export default class Calculator {
    constructor() {
        this.inputValue = '0';
        this.prevValue = '';
        this.inputIsFloat = false;
        this.mathOperator = '';
        this.numPud = document.querySelector('#number-block');
        this.inputDisplayedValue = document.querySelector('#inputValue');
        this.mathOperatorDisplayedValue = document.querySelector('#math-operator');
    }

    handleCalculator() {
        this.numPud.addEventListener('click', this.detectButton.bind(this));
    }

    detectButton() {
        const value = event.target.value;
        if (/[0-9]/.test(value)) {
            this.addNumberToInput(value);
        } else if (/[*,\-,/,+]/.test(value)) {
            this.addMathOperations(value);
        } else if (value === '=') {
            this.getResultValue();
        } else if (value === 'C') {
            this.removeNumberFromInput();
        } else if (value === 'AC') {
            this.removeAllNumberFromInput();
        } else if (value === '.' && !this.inputIsFloat) {
            this.addNumberToInput(value);
            this.inputIsFloat = true;
        }
    }

    addNumberToInput(num) {
        if (this.inputValue === '0') {
            this.inputValue = num;
        } else {
            this.inputValue += `${num}`;
        }
        this.drawInputValue();
    }

    removeNumberFromInput() {
        this.inputValue = this.inputValue.toString().slice(0, this.inputValue.length - 1);
        this.drawInputValue();
    }

    removeAllNumberFromInput() {
        this.inputValue = '';
        this.drawInputValue();
    }

    doMathOperations() {
        this.inputValue = parseFloat(this.inputValue);
        this.prevValue = parseFloat(this.prevValue);
        switch (this.mathOperator) {
            case '/':
                this.prevValue /= +this.inputValue;
                break;
            case '*':
                this.prevValue *= +this.inputValue;
                break;
            case '-':
                this.prevValue -= +this.inputValue;
                break;
            case '+':
                this.prevValue = +this.prevValue + +this.inputValue;
                break;
            default:
                return;
        }
    }

    addMathOperations(mathOperator) {
        if (this.mathOperator) {
            this.doMathOperations();
        } else {
            this.prevValue = this.inputValue;
        }
        this.mathOperator = mathOperator;
        this.inputValue = '0';
        this.drawInputValue();
        this.drawMathOperator();
        this.removeFloatFlag();
    }

    getResultValue() {
        if (!this.prevValue) {
            return;
        }
        this.doMathOperations();
        this.inputValue = this.prevValue;
        this.prevValue = undefined;
        this.mathOperator = '';
        this.drawInputValue();
        this.drawMathOperator();
        this.removeFloatFlag();
    }

    drawInputValue() {
        if (this.inputValue === '') {
            this.inputValue = '0';
        }
        if (this.inputValue.length > 15) {
            return;
        }
        this.inputDisplayedValue.innerHTML = this.inputValue;
    }

    drawMathOperator() {
        this.mathOperatorDisplayedValue.innerHTML = this.mathOperator;
    }

    removeFloatFlag() {
        this.inputIsFloat = false;
    }
}