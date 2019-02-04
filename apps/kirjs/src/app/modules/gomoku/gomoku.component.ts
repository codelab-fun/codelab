import { Component } from '@angular/core';
import { parse } from 'babylon';
import { TicTacToe, Gomoku } from 'gomoku-tools';
import utils from 'gomoku-tools/src/tools/utils';

declare const require;

const json = require('./renlib/moves.json');

class Node {
  p: string;
  down: boolean;
  depth = 0;
  parent: Node;
  children: Node[] = [];

  constructor(public position: [number, number]) {
    this.p = position.join(',');
  }

  addChild(node: Node) {
    this.children.push(node);
    node.parent = this;
    node.depth = this.depth + 1;
  }
}

let i = 0;

function buildTree(moves, index, parentNode) {
  i++;
  const move = moves[index];
  let node = new Node(move.move);
  node.down = !!move.down;

  parentNode.addChild(node);

  if (index + 1 < moves.length) {
    if (move.down) {
      node.down = true;
    }

    if (move.right) {
      while (node && !node.down) {
        if (!node) {
          throw new Error('Weird');
        }

        node = node.parent;
      }
      node = node.parent;
    }
    return buildTree(moves, index + 1, node);
  }
}

const parent = new Node([2, 2]);

buildTree(json.moves, 0, parent);
console.log(i);

class RenlibGame {
  private current: Node;
  parent;

  constructor(private start) {
    this.current = start;
  }

  back() {
    if (this.current.parent) {
      this.current = this.current.parent;
    }
  }

  moveTo(point) {
    let child = this.current.children.find(
      ({ position }) => position[0] === point[0] && position[1] === point[1]
    );

    if (!child) {
      child = new Node(point);
      this.current.children.push(child);
    }
    this.current = child;
  }

  forward() {}

  getPosition() {
    let node = this.current;

    const game = [node.position];
    while ((node = node.parent)) {
      game.push(node.position);
    }

    const putStones = (stones, move, index) => {
      stones[move[0]][move[1]] = (index % 2) + 1;
      return stones;
    };
    const position = game
      .reverse()
      .reduce(putStones, utils.generateEmptyPosition(15, 15));

    this.current.children
      .map(n => n.position)
      .reduce((stones, move) => {
        stones[move[0]][move[1]] = (game.length % 2) + 1 + 2;
        return stones;
      }, position);

    console.log(position);
    return position;
  }
}

@Component({
  selector: 'kirjs-gomoku',
  templateUrl: './gomoku.component.html',
  styleUrls: ['./gomoku.component.css']
})
export class GomokuComponent {
  fontSize = 18;

