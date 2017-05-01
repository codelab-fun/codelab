import {Component, ElementRef, HostListener, OnInit,  Input} from '@angular/core';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css']
})
export class ResizeComponent implements OnInit {
  @Input() isVertical: boolean;
  private MIN_WIDTH = 400;
  private MIN_HEIGHT = 200;
  private isMouseDown: boolean;
  private initOffset;
  private initSize;
  private minSize;
  private size;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.isVertical) {
      this.minSize = this.MIN_HEIGHT;
      this.size = Math.max(this.minSize, this.elementRef.nativeElement.clientHeight);

    } else {
      this.minSize = this.MIN_WIDTH;
      this.size = this.elementRef.nativeElement.clientWidth;
    }
  }

  calcWidth(currentOffset:number) {
     return this.initSize + currentOffset - this.initOffset;
  }

  getWidth() {
    if (this.isVertical) { return; }
    return this.size;
  }

  getHeight() {
    if (!this.isVertical) { return; }
    return this.size;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e) {
    if (!this.isMouseDown) {
      return;
    }
    e.preventDefault();

    if (!this.isVertical) {
      this.size = Math.max(this.minSize, this.calcWidth(e.clientX));
    } else {
      this.size = this.initSize + this.initOffset - e.clientY;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e) {
    if (e.target.className && (e.target.className.includes('spacer') || e.target.className.includes('handle') )) {
      e.stopPropagation();
      this.isMouseDown = true;
      this.initSize = this.size;

      if (!this.isVertical) {
        this.initOffset = e.clientX;
      } else {
        this.initOffset = e.clientY;
      }
    }
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  mouseStateReset() {
    this.isMouseDown = false;
  }
}
