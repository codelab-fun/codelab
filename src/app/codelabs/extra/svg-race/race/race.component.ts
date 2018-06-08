import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'slides-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements AfterViewInit {
  @Input() code: string;
  d = 'M50 450 v -5';
  @Input() track: string;
  @ViewChild('path') path: ElementRef;

  trackWidth = 20;
  finishPosition = {x: 0, y: 0};

  ngAfterViewInit() {
    const path = this.path.nativeElement;
    this.finishPosition = path.getPointAtLength(path.getTotalLength());
  }
}
