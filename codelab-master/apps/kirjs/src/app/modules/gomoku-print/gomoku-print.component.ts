import { Component } from '@angular/core';
import { parse } from 'babylon';
import { TicTacToe, Gomoku } from 'gomoku-tools';

declare const require;

@Component({
  selector: 'kirjs-gomoku',
  templateUrl: './gomoku-print.component.html',
  styleUrls: ['./gomoku-print.component.css']
})
export class GomokuPrintComponent {
  fontSize = 18;

  game = new Gomoku().moveTo();
  examples = {
    open3: new Gomoku({ cellsX: 8, cellsY: 4 }).moveTo(
      'C3',
      'C2',
      'D3',
      'D2',
      'E3'
    ),
    open32: new Gomoku({ cellsX: 8, cellsY: 4 }).moveTo(
      'C3',
      'C2',
      'D3',
      'D2',
      'F3'
    ),
    close4: new Gomoku({ cellsX: 8, cellsY: 4 }).moveTo(
      'C3',
      'C2',
      'D3',
      'D2',
      'F3',
      'E2',
      'E3',
      'B3'
    ),
    fork: new Gomoku({ cellsX: 8, cellsY: 5 }).moveTo(
      'C3',
      'C2',
      'D3',
      'D2',
      'F3',
      'E2',
      'E3',
      'B3',
      'F4',
      'E4',
      'F2'
    )
  };
}
