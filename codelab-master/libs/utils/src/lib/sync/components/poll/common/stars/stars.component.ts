import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'codelab-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarsComponent),
      multi: true
    }
  ]
})
export class StarsComponent implements OnInit, ControlValueAccessor {
  @HostBinding('class.enabled') @Input() enabled = true;
  readonly stars = Array.from(Array(5), (a, i) => i + 1);
  rating = 0;
  hover = 0;
  private onChange!: (n: number) => void;

  constructor() {}

  getStarIcon(star: number) {
    const rating = (this.hover || this.rating || 0) - star + 1;

    if (rating <= 0) {
      return 'star_border';
    }
    if (rating <= 0.5) {
      return 'star_half';
    }
    return 'star';
  }

  ngOnInit() {}

  registerOnChange(fn: (n: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(number: any): void {
    this.rating = number;
  }

  setValue(star: number) {
    if (this.enabled) {
      this.onChange(star);
    }
  }

  setHover(index: number) {
    if (this.enabled) {
      this.hover = index;
    }
  }
}
