import { Component, HostListener, Input } from '@angular/core';
import { Gomoku } from 'gomoku-tools';
import { Highlights } from '../highlights';

@Component({
  selector: 'kirjs-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() theme = 'gomoku';
  @Input() game = new Gomoku().moveTo(
    'H8',
    'I8',
    'H9',
    'H7',
    'J9',
    'I9',
    'I10',
    'H11',
    'J11',
    'K12',
    'J10',
    'J12',
    'G10',
    'H10',
    'G8',
    'F7',
    'G9',
    'G7',
    'I7',
    'J6',
    'H12'
  );
  @Input() highlights = new Highlights();
  @Input() showTools = true;

  @HostListener('window:keydown.H', ['$event.target'])
  @HostListener('window:keydown.J', ['$event.target'])
  back() {
    this.game.back();
  }

  @HostListener('window:keydown.T', ['$event.target'])
  @HostListener('window:keydown.K', ['$event.target'])
  forward() {
    this.game.forward();
  }

  constructor() {}

  log() {
    console.log(this.game.getHistory());
    console.log(this.game.getHistory().length);
    console.log(this.highlights.highlights);
  }
}
