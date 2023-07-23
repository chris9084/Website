export default class sudoku{
    constructor(K){
        this.N = 9;
        this.squarer = 3;
        
        this.board = Array.from({length: this.N}, () => Array.from({lenght: this.N}, ()=> 0));
        this.answer = Array.from({length: this.N}, () => Array.from({lenght: this.N}, ()=> 0));
        this.test = Array.from({length: this.N}, () => Array.from({lenght: this.N}, ()=> 0));
    }
    popBoard(K){
        //In Sudoku the top left box, center box, and the bottom left box can all be filled independent of the other boxes in the matrix 
        this.SetBoard();
        this.fillIndependent();
        this.fillDependent(0,this.squarer);
        //copies 
        this.CopyBoard();
        this.removedigits(K);
    }
    //fills the board with 0 to set it to be filled
    SetBoard(){
        for(let a=0;a<=this.N-1;a++){
            for(let b=0;b<=this.N-1;b++){
                this.board[a][b]=0;
                this.answer[a][b]=0;
                this.test[a][b]=0;
            }}
    }
    //test function to check the current contents of a board 
    logger(){
        for(let d=0;d<=this.N-1;d++){
            for(let f=0;f<=this.N-1;f++){
                console.log(this.test[d][f]);
            }}
        
    }
    //function to copy the answer from the generated board to the answer board
    CopyBoard(){
        for(let a=0;a<=this.N-1;a++){
            for(let b=0;b<=this.N-1;b++){
                this.answer[a][b]=this.board[a][b];
            }}
    }
    //function that seads the board
    fillIndependent(){
        for (let i = 0; i <this.N; i+=this.squarer){
            this.fillSquare(i,i);
        }
    }
    //recrusive function for filling remainder of empty squares
    fillDependent(a,b){
        //checks if at end of board   
        if(a===this.N-1 && b===this.N){
            return true;
        }
        //checks if at end of row
        if(b===this.N){
            a += 1;
            b=0;
        }
        //tests if space is filled
        if(this.board[a][b]!==0){
            return this.fillDependent(a,b+1);
        }
        //attempts to fill space checking rows and cols
        for(let c=1;c<=this.N;c++){
            if(this.checkCell(a,b,c)){
                this.board[a][b]=c;
                if(this.fillDependent(a,b+1)){
                    return true;
                }
                this.board[a][b]=0;
            }

        }
        return false;

    }
    //a=row b=col c=val of cell
    //runs the square test (find the square using a - the remainder of a/squarer) and then checks the row and the col through itteration
    checkCell(a,b,c){
        return (
            this.testSquare(a - (a % this.squarer),b-(b % this.squarer),c) &&
            this.testRow(a,c) &&
            this.testcol(b,c));
    }
    //this function fills a 3x3 square 
    fillSquare(a,b){
        let fill =0;
        for(let i=0; i< this.squarer;i++){
            for(let k=0; k< this.squarer;k++){
                while(true){
                    fill=this.getrandomNumb(this.N);
                    if(this.testSquare(a,b,fill)){
                        break;
                    }
                }
                this.board[a+i][b+k]=fill;

            }
        }

    }
    //Randomly selects a digit to remove from the board
    removedigits(k){
        let a = 0;
        let b = 0;  
        for(let i=0;i<k;i++){
            a=this.getrandomNumb(this.N)-1;
            b=this.getrandomNumb(this.N)-1;
            if(this.board[a][b]!==0){
                this.board[a][b]=0;
            }else{
                i--
            }
        }
    }
    //basic random number generator generates digits 1-9
    getrandomNumb(numb){
        return Math.floor(Math.random()*numb)+1;
    }
    //this function tests a 3x3 square for duplicates
    testSquare(row,col,numb){
        for(let i=0; i< this.squarer;i++){
            for(let k=0; k< this.squarer;k++){
                if(this.board[row+i][col+k]===numb){
                    return false;
                }
            }
        }
        return true;
    }
    //compares the curent value c to all the values in the row a returns false if there is a match
    testRow(a,c){
        for(let i=0; i<this.N; i++){
            if(this.board[a][i]===c){
                return false;
            }
        }
        return true;

    }
    //compares the curent value c to all the values in the col b returns false if there is a match
    testcol(b,c){
        for(let i=0; i<this.N; i++){
            if(this.board[i][b]===c){
                return false;
            }
        }
        return true;

    }

}

