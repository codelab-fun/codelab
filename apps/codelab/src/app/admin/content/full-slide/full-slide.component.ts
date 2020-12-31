import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input
} from '@angular/core';

@Component({
  selector: 'slides-full-slide',
  templateUrl: './full-slide.component.html',
  styleUrls: ['./full-slide.component.scss']
})
export class FullSlideComponent implements AfterViewInit {
  @Input() slide;

  constructor(
    private readonly el: ElementRef,
    private readonly cfr: ComponentFactoryResolver
  ) {}

  ngAfterViewInit(): void {}
}
