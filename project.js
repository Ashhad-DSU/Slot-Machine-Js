/** 
 * Steps we will be following into it:
 * 1. Deposit money
 * 2. Determine the no. of lines to bet
 * 3. Collect the bet amount
 * 4. Spinning the slot machine
 * 5. Check if the user won
 * 6. Give the user their winnings
 * 7. Play Again 
 * */ 

const prompt = require ("prompt-sync")();

const ROWS = 3
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOLS_VALUES ={
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};



const deposit = ()=>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount); // This will change the standard input (which is in String format) into the Float format

        if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid Deposit amount! Try Again!")
        } else {
            return numberDepositAmount;
        }
    }
};
const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the no. of lines to bet on (1-3): ")
        const numberOfLines = parseFloat(lines); // This will change the standard input (which is in String format) into the Float format

        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines >3){
            console.log("Invalid Number of Lines! Try Again!")
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the total bet: ")
        const numberOfBet = parseFloat(bet); // This will change the standard input (which is in String format) into the Float format

        if(isNaN(numberOfBet) || numberOfBet <=0 || numberOfBet > balance/lines){
            console.log("Invalid Bet! Try Again!")
        } else {
            return numberOfBet;
        }
    }
};

const spin = ()=> {
    const symbols = []; //The '[]' shows that the array is of fixed size, and the elemnts are yet to be added into it
    for([symbol,count] of Object.entries(SYMBOLS_COUNT)){

    }
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
