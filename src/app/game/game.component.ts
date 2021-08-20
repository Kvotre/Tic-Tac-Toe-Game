import { Component, OnInit } from '@angular/core';
import { GameFunctions } from '../game-functions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameFunctions]
})
export class GameComponent implements OnInit {

  constructor(public game: GameFunctions) { }
  //Variable
   text?: string;

  ngOnInit(): void {
  }

  startGame(): void{
     this.game.gameStart();
     const currentPlayer = 'Player turn: ' + this.game.currentTurn;
     this.text = currentPlayer;
  }
  
   async selectSubfield(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColor();
      subfield.currentTarget.classList.add(color);
      
      this.game.changePlayer();

      await this.game.winner().then((end: boolean) => {
        if( this.game.gameStatus === 0 && end ) {
        this.text = 'The winner is player:' + this.game.currentTurn;
    }
      });

      await this.game.fullBoard().then((end: boolean) => {
        if( this.game.gameStatus === 0 && end ) {
        this.text = 'Draw';
    }
      });

    if(this.game.gameStatus === 1) {
     const currentPlayer = 'Player turn: ' + this.game.currentTurn;
     this.text = currentPlayer;
    }
   }
  }
}
