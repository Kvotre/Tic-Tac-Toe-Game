import { Status } from './game-status';

export class GameFunctions {

    gameArray: Array<number> = [];

    gameStatus?: Status;

    currentTurn?: any;

    over?: boolean;
    win?: boolean;

    playerOneWin: Array<Array<number>> = [
      [1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 1, 0, 1, 0, 1, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0, 1]
    ];

    playerTwoWin: Array<Array<number>> = [
      [2, 2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 2, 2],
      [2, 0, 0, 2, 0, 0, 2, 0, 0],
      [0, 2, 0, 0, 2, 0, 0, 2, 0],
      [0, 0, 2, 0, 0, 2, 0, 0, 2],
      [0, 0, 2, 0, 2, 0, 2, 0, 0],
      [2, 0, 0, 0, 2, 0, 0, 0, 2]
    ];
  

    public constructor () {
        this.gameStatus = Status.Stop;
        this.gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    gameStart(): void {
        this.gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameStatus = Status.Start;
        this.currentTurn = this.randomPlayer(); 
         
    }

    randomPlayer(): number {
      const turns = Math.floor(Math.random() * 2) + 1;
      return turns;
    }

    setField(position: number, value: number):void {
      this.gameArray[position] = value;
    }

    getPlayerColor(): string {
      const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
      return colorClass;
    }

    changePlayer(): void {
         this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    }

    arrayEquals(first: Array<any>, second: Array<any>): boolean {
       return Array.isArray(first) && Array.isArray(second) && first.length === second.length && 
         first.every( (value, index) => value === second[index]);
    }


    async winner(): Promise<boolean> {
      this.win = false;

      const arrayWinPlayer = (this.currentTurn === 1) ? this.playerOneWin : this.playerTwoWin;

      const currentArray: any = [];

      this.gameArray.forEach((subfield, index) => {
        if( subfield !== this.currentTurn ) {
          currentArray[index] = 0;
        }else {
          currentArray[index] = subfield;
        }
      });

      arrayWinPlayer.forEach( (checkfield) => {
           if(this.arrayEquals(checkfield, currentArray)) {
             this.win = true;
           }
      })
        
      if (this.win) {
        this.gameEnd();
        return true
      }else {
        return false
      }
    }

    async fullBoard(): Promise<boolean> {
      this.over = true;

      if( this.gameArray.includes(0) ) {
          this.over = false;    
      }

      if (this.over) {
        this.gameEnd();
        return true
      }else {
        return false
      }
    }

    gameEnd(): void {
      this.gameStatus = Status.Stop;
    }
}
