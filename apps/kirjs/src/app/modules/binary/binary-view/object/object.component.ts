import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  @Input() data: any;
  @Input() showMeta = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  trackBy(i, data) {
    return data.name;
  }

  init() {
    this.cdr.detectChanges();
  }
}
