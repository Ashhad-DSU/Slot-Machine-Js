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
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i=0; i<COLS;i++){
        reels.push([]);
        const reelSymbols =[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex= Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const transpose = (reels)=>{
    const rows =[];

    for (let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString += symbol;
            if (i!= row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings =(rows, bet, lines)=>{
    let winnings=0;
    for(let row =0; row<lines; row++){
        const symbols =rows[row];
        let allSame = true;

        for (constsymbol of symbols){
            if(symbol != symbols[0]){
                allSame=false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game=() =>{
    let balance = deposit();
    while (true){
        console.log("You have a balance of $"+ balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet*numberOfLines;
        const reels=spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings= getWinnings(rows,bet,numberOfLines);
        balance += winnings;
        console.log("You Won $ "+ winnings.toString());
        if (balance<=0){
            console.log("Not enough cash!");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)? ");
        if (playAgain != "y"){
            break;
        }
    }  
};

game();

