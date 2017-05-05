import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit
  } from '@angular/core';
@Component({
  selector: 'app-resize', templateUrl: './resize.component.html', styleUrls: ['./resize.component.css']
})

export class ResizeComponent implements OnInit, OnChanges {
  @Input() isVertical: boolean; // The starting width/height of the component
  @Input() startingWidth = 600;
  @Input() startingHeight;
  @Input() minWidth = 400;
  @Input() minHeight = 350;
  @Input() maxWidth = 100000;
  @Input() maxHeight = 100000;

  public isMouseDown: boolean;
  private initOffset;
  private initSize;
  private minSize;
  private size;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.update(this.isVertical ? this.startingHeight : this.startingWidth);
  }

  ngOnChanges(): void {
    this.minSize = this.minWidth || this.minHeight;
  }

  calcHeight(currentOffset: number) {
    return this.initSize + currentOffset - this.initOffset;
  }

  calcWidth(currentOffset: number) {
    return this.initSize + currentOffset - this.initOffset;
  }

  getWidth() {
    if (this.isVertical) {
      return;
    }
    return this.size;
  }

  getHeight() {
    if (!this.isVertical) {
      return;
    }
    return this.size;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e) {
    if (!this.isMouseDown) {
      return;
    }
    e.preventDefault();
    if (!this.isVertical) {
      this.update(Math.max(this.minSize, this.calcWidth(e.clientX)));
    } else {
      this.update(Math.max(this.minSize, this.calcHeight(e.clientY)));
    }
  }

  @HostListener('mousedown', ['$event']) onMouseDown(e) {
    if (e.target.className && (e.target.className.includes('spacer') || e.target.className.includes('handle'))) {
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

  @HostListener('mouseup') @HostListener('mouseleave') mouseStateReset() {
    this.isMouseDown = false;
  }

  private update(size: number = 0) {
    if (this.isVertical) {
      this.size = Math.min(this.maxHeight, Math.max(this.minSize, size || this.elementRef.nativeElement.clientHeight));
    } else {
      this.size = Math.min(this.maxWidth, Math.max(this.minSize, size || this.elementRef.nativeElement.clientWidth));
    }
  }
}
