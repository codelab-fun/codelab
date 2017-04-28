import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css']
})
export class ResizeComponent implements OnInit {
  private initOffsetX: number;
  private initWidth: number;
  private minWidth = 400;
  isMouseDown: boolean;
  width: number;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.width = Math.max(this.minWidth, this.elementRef.nativeElement.clientWidth);
  }

  calcWidth(x): number {
    return this.initWidth + x - this.initOffsetX;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e) {
    if (!this.isMouseDown) {
      return;
    }
    e.preventDefault();

    this.width = Math.max(this.minWidth, this.calcWidth(e.clientX));
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e) {
    if (e.target.className && (e.target.className.includes('spacer') || e.target.className.includes('handle') )) {
      this.isMouseDown = true;
      this.initOffsetX = e.clientX;
      this.initWidth = this.width;
    }
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  mouseStateReset() {
    this.isMouseDown = false;
  }
}
