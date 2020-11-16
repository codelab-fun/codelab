import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[kirjs-player]',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('guess', { static: true }) guess: ElementRef;
  @Input() path;
  @Input() d = '';
  @Input() color = '#ffffff';
  @Output() scoreChanged = new EventEmitter<number>();
  points = [];
  carPosition = { x: 50, y: 50, angle: 0 };
  pathLength = 0;
  startPosition = { x: 0, y: 0 };
  trackWidth = 20;
  score = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.d) {
      this.calculateScore();
    }
  }

  calculateScore() {
    requestAnimationFrame(() => {
      this.calculateCarPosition();
      this.score = 0;
      const guess = this.guess.nativeElement;

      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];

        const { distance } = closestPoint(guess, point);

        if (distance < this.trackWidth) {
          this.score++;
        } else {
          this.pathLength = ((i - 3) / 100) * this.path.getTotalLength();
          this.scoreChanged.emit(this.score);
          return;
        }
      }
      this.scoreChanged.emit(this.score);
    });
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      const path = this.path;
      const l = path.getTotalLength();

      for (let i = 0; i < l; i += l / 100) {
        this.points.push(path.getPointAtLength(i));
      }

      this.startPosition = path.getPointAtLength(0);
    });
  }

  calculateCarPosition() {
    const guess = this.guess.nativeElement;
    const totalLength = guess.getTotalLength();
    this.carPosition = guess.getPointAtLength(totalLength);
    if (totalLength > 1) {
      const carPosition = guess.getPointAtLength(totalLength - 1);
      const dx = this.carPosition.x - carPosition.x;
      const dy = this.carPosition.y - carPosition.y;
      this.carPosition.angle = (Math.atan2(-dx, dy) * 180) / Math.PI;
    }
  }

  ngOnInit() {}
}

function closestPoint(pathNode, point) {
  const pathLength = pathNode.getTotalLength();
  let precision = 8,
    best,
    bestLength,
    bestDistance = Infinity;

  // linear scan for coarse approximation
  for (
    let scan, scanLength = 0, scanDistance;
    scanLength <= pathLength;
    scanLength += precision
  ) {
    if (
      (scanDistance = distance2(
        (scan = pathNode.getPointAtLength(scanLength))
      )) < bestDistance
    ) {
      (best = scan), (bestLength = scanLength), (bestDistance = scanDistance);
    }
  }

  // binary search for precise estimate
  precision /= 2;
  while (precision > 0.5) {
    let before, after, beforeLength, afterLength, beforeDistance, afterDistance;
    if (
      (beforeLength = bestLength - precision) >= 0 &&
      (beforeDistance = distance2(
        (before = pathNode.getPointAtLength(beforeLength))
      )) < bestDistance
    ) {
      (best = before),
        (bestLength = beforeLength),
        (bestDistance = beforeDistance);
    } else if (
      (afterLength = bestLength + precision) <= pathLength &&
      (afterDistance = distance2(
        (after = pathNode.getPointAtLength(afterLength))
      )) < bestDistance
    ) {
      (best = after),
        (bestLength = afterLength),
        (bestDistance = afterDistance);
    } else {
      precision /= 2;
    }
  }

  best = [best.x, best.y];
  best.distance = Math.sqrt(bestDistance);
  return best;

  function distance2(p) {
    const dx = p.x - point.x,
      dy = p.y - point.y;
    return dx * dx + dy * dy;
  }
}
