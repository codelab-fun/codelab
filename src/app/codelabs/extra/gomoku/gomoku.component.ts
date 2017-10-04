import { Component } from '@angular/core';
import { parse } from 'babylon';
import { TicTacToe, Gomoku } from 'gomoku-tools';

declare const require;

@Component({
  selector: 'slides-gomoku',
  templateUrl: './gomoku.component.html',
  styleUrls: ['./gomoku.component.css']
})
export class GomokuComponent {
  fontSize = 18;

  games = {
    ticTacToe: new TicTacToe().moveTo('B2', 'A2', 'A1', 'C3', 'B1', 'B3', 'C1'),
    fork33: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J7', 'I6', 'J6', 'H6'),
    fork43: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J7', 'I6', 'J6', 'H6', 'G8', 'F8'),
    fork44: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J7', 'I6', 'J6', 'H6', 'G8', 'F8', 'J5', 'J4'),
    wonGame: new Gomoku().moveTo('H8', 'I10', 'I11', 'H10', 'J10', 'I9', 'J8', 'J9', 'K9', 'L8', 'G9', 'I7', 'I6',
      'I8', 'G8', 'L7', 'K8', 'L9', 'L10', 'J7', 'K7', 'L5', 'L6', 'K6', 'M4', 'H9'),
    openThree: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J8'),
    moreFours: new Gomoku().moveTo('C14', 'C12', 'D14', 'D12', 'E14', 'F12', 'G14', 'G12', 'C10', 'B10', 'E10', 'O1',
      'F10', 'N1', 'G10', 'H10'),
    openThreeSpaced: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'K8'),
    closedFour: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J8', 'K8', 'J9', 'J7', 'G8'),
    closedBrokenFour: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J8', 'K8', 'J9', 'J7', 'F8'),
    findWin: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J8', 'K8', 'J9', 'J7', 'G8', 'F8', 'G7', 'K7', 'L7', 'I6', 'L9'),
    defendFrom4s: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J8', 'K8', 'J9', 'J7', 'G8', 'F8', 'G7', 'K7', 'L7', 'I6',
      'L9', 'K5', 'K6', 'H5', 'G4', 'I5', 'J5', 'I4', 'I3'),
    defendFrom4sSolved: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J8', 'K8', 'J9', 'J7', 'G8', 'F8', 'G7', 'K7', 'L7',
      'I6', 'L9', 'K5', 'K6', 'H5', 'G4', 'I5', 'J5', 'I4', 'I3', 'J6', 'N9', 'M8', 'K9', 'M9', 'L8', 'H4', 'G3', 'H6', 'H3', 'G6', 'F6'),
    many4s: new Gomoku().moveTo('h8', 'i9', 'j9', 'j8', 'h11', 'h10', 'g11', 'i11', 'i10', 'g12', 'g9', 'f10', 'g8',
      'g10', 'e10', 'f9', 'f7', 'h9', 'f11', 'e8', 'd7', 'e6', 'g5', 'g7', 'e5', 'f4', 'd8', 'd9', 'd5', 'c5', 'h5', 'f5', 'f3', 'g4',
      'h4', 'h3', 'i2', 'i3', 'j3', 'j5', 'k4', 'l5', 'e7', 'f6', 'b7', 'c7', 'e4', 'c6', 'g2', 'h1', 'i4', 'g6', 'd6', 'd4', 'h6', 'h7',
      'k2', 'l1', 'j2', 'h2', 'l2', 'm2', 'j4', 'l4', 'k3').jumpToMove(39)

  };
}
