import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'kirjs-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements AfterViewInit {
  @Input() code: string;
  d = 'M50 450 v -5';
  cars = [
    {
      name: 'cheburek',
      color: '#fd6b00',
      d: this.d,
      score: 0
    },
    {
      name: 'banana',
      color: '#fde200',
      d: 'M50 450 v 5 l -10 -300',
      score: 0
    },
    {
      name: 'ololo',
      color: '#bdfd00',
      d: 'M50 450 v -5 h 10v-300',
      score: 0
    }
  ];
  @Input() track: string;
  @ViewChild('path', { static: false }) path: ElementRef;
  name = 'cheburek';
  scores = {};
  trackWidth = 20;
  finishPosition = { x: 0, y: 0 };

  updateCurrentPlayer() {
    const c = this.cars.find(car => car.name === this.name);
    if (c) {
      c.d = this.d;
    }
  }

  ngAfterViewInit() {
    const path = this.path.nativeElement;
    this.finishPosition = path.getPointAtLength(path.getTotalLength());
  }

  setScore(name: string, score: number) {
    const c = this.cars.find(car => name === car.name);
    if (c) {
      c.score = score;
    }
  }
}
