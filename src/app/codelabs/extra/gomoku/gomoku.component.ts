import { Component } from '@angular/core';
import { parse } from 'babylon';
import { TicTacToe } from 'gomoku-tools';

declare const require;


@Component({
  selector: 'slides-gomoku',
  templateUrl: './gomoku.component.html',
  styleUrls: ['./gomoku.component.css']
})
export class GomokuComponent {
  fontSize = 18;

  games = {
    ticTacToe: new TicTacToe().moveTo('B2', 'A2', 'A1', 'C3', 'B1', 'B3', 'C1')
  };
  
}
