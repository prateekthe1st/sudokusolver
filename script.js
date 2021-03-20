let initBoard = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]
let operations = 0;


const clearInit = () => {
    for (row =0; row<9; row++){
        for (col =0; col<9; col++){
            initBoard[row][col] = 0;
        }
    }
} 

const generateBoard = () => {
    const mainContainer = document.querySelector('.main-container');
    for (row = 0; row < 9; row++){
        let rowHolder = document.createElement('div');
        rowHolder.className = "row-holder";
        rowHolder.id = `row-holder-${row}`;
        mainContainer.append(rowHolder);
        for (column = 0; column<9; column++){
            let square = document.createElement('div');
            square.id = `square-${row}-${column}`;
            square.className = `squares square-row-${row} square-column-${column}`;
            rowHolder.append(square);

            let inputSquare = document.createElement('input');
            inputSquare.maxLength = 1;
            inputSquare.id = `input-${row}-${column}`;
            inputSquare.className = `inputSquare input-row-${row} input-column-${column}`
            square.append(inputSquare);


            inputSquare.onkeypress = () => {
                inputSquare.value = '';
            }
        }
    }
}

const reinforceBorders = () => {
    document.querySelectorAll('.square-row-0').forEach(val => {
        val.style.borderTop = "6px solid black";
    })

    document.querySelectorAll('.square-row-8').forEach(val => {
        val.style.borderBottom = "6px solid black";
    })

    document.querySelectorAll('.square-column-0').forEach(val => {
        val.style.borderLeft = "6px solid black";
    })

    document.querySelectorAll('.square-column-8').forEach(val => {
        val.style.borderRight = "6px solid black";
    })

    document.querySelectorAll('.square-row-2').forEach(val => {
        val.style.borderBottom = "2px solid rgb(60,60,60)";
    })
    document.querySelectorAll('.square-row-3').forEach(val => {
        val.style.borderTop = "2px solid rgb(60,60,60)";
    })

    document.querySelectorAll('.square-row-5').forEach(val => {
        val.style.borderBottom = "2px solid rgb(60,60,60)";
    })
    document.querySelectorAll('.square-row-6').forEach(val => {
        val.style.borderTop = "2px solid rgb(60,60,60)";
    })
    
    document.querySelectorAll('.square-column-2').forEach(val => {
        val.style.borderRight = "2px solid rgb(60,60,60)";
    })
    document.querySelectorAll('.square-column-3').forEach(val => {
        val.style.borderLeft = "2px solid rgb(60,60,60)";
    })

    document.querySelectorAll('.square-column-5').forEach(val => {
        val.style.borderRight = "2px solid rgb(60,60,60)";
    })
    document.querySelectorAll('.square-column-6').forEach(val => {
        val.style.borderLeft = "2px solid rgb(60,60,60)";
    })

}

const buttonDetection = () => {
    document.querySelectorAll('button').forEach(opt => {
        opt.onclick = () => {
            let checkVal = opt.dataset.type
            if (checkVal == "solve"){
                solveBoard();
            } else if (checkVal == 'clear'){
                clearBoard();
            }else{
                randomizeBoard();
            }
        }
    })
}

const randomizeBoard = () => {
    let board1 = [
        [0,0,0,0,8,4,0,1,0],
        [0,8,0,0,5,0,9,0,0],
        [1,4,0,0,0,0,2,8,5],
        [4,0,0,0,0,3,0,6,0],
        [0,0,6,1,0,0,0,0,9],
        [3,0,9,8,0,0,0,0,4],
        [0,0,0,0,0,0,4,0,1],
        [0,0,3,4,0,0,7,0,0],
        [0,1,0,0,6,2,3,5,0]
    ]

    let board = [
        [4,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,9,0,0,0],
        [0,0,0,0,0,0,7,8,5],
        [0,0,7,0,4,8,0,5,0],
        [0,0,1,3,0,0,0,0,0],
        [0,0,6,0,7,0,0,0,0],
        [8,6,0,0,0,0,9,0,3],
        [7,0,0,0,0,5,0,6,2],
        [0,0,3,7,0,0,0,0,0]
    ]

    for (row = 0; row < 9; row++){
        for (col = 0; col < 9; col++){
            document.querySelector(`#input-${row}-${col}`).value = ''
            if (board[row][col] != 0){
                document.querySelector(`#input-${row}-${col}`).value = board[row][col];
            }
            
        }
    }
}

const clearBoard = () => {
    document.querySelectorAll('.inputSquare').forEach (val => {
        val.value = '';
        val.style.backgroundColor = "white";
    })
    document.querySelectorAll('.squares').forEach(val => {
        val.style.backgroundColor = "white";
    })
}

const solveBoard = () => {
    operations = 0;
    clearInit();
    for (row = 0; row <9; row++){
        for (col = 0; col<9; col++){
            let gridVal = document.querySelector(`#input-${row}-${col}`);
            if (gridVal.value != ''){
                initBoard[row][col] = parseInt(gridVal.value);
            }
        }
    }

    solver(initBoard);
    if (operations > 5000000){
        operations = 0;
        alert ("Invalid Board");
    }else{
        for (row =0; row<9; row++){
            for (col = 0; col<9; col++){
                let preForm = document.querySelector(`#input-${row}-${col}`);
                if(preForm.value == ''){
                    preForm.value = initBoard[row][col];
                    preForm.style.backgroundColor = "rgb(82, 196, 96)"

                    document.querySelector(`#square-${row}-${col}`).style.backgroundColor = "rgb(82, 196, 96)";
                }
            }
        }
    }
    console.log(operations);
}

const findEmptySpot = (board) => {
    let spot = {
        'row': 0,
        'col': 0
    }

    for (row = 0; row<9; row++){
        for (col = 0; col<9; col++){
            if (board[row][col] == 0){
                spot.row = row;
                spot.col = col;
                return spot;
            }
        }
    }

    return false;
}

const solver = (board) => {
    if (operations > 5000000){
        return true;
    }
    operations++;
    emptySpot = findEmptySpot(board);
    if (!emptySpot){
        return true;
    }
    const rowMain = emptySpot.row;
    const colMain = emptySpot.col;


    for (val = 1; val<10; val++){
        if (isValid(board,val,rowMain,colMain)){
            board[rowMain][colMain] = val;

            if (solver(board)){
                return true;
            }
            val = board[rowMain][colMain];
            board[rowMain][colMain] = 0;
            
        }
    }
    return false;
}

const isValid = (board, value, row, col) => {
    gridX = Math.floor(row/3) * 3;
    gridY = Math.floor(col/3) * 3;

    for (colCheck = 0; colCheck <9; colCheck++){
        if (value == board[row][colCheck]){
            return false;
        }
    }
    for (rowCheck = 0; rowCheck <9; rowCheck++){
        if (val == board[rowCheck][col]){
            return false;
        }
    }
    for (i = 0; i < 3; i++){
        for (j =0; j<3; j++){
            if (row == 0 && column == 8){
            }
            if (val == board[i+gridX][j+gridY]){
                return false;
            }
        }
    }
    return true;
}


generateBoard();
reinforceBorders();
buttonDetection();