  games = {
    renlib: new RenlibGame(parent),
    ticTacToe: new TicTacToe().moveTo('B2', 'A2', 'A1', 'C3', 'B1', 'B3', 'C1'),
    empty: new Gomoku().moveTo(),
    start: new Gomoku().moveTo('H8'),
    start2: new Gomoku().moveTo('H8', 'H7'),
    swap2: new Gomoku().moveTo('H8', 'E7', 'G8'), // Sure win
    swap23: new Gomoku().moveTo('H8', 'E7', 'F10'), // Draw
    swap24: new Gomoku().moveTo('H8', 'H13', 'M10'), // White surewin H11, 10 horizontal
    swap25: new Gomoku().moveTo('C3', 'L7', 'F8'), // White surewin
    swap26: new Gomoku().moveTo('H8', 'J8', 'M8'), // Central Draw
    start5: new Gomoku()
      .moveTo('H8', 'H7', 'I8', 'I7', 'J8', 'J7', 'K8', 'K7', 'L8')
      .jumpToMove(2),
    sample: new Gomoku()
      .moveTo('H8', 'I7', 'H7', 'H6', 'G8', 'I8', 'H9', 'I6')
      .jumpToMove(2),
    start52: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J8',
      'K8',
      'J9',
      'J7',
      'G8',
      'F8',
      'G7',
      'K7',
      'L7',
      'I6',
      'L9',
      'K5',
      'K9',
      'H5',
      'G4',
      'K4',
      'K6',
      'J5',
      'L3',
      'I5',
      'L5',
      'G5'
    ),
    fork33: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J7', 'I6', 'J6', 'H6'),
    fork43: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J7',
      'I6',
      'J6',
      'H6',
      'G8',
      'F8'
    ),
    fork44: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J7',
      'I6',
      'J6',
      'H6',
      'G8',
      'F8',
      'J5',
      'J4'
    ),
    wonGame: new Gomoku().moveTo(
      'H8',
      'I10',
      'I11',
      'H10',
      'J10',
      'I9',
      'J8',
      'J9',
      'K9',
      'L8',
      'G9',
      'I7',
      'I6',
      'I8',
      'G8',
      'L7',
      'K8',
      'L9',
      'L10',
      'J7',
      'K7',
      'L5',
      'L6',
      'K6',
      'M4',
      'H9'
    ),
    openThree: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'J8'),
    old: new Gomoku().moveTo(
      'h8',
      'i8',
      'h7',
      'h9',
      'j7',
      'i7',
      'i6',
      'j5',
      'h5',
      'g4',
      'h6',
      'h4',
      'f6',
      'g6',
      'g7',
      'e5',
      'f8',
      'e9',
      'f9',
      'f7',
      'g8',
      'e10',
      'j10',
      'i9',
      'j9',
      'i10',
      'i11',
      'j8',
      'e8',
      'd8',
      'h11',
      'g10',
      'h10',
      'j12',
      'k9',
      'f11',
      'e12',
      'l8',
      'k11',
      'k8',
      'm8',
      'g11',
      'h12',
      'g13',
      'g12',
      'f12',
      'e11',
      'f4',
      'i4',
      'c7',
      'f10',
      'd6',
      'g9',
      'g3'
    ),
    moreFours: new Gomoku().moveTo(
      'C14',
      'C12',
      'D14',
      'D12',
      'E14',
      'F12',
      'G14',
      'G12',
      'C10',
      'B10',
      'E10',
      'O1',
      'F10',
      'N1',
      'G10',
      'H10'
    ),
    openThreeSpaced: new Gomoku().moveTo('H8', 'H7', 'I8', 'I7', 'K8'),
    closedFour: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J8',
      'K8',
      'J9',
      'J7',
      'G8'
    ),
    closedBrokenFour: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J8',
      'K8',
      'J9',
      'J7',
      'F8'
    ),
    findWin: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J8',
      'K8',
      'J9',
      'J7',
      'G8',
      'F8',
      'G7',
      'K7',
      'L7',
      'I6',
      'L9'
    ),
    defendFrom4s: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J8',
      'K8',
      'J9',
      'J7',
      'G8',
      'F8',
      'G7',
      'K7',
      'L7',
      'I6',
      'L9',
      'K5',
      'K6',
      'H5',
      'G4',
      'I5',
      'J5',
      'I4',
      'I3'
    ),
    defendFrom4sSolved: new Gomoku().moveTo(
      'H8',
      'H7',
      'I8',
      'I7',
      'J8',
      'K8',
      'J9',
      'J7',
      'G8',
      'F8',
      'G7',
      'K7',
      'L7',
      'I6',
      'L9',
      'K5',
      'K6',
      'H5',
      'G4',
      'I5',
      'J5',
      'I4',
      'I3',
      'J6',
      'N9',
      'M8',
      'K9',
      'M9',
      'L8',
      'H4',
      'G3',
      'H6',
      'H3',
      'G6',
      'F6'
    ),
    many4s: new Gomoku()
      .moveTo(
        'h8',
        'i9',
        'j9',
        'j8',
        'h11',
        'h10',
        'g11',
        'i11',
        'i10',
        'g12',
        'g9',
        'f10',
        'g8',
        'g10',
        'e10',
        'f9',
        'f7',
        'h9',
        'f11',
        'e8',
        'd7',
        'e6',
        'g5',
        'g7',
        'e5',
        'f4',
        'd8',
        'd9',
        'd5',
        'c5',
        'h5',
        'f5',
        'f3',
        'g4',
        'h4',
        'h3',
        'i2',
        'i3',
        'j3',
        'j5',
        'k4',
        'l5',
        'e7',
        'f6',
        'b7',
        'c7',
        'e4',
        'c6',
        'g2',
        'h1',
        'i4',
        'g6',
        'd6',
        'd4',
        'h6',
        'h7',
        'k2',
        'l1',
        'j2',
        'h2',
        'l2',
        'm2',
        'j4',
        'l4',
        'k3'
      )
      .jumpToMove(39)
  };
}
